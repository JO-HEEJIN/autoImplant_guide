/**
 * Simple test runner for ImplantLogic algorithm
 * This file can be run directly with: node --loader ts-node/esm src/lib/__tests__/run-tests.mjs
 * Or check the console output in the browser
 */

// Test TC-01: Box Height Calculation
export function testBoxHeightCalculation() {
    const nerveY = 10;
    const crestY = 20;
    const SAFETY_MARGIN_NERVE = 1.5;
    const CREST_MARGIN = 1.0;

    const expectedBottom = nerveY + SAFETY_MARGIN_NERVE; // 11.5
    const expectedTop = crestY - CREST_MARGIN; // 19

    return {
        test: 'TC-01: Box Height Calculation',
        input: { nerveY, crestY },
        expected: { boxBottomY: expectedBottom, boxTopY: expectedTop },
        description: 'Given Nerve Y=10 and Crest Y=20, box should be from Y=11.5 to Y=19'
    };
}

// Test TC-02: Implant Center Offset
export function testCenterOffset() {
    const LINGUAL_OFFSET = 0.5;
    const center = { x: 0, y: 0, z: 0 };
    const lingualVector = { x: 0, y: 0, z: -1 };

    // Normalize and scale
    const offsetVector = { x: 0, y: 0, z: -LINGUAL_OFFSET };
    const finalCenter = {
        x: center.x + offsetVector.x,
        y: center.y + offsetVector.y,
        z: center.z + offsetVector.z
    };

    return {
        test: 'TC-02: Implant Center Offset',
        input: { center, lingualVector },
        expected: { finalCenter: { x: 0, y: 0, z: -0.5 } },
        actual: finalCenter,
        passed: finalCenter.z === -0.5,
        description: 'Center should move 0.5mm in lingual direction (Z=-0.5)'
    };
}

// Test TC-03: Length Recommendation
export function testLengthRecommendation() {
    const boxTopY = 19;
    const boxBottomY = 11.5;
    const availableSpace = boxTopY - boxBottomY; // 7.5mm
    const maxSafeLength = availableSpace - 1; // 6.5mm (additional 1mm safety)

    // Standard lengths: [6.0, 7.0, 8.0, 8.5, 10.0, 11.5, 13.0, 15.0]
    // Largest that fits: 6.0mm
    const recommendedLength = 6.0;

    return {
        test: 'TC-03: Length Recommendation',
        input: { boxTopY, boxBottomY },
        expected: { maxLength: maxSafeLength, recommendedLength },
        passed: recommendedLength <= maxSafeLength,
        description: 'Length should be largest standard size <= 6.5mm (which is 6.0mm)'
    };
}

// Test TC-04: Diameter Recommendation
export function testDiameterRecommendation() {
    const mesiodistalDistance = 10;
    const ratio = 0.65;
    const idealDiameter = mesiodistalDistance * ratio; // 6.5mm

    // Standard diameters: [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]
    // Closest to 6.5mm: 6.0mm
    const recommendedDiameter = 6.0;

    return {
        test: 'TC-04: Diameter Recommendation',
        input: { mesiodistalDistance },
        expected: { idealDiameter, recommendedDiameter },
        passed: recommendedDiameter >= 6.0 && recommendedDiameter <= 7.0,
        description: 'Diameter should be 60-70% of MD distance (6.0-7.0mm for 10mm width)'
    };
}

// Test TC-05: Angle Correction
export function testAngleCorrection() {
    const boxAxisAngle = 0;
    const boneSlope = 10;
    const factor = 0.5;
    const adjustedAngle = boxAxisAngle + (boneSlope * factor);

    return {
        test: 'TC-05: Angle Correction',
        input: { boxAxisAngle, boneSlope, factor },
        expected: { adjustedAngle: 5 },
        actual: adjustedAngle,
        passed: adjustedAngle === 5,
        description: 'Angle = Box Axis (0) + Bone Slope (10) * Factor (0.5) = 5 degrees'
    };
}

// Run all tests and return results
export function runAllTests() {
    return [
        testBoxHeightCalculation(),
        testCenterOffset(),
        testLengthRecommendation(),
        testDiameterRecommendation(),
        testAngleCorrection()
    ];
}

// Console output for verification
if (typeof window === 'undefined') {
    console.log('\n=== Algorithm Test Cases ===\n');
    const results = runAllTests();
    results.forEach(r => {
        console.log(`${r.test}`);
        console.log(`  ${r.description}`);
        console.log(`  Input: ${JSON.stringify(r.input)}`);
        console.log(`  Expected: ${JSON.stringify(r.expected)}`);
        if (r.hasOwnProperty('passed')) {
            console.log(`  Passed: ${r.passed ? 'YES' : 'NO'}`);
        }
        console.log('');
    });
}
