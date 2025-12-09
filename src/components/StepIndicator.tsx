'use client';

/**
 * Step Indicator Component
 * Shows the algorithm steps and current progress
 */

import { VisualizationStep } from '@/lib/types';

interface StepIndicatorProps {
    currentStep: number;
    onStepChange: (step: number) => void;
}

const ALGORITHM_STEPS: VisualizationStep[] = [
    {
        id: 1,
        name: 'Select Tooth',
        description: 'Choose the tooth position for implant placement',
        isActive: true,
    },
    {
        id: 2,
        name: 'Detect Nerve',
        description: 'Identify the inferior alveolar nerve canal',
        isActive: false,
    },
    {
        id: 3,
        name: 'Set Safety Plane',
        description: 'Apply 1.5mm safety margin from nerve',
        isActive: false,
    },
    {
        id: 4,
        name: 'Generate Bounding Box',
        description: 'Calculate the safe implant zone',
        isActive: false,
    },
    {
        id: 5,
        name: 'Apply Lingual Offset',
        description: 'Shift 0.5mm toward lingual side (Golden Rule)',
        isActive: false,
    },
    {
        id: 6,
        name: 'Calculate Specs',
        description: 'Determine optimal length, diameter, and angle',
        isActive: false,
    },
];

export function StepIndicator({ currentStep, onStepChange }: StepIndicatorProps) {
    return (
        <div className="bg-slate-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Algorithm Steps</h3>

            <div className="space-y-3">
                {ALGORITHM_STEPS.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const isLocked = currentStep < step.id;

                    return (
                        <button
                            key={step.id}
                            onClick={() => !isLocked && onStepChange(step.id)}
                            disabled={isLocked}
                            className={`
                w-full text-left p-3 rounded-lg transition-all duration-200
                ${isCurrent
                                    ? 'bg-blue-600/30 border border-blue-500'
                                    : isCompleted
                                        ? 'bg-green-600/20 border border-green-500/50 hover:bg-green-600/30'
                                        : 'bg-slate-700/50 border border-slate-600 opacity-50 cursor-not-allowed'
                                }
              `}
                        >
                            <div className="flex items-center gap-3">
                                {/* Step number indicator */}
                                <div className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                  ${isCurrent
                                        ? 'bg-blue-500 text-white'
                                        : isCompleted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-slate-600 text-slate-400'
                                    }
                `}>
                                    {isCompleted ? '*' : step.id}
                                </div>

                                <div className="flex-1">
                                    <div className={`font-medium ${isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-slate-400'}`}>
                                        {step.name}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-0.5">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Step controls */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onStepChange(Math.max(1, currentStep - 1))}
                    disabled={currentStep <= 1}
                    className="flex-1 py-2 px-4 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={() => onStepChange(Math.min(6, currentStep + 1))}
                    disabled={currentStep >= 6}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>

            {/* Auto-run all steps */}
            <button
                onClick={() => onStepChange(6)}
                className="w-full mt-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
                Run All Steps
            </button>
        </div>
    );
}
