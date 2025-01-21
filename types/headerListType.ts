interface HeaderListContent {
  className: string;
  title: string;
  dirPath?: string;
  links: Array<{
    title: string;
    path: string;
  }>;
}
export type HeaderListType = Array<HeaderListContent>;
