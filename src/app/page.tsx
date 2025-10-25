"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TabSelector from "@/components/TabSelector";
import ConverterCard from "@/components/ConverterCard";

const converterTypes = [
  { id: "currency", label: "Currency", icon: "DollarSign" },
  { id: "temperature", label: "Temperature", icon: "Thermometer" },
  { id: "length", label: "Length", icon: "Ruler" },
  { id: "weight", label: "Weight", icon: "Scale" },
  { id: "time", label: "Time", icon: "Clock" },
  { id: "energy", label: "Energy", icon: "Zap" },
  { id: "area", label: "Area", icon: "Square" },
];

export default function Home() {
  const [activeConverter, setActiveConverter] = useState("currency");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="min-h-screen backdrop-blur-sm bg-white/10 dark:bg-black/20">
        <Navbar />

        <main className="container mx-auto px-4 pt-8 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Universal Converter
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Convert between different units with ease and precision
            </p>
          </motion.div>

          <motion.div
            key={activeConverter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <TabSelector
              converterTypes={converterTypes}
              activeConverter={activeConverter}
              onConverterChange={setActiveConverter}
            />
            <div className="mt-8">
              <ConverterCard type={activeConverter} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
