export function groupAndSum(data, keyField, valueField = "Cost") {
  const map = {};

  data.forEach((row) => {
    const key = row[keyField] ?? "Unknown";
    const value = parseFloat(row[valueField] || 0);

    map[key] = (map[key] || 0) + value;
  });

  return Object.entries(map).map(([key, total]) => ({
    key,
    total,
  }));
}
