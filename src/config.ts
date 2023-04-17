import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { normalizePathString } from "./utils.ts";

export const config = {
  port: parseInt(Deno.env.get("PORT")) || 3000,
  responseFilesPath: normalizePathString(Deno.env.get("RESPONSE_FILES_PATH")) || "responses",
};
