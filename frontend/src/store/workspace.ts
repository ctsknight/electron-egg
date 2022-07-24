import { defineStore } from 'pinia';
import ipcInvoke from '@/api/ipcRenderer';

export const useWorkSpaceStore = defineStore({
  id: 'Workspace',
  state: () => {
    return {
      workspace: '',
    };
  },
  getters: {
    workSpaceUrl: (state) => {
      return 'scanner-file-protocol://' + state.workspace;
    },
  },
  actions: {
    async changeWorkspace() {
      const path: string = await ipcInvoke('controller.disk.selectFolder', '');
      this.workspace = path;
    },
  },
});
