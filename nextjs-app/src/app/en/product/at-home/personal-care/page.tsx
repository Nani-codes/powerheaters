'use client';

import ProductCategoryPage from '@/components/ProductCategoryPage';

export default function PersonalCarePage() {
  return (
    <ProductCategoryPage
      title="Personal Care"
      subtitle="Delivering excellence in personal care product manufacturing — from beauty devices to grooming tools."
      catCode="CSCG000002"
      heroImage="/static/images/product/hero-athome.jpg"
      subcategoryId="personal-care"
    />
  );
}
