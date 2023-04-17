import { config } from "./config.ts";
import * as fs from "./fs.ts";
import * as server from "./server.ts";
import * as log from "./log.ts";

async function main() {
  try {
    const filesInfo = await fs.getFilesInfo(config.responseFilesPath);
    const filesNames = fs.getFilesNames(filesInfo);
    const files = await fs.parseFiles(filesNames);

    //const routes = await server.setupRoutes(files);

    //console.log(files);
  } catch (error) {
    log.error(error.message);
    Deno.exit(error.code);
  }
}

main();
