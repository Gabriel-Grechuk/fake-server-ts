import { DirInfoType } from "./types.ts";
import { FileContentType } from "./types.ts";
import { config } from "./config.ts";
import { validateFields, deleteUnusedFields } from "./utils.ts";
import * as log from "./log.ts";

export async function getFilesInfo(path: string): Promise<DirInfoType[]> {
  const files: DirInfoType = [];
  try {
    for await (const file of Deno.readDir(path))
      if (file.isFile) files.push(file);
  } catch (error) {
    throw {
      message: "Cannot open responses path.",
      code: 2,
    };
  }
  return files;
}

export function getFilesNames(filesInfo: DirInfoType[]): string[] {
  if (!filesInfo || filesInfo.length <= 0)
    throw { message: "No file info to get names in getFilesNames()", code: 2 };

  return filesInfo.map((info) => info.name) as string[];
}

export async function parseFiles(files: string[]): Promise<FileContentType[]> {
  const filesContent: FileContentType[] = [];

  for (const file of files) {
    const rawText = await Deno.readTextFile(
      config.responseFilesPath.concat("/", file)
    ).catch((error) => {
      throw {
        message: "Cant load the file: " + file,
        code: 3,
      };
    });

    let rawJson;
    try {
      rawJson = JSON.parse(rawText); // Test the json
    } catch (error) {
      log.error(
        "Syntax error in file:",
        file,
        '[ "',
        error.message,
        '" ]',
        "It will be ignored."
      );
      continue;
    }
    if (!validateFields(["name", "routes", "content"], rawJson)) {
      log.warning(
        "The file",
        file,
        "may not be a valid response model. It will be ignored."
      );
      continue;
    }
    const json = deleteUnusedFields(["name", "routes", "content"], rawJson);
    filesContent.push(json);
    log.info("The file", file, "was loaded succesfully");
  }

  return filesContent;
}
