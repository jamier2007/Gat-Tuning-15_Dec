import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';

export const formatTime = (date: string | Date) => format(new Date(date), 'HH:mm');
export const formatDate = (date: string | Date) => format(new Date(date), 'dd MMM yyyy');
export const formatMonthYear = (date: Date) => format(date, 'MMMM yyyy');

export const getMonthDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
};

export const getPaddedDays = (date: Date) => {
  const days = getMonthDays(date);
  const monthStart = startOfMonth(date);
  const startPadding = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
  return Array(startPadding).fill(null).concat(days);
};

export const isSameDayAs = (date1: Date | string, date2: Date | string) => 
  isSameDay(new Date(date1), new Date(date2));

export const isInMonth = (date: Date, monthDate: Date) => 
  isSameMonth(date, monthDate);