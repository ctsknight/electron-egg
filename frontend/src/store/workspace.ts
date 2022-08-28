import { defineStore } from 'pinia';
import ipcInvoke from '@/api/ipcRenderer';
import { ImageItem, ImageSetting } from '@/common/types';

type WorkspaceState = {
  workspace: string;
  currentImage: null | ImageItem;
  images: ImageItem[];
  imageSetting: ImageSetting;
};

export const useWorkSpaceStore = defineStore<string, WorkspaceState>('workspaceStore', {
  state: () => {
    return {
      workspace: '',
      currentImage: null,
      images: [],
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
      this.workspace = path;
      ipcInvoke('controller.setting.setWorkspaceSetting', { workspace: path });
    },

    changeCurrentImage(image: ImageItem) {
      this.currentImage = image;
    },

    async syncImages() {
      console.log(this.workspace);
      if (this.workspace) {
        this.images = await ipcInvoke('controller.image.getImagesFromWorkspace', {
          workspace: this.workspace,
        });

        if (this.images.length > 0) {
          this.currentImage = this.images[0];
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
