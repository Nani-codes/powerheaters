'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

function decodeHtml(html: string) {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const REGION_MAP: Record<string, string> = {
  Korea: 'Asia',
  China: 'Asia',
  Japan: 'Asia',
  India: 'Asia',
  Thailand: 'Asia',
  Vietnam: 'Asia',
  Singapore: 'Asia',
  Malaysia: 'Asia',
  Indonesia: 'Asia',
  Bangladesh: 'Asia',
  Philippines: 'Asia',
  Israel: 'Middle East',
  'T\u00fcrkiye': 'Europe',
  Portugal: 'Europe',
  Germany: 'Europe',
  France: 'Europe',
  Italy: 'Europe',
  Spain: 'Europe',
  UK: 'Europe',
  Poland: 'Europe',
  Romania: 'Europe',
  Netherlands: 'Europe',
  Czech: 'Europe',
  Finland: 'Europe',
  Ukraine: 'Europe',
  Serbia: 'Europe',
  Slovenia: 'Europe',
  'USA/Canada': 'North America',
  Mexico: 'North America',
  Brazil: 'South America',
  Argentina: 'South America',
  Chile: 'South America',
  Peru: 'South America',
  Colombia: 'South America',
  Ecuador: 'South America',
  Australia: 'Oceania',
  'South Africa': 'Africa',
  Egypt: 'Africa',
  Morocco: 'Africa',
  Tunisia: 'Africa',
};

const REGION_ORDER = ['Asia', 'Europe', 'North America', 'South America', 'Middle East', 'Africa', 'Oceania'];

export default function GlobalNetworkPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/global-network-all')
      .then((r) => r.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.list || [];
        setLocations(items);
      })
      .catch((err) => {
        console.error('Failed to load global network data:', err);
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
  }, [locations]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  const groupedLocations = useMemo(() => {
    const filtered = locations.filter((loc) => {
      const coNm = decodeHtml(loc.globalNetworkLangForWeb?.coNm || loc.coNm || '').toLowerCase();
      const city = (loc.cityNm || '').toLowerCase();
      const country = decodeHtml(loc.cntyNm || '').toLowerCase();
      const addr = decodeHtml(loc.globalNetworkLangForWeb?.addr || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = !q || coNm.includes(q) || city.includes(q) || country.includes(q) || addr.includes(q);
      const region = REGION_MAP[decodeHtml(loc.cntyNm || '')] || 'Other';
      const matchesRegion = activeRegion === 'all' || region === activeRegion;

      return matchesSearch && matchesRegion;
    });

    const groups: Record<string, any[]> = {};
    filtered.forEach((loc) => {
      const region = REGION_MAP[decodeHtml(loc.cntyNm || '')] || 'Other';
      if (!groups[region]) groups[region] = [];
      groups[region].push(loc);
    });

    return groups;
  }, [locations, searchQuery, activeRegion]);

  const regions = useMemo(() => {
    const regionSet = new Set<string>();
    locations.forEach((loc) => {
      const region = REGION_MAP[decodeHtml(loc.cntyNm || '')] || 'Other';
      regionSet.add(region);
    });
    return REGION_ORDER.filter((r) => regionSet.has(r));
  }, [locations]);

  const totalFiltered = Object.values(groupedLocations).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-[#DC0043] blur-[100px]" />
        </div>
        {/* World map dots pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 1200 500" className="w-full h-full" fill="white">
            {[...Array(80)].map((_, i) => (
              <circle key={i} cx={50 + (i % 20) * 58} cy={60 + Math.floor(i / 20) * 100 + (i % 3) * 30} r="2" />
            ))}
          </svg>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Worldwide Presence
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Global Network
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              YUDO operates across 6 continents with offices and partners in over 30 countries, providing local expertise with global reach.
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
            <span>Support</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#DC0043] font-medium">Global Networks</span>
          </nav>
        </div>
      </div>

      {/* Stats Bar */}
      <section
        ref={setSectionRef(0)}
        className="section-animate bg-white border-b border-gray-100 py-10"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: locations.length.toString(), label: 'Office Locations' },
              { value: new Set(locations.map((l) => decodeHtml(l.cntyNm || ''))).size.toString(), label: 'Countries' },
              { value: regions.length.toString(), label: 'Continents' },
              { value: '24/7', label: 'Global Support' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#DC0043] mb-1">{stat.value}</div>
                <p className="text-sm text-[#505050] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section
        ref={setSectionRef(1)}
        className="section-animate py-8 bg-white border-b border-gray-100 sticky top-0 z-20"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by office name, city, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC0043]/20 focus:border-[#DC0043] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M9 9L3 3" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Region Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveRegion('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeRegion === 'all'
                    ? 'bg-[#DC0043] text-white'
                    : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
                }`}
              >
                All Regions
              </button>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeRegion === region
                      ? 'bg-[#DC0043] text-white'
                      : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4">
            <p className="text-sm text-[#505050]">
              Showing <span className="font-semibold text-[#191919]">{totalFiltered}</span> locations
              {searchQuery && <> matching &quot;<span className="font-medium text-[#DC0043]">{searchQuery}</span>&quot;</>}
              {activeRegion !== 'all' && <> in <span className="font-medium text-[#DC0043]">{activeRegion}</span></>}
            </p>
          </div>
        </div>
      </section>

      {/* Office Locations by Region */}
      <section
        ref={setSectionRef(2)}
        className="section-animate py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {totalFiltered > 0 ? (
            <div className="space-y-16">
              {REGION_ORDER.filter((r) => groupedLocations[r]?.length > 0).map((region) => {
                const locs = groupedLocations[region];
                // Group by country within region
                const byCountry: Record<string, any[]> = {};
                locs.forEach((loc: any) => {
                  const country = decodeHtml(loc.cntyNm || 'Unknown');
                  if (!byCountry[country]) byCountry[country] = [];
                  byCountry[country].push(loc);
                });

                return (
                  <div key={region}>
                    {/* Region Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#DC0043] flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#191919]">{region}</h2>
                        <p className="text-sm text-[#505050]">{locs.length} location{locs.length > 1 ? 's' : ''}</p>
                      </div>
                      <div className="flex-1 h-px bg-gray-200 ml-4" />
                    </div>

                    {/* Countries */}
                    {Object.entries(byCountry).map(([country, countryLocs]) => (
                      <div key={country} className="mb-10">
                        <h3 className="text-lg font-bold text-[#191919] mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#DC0043]" />
                          {country}
                          <span className="text-sm font-normal text-[#505050]">({countryLocs.length})</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {countryLocs.map((loc: any) => {
                            const name = decodeHtml(loc.globalNetworkLangForWeb?.coNm || loc.coNm || '');
                            const addr = decodeHtml(loc.globalNetworkLangForWeb?.addr || '');
                            const city = (loc.cityNm || '').trim();
                            const phone = loc.telNo || '';
                            const fax = loc.faxNo?.trim() || '';
                            const email = loc.mailAddr || '';
                            const isExpanded = expandedCard === loc.globNtwkSeq;
                            const bizTypes = loc.globalNetworkBusinessTypeListForWeb || [];

                            return (
                              <div
                                key={loc.globNtwkSeq}
                                className="bg-white rounded-2xl border border-gray-100 hover:border-[#DC0043]/20 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                              >
                                {/* Card Header */}
                                <div className="p-5">
                                  <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-base font-bold text-[#191919] group-hover:text-[#DC0043] transition-colors leading-tight truncate" title={name}>
                                        {name}
                                      </h4>
                                      {city && (
                                        <p className="text-sm text-[#505050] mt-0.5">{city}</p>
                                      )}
                                    </div>
                                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#DC0043]/5 flex items-center justify-center">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Business Types */}
                                  {bizTypes.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                      {bizTypes.map((bt: any, idx: number) => {
                                        const typeLabels: Record<string, string> = {
                                          '001': 'Manufacturing',
                                          '002': 'Sales',
                                          '003': 'Branch',
                                          '004': 'Distributor',
                                          '005': 'Other',
                                          '006': 'Contact Point',
                                        };
                                        return (
                                          <span
                                            key={idx}
                                            className="inline-block px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-[#505050]"
                                          >
                                            {typeLabels[bt.bizTp] || bt.bizTpNm || 'Office'}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Address */}
                                  {addr && (
                                    <p className={`text-sm text-[#505050] leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                      {addr}
                                    </p>
                                  )}
                                </div>

                                {/* Expandable Contact Details */}
                                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-60' : 'max-h-0'}`}>
                                  <div className="px-5 pb-4 space-y-2 border-t border-gray-50 pt-3">
                                    {phone && (
                                      <div className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <span className="text-sm text-[#505050] break-all">{phone}</span>
                                      </div>
                                    )}
                                    {fax && (
                                      <div className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                        </svg>
                                        <span className="text-sm text-[#505050] break-all">Fax: {fax}</span>
                                      </div>
                                    )}
                                    {email && (
                                      <div className="flex items-start gap-2">
                                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC0043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                          <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        <span className="text-sm text-[#505050] break-all">{email}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Expand Toggle */}
                                <button
                                  onClick={() => setExpandedCard(isExpanded ? null : loc.globNtwkSeq)}
                                  className="w-full py-2.5 text-xs font-semibold text-[#DC0043] hover:bg-[#DC0043]/5 transition-colors border-t border-gray-100 flex items-center justify-center gap-1"
                                >
                                  {isExpanded ? 'Show Less' : 'View Details'}
                                  <svg
                                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                  >
                                    <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : locations.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DC0043] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#505050]">Loading global network data...</p>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#191919] mb-2">No locations found</h3>
              <p className="text-[#505050] mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveRegion('all'); }}
                className="inline-flex items-center justify-center px-6 h-11 rounded-full bg-[#DC0043] text-white text-sm font-medium hover:bg-[#BB1E4D] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={setSectionRef(3)}
        className="section-animate py-20 md:py-28 bg-white"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-6">
            Can&apos;t Find Your Local Office?
          </h2>
          <p className="text-lg text-[#505050] mb-10 max-w-2xl mx-auto">
            Contact our headquarters and we&apos;ll connect you with the nearest representative in your area.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/en/support/contact-info"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-[#DC0043] text-white font-medium hover:bg-[#BB1E4D] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/en/support/download"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full border-2 border-[#191919] text-[#191919] font-medium hover:bg-[#191919] hover:text-white transition-colors"
            >
              Download Center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
