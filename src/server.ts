import {
  Application,
  Router,
  helpers,
} from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { FileContentType, IndexedFileContent } from "./types.ts";
import * as log from "./log.ts";
import { applyFilters } from "./filters.ts";

const app = new Application();
const router = new Router();

let indexedContent: IndexedFileContent = {};

function indexFilesContent(files: FileContentType[]): IndexedFileContent {
  const response = {};

  files.forEach((file) => {
    Object.assign(response, {
      [file.name]: {
        ...file,
      },
    });
  });

  return response;
}

export function setupRoutes(files: FileContentType[]): typeof app {
  indexedContent = indexFilesContent(files);

  Object.keys(indexedContent).forEach((key) => {
    const content = indexedContent[key];

    for (const route of content.routes) {
      router.get(route.route, (ctx) => {
        const args = helpers.getQuery(ctx, { mergeParams: true });
        ctx.response.body = applyFilters(route.filters, args, content.content);
      });
      log.info("Created the route:", route.route);
    }
  });

  router.get("/", (ctx) => {
    ctx.response.body = "Fake server ir running!";
  });

  app.use(router.routes());
  return app;
}
