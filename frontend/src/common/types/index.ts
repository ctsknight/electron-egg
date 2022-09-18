export interface NavItem {
  path: string;
  name: string;
  isActive: boolean;
}

export interface ImageTypeSelectItem {
  name: string;
  value: string;
}

export interface ImageItem {
  name: string;
  path: string;
  isShow: boolean;
  format: string;
  thumbnailpath: string;
}

export interface CurrentImageItem {
  name: string;
  url: string;
  previousUrl: string;
  path: string;
  format: string;
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

export interface ScanParams {
  type: string;
  resolution: number;
}
