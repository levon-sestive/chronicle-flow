import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';

export function formatRelativeTime(date: Date): string {
  if (isToday(date)) {
    return 'today';
  }
  if (isYesterday(date)) {
    return 'yesterday';
  }
  
  const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  return format(date, 'MMM d');
}

export function formatEntryTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatChapterDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}
