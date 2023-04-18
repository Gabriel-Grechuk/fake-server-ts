import { FilterCallbackSetupType } from "./types.ts";

export function normalizePathString(path: string): string {
  if (!path) return undefined;
  let normalized = path.trim();

  if (normalized.charAt(normalized.length - 1) === "/")
    normalized = normalized.slice(0, -1);

  return normalized;
}

export function validateFields(fields: string[], obj: unknown): boolean {
  const keys = Object.keys(obj);
  for (const field of fields) {
    if (!keys.includes(field)) return false;
  }
  return true;
}

export function deleteUnusedFields(
  fieldsToKeep: string[],
  obj: unknown
): unknown {
  const response = {};

  fieldsToKeep.forEach((field) => {
    Object.assign(response, {
      [field]: obj[field],
    });
  });

  return response;
}
