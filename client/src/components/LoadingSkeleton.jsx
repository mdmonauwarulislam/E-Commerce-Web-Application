import React from 'react'

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  )
}

// Category Card Skeleton
export const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-3 animate-pulse">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg"></div>
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  )
}

// Banner Skeleton
export const BannerSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="h-64 md:h-80 lg:h-96 w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse shadow-2xl"></div>
    </div>
  )
}

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Horizontal Product List Skeleton
export const HorizontalProductListSkeleton = ({ count = 4 }) => {
  return (
    <div className="space-y-6">
      {/* Section header skeleton */}
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      
      {/* Products skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

// Page Skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 animate-pulse">
      {/* Hero Section */}
      <section className="py-8 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="flex items-center gap-6 justify-center overflow-x-auto pb-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <BannerSkeleton />

      {/* Featured Products */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <HorizontalProductListSkeleton count={4} />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 bg-white/20 rounded w-2/3 mx-auto mb-4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2 mx-auto mb-8"></div>
          <div className="h-12 bg-white/20 rounded w-48 mx-auto"></div>
        </div>
      </section>
    </div>
  )
}

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Table header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Table rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Form Skeleton
export const FormSkeleton = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="space-y-6">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        
        {/* Form fields */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
        
        {/* Submit button */}
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// Profile Skeleton
export const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default {
  ProductCardSkeleton,
  CategoryCardSkeleton,
  BannerSkeleton,
  ProductGridSkeleton,
  HorizontalProductListSkeleton,
  PageSkeleton,
  TableSkeleton,
  FormSkeleton,
  ProfileSkeleton
} 