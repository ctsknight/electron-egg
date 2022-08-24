<template>
  <div class="simulator-container">
    <!--vue-pdf-embed :source="currentImage?.path" v-if="currentImage?.format == '.pdf'" /-->
    <main class="main">
      <editor v-if="imageData.loaded" :data="imageData" ref="editorRef" />
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
  import VuePdfEmbed from 'vue-pdf-embed';
  import { PictureFilled } from '@element-plus/icons-vue';
  import Editor from './components/editor.vue';

  export default {
    components: {
      VuePdfEmbed,
      Editor,
      PictureFilled,
    },
    setup() {
      const store = useWorkSpaceStore();
      const { currentImage } = storeToRefs(store);
      const imageData = ref({
        cropped: false,
        cropping: false,
        loaded: false,
        name: '',
        previousUrl: '',
        type: '',
        url: '',
      });

      const editorRef = ref(null);

      return { currentImage, imageData, editorRef };
    },
    watch: {
      currentImage(newValue, oldValue) {
        console.log('reset  ' + newValue.name);
        if (newValue) {
          this.$refs.editorRef?.reset();
          this.imageData.name = newValue.name;
          this.imageData.url = newValue.path;
          this.imageData.loaded = true;
          console.log(this.imageData);
          this.$refs.editorRef?.start();
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
