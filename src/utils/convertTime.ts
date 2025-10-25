export const timeUnits = [
  { code: "s", name: "Second", symbol: "s", toSecond: 1 },
  { code: "min", name: "Minute", symbol: "min", toSecond: 60 },
  { code: "h", name: "Hour", symbol: "h", toSecond: 3600 },
  { code: "d", name: "Day", symbol: "d", toSecond: 86400 },
];

export function convertTime(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const fromUnitData = timeUnits.find((unit) => unit.code === fromUnit);
  const toUnitData = timeUnits.find((unit) => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) return value;

  const seconds = value * fromUnitData.toSecond;
  return seconds / toUnitData.toSecond;
}
