'use client';

/**
 * Nerve canal visualization
 * Renders the inferior alveolar nerve as a red tube
 */

import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 as ThreeVector3 } from 'three';
import { Vector3 } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface NerveCanalProps {
    points: Vector3[];
}

export function NerveCanal({ points }: NerveCanalProps) {
    // Convert our Vector3 to Three.js Vector3 and create curve
    const curve = useMemo(() => {
        const threePoints = points.map(p => new ThreeVector3(p.x, p.y, p.z));
        return new CatmullRomCurve3(threePoints);
    }, [points]);

    return (
        <group>
            {/* Nerve tube */}
            <mesh>
                <tubeGeometry args={[curve, 64, 1.5, 16, false]} />
                <meshStandardMaterial
                    color={COLORS.nerve}
                    transparent
                    opacity={0.8}
                    roughness={0.3}
                    metalness={0.1}
                />
            </mesh>

            {/* Glow effect */}
            <mesh>
                <tubeGeometry args={[curve, 64, 2, 16, false]} />
                <meshBasicMaterial
                    color={COLORS.nerve}
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Point markers along the nerve */}
            {points.map((point, index) => (
                <mesh key={index} position={[point.x, point.y, point.z]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color="#ff6666" />
                </mesh>
            ))}
        </group>
    );
}
