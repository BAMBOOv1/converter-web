"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Thermometer,
  Ruler,
  Scale,
  Clock,
  Zap,
  Square,
} from "lucide-react";

interface ConverterType {
  id: string;
  label: string;
  icon: string;
}

interface TabSelectorProps {
  converterTypes: ConverterType[];
  activeConverter: string;
  onConverterChange: (converter: string) => void;
}

const iconMap = {
  DollarSign,
  Thermometer,
  Ruler,
  Scale,
  Clock,
  Zap,
  Square,
};

export default function TabSelector({
  converterTypes,
  activeConverter,
  onConverterChange,
}: Readonly<TabSelectorProps>) {
  return (
    <div className="glass-card p-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {converterTypes.map((converter) => {
          const IconComponent = iconMap[converter.icon as keyof typeof iconMap];
          const isActive = activeConverter === converter.id;

          return (
            <motion.button
              key={converter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onConverterChange(converter.id)}
              className={`
                relative p-4 rounded-xl transition-all duration-200 
                ${
                  isActive
                    ? "bg-white/20 dark:bg-white/10 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center space-y-2">
                <IconComponent className="w-6 h-6" />
                <span className="text-sm font-medium">{converter.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
