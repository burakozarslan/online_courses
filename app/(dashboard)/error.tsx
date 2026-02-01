'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6 lg:p-10">
      <div className="bg-neutral-0 border border-neutral-200 p-12 text-center space-y-4">
        <h2 className="text-heading-2 text-neutral-900">Failed to load dashboard</h2>
        <p className="text-body text-neutral-500 max-w-sm mx-auto">
          We had trouble loading your dashboard data. Please try refreshing or check your connection.
        </p>
        <div className="pt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 text-body font-medium hover:bg-brand-500 transition-colors"
          >
            <RefreshCcw className="size-4" />
            Reload Data
          </button>
        </div>
      </div>
    </div>
  );
}
