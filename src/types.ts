export type DirInfoType = {
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
};

export type FileContentType = {
  name: string;
  routes: Array<{
    route: string;
    filters: Record<string, unknown>;
  }>;
  content: unknown;
};

export type IndexedFileContent = Record<string, unknown>;
