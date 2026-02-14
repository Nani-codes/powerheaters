'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function GreenEnergyPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#1a2520] to-[#191919]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-yellow-500/6 blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-emerald-500/8 blur-[120px]" />
          <div className="absolute top-1/2 right-1/5 w-60 h-60 rounded-full bg-[#DC0043]/6 blur-[100px]" />
        </div>
        {/* Sun rays pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'conic-gradient(from 0deg, transparent 0deg, #fff 1deg, transparent 2deg)', backgroundSize: '100% 100%', backgroundPosition: 'center top' }} />
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </div>
              <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase">
                Story of Sustainability
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Green<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-emerald-400 to-[#DC0043]">Energy</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Powering our global operations with renewable energy and driving
              the plastics industry toward a carbon-neutral future.
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
            <span className="text-[#DC0043] font-medium">Green Energy</span>
          </nav>
        </div>
      </div>

      {/* Solar Panels Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(0)} className="section-animate">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-yellow-600 font-bold text-sm tracking-widest uppercase mb-4">Solar Power</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6 leading-tight">
                  Harnessing the Power of the Sun
                </h2>
                <p className="text-[#505050] text-lg leading-relaxed mb-6">
                  YUDO has invested heavily in solar energy infrastructure across our global manufacturing facilities. Our rooftop and ground-mounted photovoltaic arrays generate clean electricity that powers our production lines, offices, and research laboratories.
                </p>
                <p className="text-[#505050] leading-relaxed mb-8">
                  By 2025, solar energy will account for over 40% of our total energy consumption, and we&apos;re on track to reach 70% by 2030. This commitment not only reduces our carbon footprint but also insulates our operations from volatile fossil fuel prices.
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-yellow-600">12</p>
                    <p className="text-sm text-[#505050] mt-1">MW Installed</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-yellow-600">8</p>
                    <p className="text-sm text-[#505050] mt-1">Facilities Equipped</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-yellow-600">40%</p>
                    <p className="text-sm text-[#505050] mt-1">Energy from Solar</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-yellow-400/10 blur-[40px]" />
                  {/* Sun icon large */}
                  <div className="relative flex items-center justify-center py-8">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-2xl shadow-yellow-400/30">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    </div>
                  </div>
                  {/* Solar panel grid visual */}
                  <div className="grid grid-cols-4 gap-2 mt-6">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="h-12 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 border border-blue-500/30 shadow-sm" />
                    ))}
                  </div>
                  <p className="text-center text-sm text-[#505050] mt-4 font-medium">Photovoltaic Array Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Efficiency Section */}
      <section className="py-20 md:py-28 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(1)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">Energy Efficiency</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                Doing More With Less
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                Beyond renewable generation, we&apos;re continuously optimizing every aspect of our energy usage to maximize efficiency and minimize waste.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h.01" /><path d="M10 12h.01" /><path d="M14 12h.01" /><path d="M18 12h.01" />
                    </svg>
                  ),
                  title: 'Smart Building Systems',
                  description: 'AI-powered HVAC and lighting systems that adapt in real-time to occupancy, weather, and production schedules — cutting building energy use by 30%.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: 'High-Efficiency Equipment',
                  description: 'Next-generation injection molding machines and hot runner systems that deliver the same output with up to 40% less energy input.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                    </svg>
                  ),
                  title: 'Heat Recovery Systems',
                  description: 'Capturing waste heat from manufacturing processes and redirecting it to facility heating, preheating water, and supporting adjacent operations.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                  title: 'Real-Time Energy Monitoring',
                  description: 'Comprehensive energy management systems that monitor consumption at every level, identifying waste and optimization opportunities instantly.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20" /><path d="M2 5h20" /><path d="m5 2 7 5 7-5" /><path d="m5 22 7-5 7 5" />
                    </svg>
                  ),
                  title: 'LED & Natural Lighting',
                  description: 'Complete transition to LED lighting augmented by skylights and light tubes, reducing lighting energy costs by 60% across all facilities.',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                    </svg>
                  ),
                  title: 'Employee Engagement',
                  description: 'Company-wide energy awareness programs that empower employees to contribute to efficiency goals through daily habits and innovation.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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

      {/* Carbon Reduction Goals Section */}
      <section className="py-20 md:py-28 bg-[#191919] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-[150px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[200px] rounded-full bg-yellow-500/5 blur-[120px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div ref={setRef(2)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4">Carbon Reduction Goals</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Path to Net Zero
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
                Ambitious yet achievable targets guide our journey toward carbon neutrality across all operations.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { number: '60%', label: 'Carbon Reduction Target by 2028', icon: '↓' },
                { number: '100%', label: 'Renewable Energy Goal by 2030', icon: '☀' },
                { number: '10K', label: 'Tons CO₂ Offset Annually', icon: '🌿' },
                { number: 'Net Zero', label: 'Target Year: 2035', icon: '🎯' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400 mb-2">{stat.number}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/30 via-emerald-500/50 to-[#DC0043]/30" />
              <div className="grid md:grid-cols-5 gap-8 md:gap-4">
                {[
                  { year: '2024', milestone: 'Energy Audit Complete', desc: 'Comprehensive energy audit across all 8 global facilities completed.' },
                  { year: '2025', milestone: '40% Renewable', desc: 'Solar installations operational at majority of manufacturing sites.' },
                  { year: '2027', milestone: '60% Reduction', desc: 'Scope 1 & 2 emissions reduced by 60% from 2020 baseline.' },
                  { year: '2030', milestone: '100% Renewable', desc: 'All operations powered entirely by renewable energy sources.' },
                  { year: '2035', milestone: 'Net Zero', desc: 'Full carbon neutrality across all scopes including supply chain.' },
                ].map((item, idx) => (
                  <div key={idx} className="text-center relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20 relative z-10">
                      <span className="text-white text-xs font-bold">{item.year}</span>
                    </div>
                    <h4 className="text-white font-bold mb-2">{item.milestone}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-yellow-50/50 via-white to-emerald-50/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(3)} className="section-animate">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
                Explore Our Sustainability Initiatives
              </h2>
              <p className="text-[#505050] text-lg max-w-2xl mx-auto">
                Discover more ways YUDO is driving sustainability across the plastics manufacturing industry.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { href: '/en/sustainability/sustainable-plastics', title: 'Sustainable Plastics', desc: 'Making plastics part of the solution for a greener world.' },
                { href: '/en/sustainability/eco-friendly-technology', title: 'Eco-friendly Technology', desc: 'Advanced hot runner systems for minimal environmental impact.' },
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
