import { AVAILABLE_LOCATIONS, INTERESTING_LOCATIONS } from "./constants";

export const getSuggestedLocations = () => {
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  if (availableLocations.length < 2) return availableLocations;

  const suggestedLocation1 = availableLocations.splice(
    Math.floor(Math.random() * availableLocations.length),
    1
  )[0];
  const suggestedLocation2 = availableLocations.splice(
    Math.floor(Math.random() * availableLocations.length),
    1
  )[0];

  return [suggestedLocation1, suggestedLocation2];
};
