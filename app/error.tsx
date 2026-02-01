'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="max-w-md w-full bg-neutral-0 border border-neutral-200 p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-error-50 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-error-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-heading-1 text-neutral-900">Something went wrong</h1>
          <p className="text-body text-neutral-500">
            We encountered an unexpected error. Our team has been notified.
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-neutral-900 text-neutral-0 py-3 text-body font-medium hover:bg-neutral-800 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="w-full border border-neutral-200 py-3 text-body font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left p-4 bg-neutral-50 overflow-auto max-h-40">
            <p className="text-[10px] font-mono text-error-700">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
