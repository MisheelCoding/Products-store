export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const sanitizePagination = (page = 1, limit = 10, maxLimit = 100) => {
  page = clamp(parseInt(page) || 1, 1, Number.MAX_SAFE_INTEGER);
  limit = clamp(parseInt(limit) || 1, 1, maxLimit);
  return { page, limit };
};
