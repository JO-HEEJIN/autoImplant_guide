'use client';

/**
 * Main Application Page
 * AutoImplant Guide Web Visualizer
 * 
 * This page integrates all components:
 * - 3D Scene for visualization
 * - Tooth Selector for choosing implant site
 * - Step Indicator for algorithm visualization
 * - Specs Panel for displaying calculated values
 */

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ToothSelector } from '@/components/ToothSelector';
import { StepIndicator } from '@/components/StepIndicator';
import { SpecsPanel } from '@/components/SpecsPanel';
import { ToothNumber, BoundingBox, ImplantSpec, Vector3 } from '@/lib/types';
import { ImplantLogic } from '@/lib/implant-logic';
import { getSampleCalculationData, getNerveData } from '@/lib/mock-data';

// Dynamic import for Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-slate-800 rounded-xl flex items-center justify-center">
      <div className="text-slate-400">Loading 3D Scene...</div>
    </div>
  ),
});

export default function Home() {
  // State for selected tooth
  const [selectedTooth, setSelectedTooth] = useState<ToothNumber | null>(null);

  // State for algorithm step visualization
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Calculate implant data when tooth is selected
  const calculationData = useMemo(() => {
    if (!selectedTooth) return null;

    try {
      const sampleData = getSampleCalculationData(selectedTooth);
      const nerveData = getNerveData(selectedTooth);

      // Calculate bounding box and implant spec
      const result = ImplantLogic.calculateFromRawInput(
        sampleData.boneData.crestLevel,
        sampleData.boneData.nerveLevel,
        sampleData.mesialX,
        sampleData.distalX,
        sampleData.boneData.buccalZ,
        sampleData.boneData.lingualZ,
        sampleData.boneData.slope
      );

      return {
        boundingBox: result.boundingBox,
        implantSpec: result.implantSpec,
        nervePoints: nerveData?.points || null,
        safetyPlaneY: nerveData?.safetyPlaneY || null,
        toothPosition: sampleData.tooth.position,
      };
    } catch (error) {
      console.error('Error calculating implant data:', error);
      return null;
    }
  }, [selectedTooth]);

  // Handle tooth selection
  const handleSelectTooth = useCallback((tooth: ToothNumber) => {
    setSelectedTooth(tooth);
    setCurrentStep(2); // Auto-advance to step 2 when tooth is selected
  }, []);

  // Handle step change
  const handleStepChange = useCallback((step: number) => {
    if (selectedTooth) {
      setCurrentStep(step);
    }
  }, [selectedTooth]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                AutoImplant Guide
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Geometric Algorithm-Based Implant Positioning System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-500">Version</div>
                <div className="text-sm text-slate-300 font-mono">MVP 1.0</div>
              </div>
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-600">
                <Image src="/logo.jpg" alt="AI Model Logo" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ToothSelector
              selectedTooth={selectedTooth}
              onSelectTooth={handleSelectTooth}
            />
            <StepIndicator
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </div>

          {/* Main 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">3D Visualization</h2>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Live Preview</span>
                </div>
              </div>
              <Scene
                boundingBox={calculationData?.boundingBox || null}
                implantSpec={calculationData?.implantSpec || null}
                nervePoints={calculationData?.nervePoints || null}
                safetyPlaneY={calculationData?.safetyPlaneY || null}
                currentStep={currentStep}
                toothPosition={calculationData?.toothPosition || null}
              />
              <div className="mt-4 text-xs text-slate-500 text-center">
                Drag to rotate | Scroll to zoom | Right-click to pan
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SpecsPanel
              implantSpec={calculationData?.implantSpec || null}
              boundingBox={calculationData?.boundingBox || null}
            />

            {/* Golden Rule Reminder */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-yellow-400 mb-2">Golden Rule</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The implant is positioned <span className="text-yellow-400 font-bold">0.5mm toward the lingual side</span> from the center of the bounding box. This protects the buccal bone and achieves a 99% success rate.
              </p>
            </div>

            {/* Legend */}
            <div className="bg-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Visualization Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#e8d5b7] rounded"></div>
                  <span className="text-slate-300">Bone Structure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#ff3333] rounded"></div>
                  <span className="text-slate-300">Nerve Canal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#ffcc00] rounded opacity-50"></div>
                  <span className="text-slate-300">Safety Plane</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#00ff00] rounded"></div>
                  <span className="text-slate-300">Bounding Box</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#4a90d9] rounded"></div>
                  <span className="text-slate-300">Implant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#ff00ff] rounded"></div>
                  <span className="text-slate-300">Offset Indicator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-8 py-4">
        <div className="max-w-screen-2xl mx-auto px-6 text-center text-xs text-slate-500">
          AutoImplant Guide Web Visualizer - For educational and demonstration purposes only
        </div>
      </footer>
    </main>
  );
}
