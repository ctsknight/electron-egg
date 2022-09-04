import { defineStore } from 'pinia';
import ipcInvoke from '@/api/ipcRenderer';
import { ImageItem, ImageSetting, CurrentImageItem } from '@/common/types';
import { ElNotification } from 'element-plus';

type WorkspaceState = {
  workspace: string;
  isScanning: boolean;
  isImageChanging: boolean;
  currentImage: null | CurrentImageItem;
  images: ImageItem[];
  imageSetting: ImageSetting;
};

export const useWorkSpaceStore = defineStore<string, WorkspaceState>('workspaceStore', {
  state: () => {
    return {
      workspace: '',
      currentImage: null,
      isScanning: false,
      isImageChanging: false,
      images: reactive([]) as ImageItem[],
      imageSetting: {
        prefix: 'microbox',
        type: '',
        resolution: 0,
        isCrpped: false,
        croppedArea: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      },
    };
  },

  actions: {
    async changeWorkspace() {
      const path: string = await ipcInvoke('controller.disk.selectFolder', '');
      if (path) {
        this.workspace = path;
        ipcInvoke('controller.setting.setWorkspaceSetting', {
          workspace: path,
        });
      }
    },

    changeCurrentImage(image: ImageItem) {
      this.isImageChanging = true;
      ipcInvoke('controller.image.ipcGetCurrentImage', {
        name: image.name,
        format: image.format,
        path: image.path,
      })
        .then((currentImage) => {
          this.currentImage = currentImage;
          ElNotification({
            type: 'success',
            message: '当前图片: ' + this.currentImage?.name,
          });
        })
        .catch((error) => {
          console.log(error);
          ElNotification({
            type: 'error',
            message: '载入图片出错: ' + error.message,
          });
        })
        .finally(() => {
          this.isImageChanging = false;
        });
    },
    setIsScanning(isScanning: boolean) {
      this.isScanning = isScanning;
    },

    setIsImageChanging(isImageChanging: boolean) {
      this.isImageChanging = isImageChanging;
    },

    setCurrentImage(currentImage: CurrentImageItem) {
      this.currentImage = currentImage;
    },

    addImage(image: ImageItem) {
      this.images.push(image);
    },

    async syncImages() {
      console.log(this.workspace);
      if (this.workspace) {
        this.images = await ipcInvoke('controller.image.getImagesFromWorkspace', {
          workspace: this.workspace,
          prefix: this.imageSetting.prefix,
        });

        if (this.images && this.images.length > 0) {
          const useWorkspace = useWorkSpaceStore();
          useWorkspace.changeCurrentImage(this.images[0]);
        }
      }
    },
    updateImageSetting() {
      ipcInvoke('controller.setting.setImageSetting', {
        imageSetting: JSON.stringify(this.imageSetting),
      });
    },

    async retrieveImageSetting() {
      this.imageSetting = await ipcInvoke('controller.setting.getImageSetting', '');
      console.log(this.imageSetting);
    },

    async readWorkspaceFromDB() {
      this.workspace = await ipcInvoke('controller.setting.getWorkspaceSetting', '');
    },
  },
});
