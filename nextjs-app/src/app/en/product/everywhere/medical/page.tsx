'use client';

import ProductCategoryPage from '@/components/ProductCategoryPage';

export default function MedicalPage() {
  return (
    <ProductCategoryPage
      title="Medical"
      subtitle="Clean-room grade hot runner solutions for medical devices, diagnostic equipment, and pharmaceutical packaging."
      catCode="CSCG000005"
      heroImage="/static/images/product/hero-everywhere.jpg"
      subcategoryId="medical"
    />
  );
}
