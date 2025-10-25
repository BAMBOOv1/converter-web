export const areaUnits = [
  { code: "m2", name: "Square Meter", symbol: "m²", toSquareMeter: 1 },
  { code: "ft2", name: "Square Foot", symbol: "ft²", toSquareMeter: 0.092903 },
  { code: "acre", name: "Acre", symbol: "acre", toSquareMeter: 4046.86 },
  { code: "hectare", name: "Hectare", symbol: "ha", toSquareMeter: 10000 },
];

export function convertArea(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const fromUnitData = areaUnits.find((unit) => unit.code === fromUnit);
  const toUnitData = areaUnits.find((unit) => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) return value;

  const squareMeters = value * fromUnitData.toSquareMeter;
  return squareMeters / toUnitData.toSquareMeter;
}
