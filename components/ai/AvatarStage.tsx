'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, useGLTF } from '@react-three/drei';
import { Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import { Box3, Color, DoubleSide, Group, Mesh, Vector3 } from 'three';
import type { Material, Object3D } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { cn } from '@/lib/utils';

const AVATAR_URL = '/avatar/samuel.glb';

type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

type AvatarStageProps = {
  state?: AvatarState;
  shirtColor?: string;
  variant?: 'stage' | 'badge';
  className?: string;
};

function isClothingMaterial(name: string) {
  const value = name.toLowerCase();
  const clothing = ['cloth', 'clothes', 'shirt', 'top', 'jacket', 'blazer', 'hoodie', 'outfit', 'torso', 'uniform', 'wear'];
  const protectedParts = ['skin', 'face', 'head', 'hair', 'eye', 'iris', 'mouth', 'teeth', 'tooth', 'brow', 'lash'];
  return clothing.some((part) => value.includes(part)) && !protectedParts.some((part) => value.includes(part));
}

function applyClothColor(root: Object3D, color: string) {
  root.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    mesh.frustumCulled = false;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      const typed = material as Material & {
        alphaTest?: number;
        color?: Color;
        map?: unknown;
        opacity?: number;
        side?: number;
        transparent?: boolean;
      };
      const materialName = `${material.name || ''} ${mesh.name || ''}`;
      typed.alphaTest = 0;
      typed.side = DoubleSide;
      if (typed.color && isClothingMaterial(materialName)) {
        typed.color.set(color);
      }
      typed.needsUpdate = true;
    }
  });
}

function CenteredWebGlb({ state = 'idle', shirtColor = '#111827', variant = 'stage' }: AvatarStageProps) {
  const group = useRef<Group>(null);
  const gltf = useGLTF(AVATAR_URL);

  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);

  useLayoutEffect(() => {
    applyClothColor(scene, shirtColor);

    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const sourceHeight = size.y || 1;
    const targetHeight = variant === 'badge' ? 1.32 : 2.05;
    const scale = targetHeight / sourceHeight;
    scene.position.set(-center.x * scale, -center.y * scale - (variant === 'badge' ? 0.12 : 0.56), -center.z * scale);
    scene.scale.setScalar(scale);
  }, [scene, shirtColor, variant]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const speed = state === 'speaking' ? 2.4 : state === 'listening' ? 1.7 : 0.9;
    const nod = state === 'speaking' ? 0.035 : state === 'listening' ? 0.018 : 0.006;
    const turn = state === 'speaking' ? 0.032 : state === 'listening' ? 0.02 : 0.01;
    group.current.position.y = Math.sin(clock.elapsedTime * speed) * (state === 'speaking' ? 0.018 : 0.008);
    group.current.rotation.x = Math.sin(clock.elapsedTime * speed) * nod;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.65) * turn;
  });

  return (
    <group ref={group} rotation={[0, 0, 0]} position={[0, variant === 'badge' ? -0.06 : -0.12, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <Html center>
      <div className="whitespace-nowrap text-xs text-gray-300">
        {compact ? 'Loading...' : 'Samuel is getting ready...'}
      </div>
    </Html>
  );
}

export function AvatarStage({ state = 'idle', shirtColor = '#374151', variant = 'stage', className }: AvatarStageProps) {
  const isBadge = variant === 'badge';

  return (
    <div className={cn(isBadge ? 'relative h-24 w-24 overflow-hidden rounded-full border border-white/10 bg-gray-950' : 'absolute inset-0', className)}>
      <Canvas
        className="!h-full !w-full"
        camera={{ position: [0, isBadge ? 0.02 : 0.12, isBadge ? 2.75 : 3.9], fov: isBadge ? 32 : 27 }}
      >
        <color attach="background" args={['#030712']} />
        {!isBadge ? <fog attach="fog" args={['#030712', 6, 12]} /> : null}
        <ambientLight intensity={0.72} />
        <directionalLight position={[2.5, 5, 3]} intensity={1.9} />
        <directionalLight position={[-2, 2.2, 2]} intensity={0.7} />
        <Suspense fallback={<LoadingAvatar compact={isBadge} />}>
          <CenteredWebGlb state={state} shirtColor={shirtColor} variant={variant} />
        </Suspense>
        {!isBadge ? <Environment preset="city" /> : null}
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_URL);
