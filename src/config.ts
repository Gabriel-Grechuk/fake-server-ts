import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import * as log from "./log.ts";
import { normalizePathString } from "./utils.ts";

const commandLineArgs = parse(Deno.args);

function validateArgs() {
  const validArgs = ["port", "response-files-path"];
  for (const arg of Object.keys(commandLineArgs)) {
    if (arg !== "_" && !validArgs.includes(arg)) {
      log.error("Invalid command line argument:", arg);
      Deno.exit(1);
    }
  }
}
validateArgs();

export const config = {
  port:
    parseInt(commandLineArgs["port"]) || parseInt(Deno.env.get("PORT")) || 3000,
  responseFilesPath:
    normalizePathString(commandLineArgs["response-files-path"]) ||
    normalizePathString(Deno.env.get("RESPONSE_FILES_PATH")) ||
    "responses",
};
