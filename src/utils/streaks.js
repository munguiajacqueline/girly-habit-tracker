import { format, parseISO, subDays } from 'date-fns';

export function getTodayKey(date = new Date()) {
  return format(date, 'yyyy-MM-dd');
}

export function isSameDay(dateKey, otherKey) {
  if (!dateKey || !otherKey) return false;
  return dateKey === otherKey;
}

export function calculateStreak(completions) {
  if (!completions || completions.length === 0) return 0;

  const sorted = [...completions]
    .map((key) => parseISO(key))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime());

  if (sorted.length === 0) return 0;

  let streak = 0;
  let checkDate = new Date();
  // If not completed today, start counting from yesterday
  const todayKey = getTodayKey();
  if (!completions.includes(todayKey)) {
    checkDate = subDays(checkDate, 1);
  }

  for (let i = 0; i < sorted.length + 1; i++) {
    const key = getTodayKey(checkDate);
    if (completions.includes(key)) {
      streak += 1;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return streak;
}
