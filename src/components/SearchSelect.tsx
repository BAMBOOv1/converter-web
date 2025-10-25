"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

interface Option {
  code: string;
  label: string;
}

interface Props {
  id?: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => options.find((o) => o.code === value) || null,
    [options, value]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.code.toLowerCase().includes(q) || o.label.toLowerCase().includes(q)
    );
  }, [options, query]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass w-full rounded-xl px-4 py-3 text-left text-white flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? `${selected.label}` : placeholder || "Select"}</span>
        <ChevronDown className="w-4 h-4 text-white/80" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-xl p-2 bg-purple-950 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2 px-2 glass-input">
              <Search className="w-4 h-4 text-white/70" />
              <input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search"
                className="w-full border-none outline-none focus:outline-none bg-transparent placeholder:text-pink-200"
              />
            </div>
            <div className="max-h-32 overflow-auto rounded-lg">
              {filtered.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    onChange(opt.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-white hover:bg-white/10 ${
                    opt.code === value ? "bg-white/10" : ""
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-white/60">No results</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
