'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function ChairmanGreetingPage() {
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
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-[#DC0043] blur-[120px]" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-[#DC0043] font-bold text-sm tracking-widest uppercase mb-4">
              Leadership Message
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Chairman&apos;s Greeting
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl">
              A message from our leadership to our valued stakeholders.
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
            <span className="text-[#DC0043] font-medium">Chairman&apos;s Greeting</span>
          </nav>
        </div>
      </div>

      {/* Greeting Content */}
      <section
        ref={setSectionRef(0)}
        className="section-animate py-20 md:py-28"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Opening Quote */}
            <div className="mb-16 text-center">
              <div className="inline-block">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#DC0043" opacity="0.2">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#191919] mt-6 leading-relaxed">
                &ldquo;We believe that creating value for our customers<br className="hidden md:block" /> is the true growth of YUDO.&rdquo;
              </h2>
            </div>

            {/* Chairman info */}
            <div className="flex flex-col md:flex-row gap-12 mb-16">
              <div className="md:w-1/3">
                <div className="sticky top-28">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DC0043] to-[#a00033] mx-auto mb-6 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#191919] mb-1">Yujin Yu</h3>
                    <p className="text-[#DC0043] font-medium mb-4">Chairman of YUDO Group</p>
                    <div className="w-12 h-0.5 bg-[#DC0043] mx-auto" />
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    Dear valued customers, partners, and stakeholders,
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    Thank you sincerely for your continued trust and unwavering support of YUDO. It is with great pride and gratitude that I address you as we continue on our journey of innovation and excellence in the global hot runner industry.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    Since YUDO&apos;s establishment in 1980, we have been driven by a singular commitment: to deliver the finest hot runner systems and solutions that empower our customers to achieve greater efficiency, quality, and sustainability in their manufacturing operations.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    Over the past four decades, we have grown from a small enterprise in Seoul to the world&apos;s leading hot runner manufacturer, with operations spanning across more than 40 countries. This remarkable journey would not have been possible without the steadfast support of our customers and the dedication of our talented employees worldwide.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    As we look to the future, we remain firmly committed to our core values of <strong className="text-[#191919]">transparency</strong>, <strong className="text-[#191919]">communication</strong>, and <strong className="text-[#191919]">sensitivity</strong>. These principles guide every decision we make, from product development to customer service, ensuring that we consistently exceed expectations.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    We are investing heavily in research and development to pioneer next-generation technologies that will address the evolving needs of the plastics industry. Our focus on eco-friendly solutions and sustainable manufacturing practices reflects our deep commitment to creating a better global environment for future generations.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    Furthermore, we are strengthening our ESG management framework, enhancing corporate governance, and building a more inclusive and diverse organization that reflects the global nature of our business.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-6">
                    I am confident that with your continued partnership and the relentless efforts of the YUDO family, we will achieve even greater milestones in the years ahead. Together, we will shape the future of the plastics industry and create lasting value for all our stakeholders.
                  </p>
                  <p className="text-lg text-[#505050] leading-relaxed mb-8">
                    Thank you for being part of our story.
                  </p>

                  <div className="border-t border-gray-200 pt-8">
                    <p className="text-[#191919] font-bold text-lg">Yujin Yu</p>
                    <p className="text-[#DC0043] font-medium">Chairman, YUDO Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values highlight */}
      <section
        ref={setSectionRef(1)}
        className="section-animate py-20 md:py-24 bg-[#191919]"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Innovation',
                desc: 'Continuous investment in R&D to deliver cutting-edge solutions.',
              },
              {
                title: 'Global Reach',
                desc: 'Operations across 40+ countries with localized support and expertise.',
              },
              {
                title: 'Sustainability',
                desc: 'Committed to eco-friendly practices and a better global environment.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8">
                <div className="text-5xl font-bold text-[#DC0043] mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
