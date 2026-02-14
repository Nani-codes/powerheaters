'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function RecycledPlasticPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#1e2a1a] to-[#191919]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] rounded-full bg-lime-500/8 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#DC0043]/8 blur-[120px]" />
          <div className="absolute top-1/4 right-1/3 w-60 h-60 rounded-full bg-emerald-500/6 blur-[100px]" />
        </div>
        {/* Circular pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-lime-500/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
                </svg>
              </div>
              <p className="text-lime-400 font-bold text-sm tracking-widest uppercase">
                Story of Sustainability
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              100% Recycled<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-[#DC0043]">Plastic</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Closing the loop on plastic waste — transforming discarded materials
              into high-quality products through advanced recycling innovation.
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
            <span className="text-[#DC0043] font-medium">100% Recycled Plastic</span>
          </nav>
        </div>
      </div>

      {/* Recycling Process Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(0)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-lime-600 font-bold text-sm tracking-widest uppercase mb-4">Recycling Process</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                From Waste to Value
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                Our advanced recycling process transforms post-consumer and post-industrial plastic waste into premium-grade materials suitable for demanding applications.
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connecting arrows */}
              <div className="hidden lg:flex absolute top-24 left-0 right-0 items-center justify-between px-[12%]">
                {[1, 2, 3, 4].map((_, idx) => (
                  <svg key={idx} width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-lime-300">
                    <path d="M0 10h32M28 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: '01', title: 'Collection', desc: 'Sourcing post-consumer and post-industrial plastic waste from certified collection partners.', icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  )},
                  { step: '02', title: 'Sorting', desc: 'AI-powered optical sorting systems classify materials by polymer type, color, and grade.', icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" />
                    </svg>
                  )},
                  { step: '03', title: 'Cleaning', desc: 'Multi-stage washing and decontamination removes impurities to food-contact safe standards.', icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
                    </svg>
                  )},
                  { step: '04', title: 'Processing', desc: 'Advanced extrusion and compounding transforms recycled flake into uniform pellets.', icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4" /><path d="m6.8 15-3.5 2" /><path d="m20.7 17-3.5-2" /><path d="M6.8 9 3.3 7" /><path d="m20.7 7-3.5 2" /><path d="m9 22 3-8 3 8" /><circle cx="12" cy="12" r="2" />
                    </svg>
                  )},
                  { step: '05', title: 'Molding', desc: 'YUDO hot runners process recycled pellets into finished products with zero waste.', icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )},
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-white to-lime-50/30 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-lime-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-lime-600 tracking-widest">STEP {item.step}</span>
                    <h3 className="text-lg font-bold text-[#191919] mt-2 mb-3">{item.title}</h3>
                    <p className="text-sm text-[#505050] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Innovation Section */}
      <section className="py-20 md:py-28 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(1)} className="section-animate">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-[#191919] to-[#2a2a2a] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-lime-500/5 blur-[80px]" />
                  <div className="relative">
                    {/* Material comparison */}
                    <h4 className="text-white/40 text-xs tracking-widest uppercase mb-6">Material Performance Comparison</h4>
                    <div className="space-y-5">
                      {[
                        { label: 'Tensile Strength', virgin: 95, recycled: 92 },
                        { label: 'Impact Resistance', virgin: 90, recycled: 88 },
                        { label: 'Melt Flow Index', virgin: 100, recycled: 96 },
                        { label: 'Color Consistency', virgin: 100, recycled: 94 },
                        { label: 'Thermal Stability', virgin: 95, recycled: 91 },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-white/70">{item.label}</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-white/40 w-16">Virgin</span>
                              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/30 rounded-full" style={{ width: `${item.virgin}%` }} />
                              </div>
                              <span className="text-xs text-white/50 w-8">{item.virgin}%</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-lime-400 w-16">Recycled</span>
                              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full" style={{ width: `${item.recycled}%` }} />
                              </div>
                              <span className="text-xs text-lime-400 w-8">{item.recycled}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/30 text-xs mt-6">* Performance normalized to virgin material baseline</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <p className="text-lime-600 font-bold text-sm tracking-widest uppercase mb-4">Material Innovation</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6 leading-tight">
                  Recycled Equals Premium
                </h2>
                <p className="text-[#505050] text-lg leading-relaxed mb-6">
                  Through proprietary compounding technology and advanced quality control, YUDO produces recycled plastic materials that match or exceed the performance of virgin alternatives across critical metrics.
                </p>
                <p className="text-[#505050] leading-relaxed mb-8">
                  Our material scientists work continuously to push the boundaries of what&apos;s possible with recycled polymers, developing formulations for automotive, medical, consumer electronics, and packaging applications.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: '97%', label: 'Performance parity with virgin materials' },
                    { stat: '12+', label: 'Polymer types processed' },
                    { stat: '200+', label: 'Custom formulations developed' },
                    { stat: 'FDA', label: 'Food-contact grade certified' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-lime-50 rounded-xl p-4 border border-lime-100">
                      <p className="text-2xl font-bold text-lime-700">{item.stat}</p>
                      <p className="text-xs text-[#505050] mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Economy Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(2)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">Circular Economy</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                Designing Out Waste
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                True sustainability means moving beyond &ldquo;reduce, reuse, recycle&rdquo; to a fully circular model where waste is designed out from the start.
              </p>
            </div>

            {/* Circular diagram visual */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    ),
                    title: 'Design for Recycling',
                    description: 'Working with product designers to ensure every plastic component is designed for easy disassembly and material recovery at end-of-life.',
                    stats: '85% of new products designed for recyclability',
                  },
                  {
                    icon: (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
                      </svg>
                    ),
                    title: 'Closed-Loop Manufacturing',
                    description: 'YUDO hot runner technology enables zero-waste manufacturing where every gram of material becomes product — nothing goes to landfill.',
                    stats: '0% production waste to landfill',
                  },
                  {
                    icon: (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 2 2 0 0 1 2 2" />
                        <path d="M8 12h8" /><path d="M12 8v8" />
                      </svg>
                    ),
                    title: 'Take-Back Programs',
                    description: 'Industry-leading product take-back and recycling programs that ensure end-of-life products re-enter the manufacturing cycle.',
                    stats: '25,000 tons collected annually',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-white to-emerald-50/30 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#191919] mb-3">{item.title}</h3>
                    <p className="text-[#505050] text-sm leading-relaxed mb-4">{item.description}</p>
                    <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full inline-block">{item.stats}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact numbers */}
            <div className="bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: '50K+', label: 'Tons Recycled Annually' },
                  { number: '120M', label: 'Products from Recycled Material' },
                  { number: '75%', label: 'Less CO₂ vs Virgin Plastic' },
                  { number: '30+', label: 'Industry Partners' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</p>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-[#191919] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-lime-500/5 blur-[150px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div ref={setRef(3)} className="section-animate">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lime-400 font-bold text-sm tracking-widest uppercase mb-4">Our Commitment</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                A Future Where No Plastic Goes to Waste
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                YUDO envisions a world where 100% of plastic is recovered, recycled, and reused — where the concept of &ldquo;plastic waste&rdquo; no longer exists. Through technology, partnerships, and relentless innovation, we&apos;re making this vision a reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl text-white font-semibold shadow-lg shadow-lime-500/20">
                  100% Circular by 2035
                </div>
                <div className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold">
                  Zero Waste to Landfill
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lime-50/50 via-white to-emerald-50/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(4)} className="section-animate">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
                Explore Our Sustainability Initiatives
              </h2>
              <p className="text-[#505050] text-lg max-w-2xl mx-auto">
                Learn more about how YUDO is driving environmental sustainability across every dimension.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { href: '/en/sustainability/sustainable-plastics', title: 'Sustainable Plastics', desc: 'Making plastics part of the solution for a greener world.' },
                { href: '/en/sustainability/eco-friendly-technology', title: 'Eco-friendly Technology', desc: 'Advanced hot runner systems for minimal environmental impact.' },
                { href: '/en/sustainability/green-energy', title: 'Green Energy', desc: 'Powering our operations with renewable energy sources.' },
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
