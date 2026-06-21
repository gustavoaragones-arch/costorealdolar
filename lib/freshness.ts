const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

/**
 * Returns the month and year in Argentine Spanish (e.g. "Mayo 2026").
 * Pass `new Date(taxRules.updatedAt)` to reflect the actual data validity
 * date rather than the Vercel deploy date.
 */
export function getMonthYear(date: Date = new Date()): string {
  return `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
}

/** Returns only the current year as a string (e.g. "2026"). */
export function getCurrentYear(date: Date = new Date()): string {
  return String(date.getFullYear());
}
