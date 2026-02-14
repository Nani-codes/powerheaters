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

const NEWS_TYPE_LABELS: Record<string, string> = {
  '001': 'Press Release',
  '002': 'Industry News',
  '003': 'Company News',
};

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/news-list')
      .then((r) => r.json())
      .then((data) => {
        const items = data?.list || (Array.isArray(data) ? data : []);
        setNewsList(items);
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
  }, [newsList]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  // Get unique categories
  const categories = Array.from(
    new Set(newsList.map((n) => n.newsTpCd))
  ).sort();

  const filteredNews =
    activeFilter === 'all'
      ? newsList
      : newsList.filter((n) => n.newsTpCd === activeFilter);

  const handleNewsClick = (item: any) => {
    // If it's an external link, open in new tab
    if (item.dtlTpCd === 'link' && item.url) {
      window.open(decodeHtml(item.url), '_blank');
    } else {
      setSelectedNews(item);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[480px] bg-[#191919] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#191919] via-[#2a2a2a] to-[#191919]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#DC0043] blur-[100px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Stay Updated
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              News
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              Latest press releases, industry insights, and company updates from YUDO.
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
            <span className="text-[#DC0043] font-medium">News</span>
          </nav>
        </div>
      </div>

      {/* Filter Bar */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-8 border-b border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#DC0043] text-white'
                  : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
              }`}
            >
              All News
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-[#DC0043] text-white'
                    : 'bg-gray-100 text-[#505050] hover:bg-gray-200'
                }`}
              >
                {NEWS_TYPE_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section
        ref={setSectionRef(1)}
        className="section-animate py-16 md:py-24"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          {filteredNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item) => {
                  const lang = item.newsLangList?.[0];
                  const title = lang?.ttl ? decodeHtml(lang.ttl) : '';
                  const summary = lang?.sumryCont
                    ? decodeHtml(lang.sumryCont)
                    : '';
                  const category =
                    NEWS_TYPE_LABELS[item.newsTpCd] || item.newsTpNameCache || '';
                  const isExternal = item.dtlTpCd === 'link' && item.url;

                  return (
                    <article
                      key={item.newsSeq}
                      className="group cursor-pointer"
                      onClick={() => handleNewsClick(item)}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                        {item.imgFilePath ? (
                          <Image
                            src={item.imgFilePath}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#DC0043]">
                            {category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-[#191919] mb-3 group-hover:text-[#DC0043] transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-[#505050] text-base leading-relaxed line-clamp-3 mb-4">
                        {summary}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[#DC0043] text-sm font-bold">
                        {isExternal ? (
                          <>
                            Visit Link
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M12 8.667V12a1.333 1.333 0 0 1-1.333 1.333H4A1.333 1.333 0 0 1 2.667 12V5.333A1.333 1.333 0 0 1 4 4h3.333M10 2.667h3.333V6M6.667 9.333 13.333 2.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Read More
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="m9 4 4 4-4 4M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Results count */}
              <div className="mt-12 text-center">
                <p className="text-sm text-[#505050]">
                  Showing {filteredNews.length} of {newsList.length} articles
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#DC0043] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#505050]">Loading news...</p>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header image */}
            {selectedNews.imgFilePath && (
              <div className="relative aspect-[16/9] rounded-t-3xl overflow-hidden">
                <Image
                  src={selectedNews.imgFilePath}
                  alt={selectedNews.newsLangList?.[0]?.ttl || ''}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#DC0043]">
                    {NEWS_TYPE_LABELS[selectedNews.newsTpCd] ||
                      selectedNews.newsTpNameCache ||
                      ''}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5 5 15M15 15 5 5" stroke="#191919" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}

            <div className="p-8">
              {!selectedNews.imgFilePath && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5 5 15M15 15 5 5" stroke="#191919" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}

              <h2 className="text-2xl md:text-3xl font-bold text-[#191919] mb-4">
                {selectedNews.newsLangList?.[0]?.ttl
                  ? decodeHtml(selectedNews.newsLangList[0].ttl)
                  : ''}
              </h2>

              <div className="w-full h-px bg-gray-200 my-6" />

              <div className="text-[#505050] leading-relaxed text-base">
                {selectedNews.newsLangList?.[0]?.dtl ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedNews.newsLangList[0].dtl,
                    }}
                  />
                ) : (
                  <p>
                    {selectedNews.newsLangList?.[0]?.sumryCont
                      ? decodeHtml(selectedNews.newsLangList[0].sumryCont)
                      : ''}
                  </p>
                )}
              </div>

              {/* External link button */}
              {selectedNews.dtlTpCd === 'link' && selectedNews.url && (
                <div className="mt-8">
                  <a
                    href={decodeHtml(selectedNews.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[#DC0043] text-white font-medium hover:bg-[#BB1E4D] transition-colors"
                  >
                    Visit Source
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 8.667V12a1.333 1.333 0 0 1-1.333 1.333H4A1.333 1.333 0 0 1 2.667 12V5.333A1.333 1.333 0 0 1 4 4h3.333M10 2.667h3.333V6M6.667 9.333 13.333 2.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
