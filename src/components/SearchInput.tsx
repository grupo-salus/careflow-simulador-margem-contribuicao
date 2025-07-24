import React from "react";
import { Search } from "lucide-react";

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
  onFocus,
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-careflow-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-white border border-careflow-gray-300 rounded-lg transition-all duration-200 hover:border-careflow-gray-400 focus:border-careflow-gray-400 focus:outline-none text-sm sm:text-base relative z-0"
        style={{ backgroundColor: "white", outline: "none" }}
      />
    </div>
  );
}
