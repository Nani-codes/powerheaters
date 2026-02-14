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

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/history')
      .then((r) => r.json())
      .then((data) => {
        const sorted = Array.isArray(data)
          ? [...data].sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0))
          : [];
        setHistory(sorted);
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
  }, [history]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Our Journey
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              History
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              Over four decades of innovation, growth, and global leadership in hot runner technology.
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
            <span className="text-[#DC0043] font-medium">History</span>
          </nav>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6">
          {history.length > 0 && (
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

              {history.map((era, idx) => {
                const lang = era.historyLangList?.[0];
                const details = lang?.historyLangDetailList || [];
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={era.hstrySeq}
                    ref={setSectionRef(idx)}
                    className="section-animate relative mb-20 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#DC0043] border-4 border-white shadow-md z-10" />

                    <div
                      className={`md:w-[calc(50%-40px)] ${
                        isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                      } ml-16 md:ml-0`}
                    >
                      {/* Era card */}
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Era image */}
                        {era.imgFilePath && (
                          <div className="relative h-48 md:h-56 overflow-hidden">
                            <Image
                              src={era.imgFilePath}
                              alt={lang?.ttl || ''}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                              <div className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-1">
                                {era.strtYy}
                                {era.endYy && era.endYy !== era.strtYy
                                  ? ` — ${era.endYy}`
                                  : ''}
                              </div>
                              <h3 className="text-2xl font-bold text-white">
                                {lang?.ttl ? decodeHtml(lang.ttl) : ''}
                              </h3>
                            </div>
                          </div>
                        )}

                        <div className="p-6 md:p-8">
                          {!era.imgFilePath && (
                            <>
                              <div className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-1">
                                {era.strtYy}
                                {era.endYy && era.endYy !== era.strtYy
                                  ? ` — ${era.endYy}`
                                  : ''}
                              </div>
                              <h3 className="text-2xl font-bold text-[#191919] mb-2">
                                {lang?.ttl ? decodeHtml(lang.ttl) : ''}
                              </h3>
                            </>
                          )}
                          {lang?.explnCont && (
                            <p className="text-[#505050] mb-6">
                              {decodeHtml(lang.explnCont)}
                            </p>
                          )}

                          {/* Milestones */}
                          <div className="space-y-3">
                            {details.map((detail: any, dIdx: number) => (
                              <div
                                key={dIdx}
                                className="flex gap-4 items-start"
                              >
                                <span className="flex-shrink-0 text-sm font-bold text-[#DC0043] bg-[#DC0043]/5 px-3 py-1 rounded-full mt-0.5">
                                  {detail.yy}
                                </span>
                                <p className="text-[#505050] text-sm leading-relaxed">
                                  {decodeHtml(detail.cont || '')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {history.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DC0043] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#505050]">Loading history...</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
