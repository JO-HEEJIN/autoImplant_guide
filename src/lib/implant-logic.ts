/**
 * ImplantLogic - Core algorithm for implant positioning
 * Implements the "golden rules" that replace human intuition:
 * - 1.5mm safety margin from nerve
 * - 0.5mm lingual offset to protect buccal bone
 * - 60-70% diameter ratio based on available space
 */

import { Vector3, BoundingBox, ImplantSpec, BoneData } from './types';
import { GeometryEngine } from './geometry-engine';
import {
    SAFETY_MARGIN_NERVE,
    CREST_MARGIN,
    LINGUAL_OFFSET,
    DIAMETER_RATIO_DEFAULT,
    STANDARD_DIAMETERS,
    STANDARD_LENGTHS,
    DEFAULT_LINGUAL_VECTOR,
} from './constants';

export class ImplantLogic {
    /**
     * Calculate the safe implant length based on available space
     * Length = (BoxTop - NervePlane) - 1mm safety
     * 
     * @param boxTopY Top of bounding box (Y-coordinate)
     * @param nervePlaneY Nerve plane position (already includes safety margin in box)
     * @returns Recommended implant length rounded to nearest standard size
     */
    static determineLength(boxTopY: number, nervePlaneY: number): number {
        const availableSpace = boxTopY - nervePlaneY;
        const safeLength = availableSpace - 1; // Additional 1mm safety

        // Find the largest standard length that fits
        const validLengths = STANDARD_LENGTHS.filter(len => len <= safeLength);
        if (validLengths.length === 0) {
            return STANDARD_LENGTHS[0]; // Return minimum if nothing fits
        }
        return validLengths[validLengths.length - 1];
    }

    /**
     * Calculate the optimal implant diameter based on mesial-distal distance
     * Diameter = 60-70% of available width (default 65%)
     * 
     * @param mesiodistalDistance Distance between mesial and distal surfaces
     * @param ratio Ratio of distance to use (default 0.65)
     * @returns Recommended implant diameter rounded to nearest standard size
     */
    static determineDiameter(
        mesiodistalDistance: number,
        ratio: number = DIAMETER_RATIO_DEFAULT
    ): number {
        const idealDiameter = mesiodistalDistance * ratio;

        // Find the closest standard diameter
        let closestDiameter = STANDARD_DIAMETERS[0];
        let minDiff = Math.abs(idealDiameter - closestDiameter);

        for (const stdDiameter of STANDARD_DIAMETERS) {
            const diff = Math.abs(idealDiameter - stdDiameter);
            if (diff < minDiff) {
                minDiff = diff;
                closestDiameter = stdDiameter;
            }
        }

        return closestDiameter;
    }

    /**
     * Calculate the implant angulation based on box axis and bone slope
     * Combines the bounding box long axis with bone surface slope
     * 
     * @param boxAxis Direction vector of bounding box long axis
     * @param boneSlope Slope angle of bone surface in degrees
     * @param factor Weighting factor for bone slope influence (0-1)
     * @returns Implant angulation in degrees
     */
    static calculateAngulation(
        boxAxis: Vector3,
        boneSlope: number,
        factor: number = 0.5
    ): number {
        // Get angle of box axis from vertical
        const vertical: Vector3 = { x: 0, y: 1, z: 0 };
        const boxAngle = GeometryEngine.angleBetween(boxAxis, vertical);

        // Combine with bone slope using weighted average
        const combinedAngle = boxAngle + (boneSlope * factor);

        return GeometryEngine.round(combinedAngle);
    }

    /**
     * Apply the 0.5mm lingual offset to the center point
     * This is the "golden rule" - moving the implant toward the lingual side
     * prevents buccal bone destruction
     * 
     * @param centerPoint Original center point (box center)
     * @param lingualVector Direction vector pointing toward lingual side
     * @param offset Distance to move (default 0.5mm)
     * @returns New center point with lingual offset applied
     */
    static applyOffset(
        centerPoint: Vector3,
        lingualVector: Vector3 = DEFAULT_LINGUAL_VECTOR,
        offset: number = LINGUAL_OFFSET
    ): Vector3 {
        // Normalize the lingual vector and scale by offset
        const normalizedLingual = GeometryEngine.normalize(lingualVector);
        const offsetVector = GeometryEngine.scale(normalizedLingual, offset);

        // Add offset to center point
        return GeometryEngine.add(centerPoint, offsetVector);
    }

    /**
     * Calculate the complete implant specification
     * Combines all positioning logic into a single result
     * 
     * @param boundingBox Calculated bounding box for the implant site
     * @param boneData Bone surface data including slope and lingual direction
     * @returns Complete implant specification
     */
    static calculateImplantSpec(
        boundingBox: BoundingBox,
        boneData: BoneData
    ): ImplantSpec {
        // Calculate length from box dimensions
        const length = this.determineLength(
            boundingBox.max.y,
            boundingBox.min.y
        );

        // Calculate diameter from mesial-distal width
        const diameter = this.determineDiameter(boundingBox.dimensions.x);

        // Calculate angulation
        const boxAxis: Vector3 = { x: 0, y: 1, z: 0 }; // Simplified: vertical axis
        const angle = this.calculateAngulation(boxAxis, boneData.slope);

        // Apply lingual offset to get final position
        const position = this.applyOffset(
            boundingBox.center,
            boneData.lingualVector
        );

        // Direction vector (rotated from vertical by calculated angle)
        // Simplified: using vertical direction for MVP
        const direction = GeometryEngine.normalize({ x: 0, y: 1, z: 0 });

        return {
            length,
            diameter,
            angle,
            position,
            direction,
        };
    }

    /**
     * Full calculation pipeline from raw inputs to implant spec
     * 
     * @param crestLevel Bone crest Y-coordinate
     * @param nerveLevel Nerve canal Y-coordinate
     * @param mesialX Mesial boundary X-coordinate
     * @param distalX Distal boundary X-coordinate
     * @param buccalZ Buccal boundary Z-coordinate
     * @param lingualZ Lingual boundary Z-coordinate
     * @param boneSlope Bone surface slope in degrees
     */
    static calculateFromRawInput(
        crestLevel: number,
        nerveLevel: number,
        mesialX: number,
        distalX: number,
        buccalZ: number,
        lingualZ: number,
        boneSlope: number = 0
    ): { boundingBox: BoundingBox; implantSpec: ImplantSpec } {
        // Generate bounding box with safety margins
        const boundingBox = GeometryEngine.calculateBoundingBox(
            crestLevel,
            nerveLevel,
            mesialX,
            distalX,
            buccalZ,
            lingualZ,
            CREST_MARGIN,
            SAFETY_MARGIN_NERVE
        );

        // Bone data with lingual vector
        const boneData: BoneData = {
            crestLevel,
            slope: boneSlope,
            lingualVector: DEFAULT_LINGUAL_VECTOR,
        };

        // Calculate implant specification
        const implantSpec = this.calculateImplantSpec(boundingBox, boneData);

        return { boundingBox, implantSpec };
    }
}
