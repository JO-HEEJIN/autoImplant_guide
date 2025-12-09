'use client';

/**
 * Implant model visualization
 * Renders the calculated implant as a cylinder at the golden position
 */

import { useRef } from 'react';
import { Mesh } from 'three';
import { ImplantSpec } from '@/lib/types';
import { COLORS, LINGUAL_OFFSET } from '@/lib/constants';

interface ImplantModelProps {
    spec: ImplantSpec;
    showOffset?: boolean;
}

export function ImplantModel({ spec, showOffset = true }: ImplantModelProps) {
    const meshRef = useRef<Mesh>(null);
    const { length, diameter, position } = spec;

    // Implant is positioned with its top at the calculated position
    // and extends downward (into the bone)
    const implantY = position.y - length / 2;

    return (
        <group>
            {/* Original center point (before offset) - for reference */}
            {showOffset && (
                <mesh position={[position.x, position.y, position.z + LINGUAL_OFFSET]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color={COLORS.offset} transparent opacity={0.5} />
                </mesh>
            )}

            {/* Offset indicator line */}
            {showOffset && (
                <line>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                position.x, position.y, position.z + LINGUAL_OFFSET,
                                position.x, position.y, position.z,
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={COLORS.offset} linewidth={2} />
                </line>
            )}

            {/* Implant body (cylinder) */}
            <mesh
                ref={meshRef}
                position={[position.x, implantY, position.z]}
                rotation={[0, 0, 0]}
                castShadow
            >
                <cylinderGeometry args={[diameter / 2, diameter / 2, length, 32]} />
                <meshStandardMaterial
                    color={COLORS.implant}
                    metalness={0.7}
                    roughness={0.2}
                />
            </mesh>

            {/* Implant threads (decorative rings) */}
            {Array.from({ length: Math.floor(length / 1.5) }, (_, i) => (
                <mesh
                    key={i}
                    position={[position.x, implantY - length / 2 + 1 + i * 1.5, position.z]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <torusGeometry args={[diameter / 2 + 0.1, 0.1, 8, 32]} />
                    <meshStandardMaterial color="#3a7bc8" metalness={0.8} roughness={0.1} />
                </mesh>
            ))}

            {/* Implant top platform */}
            <mesh position={[position.x, position.y, position.z]}>
                <cylinderGeometry args={[diameter / 2 - 0.3, diameter / 2, 0.5, 32]} />
                <meshStandardMaterial color="#5a9ae9" metalness={0.8} roughness={0.1} />
            </mesh>

            {/* Position marker at golden position */}
            <mesh position={[position.x, position.y + 1, position.z]}>
                <coneGeometry args={[0.5, 1, 8]} />
                <meshStandardMaterial color="#ffcc00" />
            </mesh>
        </group>
    );
}
