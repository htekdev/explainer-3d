import { bundle } from '@remotion/bundler';
import {
  deploySite,
  renderMediaOnLambda,
  getRenderProgress,
  downloadMedia,
  getOrCreateBucket,
} from '@remotion/lambda';
import type { AwsRegion } from '@remotion/lambda';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPOSITIONS, type CompositionId } from './compositions';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required.`);
  }
  return value;
}

export interface LambdaRenderOptions {
  readonly compositionId: string;
  readonly outputPath: string;
  readonly onProgress?: (pct: number) => void;
}

export function getDefaultLambdaConfig(): {
  readonly region: AwsRegion;
  readonly functionName: string;
} {
  return {
    region: (process.env.REMOTION_LAMBDA_REGION || 'us-east-1') as AwsRegion,
    functionName: requireEnv('REMOTION_LAMBDA_FUNCTION_NAME'),
  };
}

export async function renderOnLambda(options: LambdaRenderOptions): Promise<string> {
  const { region, functionName } = getDefaultLambdaConfig();

  mkdirSync(path.dirname(options.outputPath), { recursive: true });

  // Bundle
  console.log(`📦 Bundling "${options.compositionId}"...`);
  const projectRoot = path.resolve(__dirname, '..', '..');
  const entryPoint = path.resolve(projectRoot, 'src', 'index.ts');

  await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  // Deploy site to S3
  console.log('☁️  Deploying to S3...');
  const { bucketName } = await getOrCreateBucket({ region });

  const siteName = process.env.REMOTION_LAMBDA_SITE_NAME || 'explainer-3d';
  const { serveUrl } = await deploySite({
    entryPoint,
    bucketName,
    region,
    siteName,
  });
  console.log(`   Serve URL: ${serveUrl}`);

  // Render on Lambda
  console.log('🚀 Starting Lambda render...');
  const renderStart = Date.now();

  const { renderId } = await renderMediaOnLambda({
    region,
    functionName,
    serveUrl,
    composition: options.compositionId,
    inputProps: {},
    codec: 'h264',
    framesPerLambda: 20,
    privacy: 'private',
  });

  console.log(`   Render ID: ${renderId}`);

  // Poll progress
  let outputFile: string | undefined;
  let polling = true;
  while (polling) {
    const progress = await getRenderProgress({
      renderId,
      bucketName,
      region,
      functionName,
    });

    if (progress.fatalErrorEncountered) {
      const errors =
        progress.errors
          ?.map((e: unknown) => (typeof e === 'string' ? e : JSON.stringify(e, null, 2)))
          .join('\n') || 'Unknown error';
      throw new Error(`Lambda render failed:\n${errors}`);
    }

    const pct = Math.round((progress.overallProgress ?? 0) * 100);
    if (options.onProgress) {
      options.onProgress(pct);
    }
    process.stdout.write(`\r   Progress: ${pct}%  `);

    if (progress.done && progress.outputFile) {
      outputFile = progress.outputFile;
      polling = false;
    } else {
      await new Promise<void>((r) => {
        setTimeout(r, 1000);
      });
    }
  }

  const renderMs = Date.now() - renderStart;
  console.log(`\n   Rendered in ${(renderMs / 1000).toFixed(1)}s`);

  // Download
  console.log('📥 Downloading...');
  await downloadMedia({
    bucketName,
    region,
    renderId,
    outPath: options.outputPath,
  });

  const fileSize = (statSync(options.outputPath).size / 1024 / 1024).toFixed(1);
  console.log(`🎉 Saved: ${options.outputPath} (${fileSize} MB)\n`);

  return outputFile!;
}

export { COMPOSITIONS, type CompositionId };
