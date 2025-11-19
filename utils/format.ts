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
export function formatTimeArabic(date: Date | string | null | undefined) {
  if (!date) return "";

  const d = date instanceof Date ? date : new Date(date);

  // Check if date is valid
  if (isNaN(d.getTime())) {
    return "";
  }

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const isPM = hours >= 12;

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${isPM ? "pm" : "am"}`;
}
export function formatLastMessageDate(date: Date | string) {
  const d = new Date(date);
  const now = new Date();

  const diffTime = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  // Return weekday name if within last 7 days
  if (diffDays < 7) {
    return d.toLocaleDateString("en-US", { weekday: "long" });
  }

  // Otherwise format as short date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
