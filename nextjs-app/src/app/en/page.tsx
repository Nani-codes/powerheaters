'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import InquiryModal from '@/components/InquiryModal';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Banner {
  bnnrLocaCd: string;
  imgFilePath: string;
  imgFileNm: string;
  url: string;
  linkCd: string;
  dtlTpCd: string;
  bannerLangList: { ttl: string; mfgdNm?: string; mfgdExpssNm?: string; bannerLangHashtagList?: { hashtagNm: string }[] }[];
}

interface NewsItem {
  newsSeq: string;
  imgFilePath: string;
  dtlTpCd: string;
  url: string;
  linkCd: string;
  newsTpNameCache: string;
  newsLangList: { ttl: string; sumryCont: string }[];
}

export default function HomePage() {
  const [topBanners, setTopBanners] = useState<Banner[]>([]);
  const [middleBanners, setMiddleBanners] = useState<Banner[]>([]);
  const [bottomBanners, setBottomBanners] = useState<Banner[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeTopBanner, setActiveTopBanner] = useState(0);
  const topSwiperRef = useRef<SwiperType | null>(null);
  const productSwiperRef = useRef<SwiperType | null>(null);
  const newsSwiperRef = useRef<SwiperType | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('/api/data/home-page-init')
      .then((r) => r.json())
      .then((data) => {
        if (data.mainBanner) {
          setTopBanners(data.mainBanner.filter((b: Banner) => b.bnnrLocaCd === '001'));
          setMiddleBanners(data.mainBanner.filter((b: Banner) => b.bnnrLocaCd === '002'));
          setBottomBanners(data.mainBanner.filter((b: Banner) => b.bnnrLocaCd === '003'));
        }
        if (data.mainNews) {
          setNews(data.mainNews);
        }
      });
  }, []);

  // Intersection observer for section animations
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
  }, [topBanners, middleBanners, bottomBanners, news]);

  const setSectionRef = useCallback((idx: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[idx] = el;
  }, []);

  const getFileType = (fileName: string) => {
    if (/\.(jpeg|jpg|png)$/i.test(fileName)) return 'IMG';
    if (/\.(mp4)$/i.test(fileName)) return 'VOD';
    return 'IMG';
  };

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-screen bg-black overflow-hidden">
        {topBanners.length > 0 && (
          <>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={topBanners.length > 1}
              className="h-full"
              onSwiper={(swiper) => { topSwiperRef.current = swiper; }}
              onSlideChange={(swiper) => setActiveTopBanner(swiper.realIndex)}
            >
              {topBanners.map((banner, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full">
                    {getFileType(banner.imgFileNm) === 'VOD' ? (
                      <video
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={`/en${banner.imgFilePath}`} type="video/mp4" />
                      </video>
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/en${banner.imgFilePath}')` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center">
                      <div className="max-w-[1400px] mx-auto px-6 w-full">
                        <h2
                          className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-2xl"
                          dangerouslySetInnerHTML={{
                            __html: banner.bannerLangList?.[0]?.ttl?.replace(/\n/g, '<br/>') || '',
                          }}
                        />
                        <div className="mt-8">
                          <Link
                            href={banner.url || '#'}
                            className="inline-flex items-center justify-center px-8 h-14 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Learn more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Banner progress indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
              {topBanners.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeTopBanner === idx ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                  onClick={() => topSwiperRef.current?.slideTo(idx)}
                />
              ))}
            </div>

            {/* Banner navigation arrows */}
            {topBanners.length > 1 && (
              <>
                <button
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  onClick={() => topSwiperRef.current?.slidePrev()}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M26.786 6.428 13.214 20 26.786 33.57" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  onClick={() => topSwiperRef.current?.slideNext()}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M13.214 33.572 26.786 20 13.214 6.43" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </section>

      {/* Section 2: Everywhere you look */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Everywhere you look</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A laptop that is used anytime, anywhere. A car frame that is stronger than steel. A cell phone is being used every day.
                A safety helmet that protects you from danger. A PVC pipe that is resistant to heat and pollution.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We don&apos;t directly make various products in your space, but
              </p>
              <p className="text-lg text-gray-600 mb-8">We make them</p>
              <div className="text-5xl md:text-7xl font-bold text-[#DC0043] mb-8">
                <div className="overflow-hidden h-[1.2em]">
                  <div className="animate-[textRotate_10s_ease-in-out_infinite]">
                    <div>More convenient</div>
                    <div>More Safe</div>
                    <div>Stronger</div>
                    <div>Lighter</div>
                    <div>More beautiful</div>
                    <div>More diverse</div>
                    <div>Inexpensive</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex gap-4">
              <div className="w-1/2 overflow-hidden h-[500px] rounded-2xl rolling-container">
                <div className="rolling-list-down">
                  {[1, 2, 3, 1, 2, 3].map((n, i) => (
                    <div key={i} className="mb-4">
                      <Image
                        src={`/static/images/main/con_02-0${n}.jpg`}
                        alt=""
                        width={300}
                        height={400}
                        className="rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 overflow-hidden h-[500px] rounded-2xl rolling-container">
                <div className="rolling-list-up">
                  {[4, 5, 6, 4, 5, 6].map((n, i) => (
                    <div key={i} className="mb-4">
                      <Image
                        src={`/static/images/main/con_02-0${n}.jpg`}
                        alt=""
                        width={300}
                        height={400}
                        className="rounded-xl w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Company Mission */}
      <section
        ref={setSectionRef(1)}
        className="section-animate relative py-32 md:py-40"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/static/images/main/con_002_07.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-white mb-6">
            we make plastic that is safe, convenient, sustainable.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 max-w-3xl mx-auto">
            With YUDO&apos;s efforts and responsibilities, we are creating a better global environment.
          </h2>
          <Link
            href="/en/company/company-introduction"
            className="inline-flex items-center justify-center px-8 h-14 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            Learn more
          </Link>
          <div className="mt-20">
            <p className="text-lg text-white leading-relaxed max-w-2xl mx-auto">
              At home, work, various industrial sites...<br />
              Various products with our technology fill your space wherever you are.<br /><br />
              <strong>This is our objective to make plastics more sustainable.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Find YUDO - Middle Banners */}
      <section
        ref={setSectionRef(2)}
        className="section-animate py-24 md:py-32"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gray-400">Anywhere around you</span>
              <br />
              Find YUDO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {middleBanners.map((banner, idx) => (
              <Link
                key={idx}
                href={banner.url || '#'}
                className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('/en${banner.imgFilePath}')` }}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-3 group-hover:text-[#DC0043] transition-colors"
                    dangerouslySetInnerHTML={{
                      __html: banner.bannerLangList?.[0]?.ttl?.replace(/\n/g, '<br/>') || '',
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {banner.bannerLangList?.[0]?.bannerLangHashtagList?.map((tag: any, tagIdx: number) => (
                      <span key={tagIdx} className="text-sm text-gray-500">
                        #{tag.hashtagNm}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Product Swiper */}
      {bottomBanners.length > 0 && (
        <section
          ref={setSectionRef(3)}
          className="section-animate py-24 md:py-32 bg-gray-50"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView="auto"
                spaceBetween={24}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={bottomBanners.length > 1}
                onSwiper={(swiper) => { productSwiperRef.current = swiper; }}
                className="!overflow-visible"
              >
                {bottomBanners.map((banner, idx) => (
                  <SwiperSlide key={idx} className="!w-full md:!w-[80%] lg:!w-[70%]">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <p
                          className="text-lg font-bold text-[#DC0043] mb-2"
                          dangerouslySetInnerHTML={{
                            __html: banner.bannerLangList?.[0]?.mfgdNm?.replace(/\n/g, '<br/>') || '',
                          }}
                        />
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-3"
                          dangerouslySetInnerHTML={{
                            __html: banner.bannerLangList?.[0]?.ttl?.replace(/\n/g, '<br/>') || '',
                          }}
                        />
                        <p
                          className="text-lg text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: banner.bannerLangList?.[0]?.mfgdExpssNm?.replace(/\n/g, '<br/>') || '',
                          }}
                        />
                      </div>
                      <div className="md:w-1/2">
                        <Link href={banner.url || '#'}>
                          <div
                            className="aspect-[4/3] rounded-2xl bg-cover bg-center"
                            style={{ backgroundImage: `url('/en${banner.imgFilePath}')` }}
                          />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Product navigation arrows */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-gray-500 transition-colors"
                  onClick={() => productSwiperRef.current?.slidePrev()}
                >
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <path d="M26.786 6.429 13.214 20l13.572 13.571" stroke="#191919" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-gray-500 transition-colors"
                  onClick={() => productSwiperRef.current?.slideNext()}
                >
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <path d="M13.214 6.429 26.786 20 13.214 33.571" stroke="#191919" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 6: News */}
      {news.length > 0 && (
        <section
          ref={setSectionRef(4)}
          className="section-animate py-24 md:py-32"
        >
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">NEWS</h2>
                <p className="text-lg text-gray-500">
                  Check the YUDO group&apos;s press releases and industry insights.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button
                  className="w-12 h-10 flex items-center justify-center"
                  onClick={() => newsSwiperRef.current?.slidePrev()}
                >
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="M18 8 6 20l12 12M6 20h36" stroke="#E7E7E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="w-12 h-10 flex items-center justify-center"
                  onClick={() => newsSwiperRef.current?.slideNext()}
                >
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="m30 8 12 12-12 12M42 20H6" stroke="#E7E7E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onSwiper={(swiper) => { newsSwiperRef.current = swiper; }}
            >
              {news.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('/en${item.imgFilePath}')` }}
                      />
                    </div>
                    <span className="text-base text-gray-500 mb-2 block">{item.newsTpNameCache}</span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#DC0043] transition-colors line-clamp-2">
                      {item.newsLangList?.[0]?.ttl}
                    </h3>
                    <p className="text-base text-gray-500 line-clamp-2">
                      {item.newsLangList?.[0]?.sumryCont}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#DC0043] text-sm font-medium">
                      Learn more
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="m9 4 4 4-4 4M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Floating inquiry button */}
      <button
        onClick={() => setInquiryOpen(true)}
        className="fixed bottom-24 right-8 z-40 bg-[#DC0043] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#BB1E4D] transition-colors font-bold text-sm"
      >
        Contact Us
      </button>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
