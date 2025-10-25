"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchSelect from "@/components/SearchSelect";
import {
  currencyUnits,
  fetchExchangeRates,
  convertCurrency,
} from "@/utils/convertCurrency";
import {
  temperatureUnits,
  convertTemperature,
} from "@/utils/convertTemperature";
import { lengthUnits, convertLength } from "@/utils/convertLength";
import { weightUnits, convertWeight } from "@/utils/convertWeight";
import { timeUnits, convertTime } from "@/utils/convertTime";
import { energyUnits, convertEnergy } from "@/utils/convertEnergy";
import { areaUnits, convertArea } from "@/utils/convertArea";

interface ConverterCardProps {
  type: string;
}

export default function ConverterCard({ type }: Readonly<ConverterCardProps>) {
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const numericAmount = useMemo(() => Number.parseFloat(amount) || 0, [amount]);

  useEffect(() => {
    if (type === "currency") {
      setError(null);
      fetchExchangeRates("USD").then((r) => {
        if (r === null) {
          setError(
            "Failed to fetch exchange rates. Please check your internet connection."
          );
          setRates(null);
        } else {
          setRates(r);
          setError(null);
        }
      });
    }
  }, [type]);

  useEffect(() => {
    switch (type) {
      case "currency":
        setFromUnit("USD");
        setToUnit("THB");
        break;
      case "temperature":
        setFromUnit("C");
        setToUnit("F");
        break;
      case "length":
        setFromUnit("m");
        setToUnit("km");
        break;
      case "weight":
        setFromUnit("g");
        setToUnit("kg");
        break;
      case "time":
        setFromUnit("s");
        setToUnit("min");
        break;
      case "energy":
        setFromUnit("J");
        setToUnit("kWh");
        break;
      case "area":
        setFromUnit("m2");
        setToUnit("ft2");
        break;
      default:
        setFromUnit("");
        setToUnit("");
    }
    setAmount("1");
  }, [type]);

  const unitList: Array<{ code: string; label: string }> = useMemo(() => {
    switch (type) {
      case "currency":
        return currencyUnits.map((u) => ({ code: u.code, label: `${u.code}` }));
      case "temperature":
        return temperatureUnits.map((u) => ({
          code: u.code,
          label: `${u.symbol}`,
        }));
      case "length":
        return lengthUnits.map((u) => ({ code: u.code, label: `${u.symbol}` }));
      case "weight":
        return weightUnits.map((u) => ({ code: u.code, label: `${u.symbol}` }));
      case "time":
        return timeUnits.map((u) => ({ code: u.code, label: `${u.symbol}` }));
      case "energy":
        return energyUnits.map((u) => ({ code: u.code, label: `${u.symbol}` }));
      case "area":
        return areaUnits.map((u) => ({ code: u.code, label: `${u.symbol}` }));
      default:
        return [];
    }
  }, [type]);

  const result = useMemo(() => {
    if (!fromUnit || !toUnit) return 0;
    switch (type) {
      case "currency":
        return convertCurrency(
          numericAmount,
          fromUnit,
          toUnit,
          rates ?? undefined
        );
      case "temperature":
        return convertTemperature(numericAmount, fromUnit, toUnit);
      case "length":
        return convertLength(numericAmount, fromUnit, toUnit);
      case "weight":
        return convertWeight(numericAmount, fromUnit, toUnit);
      case "time":
        return convertTime(numericAmount, fromUnit, toUnit);
      case "energy":
        return convertEnergy(numericAmount, fromUnit, toUnit);
      case "area":
        return convertArea(numericAmount, fromUnit, toUnit);
      default:
        return 0;
    }
  }, [numericAmount, fromUnit, toUnit, type, rates]);

  return (
    <div className="glass-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 md:col-span-2">
          <label htmlFor="amount" className="text-white/80 text-sm">
            Amount
          </label>
          <input
            id="amount"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            inputMode="decimal"
            className="glass-input w-full"
            placeholder="0"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="fromUnit" className="text-white/80 text-sm">
            From
          </label>
          <SearchSelect
            id="fromUnit"
            options={unitList}
            value={fromUnit}
            onChange={setFromUnit}
            placeholder="Select"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="toUnit" className="text-white/80 text-sm">
            To
          </label>
          <SearchSelect
            id="toUnit"
            options={unitList}
            value={toUnit}
            onChange={setToUnit}
            placeholder="Select"
          />
        </div>

        <motion.div
          className="space-y-3 md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label htmlFor="result" className="text-white/80 text-sm">
            Result
          </label>
          {error ? (
            <div className="glass rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          ) : (
            <div
              id="result"
              className="glass rounded-xl p-4 text-white text-xl font-semibold"
            >
              {Number.isFinite(result)
                ? result.toLocaleString(undefined, { maximumFractionDigits: 6 })
                : "0"}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
