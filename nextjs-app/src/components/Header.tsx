'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { YudoLogo } from './YudoLogo';

interface MenuChild {
  menuCd: string;
  menuUrl: string;
  webMenuNm: string;
  moMenuNm: string;
  menuImgFilePath: string;
  menuImgFileNm: string;
  children: MenuChild[];
}

interface MenuItemData {
  menuCd: string;
  menuUrl: string;
  webMenuNm: string;
  moMenuNm: string;
  menuTarget: string;
  className: string;
  children: MenuChild[];
}

export default function Header() {
  const [menu, setMenu] = useState<MenuItemData[]>([]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/data/menu-list')
      .then((r) => r.json())
      .then((data) => {
        const allMenus = data.menuList;
        const depth1 = allMenus.filter((m: any) => m.menuDepth === '1');  // eslint-disable-line @typescript-eslint/no-explicit-any
        const processed = depth1.map((m1: any, idx: number) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
          const webMenuNm = m1.menuLangList?.find((l: any) => l.lang === 'en')?.webMenuNm || '';  // eslint-disable-line @typescript-eslint/no-explicit-any
          const moMenuNm = m1.menuLangList?.find((l: any) => l.lang === 'en')?.moMenuNm || '';  // eslint-disable-line @typescript-eslint/no-explicit-any
          const depth2 = allMenus.filter((m: any) => m.uprMenuCd === m1.menuCd && m.menuDepth === '2');  // eslint-disable-line @typescript-eslint/no-explicit-any
          const children = depth2.map((m2: any, idx2: number) => {  // eslint-disable-line @typescript-eslint/no-explicit-any
            const web2 = m2.menuLangList?.find((l: any) => l.lang === 'en')?.webMenuNm || '';  // eslint-disable-line @typescript-eslint/no-explicit-any
            const mo2 = m2.menuLangList?.find((l: any) => l.lang === 'en')?.moMenuNm || '';  // eslint-disable-line @typescript-eslint/no-explicit-any
            const depth3 = allMenus.filter((m: any) => m.uprMenuCd === m2.menuCd && m.menuDepth === '3');  // eslint-disable-line @typescript-eslint/no-explicit-any
            const children3 = depth3.map((m3: any) => ({  // eslint-disable-line @typescript-eslint/no-explicit-any
              menuCd: m3.menuCd,
              menuUrl: `/en${m3.menuUrl}`,
              webMenuNm: m3.menuLangList?.find((l: any) => l.lang === 'en')?.webMenuNm || '',  // eslint-disable-line @typescript-eslint/no-explicit-any
              moMenuNm: m3.menuLangList?.find((l: any) => l.lang === 'en')?.moMenuNm || '',  // eslint-disable-line @typescript-eslint/no-explicit-any
              menuImgFilePath: m3.menuImgFilePath || '',
              menuImgFileNm: m3.menuImgFileNm || '',
              children: [],
            }));
            return {
              menuCd: m2.menuCd,
              menuUrl: m2.menuUrl.includes('javascript') ? '#' : `/en${m2.menuUrl}`,
              webMenuNm: web2,
              moMenuNm: mo2,
              menuImgFilePath: m2.menuImgFilePath || '',
              menuImgFileNm: m2.menuImgFileNm || '',
              className: `depth2-${idx2}`,
              children: children3,
            };
          });
          return {
            menuCd: m1.menuCd,
            menuUrl: m1.menuCd === 'MENU05' ? m1.menuUrl : `/en${m1.menuUrl}`,
            webMenuNm,
            moMenuNm,
            menuTarget: m1.menuCd === 'MENU05' ? '_blank' : '_self',
            className: `depth1-${String(idx + 1).padStart(2, '0')}`,
            children,
          };
        });
        setMenu(processed);
      });
  }, []);

  const isHovered = hoveredMenu !== null;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHovered ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
      onMouseLeave={() => {
        setHoveredMenu(null);
        setHoveredSub(0);
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/en">
            <YudoLogo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {menu.map((item) => (
            <div
              key={item.menuCd}
              className="relative"
              onMouseEnter={() => {
                setHoveredMenu(item.menuCd);
                setHoveredSub(0);
              }}
            >
              <Link
                href={item.menuUrl}
                target={item.menuTarget}
                className={`text-base font-bold py-6 block transition-colors ${
                  hoveredMenu === item.menuCd ? 'text-[#DC0043]' : 'text-[#191919] hover:text-[#DC0043]'
                }`}
              >
                {item.webMenuNm}
              </Link>
            </div>
          ))}
        </nav>

        {/* Language + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="relative group">
            <button className="p-1">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#a)" stroke="#191919" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round">
                  <path d="M27 16c0 6.075-4.925 11-11 11S5 22.075 5 16 9.925 5 16 5s11 4.925 11 11z" />
                  <path d="M22 16c0 3.169-.751 5.988-1.914 7.981C18.909 26 17.43 27 16 27c-1.43 0-2.909-1-4.086-3.019C10.751 21.988 10 19.168 10 16s.751-5.988 1.914-7.981C13.091 6 14.57 5 16 5c1.43 0 2.909 1 4.086 3.019C21.249 10.012 22 12.832 22 16z" />
                  <path d="M5 16h22M16 5v22" strokeLinecap="round" />
                </g>
              </svg>
            </button>
            <div className="absolute right-0 top-full hidden group-hover:block bg-white shadow-lg rounded-lg py-2 min-w-[120px]">
              <Link href="/en" className="block px-4 py-2 text-base hover:bg-gray-50 font-bold text-[#DC0043]">
                English
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8 8 24M24 24 8 8" stroke="#333" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8h20M6 16h20M6 24h20" stroke="#191919" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {isHovered && (
        <div className="hidden lg:block bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            {menu
              .filter((item) => item.menuCd === hoveredMenu && item.children.length > 0)
              .map((item) => (
                <div key={item.menuCd}>
                  {/* Products have a special layout with tabs */}
                  {item.menuCd === 'MENU01' ? (
                    <div className="flex gap-8">
                      <div className="w-48 flex-shrink-0">
                        {item.children.map((child, idx) => (
                          <div
                            key={child.menuCd}
                            className={`py-2 cursor-pointer transition-colors ${
                              hoveredSub === idx ? 'text-[#DC0043] font-bold' : 'text-gray-600'
                            }`}
                            onMouseEnter={() => setHoveredSub(idx)}
                          >
                            <Link href={child.menuUrl} className="text-base font-bold block">
                              {child.webMenuNm}
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        {item.children[hoveredSub] && (
                          <div className="flex gap-6 flex-wrap">
                            {item.children[hoveredSub].children.map((sub) => (
                              <Link
                                key={sub.menuCd}
                                href={sub.menuUrl}
                                className="text-sm text-gray-500 hover:text-[#DC0043] transition-colors"
                              >
                                {sub.webMenuNm}
                              </Link>
                            ))}
                            {item.children[hoveredSub].menuImgFileNm && (
                              <div className="ml-auto">
                                <div
                                  className="w-48 h-32 rounded-lg bg-cover bg-center"
                                  style={{
                                    backgroundImage: `url('${item.children[hoveredSub].menuImgFilePath}')`,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {item.children.map((child) => (
                        <Link
                          key={child.menuCd}
                          href={child.menuUrl}
                          className="group block"
                        >
                          {child.menuImgFileNm && (
                            <div
                              className="w-full h-32 rounded-lg bg-cover bg-center mb-3"
                              style={{
                                backgroundImage: `url('${child.menuImgFilePath}')`,
                              }}
                            />
                          )}
                          <span className="text-base font-bold text-gray-800 group-hover:text-[#DC0043] transition-colors">
                            {child.webMenuNm}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white overflow-y-auto z-40">
          <div className="p-6">
            {menu.map((item) => (
              <div key={item.menuCd} className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between py-4 text-base font-bold text-[#191919]"
                  onClick={() => {
                    if (item.children.length === 0) {
                      window.location.href = item.menuUrl;
                    } else {
                      setMobileExpandedMenu(
                        mobileExpandedMenu === item.menuCd ? null : item.menuCd
                      );
                    }
                  }}
                >
                  {item.moMenuNm || item.webMenuNm}
                  {item.children.length > 0 && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition-transform ${
                        mobileExpandedMenu === item.menuCd ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M6.707 8.293a1 1 0 0 0-1.414 1.414l1.414-1.414zM12 15l-.707.707a1 1 0 0 0 1.414 0L12 15zm6.707-5.293a1 1 0 0 0-1.414-1.414l1.414 1.414zm-13.414 0 6 6 1.414-1.414-6-6-1.414 1.414zm7.414 6 6-6-1.414-1.414-6 6 1.414 1.414z"
                        fill="#191919"
                      />
                    </svg>
                  )}
                </button>
                {mobileExpandedMenu === item.menuCd && item.children.length > 0 && (
                  <div className="pb-4 pl-4">
                    {item.children.map((child) => (
                      <div key={child.menuCd}>
                        <Link
                          href={child.menuUrl}
                          className="block py-2 text-base font-bold text-gray-600 hover:text-[#DC0043]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.moMenuNm || child.webMenuNm}
                        </Link>
                        {child.children.length > 0 && (
                          <div className="pl-4">
                            {child.children.map((sub) => (
                              <Link
                                key={sub.menuCd}
                                href={sub.menuUrl}
                                className="block py-1.5 text-sm text-gray-500 hover:text-[#DC0043]"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.moMenuNm || sub.webMenuNm}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
