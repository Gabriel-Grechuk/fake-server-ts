import { config } from "./config.ts";
import * as fs from "./fs.ts";
import * as server from "./server.ts";
import * as log from "./log.ts";

async function main() {
  try {
    const filesInfo = await fs.getFilesInfo(config.responseFilesPath);
    const filesNames = fs.getFilesNames(filesInfo);
    let files = await fs.parseFiles(filesNames);
    const app = server.setupRoutes(files);

    log.info("App runnin in the port", config.port);
    await app.listen({ port: config.port });
  } catch (error) {
    log.error(error.message);
    Deno.exit(error.code);
  }
}

main();
