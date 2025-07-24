import React from "react";
import { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "blue" | "purple" | "orange" | "green" | "gray" | "red" | "orange-dark";
  trend?: "up" | "down" | "neutral";
}

export function ResultCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "blue",
  trend = "neutral",
}: ResultCardProps) {
  const getCardClasses = () => {
    switch (variant) {
      case "purple":
        return "border-careflow-gray-200 bg-white hover:bg-purple-50";
      case "orange":
        return "border-careflow-gray-200 bg-white hover:bg-orange-50";
      case "green":
        return "border-careflow-gray-200 bg-white hover:bg-green-50";
      case "gray":
        return "border-careflow-gray-200 bg-white hover:bg-careflow-gray-50";
      case "red":
        return "border-careflow-gray-200 bg-white hover:bg-red-50";
      case "orange-dark":
        return "border-careflow-gray-200 bg-white hover:bg-orange-50";
      default:
        return "border-careflow-gray-200 bg-white hover:bg-blue-50";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "purple":
        return "icon-box-purple";
      case "orange":
        return "icon-box-orange";
      case "green":
        return "icon-box-green";
      case "gray":
        return "icon-box bg-careflow-gray-100 text-careflow-gray-600";
      case "red":
        return "icon-box-red";
      case "orange-dark":
        return "icon-box-orange-dark";
      default:
        return "icon-box-blue";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border shadow-card hover:shadow-careflow transition-all duration-300 ${getCardClasses()}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-careflow-gray-600 mb-1">
            {title}
          </h3>
          <p className="text-2xl font-bold text-careflow-gray-900 mb-1">
            {value}
          </p>
          {subtitle && (
            <p className={`text-sm font-medium ${getTrendColor()}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={getIconClasses()}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
