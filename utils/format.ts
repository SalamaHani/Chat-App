export const setstring = (Username: string) => {
  return Username.toUpperCase().slice(0, 1);
};
export const towstring = (Username: string) => {
  return Username.toUpperCase().slice(1, 2);
};
export const formatCurrency = (amount: number | null, currency?: string) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
};
export function isRealString(value: string) {
  return typeof value === "string" && !/^\d+$/.test(value);
}
export function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
export function formatPrice(value: string): string {
  const num = Number(value);

  if (isNaN(num)) return value;

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toLocaleString("en-US", {
      maximumFractionDigits: num % 1_000_000 === 0 ? 0 : 2,
    })}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toLocaleString("en-US", {
      maximumFractionDigits: num % 1_000 === 0 ? 0 : 2,
    })}K`;
  }
  return `${num}`;
}
export function formatTimeArabic(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const isPM = hours >= 12;

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 -> 12

  const period = isPM ? "م" : "ص";

  return `${hours}:${minutes} ${period}`;
}
