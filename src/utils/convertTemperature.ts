export const temperatureUnits = [
  { code: "C", name: "Celsius", symbol: "°C" },
  { code: "F", name: "Fahrenheit", symbol: "°F" },
  { code: "K", name: "Kelvin", symbol: "K" },
];

export function convertTemperature(
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (fromUnit === toUnit) return value;

  let celsius: number;

  switch (fromUnit) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  switch (toUnit) {
    case "C":
      return celsius;
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      return celsius;
  }
}
