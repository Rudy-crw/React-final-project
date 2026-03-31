export const currency = (num) => {
  const n = Number(num) || 0;
  return n.toLocaleString();
};
export function formatDate(time) {
  if (!time) return "";
  return new Date(time * 1000).toLocaleDateString();
}
