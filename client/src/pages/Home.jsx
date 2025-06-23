import React, { useState, useEffect } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import { PageSkeleton } from '../components/LoadingSkeleton'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial page loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section with Categories */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 via-cyan-600/5 to-teal-600/5"></div>
        <div className="relative z-10">
          <CategoryList/>
          <BannerProduct/>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products designed to enhance your lifestyle
            </p>
          </div>
          
          <div className="space-y-16">
            <HorizontalCardProduct category={"airpodes"} heading={"Premium Airpods"}/>
            <HorizontalCardProduct category={"watches"} heading={"Luxury Watches"}/>
          </div>

        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of products across all categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <VerticalCardProduct category={"mobiles"} heading={"Smartphones"}/>
            <VerticalCardProduct category={"Mouse"} heading={"Computer Accessories"}/>
            <VerticalCardProduct category={"televisions"} heading={"Smart TVs"}/>
            <VerticalCardProduct category={"camera"} heading={"Photography"}/>
            <VerticalCardProduct category={"earphones"} heading={"Audio Solutions"}/>
            <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
            <VerticalCardProduct category={"refrigerator"} heading={"Home Appliances"}/>
            <VerticalCardProduct category={"trimmers"} heading={"Personal Care"}/>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust M Mart for their daily needs
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home