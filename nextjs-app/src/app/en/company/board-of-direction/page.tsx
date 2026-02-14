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

export default function BoardOfDirectionPage() {
  const [members, setMembers] = useState<any[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/board-of-directors')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data);
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
  }, [members]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  // Group by organization/type
  const groupedMembers = members.reduce((acc: Record<string, any[]>, member) => {
    const orgName =
      member.boardDirectionSubLangList?.[0]?.bodrcTpNm || 'Others';
    if (!acc[orgName]) acc[orgName] = [];
    acc[orgName].push(member);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Governance
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Board of Directors
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              Our board provides strategic oversight and ensures strong corporate governance.
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
            <span className="text-[#DC0043] font-medium">Board of Directors</span>
          </nav>
        </div>
      </div>

      {/* Board Description */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-16 md:py-20"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-lg text-[#505050] leading-relaxed">
              YUDO&apos;s Board of Directors is committed to maintaining the highest standards of corporate governance. Our directors bring diverse expertise and perspectives, guiding the company&apos;s strategic direction while ensuring accountability and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members by Group */}
      {Object.keys(groupedMembers).length > 0 ? (
        Object.entries(groupedMembers).map(([groupName, groupMembers], gIdx) => (
          <section
            key={groupName}
            ref={setSectionRef(gIdx + 1)}
            className={`section-animate pb-16 md:pb-24 ${gIdx > 0 ? 'pt-8' : ''}`}
          >
            <div className="max-w-[1400px] mx-auto px-6">
              {/* Group header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1 h-8 bg-[#DC0043] rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#191919]">
                  {decodeHtml(groupName)}
                </h2>
              </div>

              {/* Members grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {groupMembers.map((member: any) => {
                  const lang = member.boardDirectionSubLangList?.[0];
                  const name = lang?.nm ? decodeHtml(lang.nm) : '';
                  const position = lang?.jbPs ? decodeHtml(lang.jbPs) : '';

                  return (
                    <div key={member.bodrcSeq} className="group">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                        {member.imgFilePath ? (
                          <Image
                            src={member.imgFilePath}
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
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-bold text-[#191919] text-lg mb-1 group-hover:text-[#DC0043] transition-colors">
                        {name}
                      </h3>
                      <p className="text-[#505050] text-sm">{position}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DC0043] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#505050]">Loading board members...</p>
          </div>
        </section>
      )}

      {/* Governance Footer */}
      <section
        ref={setSectionRef(10)}
        className="section-animate py-16 md:py-20 bg-gray-50"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#191919] mb-4">
            Corporate Governance
          </h3>
          <p className="text-[#505050] max-w-2xl mx-auto leading-relaxed mb-8">
            YUDO is committed to building a governance system that meets global standards by enhancing the diversity, expertise, and independence of the Board of Directors.
          </p>
          <Link
            href="/en/company/executives"
            className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-[#DC0043] text-white font-medium hover:bg-[#BB1E4D] transition-colors"
          >
            View Executives
          </Link>
        </div>
      </section>
    </>
  );
}
