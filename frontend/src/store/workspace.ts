import { defineStore } from 'pinia';
import ipcInvoke from '@/api/ipcRenderer';
import { Thumbnail } from '@/common/types';

type WorkspaceState = {
  workspace: string;
  currentImage: null | Thumbnail;
  images: Thumbnail[];
};
export const useWorkSpaceStore = defineStore<string, WorkspaceState>('workspaceStore', {
  state: () => {
    return {
      workspace: '',
      currentImage: null,
      images: [],
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
  },
});
