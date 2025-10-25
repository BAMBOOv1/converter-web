"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border-b border-white/20 dark:border-white/10 "
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="glass rounded-xl p-2">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Universal Converter
              </h1>
              <p className="text-sm text-white/70">
                Convert anything, anywhere
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
