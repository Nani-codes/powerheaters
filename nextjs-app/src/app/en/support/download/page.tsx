'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: 'PDF' | 'ZIP' | 'DWG' | 'STEP';
  fileSize: string;
  version?: string;
  date: string;
}

const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: '1',
    title: 'YUDO Product Catalog 2025',
    description: 'Complete product catalog featuring our full range of hot runner systems, controllers, and accessories.',
    category: 'Catalogs',
    fileType: 'PDF',
    fileSize: '24.5 MB',
    version: 'v2025',
    date: '2025-01',
  },
  {
    id: '2',
    title: 'Hot Runner System Technical Guide',
    description: 'Comprehensive technical manual covering installation, maintenance, and troubleshooting for all YUDO hot runner systems.',
    category: 'Technical Documents',
    fileType: 'PDF',
    fileSize: '18.2 MB',
    version: 'v3.1',
    date: '2024-11',
  },
  {
    id: '3',
    title: 'FLOWave Series Brochure',
    description: 'Detailed brochure for the FLOWave nozzle series with specifications, features, and application examples.',
    category: 'Brochures',
    fileType: 'PDF',
    fileSize: '8.7 MB',
    date: '2024-10',
  },
  {
    id: '4',
    title: 'Temperature Controller Manual',
    description: 'User manual for YUDO temperature controllers including setup procedures, parameter settings, and safety guidelines.',
    category: 'Technical Documents',
    fileType: 'PDF',
    fileSize: '12.3 MB',
    version: 'v2.4',
    date: '2024-09',
  },
  {
    id: '5',
    title: 'YUDO Corporate Brochure',
    description: 'An overview of YUDO Group, our history, global presence, and commitment to innovation in the hot runner industry.',
    category: 'Brochures',
    fileType: 'PDF',
    fileSize: '15.1 MB',
    date: '2025-01',
  },
  {
    id: '6',
    title: 'Hot Half System CAD Library',
    description: 'CAD models and 3D drawings for YUDO Hot Half systems. Compatible with major CAD software platforms.',
    category: 'CAD Files',
    fileType: 'ZIP',
    fileSize: '156 MB',
    version: 'v2025.1',
    date: '2024-12',
  },
  {
    id: '7',
    title: 'Nozzle Selection Guide',
    description: 'Comprehensive guide to selecting the right nozzle for your application, including flow analysis charts and material compatibility.',
    category: 'Technical Documents',
    fileType: 'PDF',
    fileSize: '6.8 MB',
    date: '2024-08',
  },
  {
    id: '8',
    title: 'Sustainability Report 2024',
    description: 'YUDO\'s annual sustainability report covering environmental initiatives, carbon footprint reduction, and ESG performance.',
    category: 'Reports',
    fileType: 'PDF',
    fileSize: '9.4 MB',
    date: '2024-06',
  },
  {
    id: '9',
    title: 'Hot Runner Manifold 3D Models',
    description: 'Standard manifold CAD models in STEP format for integration into your mold designs.',
    category: 'CAD Files',
    fileType: 'STEP',
    fileSize: '84 MB',
    version: 'v2024.2',
    date: '2024-07',
  },
  {
    id: '10',
    title: 'Valve Gate System Brochure',
    description: 'Product brochure covering YUDO\'s complete range of valve gate systems for all applications from automotive to packaging.',
    category: 'Brochures',
    fileType: 'PDF',
    fileSize: '11.2 MB',
    date: '2024-11',
  },
  {
    id: '11',
    title: 'Installation Guidelines Package',
    description: 'Step-by-step installation guides, wiring diagrams, and dimensional drawings for hot runner system installation.',
    category: 'Technical Documents',
    fileType: 'ZIP',
    fileSize: '32.5 MB',
    date: '2024-05',
  },
  {
    id: '12',
    title: 'Annual Report 2024',
    description: 'YUDO Holdings annual report with financial highlights, strategic initiatives, and key business milestones.',
    category: 'Reports',
    fileType: 'PDF',
    fileSize: '21.6 MB',
    date: '2024-04',
  },
];

