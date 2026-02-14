'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* eslint-disable @typescript-eslint/no-explicit-any */

function decodeHtml(html: string) {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const REGION_MAP: Record<string, string> = {
  '001': 'Group Management',
  '003': 'Asia',
  '004': 'Europe',
  '005': 'North America',
  '006': 'South America',
  '007': 'Oceania',
  '008': 'Africa',
  '009': 'Others',
};

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState<any[]>([]);
  const [selectedExec, setSelectedExec] = useState<any>(null);
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/executives')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExecutives(data);
        }
      });
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
  }, [executives]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  // Get unique regions
  const regions = Array.from(
    new Set(executives.map((e) => e.bodrcTpCd))
  ).sort();

  const filteredExecs =
    activeRegion === 'all'
      ? executives
      : executives.filter((e) => e.bodrcTpCd === activeRegion);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Our Leadership
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Executives
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              Meet the leaders driving YUDO&apos;s vision across the globe.
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
            <span className="text-[#DC0043] font-medium">Executives</span>
          </nav>
        </div>
      </div>

      {/* Region Filter */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-8 border-b border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveRegion('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeRegion === 'all'
                  ? 'bg-[#DC0043] text-white'
                  : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeRegion === region
                    ? 'bg-[#DC0043] text-white'
                    : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
                }`}
              >
                {REGION_MAP[region] || region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Executives Grid */}
      <section
        ref={setSectionRef(1)}
        className="section-animate py-16 md:py-24"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {filteredExecs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredExecs.map((exec) => {
                const lang = exec.boardDirectionLangList?.[0];
                const name = lang?.nm ? decodeHtml(lang.nm) : '';
                const hasGreeting = lang?.gretWd && lang.gretWd.trim().length > 0;

                return (
                  <div
                    key={exec.bodrcSeq}
                    className={`group ${hasGreeting ? 'cursor-pointer' : ''}`}
                    onClick={() => hasGreeting && setSelectedExec(exec)}
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      {exec.imgFilePath ? (
                        <Image
                          src={exec.imgFilePath}
                          alt={name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                      )}
                      {hasGreeting && (
                        <div className="absolute inset-0 bg-[#DC0043]/0 group-hover:bg-[#DC0043]/20 transition-colors flex items-end">
                          <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-medium">
                              View Message →
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#191919] text-lg mb-1 group-hover:text-[#DC0043] transition-colors">
                      {name}
                    </h3>
                    <p className="text-[#DC0043] text-sm font-medium mb-0.5">
                      {exec.jbPs}
                    </p>
                    <p className="text-[#505050] text-sm">{exec.jbDt}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DC0043] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#505050]">Loading executives...</p>
            </div>
          )}
        </div>
      </section>

      {/* Executive Detail Modal */}
      {selectedExec && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedExec(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header */}
              <div className="flex items-start gap-6 p-8 pb-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  {selectedExec.imgFilePath && (
                    <Image
                      src={selectedExec.imgFilePath}
                      alt={selectedExec.boardDirectionLangList?.[0]?.nm || ''}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                      unoptimized
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-[#191919]">
                    {selectedExec.boardDirectionLangList?.[0]?.nm
                      ? decodeHtml(selectedExec.boardDirectionLangList[0].nm)
                      : ''}
                  </h3>
                  <p className="text-[#DC0043] font-medium mt-1">
                    {selectedExec.jbPs}
                  </p>
                  <p className="text-[#505050] text-sm">{selectedExec.jbDt}</p>
                </div>
                <button
                  onClick={() => setSelectedExec(null)}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5 5 15M15 15 5 5" stroke="#191919" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="w-full h-px bg-gray-200 mb-6" />
                <div className="text-[#505050] leading-relaxed whitespace-pre-line text-base">
                  {selectedExec.boardDirectionLangList?.[0]?.gretWd
                    ? decodeHtml(selectedExec.boardDirectionLangList[0].gretWd)
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
