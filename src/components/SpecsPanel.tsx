'use client';

/**
 * Specs Panel Component
 * Displays calculated implant specifications
 */

import { ImplantSpec, BoundingBox } from '@/lib/types';
import { SAFETY_MARGIN_NERVE, LINGUAL_OFFSET, CREST_MARGIN } from '@/lib/constants';

interface SpecsPanelProps {
    implantSpec: ImplantSpec | null;
    boundingBox: BoundingBox | null;
}

export function SpecsPanel({ implantSpec, boundingBox }: SpecsPanelProps) {
    if (!implantSpec || !boundingBox) {
        return (
            <div className="bg-slate-800 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Implant Specifications</h3>
                <p className="text-sm text-slate-400">Select a tooth to see calculated specifications</p>
            </div>
        );
    }

    const specs = [
        { label: 'Length', value: `${implantSpec.length.toFixed(1)} mm`, color: 'text-blue-400' },
        { label: 'Diameter', value: `${implantSpec.diameter.toFixed(1)} mm`, color: 'text-green-400' },
        { label: 'Angulation', value: `${implantSpec.angle.toFixed(1)}`, color: 'text-yellow-400' },
    ];

    const position = [
        { label: 'X (M-D)', value: implantSpec.position.x.toFixed(2) },
        { label: 'Y (O-A)', value: implantSpec.position.y.toFixed(2) },
        { label: 'Z (B-L)', value: implantSpec.position.z.toFixed(2) },
    ];

    const safetyInfo = [
        { label: 'Nerve Margin', value: `${SAFETY_MARGIN_NERVE} mm`, icon: '!' },
        { label: 'Lingual Offset', value: `${LINGUAL_OFFSET} mm`, icon: '<-' },
        { label: 'Crest Margin', value: `${CREST_MARGIN} mm`, icon: '^' },
    ];

    return (
        <div className="bg-slate-800 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Implant Specifications</h3>

            {/* Main specs */}
            <div className="space-y-2">
                {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">{spec.label}</span>
                        <span className={`text-lg font-bold ${spec.color}`}>{spec.value}</span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700" />

            {/* Position coordinates */}
            <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Golden Position</h4>
                <div className="grid grid-cols-3 gap-2">
                    {position.map((pos) => (
                        <div key={pos.label} className="text-center bg-slate-700 rounded-md p-2">
                            <div className="text-xs text-slate-400">{pos.label}</div>
                            <div className="text-sm font-mono text-white">{pos.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700" />

            {/* Safety margins */}
            <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Safety Rules Applied</h4>
                <div className="space-y-1">
                    {safetyInfo.map((info) => (
                        <div key={info.label} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">
                                <span className="inline-block w-5 text-center text-yellow-400">{info.icon}</span>
                                {info.label}
                            </span>
                            <span className="text-slate-300 font-mono">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bounding box info */}
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <h4 className="text-xs font-medium text-slate-400 mb-1">Bounding Box Dimensions</h4>
                <div className="text-xs text-slate-300 font-mono">
                    {boundingBox.dimensions.x.toFixed(1)} x {boundingBox.dimensions.y.toFixed(1)} x {boundingBox.dimensions.z.toFixed(1)} mm
                </div>
            </div>
        </div>
    );
}
