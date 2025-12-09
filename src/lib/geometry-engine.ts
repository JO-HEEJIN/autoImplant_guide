/**
 * GeometryEngine - Core geometric calculations for implant positioning
 * Handles vector math, bounding box generation, and surface normal calculations
 */

import { Vector3, BoundingBox } from './types';
import { PRECISION } from './constants';

export class GeometryEngine {
    /**
     * Round a number to the specified precision
     */
    static round(value: number, decimals: number = PRECISION): number {
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
    }

    /**
     * Create a Vector3 with rounded values
     */
    static createVector(x: number, y: number, z: number): Vector3 {
        return {
            x: this.round(x),
            y: this.round(y),
            z: this.round(z),
        };
    }

    /**
     * Calculate the vector from point A to point B
     */
    static calculateVector(start: Vector3, end: Vector3): Vector3 {
        return this.createVector(
            end.x - start.x,
            end.y - start.y,
            end.z - start.z
        );
    }

    /**
     * Calculate the magnitude (length) of a vector
     */
    static magnitude(v: Vector3): number {
        return this.round(Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z));
    }

    /**
     * Normalize a vector to unit length
     */
    static normalize(v: Vector3): Vector3 {
        const mag = this.magnitude(v);
        if (mag === 0) return this.createVector(0, 0, 0);
        return this.createVector(v.x / mag, v.y / mag, v.z / mag);
    }

    /**
     * Scale a vector by a scalar value
     */
    static scale(v: Vector3, scalar: number): Vector3 {
        return this.createVector(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    /**
     * Add two vectors
     */
    static add(a: Vector3, b: Vector3): Vector3 {
        return this.createVector(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    /**
     * Subtract vector B from vector A
     */
    static subtract(a: Vector3, b: Vector3): Vector3 {
        return this.createVector(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    /**
     * Calculate dot product of two vectors
     */
    static dot(a: Vector3, b: Vector3): number {
        return this.round(a.x * b.x + a.y * b.y + a.z * b.z);
    }

    /**
     * Calculate cross product of two vectors
     */
    static cross(a: Vector3, b: Vector3): Vector3 {
        return this.createVector(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    /**
     * Calculate the midpoint between two points
     */
    static midpoint(a: Vector3, b: Vector3): Vector3 {
        return this.createVector(
            (a.x + b.x) / 2,
            (a.y + b.y) / 2,
            (a.z + b.z) / 2
        );
    }

    /**
     * Calculate distance between two points
     */
    static distance(a: Vector3, b: Vector3): number {
        return this.magnitude(this.calculateVector(a, b));
    }

    /**
     * Calculate angle between two vectors in degrees
     */
    static angleBetween(a: Vector3, b: Vector3): number {
        const dotProduct = this.dot(a, b);
        const magA = this.magnitude(a);
        const magB = this.magnitude(b);
        if (magA === 0 || magB === 0) return 0;
        const cosAngle = dotProduct / (magA * magB);
        // Clamp to [-1, 1] to avoid NaN from floating point errors
        const clampedCos = Math.max(-1, Math.min(1, cosAngle));
        return this.round((Math.acos(clampedCos) * 180) / Math.PI);
    }

    /**
     * Calculate bounding box from crest peak and nerve position
     * Box is defined by safety margins:
     * - Top: crestLevel - CREST_MARGIN
     * - Bottom: nerveLevel + SAFETY_MARGIN_NERVE
     * 
     * @param crestLevel Y-coordinate of bone crest
     * @param nerveLevel Y-coordinate of nerve canal
     * @param mesialX X-coordinate of mesial boundary
     * @param distalX X-coordinate of distal boundary
     * @param buccalZ Z-coordinate of buccal boundary
     * @param lingualZ Z-coordinate of lingual boundary
     * @param crestMargin Distance from crest to box top
     * @param nerveMargin Distance from nerve to box bottom
     */
    static calculateBoundingBox(
        crestLevel: number,
        nerveLevel: number,
        mesialX: number,
        distalX: number,
        buccalZ: number,
        lingualZ: number,
        crestMargin: number,
        nerveMargin: number
    ): BoundingBox {
        const boxTop = crestLevel - crestMargin;
        const boxBottom = nerveLevel + nerveMargin;

        const min: Vector3 = this.createVector(
            Math.min(mesialX, distalX),
            boxBottom,
            Math.min(buccalZ, lingualZ)
        );

        const max: Vector3 = this.createVector(
            Math.max(mesialX, distalX),
            boxTop,
            Math.max(buccalZ, lingualZ)
        );

        const center: Vector3 = this.midpoint(min, max);

        const dimensions: Vector3 = this.createVector(
            max.x - min.x,
            max.y - min.y,
            max.z - min.z
        );

        return { min, max, center, dimensions };
    }

    /**
     * Get surface normal at a point (simplified: returns vertical unit vector)
     * In a real implementation, this would calculate the actual surface normal
     */
    static getSurfaceNormal(point: Vector3): Vector3 {
        // Simplified: return vertical normal (pointing up)
        // Real implementation would calculate from mesh data
        return this.createVector(0, 1, 0);
    }
}
