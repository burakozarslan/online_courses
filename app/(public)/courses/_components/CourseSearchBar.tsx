'use client';

import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function CourseSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/courses${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative grow">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search modules (e.g. 'Postgres', 'React')..."
          className="w-full pl-12 pr-4 py-3 bg-neutral-0 border border-neutral-300 text-body focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder-neutral-400 transition-colors"
        />
      </div>
      <button 
        onClick={handleSearch}
        className="px-6 py-3 bg-neutral-900 text-neutral-0 text-body font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
      >
        <Search className="size-4" />
        Search
      </button>
    </div>
  );
}
