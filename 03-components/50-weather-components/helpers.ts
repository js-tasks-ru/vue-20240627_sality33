export const checkDay = (time: string, sunrise: string, sunset: string): boolean => {
  const sunHasRisen = Date.parse(`01.01.2020 ${time}`) > Date.parse(`01.01.2020 ${sunrise}`);
  const sunHasntSet = Date.parse(`01.01.2020 ${time}`) < Date.parse(`01.01.2020 ${sunset}`);
  return sunHasRisen && sunHasntSet;
}

export const convertTemperature = (kelvins: number): string => {
  return (kelvins - 273.15).toFixed(1);
}

export const convertPressure = (MPa: number): string => {
  return (MPa * 0.75).toFixed(0);
}
