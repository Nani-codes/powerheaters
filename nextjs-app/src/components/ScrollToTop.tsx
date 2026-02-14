'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center hover:shadow-xl transition-shadow"
    >
      <div className="text-xs font-bold text-gray-600 flex flex-col items-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m4 2 3.464 4.5H.536L4 2z" fill="#505050" />
        </svg>
        TOP
      </div>
    </button>
  );
}
