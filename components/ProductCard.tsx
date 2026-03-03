'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </span>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Add to Cart Section */}
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 border-2 border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              −
            </button>
            <span className="px-3 py-2 min-w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>

        {showAddedNotification && (
          <div className="mt-2 text-center text-sm text-green-600 font-semibold">
            ✓ Added to cart
          </div>
        )}
      </div>
    </div>
  );
}
