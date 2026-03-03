'use client';

import { useParams } from 'next/navigation';
import { Product } from '@/types';
import productsData from '@/data/products.json';
import { ProductCard } from '@/components/ProductCard';

const products: Product[] = productsData as unknown as Product[];
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { ShoppingCart, Check, Star, Package, Truck } from 'lucide-react';
import Link from 'next/link';

const findProductById = (productId: number): Product | undefined => {
  return products.find((product) => product.id === productId);
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = findProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-700 transition">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, 3);

  return (
    <>
      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center gap-1">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.0 out of 5 - 128 reviews)</span>
              </div>

              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-green-600 mt-2">✓ In Stock</p>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 min-w-16 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition mb-4"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>

              {addedToCart && (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg border-2 border-green-300">
                  <Check size={20} />
                  <span className="font-semibold">Added to cart successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-4">
                <dt className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
                <dd className="text-gray-600">{value}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <Truck size={28} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Free Delivery</h3>
                <p className="text-gray-600 text-sm">On orders above ₹500. Delivered in 2-3 business days.</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <div className="flex gap-4 items-start">
              <Package size={28} className="text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Quality Assured</h3>
                <p className="text-gray-600 text-sm">All products are genuine and tested for quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
