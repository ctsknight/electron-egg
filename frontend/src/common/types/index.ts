export interface NavItem {
  path: string;
  name: string;
  isActive: boolean;
}

export interface ImageItem {
  name: string;
  path: string;
  location: string;
  size: number;
  format?: string;
  thumbnailpath?: string;
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
