export const weightUnits = [
  { code: "g", name: "Gram", symbol: "g", toGram: 1 },
  { code: "kg", name: "Kilogram", symbol: "kg", toGram: 1000 },
  { code: "lb", name: "Pound", symbol: "lb", toGram: 453.592 },
  { code: "oz", name: "Ounce", symbol: "oz", toGram: 28.3495 },
];

export function convertWeight(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const fromUnitData = weightUnits.find((unit) => unit.code === fromUnit);
  const toUnitData = weightUnits.find((unit) => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) return value;

  const grams = value * fromUnitData.toGram;
  return grams / toUnitData.toGram;
}
