export function getFirstDayOfMonthThisYear() {
  const now = new Date();
  return new Date(now.getFullYear(), 0, 1, 0, 0, 0);
}
