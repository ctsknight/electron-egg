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

export interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageSetting {
  type: string;
  resolution: number;
  isCrpped: boolean;
  croppedArea: CroppedArea;
}
