import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  value: number | null | undefined,
  currency = "USD",
  minimumFractionDigits = 2,
) {
  if (value === null || value === undefined || Number.isNaN(Number(value)))
    return "-";
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
  });
  return formatter.format(value);
}
