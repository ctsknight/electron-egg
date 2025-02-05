<template>
  <div class="simulator-container">
    <main class="main" v-loading="isImageChanging">
      <editor
        v-if="currentImage"
        :data="currentImage"
        @save-event="saveimage"
        @preview-event="preview"
        :key="updateKey"
      />
      <div class="center-screen" v-else>
        <el-icon :size="700" color="#FFFFFF"><PictureFilled /></el-icon>
      </div>
    </main>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  import { PictureFilled } from '@element-plus/icons-vue';
  import Editor from './components/editor.vue';
  import ipcInvoke from '@/api/ipcRenderer';
  import { ElNotification } from 'element-plus';

  export default {
    components: {
      Editor,
      PictureFilled,
    },
    setup() {
      const store = useWorkSpaceStore();
      const { currentImage, isImageChanging } = storeToRefs(store);

      const editorRef = ref(null);

      const saveimage = (area) => {
        ipcInvoke('controller.image.ipcCropImage', {
          area: JSON.stringify(area),
          name: currentImage.value.name,
          format: currentImage.value.format,
        })
          .then(async () => {
            store.updateThumbnaiImage(currentImage.value.name);
          })
          .catch((error) => {
            console.error(error);
            ElNotification({
              type: 'error',
              message: '保存剪切图片出错: ' + error.message,
            });
          });
      };

      const preview = () => {
        ipcInvoke('controller.disk.openFile', {
          fullpath: currentImage.value?.path,
        });
      };

      const updateKey = ref(0);
      return { currentImage, editorRef, saveimage, preview, updateKey, isImageChanging };
    },
    watch: {
      currentImage(newValue, oldValue) {
        console.log('reset  ' + newValue.name);
        if (newValue) {
          this.updateKey++;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './func.scss';

  .simulator-container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    @media (max-width: 1114px) {
      padding-right: 0;
    }
  }

  .main {
    background-color: #333;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .center-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    font-size: large;
  }
</style>
