'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SustainablePlasticsPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#1a2e1a] to-[#191919]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#DC0043]/10 blur-[120px]" />
        </div>
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c4-4 8-7.5 8-12a8 8 0 0 0-16 0c0 4.5 4 8 8 12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">
                Story of Sustainability
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sustainable<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#DC0043]">Plastics</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Redefining how the world thinks about plastic — making it a material
              for a sustainable future through innovation and responsible engineering.
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
            <span className="text-[#DC0043] font-medium">Sustainable Plastics</span>
          </nav>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(0)} className="section-animate">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">Introduction</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6 leading-tight">
                  Making Plastics Part of the Solution
                </h2>
                <p className="text-[#505050] text-lg leading-relaxed mb-6">
                  At YUDO, we believe that plastics don&apos;t have to be the enemy of the environment. Through advanced hot runner technology, we dramatically reduce material waste in the injection molding process, ensuring that every gram of plastic is used purposefully.
                </p>
                <p className="text-[#505050] leading-relaxed">
                  Our commitment extends beyond manufacturing efficiency. We&apos;re pioneering new approaches that make plastic products lighter, longer-lasting, and more recyclable — transforming the entire lifecycle of plastic materials.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-[#191919]">40%</p>
                      <p className="text-sm text-[#505050] mt-1">Less Material Waste</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[#DC0043]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-[#191919]">99.7%</p>
                      <p className="text-sm text-[#505050] mt-1">Material Utilization</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-[#191919]">30+</p>
                      <p className="text-sm text-[#505050] mt-1">Years of Innovation</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[#DC0043]/10 flex items-center justify-center mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" /><path d="m8 12 3 3 5-5" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-[#191919]">50+</p>
                      <p className="text-sm text-[#505050] mt-1">Countries Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-20 md:py-28 bg-[#f8faf8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(1)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">Environmental Impact</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6">
                Measurable Difference
              </h2>
              <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
                Our hot runner systems eliminate runner waste entirely, preventing thousands of tons of plastic from entering the waste stream every year.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 22 16 8" /><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" /><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" /><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" /><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4z" /><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0z" />
                    </svg>
                  ),
                  title: 'Zero Runner Waste',
                  description: 'Hot runner systems eliminate cold runners entirely, meaning zero plastic is wasted as scrap in the molding process. This translates to massive material savings at scale.',
                  stat: '100%',
                  statLabel: 'Runner waste eliminated',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18" /><path d="M8 6a4 4 0 0 1 8 0c0 2.5-4 4-4 7" /><circle cx="12" cy="19" r="2" />
                    </svg>
                  ),
                  title: 'Energy Reduction',
                  description: 'By optimizing the molding cycle and reducing material usage, our systems significantly lower the energy required per part — contributing to lower carbon emissions across production.',
                  stat: '25%',
                  statLabel: 'Less energy per cycle',
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
                      <path d="M12 7v8" /><path d="M8 11h8" />
                    </svg>
                  ),
                  title: 'Carbon Footprint',
                  description: 'From reduced material transportation to lower energy consumption, every aspect of our hot runner approach is designed to minimize the total carbon footprint of plastic manufacturing.',
                  stat: '15K+',
                  statLabel: 'Tons CO₂ saved annually',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#191919] mb-3">{item.title}</h3>
                  <p className="text-[#505050] leading-relaxed mb-6">{item.description}</p>
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-3xl font-bold text-emerald-600">{item.stat}</p>
                    <p className="text-sm text-[#505050] mt-1">{item.statLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(2)} className="section-animate">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-[#191919] to-[#2a2a2a] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-[80px]" />
                  <div className="relative space-y-6">
                    {[
                      { label: 'Precision Flow Control', desc: 'Individually controlled valve gates reduce material usage by ensuring optimal fill patterns.' },
                      { label: 'Smart Temperature Management', desc: 'AI-driven heater control maintains consistent melt quality while reducing energy consumption.' },
                      { label: 'Modular Design Philosophy', desc: 'Easily replaceable components extend system lifespan and reduce manufacturing waste.' },
                      { label: 'Bio-Polymer Compatibility', desc: 'Systems engineered to work seamlessly with next-generation bio-based polymers.' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                          <span className="text-emerald-400 text-sm font-bold">{idx + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">Innovation</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191919] mb-6 leading-tight">
                  Technology That Drives Sustainability
                </h2>
                <p className="text-[#505050] text-lg leading-relaxed mb-6">
                  YUDO&apos;s commitment to sustainable plastics is powered by continuous innovation. Our engineering teams develop solutions that not only improve manufacturing performance but also minimize environmental impact at every stage.
                </p>
                <p className="text-[#505050] leading-relaxed">
                  From precision flow control systems that reduce material waste to bio-polymer compatible hot runners, every innovation is designed with sustainability as a core principle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 md:py-28 bg-[#191919] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/5 blur-[150px]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div ref={setRef(3)} className="section-animate">
            <div className="text-center mb-16">
              <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4">Future Vision</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Toward a Circular Future
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
                Our vision extends to a fully circular plastics economy — where every product is designed for reuse, recycling, or responsible biodegradation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { year: '2025', goal: 'Carbon Neutral Operations', desc: 'Achieving net-zero emissions across all YUDO manufacturing facilities worldwide.' },
                { year: '2027', goal: '100% Recyclable Systems', desc: 'All hot runner systems designed for complete disassembly and material recovery.' },
                { year: '2028', goal: 'Bio-Polymer Leadership', desc: 'Full product line compatibility with bio-based and compostable polymers.' },
                { year: '2030', goal: 'Circular Economy Partner', desc: 'End-to-end plastic lifecycle management for all major customers globally.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-500">
                  <p className="text-[#DC0043] font-bold text-sm tracking-widest mb-3">{item.year}</p>
                  <h3 className="text-xl font-bold text-white mb-3">{item.goal}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div ref={setRef(4)} className="section-animate">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
                Explore Our Sustainability Initiatives
              </h2>
              <p className="text-[#505050] text-lg max-w-2xl mx-auto">
                Discover how YUDO is leading the charge in sustainable manufacturing across every dimension.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { href: '/en/sustainability/eco-friendly-technology', title: 'Eco-friendly Technology', desc: 'Advanced hot runner systems designed for minimal environmental impact.' },
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
