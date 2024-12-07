export const generateAppealCode = (appealName: string, year: number): string => {
  const words = appealName.split(' ');
  const firstTwoLetters = words.slice(0, 2).map(word => word.charAt(0)).join('');
  const yearSuffix = year.toString().slice(-2);
  return `${firstTwoLetters}${yearSuffix}`.toUpperCase();
};

export const APPEAL_OPTIONS = [
  "Friends of Scouting",
  "Endowment Campaign",
  "Distinguish Citizen Dinner",
  "Distinguish Citizen Awards",
  "Council Dinner",
  "Capital Campaign"
] as const;

export const STRUCTURE_OPTIONS = [
  "Individual",
  "Organization",
  "Foundation"
] as const;

export const GIVING_CATEGORY_OPTIONS = [
  "Major Donor",
  "Regular Donor",
  "First Time Donor"
] as const;

export const COUNTY_OPTIONS = [
  "Broward County",
  "Monroe County",
  "Miami-Dade County"
] as const;