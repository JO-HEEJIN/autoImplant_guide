/**
 * Mock data for testing the implant positioning algorithm
 * Provides sample tooth library, nerve positions, and bone data
 */

import { ToothData, NerveData, Vector3 } from './types';

/**
 * Standard tooth library with approximate dimensions (in mm)
 * Based on average adult tooth measurements
 */
export const TOOTH_LIBRARY: Record<number, ToothData> = {
    // Upper Right Quadrant (11-18)
    11: { id: 11, name: 'Upper Right Central Incisor', mesiodistalWidth: 8.5, buccolingualWidth: 7.0, crownHeight: 10.5, rootLength: 13.0, position: { x: 4, y: 0, z: 5 } },
    12: { id: 12, name: 'Upper Right Lateral Incisor', mesiodistalWidth: 6.5, buccolingualWidth: 6.0, crownHeight: 9.0, rootLength: 13.0, position: { x: 12, y: 0, z: 4 } },
    13: { id: 13, name: 'Upper Right Canine', mesiodistalWidth: 7.5, buccolingualWidth: 8.0, crownHeight: 10.0, rootLength: 17.0, position: { x: 20, y: 0, z: 3 } },
    14: { id: 14, name: 'Upper Right First Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 9.0, crownHeight: 8.5, rootLength: 14.0, position: { x: 28, y: 0, z: 2 } },
    15: { id: 15, name: 'Upper Right Second Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 9.0, crownHeight: 8.5, rootLength: 14.0, position: { x: 35, y: 0, z: 1 } },
    16: { id: 16, name: 'Upper Right First Molar', mesiodistalWidth: 10.0, buccolingualWidth: 11.0, crownHeight: 7.5, rootLength: 12.0, position: { x: 43, y: 0, z: 0 } },
    17: { id: 17, name: 'Upper Right Second Molar', mesiodistalWidth: 9.0, buccolingualWidth: 11.0, crownHeight: 7.0, rootLength: 11.0, position: { x: 52, y: 0, z: -1 } },
    18: { id: 18, name: 'Upper Right Third Molar', mesiodistalWidth: 8.5, buccolingualWidth: 10.0, crownHeight: 6.5, rootLength: 10.0, position: { x: 60, y: 0, z: -2 } },

    // Upper Left Quadrant (21-28)
    21: { id: 21, name: 'Upper Left Central Incisor', mesiodistalWidth: 8.5, buccolingualWidth: 7.0, crownHeight: 10.5, rootLength: 13.0, position: { x: -4, y: 0, z: 5 } },
    22: { id: 22, name: 'Upper Left Lateral Incisor', mesiodistalWidth: 6.5, buccolingualWidth: 6.0, crownHeight: 9.0, rootLength: 13.0, position: { x: -12, y: 0, z: 4 } },
    23: { id: 23, name: 'Upper Left Canine', mesiodistalWidth: 7.5, buccolingualWidth: 8.0, crownHeight: 10.0, rootLength: 17.0, position: { x: -20, y: 0, z: 3 } },
    24: { id: 24, name: 'Upper Left First Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 9.0, crownHeight: 8.5, rootLength: 14.0, position: { x: -28, y: 0, z: 2 } },
    25: { id: 25, name: 'Upper Left Second Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 9.0, crownHeight: 8.5, rootLength: 14.0, position: { x: -35, y: 0, z: 1 } },
    26: { id: 26, name: 'Upper Left First Molar', mesiodistalWidth: 10.0, buccolingualWidth: 11.0, crownHeight: 7.5, rootLength: 12.0, position: { x: -43, y: 0, z: 0 } },
    27: { id: 27, name: 'Upper Left Second Molar', mesiodistalWidth: 9.0, buccolingualWidth: 11.0, crownHeight: 7.0, rootLength: 11.0, position: { x: -52, y: 0, z: -1 } },
    28: { id: 28, name: 'Upper Left Third Molar', mesiodistalWidth: 8.5, buccolingualWidth: 10.0, crownHeight: 6.5, rootLength: 10.0, position: { x: -60, y: 0, z: -2 } },

    // Lower Left Quadrant (31-38)
    31: { id: 31, name: 'Lower Left Central Incisor', mesiodistalWidth: 5.5, buccolingualWidth: 6.0, crownHeight: 9.0, rootLength: 12.5, position: { x: -2, y: -25, z: 5 } },
    32: { id: 32, name: 'Lower Left Lateral Incisor', mesiodistalWidth: 6.0, buccolingualWidth: 6.5, crownHeight: 9.5, rootLength: 14.0, position: { x: -8, y: -25, z: 4 } },
    33: { id: 33, name: 'Lower Left Canine', mesiodistalWidth: 7.0, buccolingualWidth: 7.5, crownHeight: 11.0, rootLength: 16.0, position: { x: -15, y: -25, z: 3 } },
    34: { id: 34, name: 'Lower Left First Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 7.5, crownHeight: 8.5, rootLength: 14.0, position: { x: -22, y: -25, z: 2 } },
    35: { id: 35, name: 'Lower Left Second Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 8.0, crownHeight: 8.0, rootLength: 14.5, position: { x: -29, y: -25, z: 1 } },
    36: { id: 36, name: 'Lower Left First Molar', mesiodistalWidth: 11.0, buccolingualWidth: 10.5, crownHeight: 7.5, rootLength: 14.0, position: { x: -38, y: -25, z: 0 } },
    37: { id: 37, name: 'Lower Left Second Molar', mesiodistalWidth: 10.5, buccolingualWidth: 10.0, crownHeight: 7.0, rootLength: 13.0, position: { x: -48, y: -25, z: -1 } },
    38: { id: 38, name: 'Lower Left Third Molar', mesiodistalWidth: 10.0, buccolingualWidth: 9.5, crownHeight: 6.5, rootLength: 11.0, position: { x: -57, y: -25, z: -2 } },

    // Lower Right Quadrant (41-48)
    41: { id: 41, name: 'Lower Right Central Incisor', mesiodistalWidth: 5.5, buccolingualWidth: 6.0, crownHeight: 9.0, rootLength: 12.5, position: { x: 2, y: -25, z: 5 } },
    42: { id: 42, name: 'Lower Right Lateral Incisor', mesiodistalWidth: 6.0, buccolingualWidth: 6.5, crownHeight: 9.5, rootLength: 14.0, position: { x: 8, y: -25, z: 4 } },
    43: { id: 43, name: 'Lower Right Canine', mesiodistalWidth: 7.0, buccolingualWidth: 7.5, crownHeight: 11.0, rootLength: 16.0, position: { x: 15, y: -25, z: 3 } },
    44: { id: 44, name: 'Lower Right First Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 7.5, crownHeight: 8.5, rootLength: 14.0, position: { x: 22, y: -25, z: 2 } },
    45: { id: 45, name: 'Lower Right Second Premolar', mesiodistalWidth: 7.0, buccolingualWidth: 8.0, crownHeight: 8.0, rootLength: 14.5, position: { x: 29, y: -25, z: 1 } },
    46: { id: 46, name: 'Lower Right First Molar', mesiodistalWidth: 11.0, buccolingualWidth: 10.5, crownHeight: 7.5, rootLength: 14.0, position: { x: 38, y: -25, z: 0 } },
    47: { id: 47, name: 'Lower Right Second Molar', mesiodistalWidth: 10.5, buccolingualWidth: 10.0, crownHeight: 7.0, rootLength: 13.0, position: { x: 48, y: -25, z: -1 } },
    48: { id: 48, name: 'Lower Right Third Molar', mesiodistalWidth: 10.0, buccolingualWidth: 9.5, crownHeight: 6.5, rootLength: 11.0, position: { x: 57, y: -25, z: -2 } },
};

/**
 * Get mock nerve data for a given tooth
 * Lower jaw teeth (31-48) have nerve canal considerations
 */
export function getNerveData(toothId: number): NerveData | null {
    // Only lower jaw teeth have nerve canal concerns
    if (toothId < 31 || toothId > 48) {
        return null;
    }

    const tooth = TOOTH_LIBRARY[toothId];
    if (!tooth) return null;

    // Simulate nerve canal running below the tooth roots
    const nerveY = tooth.position.y - 15; // 15mm below tooth position

    // Create nerve path points
    const points: Vector3[] = [
        { x: tooth.position.x - 20, y: nerveY, z: tooth.position.z - 2 },
        { x: tooth.position.x - 10, y: nerveY + 1, z: tooth.position.z - 2 },
        { x: tooth.position.x, y: nerveY + 2, z: tooth.position.z - 2 },
        { x: tooth.position.x + 10, y: nerveY + 1, z: tooth.position.z - 2 },
        { x: tooth.position.x + 20, y: nerveY, z: tooth.position.z - 2 },
    ];

    return {
        points,
        safetyPlaneY: nerveY + 3.5, // 1.5mm safety margin + 2mm buffer
    };
}

/**
 * Get mock bone data for a given tooth position
 */
export function getBoneData(toothId: number): {
    crestLevel: number;
    nerveLevel: number;
    buccalZ: number;
    lingualZ: number;
    slope: number;
} {
    const tooth = TOOTH_LIBRARY[toothId];
    if (!tooth) {
        // Default values if tooth not found
        return {
            crestLevel: 0,
            nerveLevel: -15,
            buccalZ: 5,
            lingualZ: -5,
            slope: 0,
        };
    }

    const isLower = toothId >= 31 && toothId <= 48;
    const baseY = tooth.position.y;

    return {
        crestLevel: baseY + (isLower ? 2 : -2), // Crest slightly above/below tooth position
        nerveLevel: isLower ? baseY - 15 : baseY - 30, // Nerve only relevant for lower
        buccalZ: tooth.position.z + tooth.buccolingualWidth / 2,
        lingualZ: tooth.position.z - tooth.buccolingualWidth / 2,
        slope: Math.random() * 10 - 5, // Random slope between -5 and 5 degrees
    };
}

/**
 * Pre-configured test scenarios matching the test cases from documentation
 */
export const TEST_SCENARIOS = {
    // TC-01: Box height calculation
    TC01: {
        description: 'Box Height Calculation - Nerve Y=10, Crest Y=20',
        input: { nerveY: 10, crestY: 20 },
        expected: { boxBottomY: 11.5, boxTopY: 19 },
    },
    // TC-02: Implant center offset
    TC02: {
        description: 'Center Offset - Box Center=(0,0,0), Lingual Vector=(0,0,-1)',
        input: { center: { x: 0, y: 0, z: 0 }, lingualVector: { x: 0, y: 0, z: -1 } },
        expected: { finalCenter: { x: 0, y: 0, z: -0.5 } },
    },
    // TC-03: Length recommendation
    TC03: {
        description: 'Length Recommendation - Box Top Y=19, Nerve Y=10',
        input: { boxTopY: 19, boxBottomY: 11.5 },
        expected: { maxLength: 7.5, recommendedLength: 7 },
    },
    // TC-04: Diameter recommendation
    TC04: {
        description: 'Diameter Recommendation - Mesial-Distal Distance=10mm',
        input: { mesiodistalDistance: 10 },
        expected: { diameterRange: { min: 6.0, max: 7.0 } },
    },
    // TC-05: Angle correction
    TC05: {
        description: 'Angle Correction - Box Axis=0, Bone Slope=10',
        input: { boxAxisAngle: 0, boneSlope: 10 },
        expected: { adjustedAngle: 5 }, // Using 0.5 factor
    },
};

/**
 * Get sample calculation data for a specific tooth
 * Returns all data needed for implant calculation
 */
export function getSampleCalculationData(toothId: number) {
    const tooth = TOOTH_LIBRARY[toothId];
    if (!tooth) {
        throw new Error(`Tooth ${toothId} not found in library`);
    }

    const boneData = getBoneData(toothId);
    const nerveData = getNerveData(toothId);

    return {
        tooth,
        boneData,
        nerveData,
        // Derived boundaries for bounding box calculation
        mesialX: tooth.position.x - tooth.mesiodistalWidth / 2,
        distalX: tooth.position.x + tooth.mesiodistalWidth / 2,
    };
}
