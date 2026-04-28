# Explainer 3D — Copilot Instructions

## How to Create a New Explainer Video

You have a library of reusable 3D components. To create a new video:

### Step 1: Plan Your Scenes
Break the concept into 3-5 scenes, each 7-15 seconds (420-900 frames at 60fps).

### Step 2: Create Composition Folder
```
src/compositions/MyVideo/
├── MyVideo.tsx          # Main composition with Sequence + crossfades
├── scenes/
│   ├── Scene1.tsx
│   ├── Scene2.tsx
│   └── Scene3.tsx
└── index.ts             # export { MyVideo } from './MyVideo';
```

### Step 3: Build Scenes Using Components
Available components (import from `../../components`):

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Scene3D` | Wrapper with lighting + bloom | `camera`, `bloom`, `backgroundColor` |
| `SystemBox` | Labeled 3D box (system/service) | `position`, `label`, `color`, `animateIn` |
| `TokenStream` | Flowing text tokens | `tokens`, `position`, `direction`, `speed`, `startFrame` |
| `DataFlow` | Particle stream between points | `from`, `to`, `color`, `particleCount`, `startFrame` |
| `Arrow3D` | Animated directional arrow | `from`, `to`, `color`, `startFrame` |
| `FloatingLabel` | Billboard text in 3D | `text`, `position`, `animateIn` |
| `GlowOrb` | Pulsing glowing sphere | `position`, `color`, `intensity`, `pulseSpeed` |
| `ConnectionBeam` | Beam between two points | `from`, `to`, `color`, `pulseSpeed` |
| `GridFloor` | Ground grid | `yPosition`, `fadeDistance` |
| `ParticleField` | Ambient particles | `count`, `spread`, `speed`, `color` |
| `AnimatedCamera` | Keyframed camera | `keyframes: [{ frame, position, lookAt }]` |

### Step 4: Register Composition
Add to `src/Root.tsx`:
```tsx
<Composition id="MyVideo" component={MyVideo} durationInFrames={1800} fps={60} width={1920} height={1080} />
```

Add to `src/renderer/compositions.ts`:
```typescript
MyVideo: { id: 'MyVideo', defaultOutput: 'out/my-video.mp4', durationInFrames: 1800, fps: 60 },
```

### Constraints
- Use `seed` prop for deterministic randomness in particles
- Scene overlaps should be ~30 frames for crossfade
- Position range: x,z ∈ [-10, 10], y ∈ [-5, 5]
- Use theme colors from `src/utils/colors.ts`
- Every scene needs `<Scene3D>` wrapper with `<AnimatedCamera>`
