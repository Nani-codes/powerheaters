'use client';

import ProductCategoryPage from '@/components/ProductCategoryPage';

export default function HomeAppliancePage() {
  return (
    <ProductCategoryPage
      title="Home Appliance"
      subtitle="High-quality injection molding solutions for refrigerators, washing machines, air conditioners, and more."
      catCode="CSCG000002"
      heroImage="/static/images/product/hero-athome.jpg"
      subcategoryId="home-appliance"
    />
  );
}
