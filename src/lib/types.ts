/**
 * Core type definitions for the AutoImplant Guide system
 */

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface BoundingBox {
  min: Vector3;
  max: Vector3;
  center: Vector3;
  dimensions: Vector3;
}

export interface ImplantSpec {
  length: number;
  diameter: number;
  angle: number;
  position: Vector3;
  direction: Vector3;
}

export interface ToothData {
  id: number;
  name: string;
  mesiodistalWidth: number;
  buccolingualWidth: number;
  crownHeight: number;
  rootLength: number;
  position: Vector3;
}

export interface NerveData {
  points: Vector3[];
  safetyPlaneY: number;
}

export interface BoneData {
  crestLevel: number;
  slope: number;
  lingualVector: Vector3;
}

export interface CalculationResult {
  boundingBox: BoundingBox;
  implantSpec: ImplantSpec;
  safetyMargins: {
    toNerve: number;
    toCrest: number;
    toBuccal: number;
  };
}

export type ToothNumber = 
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;

export interface VisualizationStep {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}
