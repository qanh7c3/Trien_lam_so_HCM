import * as THREE from "three";

const CONTROL_POINTS: [number, number, number][] = [
  [0, 1.4, 14],
  [-2.6, 1.1, -2],
  [3.2, 0.8, -18],
  [-3.8, 1.5, -34],
  [2.9, 1.1, -50],
  [-2.4, 0.7, -66],
  [3.1, 1.3, -82],
  [-1.6, 1.0, -96],
  [0, 1.5, -110],
];

export function createExhibitionCurve(): THREE.CatmullRomCurve3 {
  const vectors = CONTROL_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  return new THREE.CatmullRomCurve3(vectors, false, "catmullrom", 0.5);
}

export function getMilestoneCurveT(index: number, total: number): number {
  if (total <= 1) return 0.45;
  const startT = 0.34;
  const endT = 0.62;
  return startT + (index / (total - 1)) * (endT - startT);
}
