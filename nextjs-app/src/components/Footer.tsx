'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { YudoLogoLarge } from './YudoLogo';

interface FooterData {
  cpywrtCont: string;
  youtubeUrl: string;
  fbUrl: string;
  linkedInUrl: string;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [menu, setMenu] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    Promise.all([
      fetch('/api/data/footer').then((r) => r.json()),
      fetch('/api/data/menu-list').then((r) => r.json()),
    ]).then(([footer, menuData]) => {
      const enFooter = footer.footerLangList?.find((f: any) => f.lang === 'en'); // eslint-disable-line @typescript-eslint/no-explicit-any
      setFooterData({
        cpywrtCont: enFooter?.cpywrtCont || '',
        youtubeUrl: footer.youtubeUrl || '',
        fbUrl: footer.fbUrl || '',
        linkedInUrl: footer.linkedInUrl || '',
      });

      const allMenus = menuData.menuList;
      const depth1 = allMenus.filter((m: any) => m.menuDepth === '1'); // eslint-disable-line @typescript-eslint/no-explicit-any
      const processed = depth1.map((m1: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const webMenuNm = m1.menuLangList?.find((l: any) => l.lang === 'en')?.webMenuNm || ''; // eslint-disable-line @typescript-eslint/no-explicit-any
        const depth2 = allMenus.filter((m: any) => m.uprMenuCd === m1.menuCd && m.menuDepth === '2'); // eslint-disable-line @typescript-eslint/no-explicit-any
        const children = depth2.map((m2: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
          menuCd: m2.menuCd,
          menuUrl: m2.menuUrl.includes('javascript') ? '#' : `/en${m2.menuUrl}`,
          webMenuNm: m2.menuLangList?.find((l: any) => l.lang === 'en')?.webMenuNm || '', // eslint-disable-line @typescript-eslint/no-explicit-any
        }));
        return {
          menuCd: m1.menuCd,
          menuUrl: m1.menuCd === 'MENU05' ? m1.menuUrl : `/en${m1.menuUrl}`,
          webMenuNm,
          children,
        };
      });
      setMenu(processed);
    });
  }, []);

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Footer Navigation */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {menu.map((item) => (
            <div key={item.menuCd}>
              <Link
                href={item.menuUrl}
                className="text-lg font-bold text-white mb-4 block hover:text-[#DC0043] transition-colors"
              >
                {item.webMenuNm}
              </Link>
              <div className="space-y-2">
                {item.children.map((child: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <Link
                    key={child.menuCd}
                    href={child.menuUrl}
                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {child.webMenuNm}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <YudoLogoLarge />
          </div>
          <div
            className="text-sm text-gray-400 text-center"
            dangerouslySetInnerHTML={{ __html: footerData?.cpywrtCont || '' }}
          />
          <div className="flex items-center gap-4">
            {footerData?.fbUrl && (
              <a href={footerData.fbUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.733 15.933h2.6v-4h-3.866a5.135 5.135 0 0 0-3.934 1.934s-1.067 1-1.067 3.866v3h-3.8v4.334h3.8v11h4.4v-11H29.6l.533-4.334h-4.267v-3a1.735 1.735 0 0 1 1.867-1.8z" fill="currentColor" />
                </svg>
              </a>
            )}
            {footerData?.youtubeUrl && (
              <a href={footerData.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.733 17a3.467 3.467 0 0 0-2.533-2.533c-2.2-.6-11.2-.6-11.2-.6s-8.933 0-11.2.6A3.734 3.734 0 0 0 10.266 17c-.6 2.267-.6 7-.6 7s0 4.667.6 6.933a3.733 3.733 0 0 0 2.534 2.534c2.267.6 11.2.6 11.2.6s9 0 11.2-.6a3.467 3.467 0 0 0 2.533-2.534c.6-2.266.6-6.933.6-6.933s0-4.733-.6-7z" fill="currentColor" />
                  <path d="M21.067 28.267v-8.534L28.534 24l-7.467 4.267z" fill="#1a1a1a" />
                </svg>
              </a>
            )}
            {footerData?.linkedInUrl && (
              <a href={footerData.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.067 20.467H13.8V34.8h4.267V20.467z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M34.666 25.2v9.667H30.4v-7.734a2.667 2.667 0 0 0-5.333 0v7.734H20.8V20.533h4.267V22.6a5.133 5.133 0 0 1 5.733-2.4 5.2 5.2 0 0 1 3.866 5zM15.867 18.333a2.6 2.6 0 1 0-2.534-2.6 2.534 2.534 0 0 0 2.534 2.6z" fill="currentColor" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
