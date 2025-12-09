/**
 * Test file for ImplantLogic algorithm
 * Run with: npx ts-node --esm src/lib/__tests__/implant-logic.test.ts
 * Or simply import and run in Node.js
 */

import { GeometryEngine } from '../geometry-engine';
import { ImplantLogic } from '../implant-logic';
import { SAFETY_MARGIN_NERVE, CREST_MARGIN, LINGUAL_OFFSET } from '../constants';

// Color codes for console output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => boolean) {
    try {
        const result = fn();
        if (result) {
            console.log(`${GREEN}PASS${RESET}: ${name}`);
            passed++;
        } else {
            console.log(`${RED}FAIL${RESET}: ${name}`);
            failed++;
        }
    } catch (error) {
        console.log(`${RED}FAIL${RESET}: ${name} - ${error}`);
        failed++;
    }
}

function assertEquals(actual: number, expected: number, tolerance = 0.01): boolean {
    return Math.abs(actual - expected) < tolerance;
}

console.log('\n=== ImplantLogic Algorithm Tests ===\n');

// TC-01: Box Height Calculation
// Input: Nerve Y=10, Crest Y=20
// Expected: Box Bottom Y=11.5 (10+1.5), Box Top Y=19 (20-1)
test('TC-01: Box height calculation', () => {
    const nerveY = 10;
    const crestY = 20;

    const box = GeometryEngine.calculateBoundingBox(
        crestY,      // crestLevel
        nerveY,      // nerveLevel
        -5, 5,       // mesialX, distalX
        5, -5,       // buccalZ, lingualZ
        CREST_MARGIN,
        SAFETY_MARGIN_NERVE
    );

    const expectedBottom = nerveY + SAFETY_MARGIN_NERVE; // 11.5
    const expectedTop = crestY - CREST_MARGIN; // 19

    console.log(`  Box Bottom: ${box.min.y} (expected: ${expectedBottom})`);
    console.log(`  Box Top: ${box.max.y} (expected: ${expectedTop})`);

    return assertEquals(box.min.y, expectedBottom) && assertEquals(box.max.y, expectedTop);
});

// TC-02: Implant Center Offset
// Input: Box Center=(0,0,0), Lingual Vector=(0,0,-1)
// Expected: Final Center=(0, 0, -0.5)
test('TC-02: Implant center offset (0.5mm lingual)', () => {
    const center = { x: 0, y: 0, z: 0 };
    const lingualVector = { x: 0, y: 0, z: -1 };

    const finalCenter = ImplantLogic.applyOffset(center, lingualVector, LINGUAL_OFFSET);

    console.log(`  Final Center Z: ${finalCenter.z} (expected: -0.5)`);

    return assertEquals(finalCenter.x, 0) &&
        assertEquals(finalCenter.y, 0) &&
        assertEquals(finalCenter.z, -0.5);
});

// TC-03: Length Recommendation
// Input: Box Top Y=19, Nerve Y=10
// Available space = 19 - 11.5 = 7.5mm
// With 1mm additional safety = 6.5mm max
// Expected: Length <= 7.5mm (should return closest standard size: 6.0mm)
test('TC-03: Length recommendation with safety margin', () => {
    const boxTopY = 19;
    const boxBottomY = 11.5; // Already includes nerve safety margin

    const length = ImplantLogic.determineLength(boxTopY, boxBottomY);
    const availableSpace = boxTopY - boxBottomY; // 7.5mm
    const maxSafeLength = availableSpace - 1; // 6.5mm (additional 1mm safety)

    console.log(`  Available Space: ${availableSpace}mm`);
    console.log(`  Max Safe Length: ${maxSafeLength}mm`);
    console.log(`  Recommended Length: ${length}mm (should be <= ${maxSafeLength})`);

    return length <= maxSafeLength;
});

