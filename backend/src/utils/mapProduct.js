export default function mapProduct(p, storeKey) {
  return {
    ...p,
    effectivePrice: p?.price?.[storeKey] || null,
    effectiveStock: p?.stockByStore?.[storeKey] ?? null,
    effectiveAvailability: p?.availabilityByStore?.[storeKey] ?? null,
  };
}
