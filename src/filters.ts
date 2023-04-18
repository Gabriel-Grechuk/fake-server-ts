function pagination(
  amount: number,
  page: number,
  content: unknown[]
): unknown[] {
  const start = amount * page + 1;
  return content.slice(start, start + amount);
}

export function applyFilters(
  filters: string[],
  args: unknown,
  content: unknown[]
): unknown[] {
  return pagination(parseInt(args["amount"]), parseInt(args["page"]), content);
}
