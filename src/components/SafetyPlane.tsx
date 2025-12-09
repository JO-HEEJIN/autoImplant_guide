'use client';

/**
 * Safety plane visualization
 * Shows the minimum safe distance plane from the nerve
 */

import { Vector3 } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface SafetyPlaneProps {
    yPosition: number;
    toothPosition: Vector3 | null;
}

export function SafetyPlane({ yPosition, toothPosition }: SafetyPlaneProps) {
    const posX = toothPosition?.x ?? 0;
    const posZ = toothPosition?.z ?? 0;

    return (
        <group position={[posX, yPosition, posZ]}>
            {/* Main safety plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[25, 20]} />
                <meshStandardMaterial
                    color={COLORS.safetyPlane}
                    transparent
                    opacity={0.3}
                    side={2}
                />
            </mesh>

            {/* Plane border */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[12, 12.3, 4]} />
                <meshBasicMaterial color={COLORS.safetyPlane} />
            </mesh>

            {/* Warning indicators at corners */}
            {[
                [-10, 0, -8],
                [-10, 0, 8],
                [10, 0, -8],
                [10, 0, 8],
            ].map((pos, index) => (
                <mesh key={index} position={pos as [number, number, number]}>
                    <coneGeometry args={[0.5, 1, 4]} />
                    <meshStandardMaterial color={COLORS.safetyPlane} />
                </mesh>
            ))}

            {/* Label indicator */}
            <mesh position={[0, 0.5, -12]}>
                <boxGeometry args={[8, 0.5, 0.5]} />
                <meshStandardMaterial color={COLORS.safetyPlane} />
            </mesh>
        </group>
    );
}
