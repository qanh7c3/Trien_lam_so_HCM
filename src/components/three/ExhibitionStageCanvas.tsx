"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import type { IFiveContinentsJourney } from "@/models/FiveContinentsJourney";
import CameraRig from "./CameraRig";
import JourneySpline3D from "./JourneySpline3D";
import MuseumSteles from "./MuseumSteles";
import TimeDustParticles from "./TimeDustParticles";
import type { PointerOffsetRef, ScrollTelemetryRef } from "./types";

interface ExhibitionStageCanvasProps {
  journey: IFiveContinentsJourney[];
  telemetryRef: ScrollTelemetryRef;
  pointerRef: PointerOffsetRef;
  activeStop: number;
  isMobile: boolean;
  reducedMotion: boolean;
  enablePostEffects: boolean;
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#FAF6F0" />
      <directionalLight position={[8, 12, 10]} intensity={1.15} color="#FAF6F0" />
      <pointLight position={[-6, 4, -12]} intensity={18} distance={38} color="#C5A059" />
      <pointLight position={[6, 2, -45]} intensity={24} distance={45} color="#8B1E1E" />
      <pointLight position={[-5, 3, -80]} intensity={20} distance={42} color="#C5A059" />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#FAF6F0"
          position={[0, 8, 4]}
          scale={[14, 4, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#C5A059"
          position={[10, 2, -6]}
          scale={[6, 10, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="ring"
          intensity={2.0}
          color="#8B1E1E"
          position={[-10, 1, -10]}
          scale={8}
          rotation={[0, Math.PI / 2, 0]}
        />
      </Environment>
    </>
  );
}

export default function ExhibitionStageCanvas({
  journey,
  telemetryRef,
  pointerRef,
  activeStop,
  isMobile,
  reducedMotion,
  enablePostEffects,
}: ExhibitionStageCanvasProps) {
  const particleCount = reducedMotion ? 220 : isMobile ? 480 : 1500;
  const showDepthOfField = enablePostEffects && !isMobile && !reducedMotion;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ fov: isMobile ? 54 : 46, near: 0.1, far: 160, position: [0, 2.4, 18] }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={["#12100E"]} />
        <fog attach="fog" args={["#12100E", 16, 62]} />

        <Suspense fallback={null}>
          <StudioLights />
          <CameraRig
            telemetryRef={telemetryRef}
            pointerRef={pointerRef}
            reducedMotion={reducedMotion}
          />
          <MuseumSteles />
          <JourneySpline3D
            journey={journey}
            telemetryRef={telemetryRef}
            activeStop={activeStop}
            reducedMotion={reducedMotion}
          />
          <TimeDustParticles
            count={particleCount}
            telemetryRef={telemetryRef}
            pointerRef={pointerRef}
            reducedMotion={reducedMotion}
          />

          {enablePostEffects && !reducedMotion && (
            showDepthOfField ? (
              <EffectComposer multisampling={0}>
                <Bloom
                  mipmapBlur
                  luminanceThreshold={0.78}
                  luminanceSmoothing={0.25}
                  intensity={0.45}
                />
                <DepthOfField
                  focusDistance={0.018}
                  focalLength={0.032}
                  bokehScale={1.8}
                  height={480}
                />
              </EffectComposer>
            ) : (
              <EffectComposer multisampling={0}>
                <Bloom
                  mipmapBlur
                  luminanceThreshold={0.78}
                  luminanceSmoothing={0.25}
                  intensity={0.35}
                />
              </EffectComposer>
            )
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
