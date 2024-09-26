export function formatCurrency(value) {
  if (value === undefined || value === null) {
    return '';
  }
  return value
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    })
    .replace("₫", "")
    .trim();
}