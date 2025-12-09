'use client';

/**
 * Simplified bone/jaw model visualization
 * Represents the alveolar bone structure
 */

import { useRef } from 'react';
import { Mesh } from 'three';
import { Vector3 } from '@/lib/types';
import { COLORS } from '@/lib/constants';

interface BoneModelProps {
    toothPosition: Vector3 | null;
}

export function BoneModel({ toothPosition }: BoneModelProps) {
    const meshRef = useRef<Mesh>(null);

    // Default bone dimensions
    const boneWidth = 20;
    const boneHeight = 25;
    const boneDepth = 15;

    // Position bone centered on tooth position or at origin
    const posX = toothPosition?.x ?? 0;
    const posY = toothPosition?.y ?? -12;
    const posZ = toothPosition?.z ?? 0;

    return (
        <group position={[posX, posY, posZ]}>
            {/* Main bone block */}
            <mesh ref={meshRef} castShadow receiveShadow>
                <boxGeometry args={[boneWidth, boneHeight, boneDepth]} />
                <meshStandardMaterial
                    color={COLORS.bone}
                    transparent
                    opacity={0.6}
                    roughness={0.8}
                />
            </mesh>

            {/* Bone surface indicator (top) */}
            <mesh position={[0, boneHeight / 2 + 0.1, 0]}>
                <planeGeometry args={[boneWidth, boneDepth]} />
                <meshStandardMaterial
                    color="#d4c4a8"
                    side={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Wireframe outline for clarity */}
            <lineSegments>
                <edgesGeometry args={[new (require('three').BoxGeometry)(boneWidth, boneHeight, boneDepth)]} />
                <lineBasicMaterial color="#a89070" />
            </lineSegments>
        </group>
    );
}
