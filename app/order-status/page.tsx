import { Suspense } from 'react';
import { OrderStatusContent } from './OrderStatusContent';

function OrderStatusFallback() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<OrderStatusFallback />}>
      <OrderStatusContent />
    </Suspense>
  );
}
