export type DirInfoType = {
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
};

export type FileContentType = {
  name: string;
  filters: string;
  route: string;
  content: unknown,
}
