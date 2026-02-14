'use client';

import ProductCategoryPage from '@/components/ProductCategoryPage';

export default function AutomotivePage() {
  return (
    <ProductCategoryPage
      title="Automotive"
      subtitle="Advanced hot runner solutions for automotive plastic components — from interior trims to exterior body parts."
      catCode="CSCG000001"
      heroImage="/static/images/product/hero-mobility.jpg"
      subcategoryId="automotive"
    />
  );
}