// TC-04: Diameter Recommendation
// Input: Mesial-Distal distance = 10mm
// Expected: Diameter = 60-70% = 6.0mm to 7.0mm
test('TC-04: Diameter recommendation (65% of MD distance)', () => {
    const mesiodistalDistance = 10;

    const diameter = ImplantLogic.determineDiameter(mesiodistalDistance);

    const minExpected = mesiodistalDistance * 0.60; // 6.0
    const maxExpected = mesiodistalDistance * 0.70; // 7.0

    console.log(`  MD Distance: ${mesiodistalDistance}mm`);
    console.log(`  Recommended Diameter: ${diameter}mm`);
    console.log(`  Expected Range: ${minExpected}mm - ${maxExpected}mm`);

    return diameter >= minExpected && diameter <= maxExpected;
});

// TC-05: Angle Calculation
// Input: Box Axis = 0 degrees (vertical), Bone Slope = 10 degrees
// Expected: Combined angle with 0.5 factor = 5 degrees
test('TC-05: Angle correction with bone slope', () => {
    const boxAxis = { x: 0, y: 1, z: 0 }; // Vertical
    const boneSlope = 10;
    const factor = 0.5;

    const angle = ImplantLogic.calculateAngulation(boxAxis, boneSlope, factor);

    // Box axis is vertical (0 degrees from vertical)
    // Adding 50% of bone slope = 0 + (10 * 0.5) = 5 degrees
    const expectedAngle = 0 + (boneSlope * factor);

    console.log(`  Bone Slope: ${boneSlope} degrees`);
    console.log(`  Factor: ${factor}`);
    console.log(`  Calculated Angle: ${angle} degrees`);
    console.log(`  Expected Angle: ${expectedAngle} degrees`);

    return assertEquals(angle, expectedAngle, 0.5);
});

// Additional Test: Full Pipeline
test('TC-06: Full calculation pipeline', () => {
    const result = ImplantLogic.calculateFromRawInput(
        20,   // crestLevel
        10,   // nerveLevel
        -5,   // mesialX
        5,    // distalX
        5,    // buccalZ
        -5,   // lingualZ
        5     // boneSlope
    );

    console.log(`  Bounding Box Dimensions: ${result.boundingBox.dimensions.x}x${result.boundingBox.dimensions.y}x${result.boundingBox.dimensions.z}`);
    console.log(`  Implant Position: (${result.implantSpec.position.x}, ${result.implantSpec.position.y}, ${result.implantSpec.position.z})`);
    console.log(`  Implant Length: ${result.implantSpec.length}mm`);
    console.log(`  Implant Diameter: ${result.implantSpec.diameter}mm`);
    console.log(`  Implant Angle: ${result.implantSpec.angle} degrees`);

    // Verify lingual offset was applied (z should be negative)
    const hasLingualOffset = result.implantSpec.position.z < result.boundingBox.center.z;

    return hasLingualOffset &&
        result.implantSpec.length > 0 &&
        result.implantSpec.diameter > 0;
});

// Vector Math Tests
test('TC-07: Vector normalization', () => {
    const v = { x: 3, y: 0, z: 4 };
    const normalized = GeometryEngine.normalize(v);
    const magnitude = GeometryEngine.magnitude(normalized);

    console.log(`  Original: (${v.x}, ${v.y}, ${v.z})`);
    console.log(`  Normalized: (${normalized.x}, ${normalized.y}, ${normalized.z})`);
    console.log(`  Magnitude: ${magnitude} (expected: 1.0)`);

    return assertEquals(magnitude, 1.0);
});

test('TC-08: Vector addition', () => {
    const a = { x: 1, y: 2, z: 3 };
    const b = { x: 4, y: 5, z: 6 };
    const result = GeometryEngine.add(a, b);

    return assertEquals(result.x, 5) &&
        assertEquals(result.y, 7) &&
        assertEquals(result.z, 9);
});

test('TC-09: Distance calculation', () => {
    const a = { x: 0, y: 0, z: 0 };
    const b = { x: 3, y: 4, z: 0 };
    const distance = GeometryEngine.distance(a, b);

    console.log(`  Distance: ${distance} (expected: 5.0)`);

    return assertEquals(distance, 5.0);
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`${GREEN}Passed${RESET}: ${passed}`);
console.log(`${RED}Failed${RESET}: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
    process.exit(1);
}
