"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createExhibitionCurve } from "./curve";
import type { PointerOffsetRef, ScrollTelemetryRef } from "./types";

interface CameraRigProps {
  telemetryRef: ScrollTelemetryRef;
  pointerRef: PointerOffsetRef;
  reducedMotion: boolean;
}

export default function CameraRig({
  telemetryRef,
  pointerRef,
  reducedMotion,
}: CameraRigProps) {
  const { camera } = useThree();
  const curve = useMemo(() => createExhibitionCurve(), []);
  const targetPosition = useRef(new THREE.Vector3());
  const lookAheadPoint = useRef(new THREE.Vector3());
  const smoothLookAt = useRef(new THREE.Vector3(0, 1, -10));

  useFrame((_, delta) => {
    const progress = THREE.MathUtils.clamp(telemetryRef.current.progress, 0, 0.999);
    const lookT = Math.min(progress + 0.045, 1);

    curve.getPointAt(progress, targetPosition.current);
    curve.getPointAt(lookT, lookAheadPoint.current);

    const swayX = reducedMotion ? 0 : pointerRef.current.x * 0.7;
    const swayY = reducedMotion ? 0 : pointerRef.current.y * 0.4;

    targetPosition.current.x += swayX;
    targetPosition.current.y += 1.05 + swayY;
    targetPosition.current.z += 4.2;

    const damping = reducedMotion ? 1 : 1 - Math.exp(-4.5 * Math.min(delta, 0.05));
    camera.position.lerp(targetPosition.current, damping);

    lookAheadPoint.current.x += swayX * 0.35;
    lookAheadPoint.current.y += swayY * 0.25;
    smoothLookAt.current.lerp(lookAheadPoint.current, damping);
    camera.lookAt(smoothLookAt.current);
  });

  return null;
}
