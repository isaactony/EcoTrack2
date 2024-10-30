import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Supplier } from '../types';

interface SearchBarProps {
  suppliers: Supplier[];
  onSearch: (results: Supplier[]) => void;
}

export default function SearchBar({ suppliers, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const results = suppliers.filter((supplier) => {
      const searchStr = `${supplier.name} ${supplier.location}`.toLowerCase();
      const searchTerms = query.toLowerCase().split(' ');
      return searchTerms.every((term) => searchStr.includes(term));
    });
    onSearch(results);
  }, [query, suppliers, onSearch]);

  return (
    <div className="relative max-w-xl w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 ${focused ? 'text-green-500' : 'text-gray-400'}`}
          />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Search suppliers by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}