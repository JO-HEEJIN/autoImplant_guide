'use client';

/**
 * Main 3D Scene component using react-three-fiber
 * Renders the bone, nerve, bounding box, and implant visualizations
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import { BoneModel } from './BoneModel';
import { NerveCanal } from './NerveCanal';
import { BoundingBoxViz } from './BoundingBoxViz';
import { ImplantModel } from './ImplantModel';
import { SafetyPlane } from './SafetyPlane';
import { BoundingBox, ImplantSpec, Vector3 } from '@/lib/types';

interface SceneProps {
    boundingBox: BoundingBox | null;
    implantSpec: ImplantSpec | null;
    nervePoints: Vector3[] | null;
    safetyPlaneY: number | null;
    currentStep: number;
    toothPosition: Vector3 | null;
}

export function Scene({
    boundingBox,
    implantSpec,
    nervePoints,
    safetyPlaneY,
    currentStep,
    toothPosition,
}: SceneProps) {
    return (
        <div className="relative w-full min-h-[500px] h-[500px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden">
            <Canvas shadows className="absolute inset-0">
                <PerspectiveCamera makeDefault position={[30, 20, 30]} fov={50} />
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={10}
                    maxDistance={100}
                />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />
                <directionalLight position={[-10, 10, -10]} intensity={0.3} />

                {/* Reference Grid */}
                <Grid
                    position={[0, -30, 0]}
                    args={[100, 100]}
                    cellSize={5}
                    cellThickness={0.5}
                    cellColor="#334155"
                    sectionSize={10}
                    sectionThickness={1}
                    sectionColor="#475569"
                    fadeDistance={100}
                    fadeStrength={1}
                    followCamera={false}
                />

                {/* Bone Model - Always visible */}
                <BoneModel toothPosition={toothPosition} />

                {/* Nerve Canal - Show from step 2 */}
                {nervePoints && currentStep >= 2 && (
                    <NerveCanal points={nervePoints} />
                )}

                {/* Safety Plane - Show from step 3 */}
                {safetyPlaneY !== null && currentStep >= 3 && (
                    <SafetyPlane yPosition={safetyPlaneY} toothPosition={toothPosition} />
                )}

                {/* Bounding Box - Show from step 4 */}
                {boundingBox && currentStep >= 4 && (
                    <BoundingBoxViz boundingBox={boundingBox} />
                )}

                {/* Implant Model - Show from step 5 */}
                {implantSpec && currentStep >= 5 && (
                    <ImplantModel spec={implantSpec} showOffset={currentStep >= 5} />
                )}
            </Canvas>
        </div>
    );
}
