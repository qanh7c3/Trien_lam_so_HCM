"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PointerOffsetRef, ScrollTelemetryRef } from "./types";

interface TimeDustParticlesProps {
  count: number;
  telemetryRef: ScrollTelemetryRef;
  pointerRef: PointerOffsetRef;
  reducedMotion: boolean;
}

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  attribute float aScale;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.35 + aSeed * 6.2831) * 0.45 + uPointer.x * 0.65 * aScale;
    pos.y += cos(uTime * 0.28 + aSeed * 6.2831) * 0.35 + uPointer.y * 0.45 * aScale;
    pos.z += mod(uScroll * 12.0 + aSeed * 4.0, 4.0) - 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (140.0 / max(-mvPosition.z, 1.0));
    vAlpha = 0.28 + 0.55 * (0.5 + 0.5 * sin(uTime * 1.4 + aSeed * 12.56));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float glow = pow(1.0 - dist * 2.0, 2.0);
    gl_FragColor = vec4(uColor, glow * vAlpha);
  }
`;

export default function TimeDustParticles({
  count,
  telemetryRef,
  pointerRef,
  reducedMotion,
}: TimeDustParticlesProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const absSeed = Math.abs(seed);
      const angle = ((i * 2.39996) % (Math.PI * 2));
      const radius = 2.2 + ((i * 73) % 100) / 100 * 9.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (((i * 37) % 100) / 100 - 0.35) * 8.5;
      positions[i * 3 + 2] = 16 - (i / count) * 130;
      scales[i] = 0.4 + absSeed * 1.25;
      seeds[i] = absSeed;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const matUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#C5A059") },
    };

    return { geometry: geo, uniforms: matUniforms };
  }, [count]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = reducedMotion ? 0 : state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = telemetryRef.current.progress;
    materialRef.current.uniforms.uPointer.value.set(
      reducedMotion ? 0 : pointerRef.current.x,
      reducedMotion ? 0 : pointerRef.current.y
    );
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
