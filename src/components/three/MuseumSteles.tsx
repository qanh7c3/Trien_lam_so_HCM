"use client";

import { useMemo } from "react";
import { createExhibitionCurve } from "./curve";

interface SteleConfig {
  position: [number, number, number];
  rotationY: number;
  height: number;
  accentRed: boolean;
}

export default function MuseumSteles() {
  const steles = useMemo<SteleConfig[]>(() => {
    const curve = createExhibitionCurve();
    const list: SteleConfig[] = [];
    const total = 14;
    for (let i = 0; i < total; i++) {
      const t = 0.05 + (i / (total - 1)) * 0.9;
      const point = curve.getPointAt(t);
      const side = i % 2 === 0 ? -1 : 1;
      const distance = 5.4 + (i % 3) * 1.1;
      list.push({
        position: [point.x + side * distance, point.y - 0.8, point.z],
        rotationY: side * -0.28,
        height: 4.8 + (i % 3) * 0.9,
        accentRed: i % 3 === 0,
      });
    }
    return list;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, -48]}>
        <planeGeometry args={[64, 160]} />
        <meshStandardMaterial
          color="#12100E"
          metalness={0.35}
          roughness={0.78}
        />
      </mesh>

      {steles.map((stele, idx) => (
        <group
          key={idx}
          position={stele.position}
          rotation={[0, stele.rotationY, 0]}
        >
          <mesh position={[0, stele.height / 2 - 2.4, 0]}>
            <boxGeometry args={[1.4, stele.height, 0.18]} />
            <meshStandardMaterial
              color={stele.accentRed ? "#8B1E1E" : "#1C1815"}
              metalness={stele.accentRed ? 0.42 : 0.25}
              roughness={stele.accentRed ? 0.34 : 0.62}
            />
          </mesh>

          <mesh position={[0, stele.height / 2 - 2.4, 0.1]}>
            <boxGeometry args={[1.46, stele.height + 0.06, 0.03]} />
            <meshStandardMaterial
              color="#C5A059"
              metalness={0.9}
              roughness={0.22}
              wireframe
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
