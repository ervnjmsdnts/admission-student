import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
