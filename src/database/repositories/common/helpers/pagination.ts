export function pagination<T>(
  data: T[],
  page: number,
  take: number,
  count: number,
) {
  return {
    results: data,
    pagination: {
      currentPage: page,
      limitPerPage: take,
      totalItems: count,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < Math.ceil(count / take) ? page + 1 : null,
    },
  };
}
