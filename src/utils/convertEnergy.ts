export const energyUnits = [
  { code: "J", name: "Joule", symbol: "J", toJoule: 1 },
  { code: "cal", name: "Calorie", symbol: "cal", toJoule: 4.184 },
  { code: "kWh", name: "Kilowatt Hour", symbol: "kWh", toJoule: 3600000 },
];

export function convertEnergy(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  const fromUnitData = energyUnits.find((unit) => unit.code === fromUnit);
  const toUnitData = energyUnits.find((unit) => unit.code === toUnit);

  if (!fromUnitData || !toUnitData) return value;

  const joules = value * fromUnitData.toJoule;
  return joules / toUnitData.toJoule;
}
