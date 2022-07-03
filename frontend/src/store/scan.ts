import { defineStore } from 'pinia';

export const scannerStore = defineStore({
  id: 'scannerManager',
  state: () => {
    return {
      currentImage: '',
    };
  },
  getters: {},
  actions: {
    setCurrentImage(url: string) {
      this.$patch({
        currentImage: 'scanner-file-protocol://' + url,
      });
    },
  },
});
