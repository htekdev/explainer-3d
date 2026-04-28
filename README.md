# 🎬 Explainer 3D

**Create stunning 3D animated explainer videos with code.**

A production-ready framework combining [Remotion](https://remotion.dev) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for building programmatic 3D explainer videos. Write your scenes in React, render to MP4.

---

## ⚡ Quick Start

```bash
git clone https://github.com/htekdev/explainer-3d.git
cd explainer-3d
npm install
npm start          # Opens Remotion Studio at http://localhost:3000
```

## 🎯 Features

- **10 reusable 3D components** — boxes, arrows, particles, beams, labels, cameras
- **Scene-based composition** — break videos into scenes with automatic crossfades
- **Bloom postprocessing** — cinematic glow effects out of the box
- **Deterministic rendering** — seeded RNG for reproducible particle systems
- **Animated camera** — keyframe-based camera paths with smooth interpolation
- **60fps @ 1080p** — production quality output
- **GitHub Actions CI** — automated testing, linting, and video rendering
- **AI-friendly** — Copilot instructions included for generating new videos

---

## 🧱 Component Library

All components import from `src/components`:

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| **`Scene3D`** | Foundational wrapper — ThreeCanvas + lighting + bloom | `camera`, `bloom`, `backgroundColor` |
| **`SystemBox`** | Rounded 3D box representing a system/service | `position`, `label`, `color`, `animateIn` |
| **`TokenStream`** | Animated text tokens flowing in a direction | `tokens`, `direction`, `speed`, `startFrame` |
| **`DataFlow`** | Particle stream between two 3D points | `from`, `to`, `color`, `particleCount` |
| **`Arrow3D`** | Animated directional arrow | `from`, `to`, `animated`, `startFrame` |
| **`FloatingLabel`** | Billboard text label (always faces camera) | `text`, `position`, `fontSize`, `animateIn` |
| **`GlowOrb`** | Pulsing sphere with emissive glow | `position`, `color`, `pulseSpeed`, `intensity` |
| **`ConnectionBeam`** | Laser/beam connecting two points | `from`, `to`, `color`, `pulseSpeed` |
| **`GridFloor`** | Infinite ground grid | `yPosition`, `fadeDistance`, `color` |
| **`ParticleField`** | Ambient floating particles | `count`, `spread`, `speed`, `seed` |
| **`AnimatedCamera`** | Camera with keyframe animation | `keyframes: [{ frame, position, lookAt }]` |

---

## 🎥 Creating a New Video

### 1. Plan Your Scenes

Break your concept into 3–5 scenes, each 7–15 seconds (420–900 frames at 60fps).

### 2. Create the Composition

```
src/compositions/MyVideo/
├── MyVideo.tsx          # Main composition with Sequence + crossfades
├── scenes/
│   ├── IntroScene.tsx
│   ├── MainScene.tsx
│   └── OutroScene.tsx
└── index.ts
```

### 3. Build a Scene

```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Scene3D, SystemBox, FloatingLabel, GridFloor, AnimatedCamera } from '../../components';

export const IntroScene: React.FC = () => (
  <AbsoluteFill>
    <Scene3D camera={{ position: [0, 3, 8] }}>
      <AnimatedCamera keyframes={[
        { frame: 0, position: [0, 3, 10], lookAt: [0, 0, 0] },
        { frame: 120, position: [2, 2, 7], lookAt: [0, 0.5, 0] },
      ]} />
      <GridFloor />
      <FloatingLabel text="Hello World" position={[0, 2, 0]}
        animateIn={{ startFrame: 0, durationFrames: 30 }} />
      <SystemBox position={[0, 0.5, 0]} label="My Service" color="#4A90D9"
        animateIn={{ startFrame: 15, durationFrames: 30 }} />
    </Scene3D>
  </AbsoluteFill>
);
```

### 4. Register the Composition

Add to `src/Root.tsx`:

```tsx
<Composition id="MyVideo" component={MyVideo}
  durationInFrames={1800} fps={60} width={1920} height={1080} />
```

### 5. Preview & Render

```bash
npm start                    # Preview in Remotion Studio
npm run render -- MyVideo    # Render to MP4
```

---

## 🤖 AI Integration

This repo includes `.github/copilot-instructions.md` with full component documentation. AI coding assistants (GitHub Copilot, Cursor, etc.) can generate complete scenes by describing what you want:

> "Create a scene showing three microservices communicating through a message queue, with data flowing between them"

The AI knows every component, its props, and the conventions for positioning, timing, and color.

---

## 🎞️ Rendering

### Local

```bash
# Render a specific composition
npm run render:ai-dev-flow

# Render all compositions
npm run render:all

# Render with custom options
npx remotion render src/index.ts AIDevFlow out/video.mp4 --codec h264 --gl=swangle
```

### CI/CD (GitHub Actions)

The `render.yml` workflow:
- Triggers on push to `main` (when source files change) or manual dispatch
- Renders the composition in a headless environment
- Uploads the video as a GitHub Actions artifact (30-day retention)
- Optionally uploads to S3 (configure `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET` secrets)

---

## 📁 Project Structure

```
explainer-3d/
├── src/
│   ├── components/          # Reusable 3D components
│   │   ├── Scene3D.tsx      # ThreeCanvas wrapper + lighting + bloom
│   │   ├── SystemBox.tsx    # Labeled 3D box
│   │   ├── TokenStream.tsx  # Flowing text tokens
│   │   ├── DataFlow.tsx     # Particle stream between points
│   │   ├── Arrow3D.tsx      # Animated directional arrow
│   │   ├── FloatingLabel.tsx# Billboard text label
│   │   ├── GlowOrb.tsx     # Pulsing glowing sphere
│   │   ├── ConnectionBeam.tsx# Beam between points
│   │   ├── GridFloor.tsx    # Infinite ground grid
│   │   ├── ParticleField.tsx# Ambient particles
│   │   ├── AnimatedCamera.tsx# Keyframe camera
│   │   └── index.ts         # Barrel exports
│   ├── compositions/        # Video compositions
│   │   └── AIDevFlow/       # "How AI Dev Works" example
│   │       ├── AIDevFlow.tsx
│   │       ├── scenes/
│   │       │   ├── SystemPromptScene.tsx
│   │       │   ├── SkillsMergeScene.tsx
│   │       │   ├── ModelProcessScene.tsx
│   │       │   └── OutputScene.tsx
│   │       └── index.ts
│   ├── hooks/               # Animation hooks
│   │   ├── useAnimatedValue.ts
│   │   └── useScene.ts
│   ├── utils/               # Utilities
│   │   ├── colors.ts        # Theme palette
│   │   ├── easing.ts        # Custom easing functions
│   │   ├── layout.ts        # 3D positioning helpers
│   │   ├── random.ts        # Seeded RNG
│   │   └── types.ts         # Shared types
│   ├── renderer/            # Batch rendering
│   │   ├── compositions.ts
│   │   └── render-all.ts
│   ├── Root.tsx              # Remotion root
│   └── index.ts              # Entry point
├── tests/                    # Vitest test suite
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # Test + lint
│   │   └── render.yml        # Video rendering
│   └── copilot-instructions.md
├── remotion.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report (80% threshold)
npm run build         # Type-check
npm run lint          # ESLint
```

---

## 🎨 Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| 🔵 Primary | `#4A90D9` | Systems, connections |
| 🟣 Secondary | `#7B61FF` | AI, models, processing |
| 🟢 Accent | `#00D4AA` | Data, tokens, output |
| 🟡 Warning | `#FFB800` | Arrows, highlights |
| 🔴 Error | `#FF4757` | Alerts |
| 🌸 Pink | `#FF6B9D` | Special elements |
| ⬛ Background | `#0A0A1A` | Scene background |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-composition`)
3. Add your composition in `src/compositions/`
4. Register it in `Root.tsx` and `renderer/compositions.ts`
5. Add tests
6. Submit a PR

---

## 📄 License

MIT — Hector Flores Rocha ([htekdev](https://github.com/htekdev))
