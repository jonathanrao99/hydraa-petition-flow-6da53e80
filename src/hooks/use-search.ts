import { useState, useCallback, useMemo } from 'react';
import { debounce } from '@/lib/utils';

interface UseSearchOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
}

export function useSearch<T>({ data, searchKeys, debounceMs = 300 }: UseSearchOptions<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, debounceMs),
    [debounceMs]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearchTerm);
        }
        if (typeof value === 'number') {
          return value.toString().includes(lowerSearchTerm);
        }
        return false;
      })
    );
  }, [data, searchKeys, searchTerm]);

  const handleSearch = useCallback((value: string) => {
    debouncedSetSearchTerm(value);
  }, [debouncedSetSearchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    filteredData,
    handleSearch,
    clearSearch,
  };
} 