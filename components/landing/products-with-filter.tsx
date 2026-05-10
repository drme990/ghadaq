'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Product } from '@/types/Product';
import ProductCard from '@/components/products/product-card';
import Button from '@/components/ui/button';

const STORAGE_KEY = 'selectedProductLabel';

interface LandingProductsWithFilterProps {
  products: Product[];
  locale: string;
}

export default function LandingProductsWithFilter({
  products,
  locale,
}: LandingProductsWithFilterProps) {
  const t = useTranslations('labels');
  const currentLocale = useLocale();

  // Extract unique labels from products
  const availableLabels = useMemo(() => {
    return products.reduce((acc, product) => {
      const label = product.label?.[currentLocale as 'ar' | 'en'];

      if (label && !acc.includes(label)) {
        acc.push(label);
      }

      return acc;
    }, [] as string[]);
  }, [products, currentLocale]);

  // Load initial value from localStorage
  const [storedLabel, setStoredLabel] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem(STORAGE_KEY);
  });

  // Validate selected label WITHOUT useEffect
  const selectedLabel = useMemo(() => {
    if (!storedLabel) return null;

    if (storedLabel === '__daily__') {
      return storedLabel;
    }

    return availableLabels.includes(storedLabel) ? storedLabel : null;
  }, [storedLabel, availableLabels]);

  const hasProductsWithLabels = availableLabels.length > 0;

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedLabel === null) {
      return products;
    }

    if (selectedLabel === '__daily__') {
      return products.filter(
        (product) =>
          product.showAlways || !product.label?.[currentLocale as 'ar' | 'en'],
      );
    }

    return products.filter(
      (product) =>
        product.showAlways ||
        product.label?.[currentLocale as 'ar' | 'en'] === selectedLabel,
    );
  }, [products, selectedLabel, currentLocale]);

  const handleSelectLabel = (label: string | null) => {
    setStoredLabel(label);

    if (label === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, label);
    }
  };

  // No filters available
  if (!hasProductsWithLabels) {
    return (
      <div className="relative">
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 w-max">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                locale={locale}
                variant="carousel"
                revealDelayMs={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filter Tabs */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2" style={{ minHeight: '36px' }}>
          {/* Show All */}
          <button
            onClick={() => handleSelectLabel(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedLabel === null
                ? 'bg-primary text-white shadow-md'
                : 'bg-secondary/50 text-foreground'
            }`}
          >
            {t('showAll')}
          </button>

          {/* Daily */}
          <button
            onClick={() => handleSelectLabel('__daily__')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedLabel === '__daily__'
                ? 'bg-primary text-white shadow-md'
                : 'bg-secondary/50 text-foreground'
            }`}
          >
            {t('daily')}
          </button>

          {/* Labels */}
          {availableLabels.map((label) => (
            <button
              key={label}
              onClick={() => handleSelectLabel(label)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLabel === label
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-secondary/50 text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-secondary text-base">
            {selectedLabel === '__daily__'
              ? 'No regular products available'
              : `No products with label "${selectedLabel}"`}
          </p>

          <Button
            variant="outline"
            onClick={() => handleSelectLabel(null)}
            className="mt-4"
          >
            {t('showAll')}
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 w-max">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  locale={locale}
                  variant="carousel"
                  revealDelayMs={index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
