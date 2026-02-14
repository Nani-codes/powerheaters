'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CompanyIntroductionPage() {
  const [data, setData] = useState<any>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/company-intro')
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

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
  }, [data]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  const stats = data
    ? [
        { label: 'Global Network', value: data.globNtwkCnt || '92', suffix: '+' },
        { label: 'Systems Delivered', value: data.sysCnt || '91,800', suffix: '+' },
        { label: 'Patents', value: data.ptntcnt || '400', suffix: '+' },
        { label: 'Employees', value: data.alcffcnt || '710', suffix: '+' },
      ]
    : [];

  const slogan =
    data?.corporationIntroduceLangList?.[0]?.mainStnr ||
    '40-year track-record through innovation';

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              About YUDO
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Company Introduction
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              {slogan}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#505050]">
            <Link href="/en" className="hover:text-[#DC0043] transition-colors">
              Home
            </Link>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Company</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#DC0043] font-medium">Company Introduction</span>
          </nav>
        </div>
      </div>

      {/* About Section */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-20 md:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-6 leading-tight">
                Global Leader in<br />Hot Runner Systems
              </h2>
              <p className="text-lg text-[#505050] leading-relaxed mb-6">
                YUDO is the world&apos;s leading hot runner system manufacturer, serving the global plastic injection molding industry with innovative solutions since 1980.
              </p>
              <p className="text-lg text-[#505050] leading-relaxed mb-6">
                With over four decades of expertise, we have grown from a small trading company in Seoul to a global enterprise with operations across six continents, delivering precision-engineered systems that power the production of everyday products.
              </p>
              <p className="text-lg text-[#505050] leading-relaxed">
                From automotive components and consumer electronics to medical devices and packaging, YUDO&apos;s technology enables manufacturers to produce higher quality parts with greater efficiency and sustainability.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#DC0043] to-[#a00033] rounded-3xl p-10 md:p-14 text-white">
                  <h3 className="text-5xl md:text-6xl font-bold mb-4">40+</h3>
                  <p className="text-xl font-medium mb-2">Years of Innovation</p>
                  <p className="text-white/80 leading-relaxed">
                    Since our founding in 1980, YUDO has been at the forefront of hot runner technology, continuously pushing the boundaries of what&apos;s possible in plastic injection molding.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#DC0043]/10 rounded-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section
          ref={setSectionRef(1)}
          className="section-animate bg-[#191919] py-20 md:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
                YUDO at a Glance
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Numbers that Define Us
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#DC0043]/50 transition-colors"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#DC0043] mb-2">
                    {stat.value}
                    <span className="text-3xl">{stat.suffix}</span>
                  </div>
                  <p className="text-white/70 text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      <section
        ref={setSectionRef(2)}
        className="section-animate py-20 md:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Our Purpose
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#191919]">
              Vision & Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#DC0043] flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#191919] mb-4">Our Vision</h3>
              <p className="text-[#505050] text-lg leading-relaxed">
                To be the global leader in sustainable plastic manufacturing solutions, enabling a world where plastic products are made safer, more efficiently, and with minimal environmental impact.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#DC0043] flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#191919] mb-4">Our Mission</h3>
              <p className="text-[#505050] text-lg leading-relaxed">
                We deliver innovative hot runner systems and comprehensive solutions that maximize our customers&apos; productivity and profitability while promoting sustainable manufacturing practices across the global plastics industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        ref={setSectionRef(3)}
        className="section-animate py-20 md:py-28 bg-gray-50"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#191919]">
              Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                desc: 'We believe in open communication and honest relationships with all stakeholders, building trust through transparent management practices.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                title: 'Communication',
                desc: 'Active dialogue and collaboration are at the heart of our culture, enabling us to understand needs and deliver exceptional value to every partner.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: 'Sensitivity',
                desc: 'We stay attuned to market changes and customer needs, responding with agility and innovation to deliver solutions that anticipate tomorrow\'s challenges.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#DC0043] flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#191919] mb-3">{value.title}</h3>
                <p className="text-[#505050] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={setSectionRef(4)}
        className="section-animate py-20 md:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-6">
            Discover Our Journey
          </h2>
          <p className="text-lg text-[#505050] mb-10 max-w-2xl mx-auto">
            Learn more about our history, leadership, and the milestones that have shaped YUDO into the global leader it is today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/en/company/history"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-[#DC0043] text-white font-medium hover:bg-[#BB1E4D] transition-colors"
            >
              Our History
            </Link>
            <Link
              href="/en/company/executives"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full border-2 border-[#191919] text-[#191919] font-medium hover:bg-[#191919] hover:text-white transition-colors"
            >
              Our Leadership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
