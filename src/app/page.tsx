'use client';

/**
 * Landing Page
 * E=mc² Biotech Business Presentation
 */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
    {
        id: 1,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 01',
        image: '/slides/01.jpeg',
        alt: 'Business Presentation Slide 1',
    },
    {
        id: 2,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 02',
        image: '/slides/02.jpeg',
        alt: 'Business Presentation Slide 2',
    },
    {
        id: 3,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 03',
        image: '/slides/03.jpeg',
        alt: 'Business Presentation Slide 3',
    },
    {
        id: 4,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 04',
        image: '/slides/04.jpeg',
        alt: 'Business Presentation Slide 4',
    },
    {
        id: 5,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 05',
        image: '/slides/05.jpeg',
        alt: 'Business Presentation Slide 5',
    },
    {
        id: 6,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 06',
        image: '/slides/06.jpeg',
        alt: 'Business Presentation Slide 6',
    },
    {
        id: 7,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 07',
        image: '/slides/07.jpeg',
        alt: 'Business Presentation Slide 7',
    },
    {
        id: 8,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 08',
        image: '/slides/08.jpeg',
        alt: 'Business Presentation Slide 8',
    },
    {
        id: 9,
        title: 'E=mc² Biotech',
        subtitle: 'PAGE 09',
        image: '/slides/09.jpeg',
        alt: 'Business Presentation Slide 9',
    },
];

export default function LandingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
            {/* Header */}
            <header className="w-full py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                        <Image src="/logo.jpg" alt="E=mc2 Biotech Logo" fill className="object-cover" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-xl">E=mc² Biotech</h1>
                        <p className="text-blue-300 text-xs">Automated Implant Guide Design</p>
                    </div>
                </div>
                <Link
                    href="/main"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50"
                >
                    View Demo
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                {/* Slide Container */}
                <div className="w-full max-w-6xl mx-auto">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <p className="text-blue-400 text-sm font-semibold mb-2 tracking-wider uppercase">
                            {slides[currentSlide].subtitle}
                        </p>
                        <h2 className="text-white text-3xl md:text-4xl font-bold">
                            {slides[currentSlide].title}
                        </h2>
                    </div>

                    {/* Image Viewer */}
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-2xl border border-white/10">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Slide Image */}
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].alt}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Slide Indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                        ? 'bg-blue-500 w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-12">
                        <p className="text-gray-300 mb-6 text-lg">
                            Experience the Automated Implant Guide Design System
                        </p>
                        <Link
                            href="/main"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-blue-500/50 hover:scale-105"
                        >
                            <span>Try 3D Demo</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 px-8 bg-black/30 backdrop-blur-sm border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Company Info */}
                        <div className="text-left">
                            <h3 className="text-white font-bold text-lg mb-3">E=mc² Biotech</h3>
                            <p className="text-gray-400 text-sm mb-2">Automated Implant Guide Design</p>
                        </div>

                        {/* Contact Info */}
                        <div className="text-left md:text-right">
                            <div className="text-gray-400 text-sm space-y-1">
                                <p><span className="text-gray-500">CEO:</span> Eun Park</p>
                                <p><span className="text-gray-500">Email:</span> <a href="mailto:ekpark@emc2-biotech.com" className="hover:text-blue-400 transition-colors">ekpark@emc2-biotech.com</a></p>
                                <p><span className="text-gray-500">Phone:</span> <a href="tel:+16504000800" className="hover:text-blue-400 transition-colors">+1 650-400-0800</a></p>
                                <p><span className="text-gray-500">Address:</span> 1055 Stewart Dr, #113, Sunnyvale, CA 94085</p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/10 pt-4 text-center">
                        <p className="text-gray-400 text-sm">© 2025 E=mc² Biotech. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
