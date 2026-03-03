'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types';
import Link from 'next/link';
import { Package, CheckCircle, Clock, Truck } from 'lucide-react';

export function OrderStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(orderId || '');

  useEffect(() => {
    if (searchId) {
      fetchOrder(searchId);
    }
  }, [searchId]);

  const fetchOrder = (id: string) => {
    setLoading(true);
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.orderId === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setOrder(null);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchOrder(searchId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={32} />;
      case 'confirmed':
        return <CheckCircle className="text-blue-500" size={32} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={32} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={32} />;
      default:
        return <Package className="text-gray-500" size={32} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'shipped':
        return 'Order Shipped';
      case 'delivered':
        return 'Order Delivered';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter your Order ID (e.g., ORD1234567890)"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Track
          </button>
        </form>
      </div>

      {/* Order Details */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin">
            <Package size={40} className="text-blue-600" />
          </div>
          <p className="text-gray-600 mt-4">Loading order details...</p>
        </div>
      )}

      {!loading && !order && searchId && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center">
          <p className="text-lg text-red-700 font-semibold mb-4">Order Not Found</p>
          <p className="text-gray-600 mb-6">
            The order ID "{searchId}" does not exist. Please check and try again.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {!loading && order && (
        <div className="space-y-8">
          {/* Status Card */}
          <div className={`rounded-lg shadow-md p-8 border-2 ${getStatusColor(order.status)}`}>
            <div className="flex items-center gap-4 mb-4">
              {getStatusIcon(order.status)}
              <div>
                <h2 className="text-2xl font-bold">{getStatusText(order.status)}</h2>
                <p className="text-sm opacity-80">
                  Order ID: <span className="font-semibold">{order.orderId}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mb-2"></div>
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Placed</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${order.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'} mb-2`}></div>
                  <div className={`w-0.5 h-12 ${order.status !== 'pending' ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-600">
                    {order.status !== 'pending' ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'} mb-2`}></div>
                  <div className={`w-0.5 h-12 ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Shipped</p>
                  <p className="text-sm text-gray-600">
                    {['shipped', 'delivered'].includes(order.status) ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Order Delivered</p>
                  <p className="text-sm text-gray-600">
                    {order.status === 'delivered' ? 'Completed' : `Estimated: ${new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{order.customerPhone}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h3>
              <p className="text-gray-700 whitespace-pre-line">{order.deliveryAddress}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{order.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-semibold">₹{Math.round(order.totalPrice * 0.05).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">₹{Math.round(order.totalPrice * 1.05).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {!loading && !order && !searchId && (
        <div className="text-center py-12">
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-4">Enter your Order ID to track your order</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
