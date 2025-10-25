export const lengthUnits = [
  { code: "m", name: "Meter", symbol: "m", toMeter: 1 },
  { code: "km", name: "Kilometer", symbol: "km", toMeter: 1000 },
  { code: "in", name: "Inch", symbol: "in", toMeter: 0.0254 },
  { code: "ft", name: "Foot", symbol: "ft", toMeter: 0.3048 },
  { code: "mi", name: "Mile", symbol: "mi", toMeter: 1609.34 },
];

export function convertLength(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const fromUnitData = lengthUnits.find((unit) => unit.code === fromUnit);
  const toUnitData = lengthUnits.find((unit) => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) return value;

  const meters = value * fromUnitData.toMeter;
  return meters / toUnitData.toMeter;
}
