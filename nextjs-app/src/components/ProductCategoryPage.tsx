'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface CategoryItem {
  stdCatId: string;
  stdCatNm: string;
  stdCatDesc: string;
  imgFilePath: string;
  imgFileNm?: string;
  sortOrdr?: number;
}

interface SuccessCase {
  successCaseSeq: string;
  ttl: string;
  sumryCont: string;
  imgFilePath: string;
}

interface Technology {
  techSeq: string;
  ttl: string;
  sumryCont: string;
  imgFilePath: string;
}

interface ProductCategoryPageProps {
  title: string;
  subtitle: string;
  catCode: string;
  heroImage: string;
  subcategoryId?: string;
}

export default function ProductCategoryPage({
  title,
  subtitle,
  catCode,
  heroImage,
  subcategoryId,
}: ProductCategoryPageProps) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [successCases, setSuccessCases] = useState<SuccessCase[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/data/category?catCode=${catCode}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.code !== 'C004') {
          let catList = data.stdCatList || [];
          if (subcategoryId) {
            catList = catList.filter(
              (cat: CategoryItem) => cat.stdCatId === subcategoryId
            );
          }
          setCategories(catList);
          setSuccessCases(data.successCaseList || []);
          setTechnologies(data.technologyList || []);
        } else {
          setCategories([]);
          setSuccessCases([]);
          setTechnologies([]);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [catCode, subcategoryId]);

  // Intersection observer for animations
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
  }, [categories, successCases, technologies, loading]);

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionsRef.current[idx] = el;
    },
    []
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[520px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}
            >
              {title}
            </h1>
            <p
              className="text-lg md:text-xl text-white/80 leading-relaxed"
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.15s forwards',
                opacity: 0,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/en"
              className="text-gray-500 hover:text-[#DC0043] transition-colors"
            >
              Home
            </Link>
            <ChevronRight />
            <Link
              href="/en/product/mobility"
              className="text-gray-500 hover:text-[#DC0043] transition-colors"
            >
              Products
            </Link>
            <ChevronRight />
            <span className="text-[#DC0043] font-medium">{title}</span>
          </nav>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse"
                >
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-6">
                    <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-2/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {!loading && error && (
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DC0043"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#191919] mb-2">
              Unable to load data
            </h3>
            <p className="text-gray-500">
              Please try again later or contact support.
            </p>
          </div>
        </section>
      )}

      {/* Category Cards Grid */}
      {!loading && !error && (
        <section
          ref={setSectionRef(0)}
          className="section-animate py-16 md:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-3">
                {subcategoryId ? 'Products' : 'Product Categories'}
              </h2>
              <div className="w-16 h-1 bg-[#DC0043] rounded-full" />
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                  <div
                    key={cat.stdCatId}
                    className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${idx * 0.08}s forwards`,
                      opacity: 0,
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {cat.imgFilePath ? (
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{
                            backgroundImage: `url('${cat.imgFilePath}')`,
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ccc"
                            strokeWidth="1.5"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                            />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#191919] mb-2 group-hover:text-[#DC0043] transition-colors duration-300">
                        {cat.stdCatNm}
                      </h3>
                      {cat.stdCatDesc && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                          {cat.stdCatDesc}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[#DC0043] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Learn more
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="m9 4 4 4-4 4M3 8h10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ccc"
                    strokeWidth="1.5"
                  >
                    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#191919] mb-2">
                  No categories available
                </h3>
                <p className="text-gray-500">
                  Check back later for product updates.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Success Cases Section */}
      {!loading && successCases.length > 0 && (
        <section
          ref={setSectionRef(1)}
          className="section-animate py-16 md:py-24 bg-gray-50"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-3">
                Success Cases
              </h2>
              <div className="w-16 h-1 bg-[#DC0043] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successCases.map((sc, idx) => (
                <div
                  key={sc.successCaseSeq || idx}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  {sc.imgFilePath && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{
                          backgroundImage: `url('${sc.imgFilePath}')`,
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#191919] mb-2 group-hover:text-[#DC0043] transition-colors">
                      {sc.ttl}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {sc.sumryCont}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {!loading && technologies.length > 0 && (
        <section
          ref={setSectionRef(2)}
          className="section-animate py-16 md:py-24"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-3">
                Technologies
              </h2>
              <div className="w-16 h-1 bg-[#DC0043] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, idx) => (
                <div
                  key={tech.techSeq || idx}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  {tech.imgFilePath && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{
                          backgroundImage: `url('${tech.imgFilePath}')`,
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#191919] mb-2 group-hover:text-[#DC0043] transition-colors">
                      {tech.ttl}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {tech.sumryCont}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!loading && !error && (
        <section className="py-16 md:py-24 bg-[#191919]">
          <div className="max-w-[1400px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Contact our team for detailed product specifications, custom
              solutions, and technical support.
            </p>
            <Link
              href="/en/contact/inquiry"
              className="inline-flex items-center justify-center px-8 h-14 rounded-full bg-[#DC0043] text-white font-bold hover:bg-[#BB1E4D] transition-colors duration-300"
            >
              Contact Us
              <svg
                className="ml-2"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="m9 4 4 4-4 4M3 8h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-gray-400 flex-shrink-0"
    >
      <path
        d="m6 4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
