import { defineStore } from 'pinia';
import ipcInvoke from '@/api/ipcRenderer';
import { Thumbnail, ImageSetting } from '@/common/types';

type WorkspaceState = {
  workspace: string;
  currentImage: null | Thumbnail;
  images: Thumbnail[];
  imageSetting: ImageSetting;
};

export const useWorkSpaceStore = defineStore<string, WorkspaceState>('workspaceStore', {
  state: () => {
    return {
      workspace: '',
      currentImage: null,
      images: [],
      imageSetting: {
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
      this.workspace = path;

      this.images = await ipcInvoke('controller.image.getImagesFromWorkspace', {
        workspace: path,
      });

      if (this.images.length > 0) {
        this.currentImage = this.images[0];
      }
    },

    changeCurrentImage(image: Thumbnail) {
      this.currentImage = image;
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
  },
});