const CATEGORIES = ['All', 'Catalogs', 'Brochures', 'Technical Documents', 'CAD Files', 'Reports'];

const FILE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  PDF: { bg: 'bg-red-50', text: 'text-red-600' },
  ZIP: { bg: 'bg-amber-50', text: 'text-amber-600' },
  DWG: { bg: 'bg-blue-50', text: 'text-blue-600' },
  STEP: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
};

function FileTypeIcon({ type }: { type: string }) {
  const colors = FILE_TYPE_COLORS[type] || FILE_TYPE_COLORS.PDF;

  return (
    <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
      <div className="text-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={colors.text} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span className={`text-[9px] font-bold ${colors.text} block -mt-0.5`}>{type}</span>
      </div>
    </div>
  );
}

export default function DownloadPage() {
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
          <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#DC0043] blur-[100px]" />
        </div>
        {/* Document pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1200 500" className="w-full h-full" fill="white">
            {[...Array(24)].map((_, i) => (
              <g key={i} transform={`translate(${80 + (i % 8) * 140}, ${60 + Math.floor(i / 8) * 160})`}>
                <rect x="0" y="0" width="60" height="80" rx="4" />
                <line x1="10" y1="25" x2="50" y2="25" stroke="white" strokeWidth="2" />
                <line x1="10" y1="35" x2="50" y2="35" stroke="white" strokeWidth="2" />
                <line x1="10" y1="45" x2="35" y2="45" stroke="white" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Resources
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Download Center
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              Access product catalogs, technical documents, brochures, CAD files, and more to support your projects.
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
            <span className="text-[#DC0043] font-medium">Download</span>
          </nav>
        </div>
      </div>

      {/* Quick Stats */}
      <section
        ref={setSectionRef(0)}
        className="section-animate bg-white border-b border-gray-100 py-10"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: DOWNLOAD_ITEMS.length.toString(), label: 'Documents Available' },
              { value: CATEGORIES.length - 1 + '', label: 'Categories' },
              { value: 'PDF, ZIP, STEP', label: 'File Formats' },
              { value: 'Free', label: 'Access' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#DC0043] mb-1">{stat.value}</div>
                <p className="text-sm text-[#505050] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Categories & Grid */}
      {CATEGORIES.filter((c) => c !== 'All').map((category, catIdx) => {
        const categoryItems = DOWNLOAD_ITEMS.filter((item) => item.category === category);
        if (categoryItems.length === 0) return null;

        return (
          <section
            key={category}
            ref={setSectionRef(catIdx + 1)}
            className={`section-animate py-16 md:py-20 ${catIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-[1400px] mx-auto px-6">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-[#DC0043] flex items-center justify-center flex-shrink-0">
                  {category === 'Catalogs' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  )}
                  {category === 'Brochures' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  )}
                  {category === 'Technical Documents' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                  {category === 'CAD Files' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                  )}
                  {category === 'Reports' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#191919]">{category}</h2>
                  <p className="text-sm text-[#505050]">{categoryItems.length} document{categoryItems.length > 1 ? 's' : ''}</p>
                </div>
                <div className="flex-1 h-px bg-gray-200 ml-4" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-[#DC0043]/20 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <FileTypeIcon type={item.fileType} />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-[#191919] group-hover:text-[#DC0043] transition-colors leading-tight mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-[#505050]">
                            <span>{item.fileType}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{item.fileSize}</span>
                            {item.version && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{item.version}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-[#505050] leading-relaxed line-clamp-3 mb-5">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#505050]">{item.date}</span>
                        <button
                          onClick={() => alert('Download functionality will be available when document files are uploaded.')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#DC0043] text-white text-sm font-medium hover:bg-[#BB1E4D] transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Help Section */}
      <section
        ref={setSectionRef(CATEGORIES.length)}
        className="section-animate py-20 md:py-28 bg-[#191919]"
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Additional Resources?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            If you can&apos;t find what you&apos;re looking for, our support team is ready to help. Contact us for custom technical documentation or specific product information.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/en/support/contact-info"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-[#DC0043] text-white font-medium hover:bg-[#BB1E4D] transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/en/support/contact-info/global-network"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Find Local Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
