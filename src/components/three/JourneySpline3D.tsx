"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import type { IFiveContinentsJourney } from "@/models/FiveContinentsJourney";
import { createExhibitionCurve, getMilestoneCurveT } from "./curve";
import type { ScrollTelemetryRef } from "./types";

interface JourneySpline3DProps {
  journey: IFiveContinentsJourney[];
  telemetryRef: ScrollTelemetryRef;
  activeStop: number;
  reducedMotion: boolean;
}

interface MilestoneNode {
  position: THREE.Vector3;
  stop: IFiveContinentsJourney;
  index: number;
}

export default function JourneySpline3D({
  journey,
  telemetryRef,
  activeStop,
  reducedMotion,
}: JourneySpline3DProps) {
  const curve = useMemo(() => createExhibitionCurve(), []);
  const pulseRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  const linePoints = useMemo(() => {
    return curve.getPoints(180).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, [curve]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 160, 0.045, 10, false);
  }, [curve]);

  const milestones = useMemo<MilestoneNode[]>(() => {
    return journey.map((stop, index) => {
      const t = getMilestoneCurveT(index, journey.length);
      const base = curve.getPointAt(t);
      const latOffset = ((stop.coordinates?.lat ?? 0) / 90) * 0.9;
      const sideSign = index % 2 === 0 ? -1 : 1;
      const pos = new THREE.Vector3(
        base.x + sideSign * (1.85 + Math.abs(latOffset) * 0.4),
        base.y + latOffset * 0.65,
        base.z
      );
      return { position: pos, stop, index };
    });
  }, [curve, journey]);

  useFrame((state, delta) => {
    const progress = THREE.MathUtils.clamp(telemetryRef.current.progress, 0, 0.999);
    if (pulseRef.current) {
      const point = curve.getPointAt(progress);
      pulseRef.current.position.copy(point);
      if (!reducedMotion) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 3.2) * 0.14;
        pulseRef.current.scale.setScalar(s);
      }
    }
    if (ringGroupRef.current && !reducedMotion) {
      ringGroupRef.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#C5A059"
          emissive="#C5A059"
          emissiveIntensity={0.65}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      <Line
        points={linePoints}
        color="#FAF6F0"
        lineWidth={1}
        transparent
        opacity={0.25}
      />

      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial
          color="#FAF6F0"
          emissive="#C5A059"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>

      {milestones.map((node) => {
        const isActive = node.index === activeStop;
        return (
          <group key={node.stop.order} position={node.position}>
            <Float
              speed={reducedMotion ? 0 : 1.4}
              rotationIntensity={reducedMotion ? 0 : 0.2}
              floatIntensity={reducedMotion ? 0 : 0.25}
            >
              <mesh>
                <octahedronGeometry args={[isActive ? 0.34 : 0.2, 0]} />
                <meshStandardMaterial
                  color={isActive ? "#C5A059" : "#8B1E1E"}
                  emissive={isActive ? "#C5A059" : "#8B1E1E"}
                  emissiveIntensity={isActive ? 1.8 : 0.65}
                  metalness={0.75}
                  roughness={0.25}
                />
              </mesh>
              <group ref={isActive ? ringGroupRef : undefined}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[isActive ? 0.56 : 0.32, 0.018, 12, 48]} />
                  <meshStandardMaterial
                    color="#C5A059"
                    emissive="#C5A059"
                    emissiveIntensity={isActive ? 1.4 : 0.35}
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            </Float>
          </group>
        );
      })}
    </group>
  );
}
