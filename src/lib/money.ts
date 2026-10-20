export function formatUsd(amount: number): string {
  const whole = Math.round(amount * 100) % 100 === 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Starting prices render with a plus, e.g. "$3.75+". */
export function formatPrice(amount: number, priceFrom = false): string {
  return `${formatUsd(amount)}${priceFrom ? "+" : ""}`;
}
