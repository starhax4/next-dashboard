"use client";

import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Suspense } from 'react';

function SearchInner({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
  
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();

    params.set('page', '1');
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

function search({ placeholder }: { placeholder: string }) {
  return (
    <Suspense>
      <SearchInner placeholder={placeholder} />
    </Suspense>
  )
}

export default search
