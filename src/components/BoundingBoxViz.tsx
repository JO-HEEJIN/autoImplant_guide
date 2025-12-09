'use client';

/**
 * Bounding box visualization
 * Shows the calculated safe zone for implant placement
 */

import { BoundingBox } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface BoundingBoxVizProps {
    boundingBox: BoundingBox;
}

export function BoundingBoxViz({ boundingBox }: BoundingBoxVizProps) {
    const { min, max, center, dimensions } = boundingBox;

    return (
        <group position={[center.x, center.y, center.z]}>
            {/* Wireframe box */}
            <mesh>
                <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
                <meshBasicMaterial
                    color={COLORS.boundingBox}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Semi-transparent fill */}
            <mesh>
                <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
                <meshStandardMaterial
                    color={COLORS.boundingBox}
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Corner markers */}
            {[
                [min.x, min.y, min.z],
                [min.x, min.y, max.z],
                [min.x, max.y, min.z],
                [min.x, max.y, max.z],
                [max.x, min.y, min.z],
                [max.x, min.y, max.z],
                [max.x, max.y, min.z],
                [max.x, max.y, max.z],
            ].map((pos, index) => (
                <mesh key={index} position={[pos[0] - center.x, pos[1] - center.y, pos[2] - center.z]}>
                    <sphereGeometry args={[0.3, 8, 8]} />
                    <meshBasicMaterial color={COLORS.boundingBox} />
                </mesh>
            ))}

            {/* Center point marker */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
        </group>
    );
}
