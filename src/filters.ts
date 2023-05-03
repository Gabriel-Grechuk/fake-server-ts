import * as log from "./log.ts";
import { checkAndCreateDate } from "./utils.ts";

function comparableContent<T>(item: T): T | number | Date | undefined {
  const dateElement = checkAndCreateDate(item);
  if (typeof item === "string" && parseInt(item)) {
    return parseInt(item);
  } else if (
    typeof item !== "number" &&
    !(item instanceof Date) &&
    !dateElement
  )
    return undefined;
  else if (dateElement) return dateElement;
  else return item;
}

function pagination(
  amount: number,
  page: number,
  content: unknown[]
): unknown[] {
  if (amount === undefined || amount === undefined) return content;

  // Ex: If you want the 1st page, the starting position will be at 0.
  const start = amount * (page - 1);
  if (start < 0) return [];

  return content.slice(start, start + amount);
}

function equals(key: string, item: unknown, content: unknown[]): unknown[] {
  const comparableItem = comparableContent(item);

  return content.filter((element) => {
    return element[key] === comparableItem || element[key] === item;
  });
}

function gte(key: string, item: unknown, content: unknown[]): unknown[] {
  item = comparableContent(item);
  if (!item) {
    log.error("'gte' filter cannot compare the data. Ignoring filter");
    return content;
  }
  if (item instanceof Date)
    return content.filter(
      (element) => checkAndCreateDate(element[key]) <= item
    );
  else return content.filter((element) => element[key] <= item);
}

function lte(key: string, item: unknown, content: unknown[]): unknown[] {
  item = comparableContent(item);
  if (!item) {
    log.error("'lte' filter cannot compare the data. Ignoring filter");
    return content;
  }
  if (item instanceof Date)
    return content.filter(
      (element) => checkAndCreateDate(element[key]) >= item
    );
  else return content.filter((element) => element[key] >= item);
}

function gt(key: string, item: unknown, content: unknown[]): unknown[] {
  item = comparableContent(item);
  if (!item) {
    log.error("'gt' filter cannot compare the data. Ignoring filter");
    return content;
  }
  if (item instanceof Date)
    return content.filter((element) => checkAndCreateDate(element[key]) < item);
  else return content.filter((element) => element[key] < item);
}

function lt(key: string, item: unknown, content: unknown[]): unknown[] {
  item = comparableContent(item);
  if (!item) {
    log.error("'lt' filter cannot compare the data. Ignoring filter");
    return content;
  }
  if (item instanceof Date)
    return content.filter((element) => checkAndCreateDate(element[key]) > item);
  else return content.filter((element) => element[key] > item);
}

export function applyFilters(
  filters: unknown,
  args: unknown,
  content: unknown[]
): unknown[] {
  let response = content;

  const filterKeys = Object.keys(filters);
  if (filterKeys.length <= 0) return content;

  filterKeys.forEach((filter) => {
    const filterData = filters[filter];

    switch (filter) {
      case "pagination":
        {
          const amount = args[filterData["amount"]];
          const page = args[filterData["page"]];
          response = pagination(amount, page, response);
        }
        break;

      case "equal":
        {
          const keys = Object.keys(filterData);
          const dataKey = filterData[keys[0]];
          const data = args[dataKey];

          if (!data) return;

          response = equals(keys[0], data, response);
        }
        break;

      case "gte":
        {
          const keys = Object.keys(filterData);
          const filterField = filterData[keys[0]];
          const data = args[filterField];

          if (!data) return;

          response = gte(keys[0], data, response);
        }
        break;

      case "gt":
        {
          const keys = Object.keys(filterData);
          const filterField = filterData[[keys[0]]];
          const data = args[filterField];

          if (!data) return;

          response = gt(keys[0], data, response);
        }
        break;

      case "lte":
        {
          const keys = Object.keys(filterData);
          const filterField = filterData[[keys[0]]];
          const data = args[filterField];

          if (!data) return;

          response = lte(keys[0], data, response);
        }
        break;

      case "lt":
        {
          const keys = Object.keys(filterData);
          const filterField = filterData[[keys[0]]];
          const data = args[filterField];

          if (!data) return;

          response = lt(keys[0], data, response);
        }
        break;

      default:
        {
          log.error("Filter", filter, "is invalid");
        }
        break;
    }
  });

  return response;
}
