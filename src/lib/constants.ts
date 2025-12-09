/**
 * Constants for implant positioning calculations
 * These are the core "golden rules" that replace human intuition
 */

// Safety Margins (mm)
export const SAFETY_MARGIN_NERVE = 1.5;  // Minimum distance from nerve canal
export const CREST_MARGIN = 1.0;          // Distance from bone crest to implant top
export const LINGUAL_OFFSET = 0.5;        // Offset toward lingual side to protect buccal bone

// Sizing Ratios
export const DIAMETER_RATIO_MIN = 0.60;   // Minimum: 60% of mesial-distal distance
export const DIAMETER_RATIO_MAX = 0.70;   // Maximum: 70% of mesial-distal distance
export const DIAMETER_RATIO_DEFAULT = 0.65; // Default: 65%

// Standard Implant Sizes (mm)
export const STANDARD_DIAMETERS = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
export const STANDARD_LENGTHS = [6.0, 7.0, 8.0, 8.5, 10.0, 11.5, 13.0, 15.0];

// Visualization Colors
export const COLORS = {
    bone: '#e8d5b7',
    nerve: '#ff3333',
    boundingBox: '#00ff00',
    implant: '#4a90d9',
    safetyPlane: '#ffcc00',
    offset: '#ff00ff',
} as const;

// Coordinate System Reference
// X-axis: Mesial-Distal direction (positive = distal)
// Y-axis: Vertical/Occlusal-Apical (positive = occlusal/up)
// Z-axis: Buccal-Lingual direction (positive = buccal, negative = lingual)

// Default lingual direction vector (points toward lingual side)
export const DEFAULT_LINGUAL_VECTOR = { x: 0, y: 0, z: -1 };

// Calculation precision (decimal places)
export const PRECISION = 3;
