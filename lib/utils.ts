//import { ApiError } from "@/models/api";
import { type ClassValue, clsx } from "clsx";
import { getLocale } from "next-intl/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*export async function fetchApi<T>(url: string, options: RequestInit): Promise<T | ApiError> {
  const locale = await getLocale();
  const headers = new Headers(options.headers);
  headers.set("lang", locale);
  const updatedOptions = {
    ...options,
    headers,
  };
  const response = await fetch(url, updatedOptions);
  const data = await response.json();
  if (response.ok) {
    return data as T;
  } else {
    return data as ApiError;
  }
}

export function isApiError(response: any): response is ApiError {
  return response.message !== undefined;
}*/

export const generateYearlyData = () => {
  const data = [];
  const endDate = new Date(); // Today's date
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 1); // One year ago from today

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      soles: Math.floor(Math.random() * (500 - 50 + 1) + 50), // Random income between 50 and 500 soles
    });
  }
  return data;
};

export function generateYearlyPointData() {
  const data = [];
  const startDate = new Date(new Date().getFullYear(), 0, 1); // Start of the current year
  const endDate = new Date(); // Today's date

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      points: Math.floor(Math.random() * 1000) + 1, // Random number of points between 1 and 1000
    });
  }

  return data;
}


export function groupBy<T>(array: T[], keyGetter: (item: T) => string | number): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const key = keyGetter(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

