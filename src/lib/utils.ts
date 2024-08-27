import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {TRecord} from "@/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertToQuery = (query: TRecord) => {
  const q: string[] = [];
  Object.keys(query).forEach(key => {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  })
  return `?${q.join('&')}`;
}