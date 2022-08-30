export interface NavItem {
  path: string;
  name: string;
  isActive: boolean;
}

export interface ImageItem {
  name: string;
  path: string;
  size: number;
  format: string;
  thumbnailpath: string;
}

export interface CurrentImageItem {
  name: string;
  url: string;
  previousUrl: string;
  path: string;
  cropped: boolean;
  cropping: boolean;
}

export interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageSetting {
  prefix: string;
  type: string;
  resolution: number;
  isCrpped: boolean;
  croppedArea: CroppedArea;
}
