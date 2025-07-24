import React from "react";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: "currency" | "number" | "time";
  min?: number;
  step?: number;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  type = "number",
  min = 0,
  step = 1,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(e.target.value) || 0;
    onChange(numValue);
  };

  const getStepValue = () => {
    if (type === "currency") return "0.01";
    return step.toString();
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative p-0.5 bg-gradient-to-r from-careflow-purple to-careflow-pink rounded-lg">
        <div className="relative bg-white rounded-lg">
          {prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-careflow-gray-500 text-sm font-medium z-10">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            min={min}
            step={getStepValue()}
            className={`w-full py-3 bg-white rounded-lg focus:ring-2 focus:ring-careflow-primary focus:outline-none transition-all duration-200 ${
              prefix ? "pl-8" : "px-4"
            } ${suffix ? "pr-16" : "pr-4"}`}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-careflow-gray-500 text-sm font-medium z-10">
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
