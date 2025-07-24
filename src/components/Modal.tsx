import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-sm sm:max-w-md";
      case "lg":
        return "max-w-2xl sm:max-w-4xl";
      case "xl":
        return "max-w-4xl sm:max-w-6xl";
      default:
        return "max-w-lg sm:max-w-2xl";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div
          className={`relative w-full ${getSizeClasses()} bg-white rounded-lg shadow-xl transform transition-all max-h-[90vh] overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-careflow-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-careflow-gray-900 pr-2">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-careflow-gray-400 hover:text-careflow-gray-600 hover:bg-careflow-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
