'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function EcoFriendlyTechnologyPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const setRef = (idx: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[idx] = el;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[560px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#1a2a1e] to-[#191919]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full bg-teal-500/8 blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-[#DC0043]/8 blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
                </svg>
              </div>
              <p className="text-teal-400 font-bold text-sm tracking-widest uppercase">
                Story of Sustainability
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Eco-friendly<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#DC0043]">Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Pioneering hot runner solutions that deliver exceptional performance
              while dramatically reducing environmental impact across the plastics industry.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#505050]">
            <Link href="/en" className="hover:text-[#DC0043] transition-colors">Home</Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>Story of Sustainability</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[#DC0043] font-medium">Eco-friendly Technology</span>
          </nav>
        </div>
      </div>

      {/* Technology Overview Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(0)} className="section-animate">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">Technology Overview</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6 leading-tight">
                  Smarter Manufacturing, Greener Results
                </h2>
                <p className="text-[#505050] text-lg leading-relaxed mb-6">
                  YUDO&apos;s eco-friendly hot runner technology represents a paradigm shift in injection molding. By maintaining precise temperature control throughout the molding process, our systems eliminate the need for cold runners — the single largest source of plastic waste in traditional molding.
                </p>
                <p className="text-[#505050] leading-relaxed mb-8">
                  Our advanced systems integrate intelligent controls, energy-efficient heating elements, and optimized flow channels that work together to deliver superior part quality with minimal environmental footprint.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Zero Waste', 'Energy Smart', 'Precision Control', 'Long Lifespan'].map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-3xl p-8 md:p-10">
                  <div className="space-y-4">
                    {[
                      { label: 'Material Efficiency', value: 98, color: 'bg-teal-500' },
                      { label: 'Energy Efficiency', value: 92, color: 'bg-emerald-500' },
                      { label: 'Cycle Time Reduction', value: 85, color: 'bg-[#DC0043]' },
                      { label: 'System Longevity', value: 95, color: 'bg-teal-600' },
                    ].map((bar, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-[#191919]">{bar.label}</span>
                          <span className="text-sm font-bold text-[#191919]">{bar.value}%</span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                          <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-[#f8fafa]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(1)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">Benefits</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                Why Eco-friendly Hot Runners?
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                YUDO hot runners deliver measurable benefits across environmental, economic, and operational dimensions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20" /><path d="M2 5h20" /><path d="m5 2 7 5 7-5" /><path d="m5 22 7-5 7 5" />
                    </svg>
                  ),
                  title: 'Zero Runner Waste',
                  description: 'Hot runner technology keeps material in a molten state, eliminating cold runner scrap entirely and reducing total material consumption by up to 40%.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: 'Lower Energy Consumption',
                  description: 'Optimized heating zones and intelligent temperature control reduce energy usage per cycle by 20-30%, lowering both costs and carbon emissions.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                  ),
                  title: 'Faster Cycle Times',
                  description: 'Eliminating runner cooling time and reducing mold open time accelerates production cycles by up to 35%, meaning fewer machine hours for the same output.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
                    </svg>
                  ),
                  title: 'Reduced Carbon Footprint',
                  description: 'Less material, less energy, and fewer cycles combine to dramatically cut the carbon footprint of every plastic part produced.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                  title: 'Superior Part Quality',
                  description: 'Consistent melt temperature and balanced fill ensure fewer defects and rejects, reducing waste from quality control failures.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
                    </svg>
                  ),
                  title: 'Extended System Life',
                  description: 'Durable materials and modular architecture mean longer service life with easy maintenance, reducing replacement waste over decades.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#191919] mb-3">{item.title}</h3>
                  <p className="text-[#505050] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(2)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-4">How It Works</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                The Science Behind the Sustainability
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                Understanding how YUDO hot runners achieve unmatched sustainability through precision engineering.
              </p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-[#DC0043]/30 -translate-y-1/2" />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { step: '01', title: 'Precision Heating', desc: 'Individual heating zones maintain exact temperatures throughout the manifold, ensuring optimal melt flow without degradation.' },
                  { step: '02', title: 'Balanced Flow', desc: 'Rheologically balanced runner channels ensure uniform fill across all cavities, eliminating short shots and overpacking.' },
                  { step: '03', title: 'Valve Gate Control', desc: 'Servo-driven valve gates provide microsecond-level control over material flow, reducing waste to near zero.' },
                  { step: '04', title: 'Smart Monitoring', desc: 'Real-time sensors track temperature, pressure, and flow — automatically optimizing parameters for maximum efficiency.' },
                ].map((item, idx) => (
                  <div key={idx} className="relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center lg:text-left">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg shadow-teal-500/20">
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#191919] mb-3">{item.title}</h3>
                    <p className="text-[#505050] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 md:py-28 bg-[#191919] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-teal-500/5 blur-[150px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div ref={setRef(3)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-teal-400 font-bold text-sm tracking-widest uppercase mb-4">Impact Stats</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Numbers That Matter
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: '40%', label: 'Reduction in Material Waste', sub: 'vs. cold runner systems' },
                { number: '25%', label: 'Energy Savings Per Cycle', sub: 'through smart controls' },
                { number: '35%', label: 'Faster Production Cycles', sub: 'shorter cycle times' },
                { number: '50M+', label: 'kg Plastic Waste Prevented', sub: 'since program inception' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-3">{stat.number}</p>
                  <p className="text-white font-medium mb-1">{stat.label}</p>
                  <p className="text-white/40 text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-teal-50 via-white to-teal-50/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(4)} className="section-animate">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
                Explore Our Sustainability Initiatives
              </h2>
              <p className="text-[#505050] text-lg max-w-2xl mx-auto">
                Discover how YUDO is building a more sustainable future for the plastics industry.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { href: '/en/sustainability/sustainable-plastics', title: 'Sustainable Plastics', desc: 'Making plastics part of the solution for a greener world.' },
                { href: '/en/sustainability/green-energy', title: 'Green Energy', desc: 'Powering our operations with renewable energy sources.' },
                { href: '/en/sustainability/recycled-plastic', title: '100% Recycled Plastic', desc: 'Closing the loop with fully recycled material solutions.' },
              ].map((link, idx) => (
                <Link key={idx} href={link.href} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#DC0043]/20 transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#191919] mb-2 group-hover:text-[#DC0043] transition-colors">{link.title}</h3>
                  <p className="text-sm text-[#505050] mb-4">{link.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC0043]">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
