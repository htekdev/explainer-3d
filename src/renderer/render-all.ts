import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { COMPOSITIONS, type CompositionId } from './compositions';

const args = process.argv.slice(2);
const compositionArg = args.find((_, i) => args[i - 1] === '--composition');
const outputDir = args.find((_, i) => args[i - 1] === '--output-dir') ?? 'out';
const useLambda = args.includes('--lambda');

mkdirSync(resolve(process.cwd(), outputDir), { recursive: true });

const toRender = compositionArg
  ? [COMPOSITIONS[compositionArg as CompositionId]].filter(Boolean)
  : Object.values(COMPOSITIONS);

if (toRender.length === 0) {
  console.error(`Unknown composition: ${compositionArg}`);
  console.error(`Available: ${Object.keys(COMPOSITIONS).join(', ')}`);
  process.exit(1);
}

const mode = useLambda ? 'Lambda' : 'local';
console.log(`\n🎬 Rendering ${toRender.length} composition(s) [${mode}]...\n`);

async function renderWithLambda(): Promise<void> {
  const { renderOnLambda } = await import('./lambda');

  for (const comp of toRender) {
    const output = resolve(process.cwd(), outputDir, comp.defaultOutput.split('/').pop()!);
    console.log(`▶ Rendering ${comp.id} → ${output} (Lambda)`);

    try {
      await renderOnLambda({
        compositionId: comp.id,
        outputPath: output,
      });
      console.log(`✅ ${comp.id} complete\n`);
    } catch (err) {
      console.error(`❌ ${comp.id} failed:`, err);
      process.exit(1);
    }
  }
}

function renderLocally(): void {
  for (const comp of toRender) {
    const output = resolve(process.cwd(), outputDir, comp.defaultOutput.split('/').pop()!);
    console.log(`▶ Rendering ${comp.id} → ${output}`);

    try {
      execSync(
        `npx remotion render src/index.ts ${comp.id} ${output} --codec h264 --gl=swangle`,
        { stdio: 'inherit', cwd: process.cwd() },
      );
      console.log(`✅ ${comp.id} complete\n`);
    } catch {
      console.error(`❌ ${comp.id} failed\n`);
      process.exit(1);
    }
  }
}

if (useLambda) {
  renderWithLambda().then(() => {
    console.log('🎉 All renders complete!');
  });
} else {
  renderLocally();
  console.log('🎉 All renders complete!');
}
