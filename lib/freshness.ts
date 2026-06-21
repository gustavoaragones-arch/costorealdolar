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
 * Returns the month and year in Argentine Spanish (e.g. "Junio 2026").
 * Defaults to the current date, which at SSG build time is the deploy date —
 * giving each new deploy a freshness signal in the meta title and UI.
 */
export function getMonthYear(date: Date = new Date()): string {
  return `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
}
