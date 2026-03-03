import Link from 'next/link';
import { ArrowRight, ShoppingCart, Zap, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Car Care Products & Accessories
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our wide range of high-quality car maintenance products. Keep your vehicle running smoothly with our premium selection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              <ShoppingCart size={24} />
              Shop Now
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden flex items-center justify-center">
            <span className="text-8xl">🚗</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CarCare Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
              <Zap className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery across India with estimated timelines.
              </p>
            </div>
            <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
              <Award className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All products are genuine and tested for superior performance.
              </p>
            </div>
            <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
              <ShoppingCart className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with regular discounts and offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Shampoos', icon: '🧴' },
              { name: 'Cleaning Chemicals', icon: '🧪' },
              { name: 'Fresheners', icon: '🌸' },
            ].map((category) => (
              <Link
                key={category.name}
                href="/products"
                className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition text-center"
              >
                <span className="text-4xl block mb-2">{category.icon}</span>
                <p className="font-semibold text-gray-900">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Car?</h2>
          <p className="text-xl mb-8">
            Browse our collection and find everything you need for your vehicle.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
          >
            Explore Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
