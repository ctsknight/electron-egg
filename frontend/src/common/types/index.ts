export interface NavItem {
  path: string;
  name: string;
  isActive: boolean;
}

export interface Thumbnail {
  name: string;
  path: string;
  size: number;
  format?: string;
}
