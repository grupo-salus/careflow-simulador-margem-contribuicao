import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Buscar...",
  className = "",
  onFocus
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-careflow-gray-400 w-5 h-5" />
              <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white border border-careflow-gray-300 rounded-lg focus:ring-2 focus:ring-careflow-primary focus:border-careflow-primary transition-all duration-200 hover:border-careflow-gray-400"
        />
    </div>
  );
} 