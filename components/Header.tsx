'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Home } from 'lucide-react';

export function Header() {
  const { items } = useCart();
  const totalItems = items.length;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
            <span>🚗</span>
            <span>CarCare Pro</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="hover:text-blue-200 transition flex items-center gap-1">
              <Home size={18} />
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
          </nav>

          <Link
            href="/checkout"
            className="relative flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
