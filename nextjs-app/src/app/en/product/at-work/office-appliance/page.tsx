'use client';

import ProductCategoryPage from '@/components/ProductCategoryPage';

export default function OfficeAppliancePage() {
  return (
    <ProductCategoryPage
      title="Office Appliance"
      subtitle="Hot runner systems optimized for printers, scanners, projectors, and other office equipment manufacturing."
      catCode="CSCG000003"
      heroImage="/static/images/product/hero-atwork.jpg"
      subcategoryId="office-appliance"
    />
  );
}
