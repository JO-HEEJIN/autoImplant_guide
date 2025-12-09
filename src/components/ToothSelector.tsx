'use client';

/**
 * Tooth Selector Component
 * Interactive FDI notation tooth selector (11-48)
 */

import { ToothNumber } from '@/lib/types';
import { TOOTH_LIBRARY } from '@/lib/mock-data';

interface ToothSelectorProps {
    selectedTooth: ToothNumber | null;
    onSelectTooth: (tooth: ToothNumber) => void;
}

// FDI notation quadrants
const QUADRANTS = {
    upperRight: [18, 17, 16, 15, 14, 13, 12, 11] as ToothNumber[],
    upperLeft: [21, 22, 23, 24, 25, 26, 27, 28] as ToothNumber[],
    lowerLeft: [38, 37, 36, 35, 34, 33, 32, 31] as ToothNumber[],
    lowerRight: [41, 42, 43, 44, 45, 46, 47, 48] as ToothNumber[],
};

export function ToothSelector({ selectedTooth, onSelectTooth }: ToothSelectorProps) {
    const renderToothButton = (toothNum: ToothNumber) => {
        const isSelected = selectedTooth === toothNum;
        const tooth = TOOTH_LIBRARY[toothNum];
        const isLower = toothNum >= 31;

        return (
            <button
                key={toothNum}
                onClick={() => onSelectTooth(toothNum)}
                className={`
          w-9 h-9 text-xs font-medium rounded-md transition-all duration-200
          ${isSelected
                        ? 'bg-blue-500 text-white shadow-lg scale-110'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                    }
          ${isLower ? 'border-t-2 border-slate-500' : 'border-b-2 border-slate-500'}
        `}
                title={tooth?.name || `Tooth ${toothNum}`}
            >
                {toothNum}
            </button>
        );
    };

    return (
        <div className="bg-slate-800 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Select Tooth</h3>
            <p className="text-sm text-slate-400">FDI Notation (click to select)</p>

            <div className="space-y-2">
                {/* Upper jaw */}
                <div className="flex gap-1 justify-center">
                    {QUADRANTS.upperRight.map(renderToothButton)}
                    <div className="w-2" />
                    {QUADRANTS.upperLeft.map(renderToothButton)}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-600 my-2" />

                {/* Lower jaw */}
                <div className="flex gap-1 justify-center">
                    {QUADRANTS.lowerRight.map(renderToothButton)}
                    <div className="w-2" />
                    {QUADRANTS.lowerLeft.map(renderToothButton)}
                </div>
            </div>

            {/* Selected tooth info */}
            {selectedTooth && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                    <p className="text-sm text-slate-300">
                        <span className="text-white font-medium">#{selectedTooth}</span>
                        {' - '}
                        {TOOTH_LIBRARY[selectedTooth]?.name || 'Unknown Tooth'}
                    </p>
                </div>
            )}
        </div>
    );
}
