<template>
  <div class="simulator-container">
    <!--vue-pdf-embed :source="currentImage?.path" v-if="currentImage?.format == '.pdf'" /-->
    <main class="main">
      <editor v-if="currentImage" ref="editor" :data="currentImage" />
      <div v-else>
        <el-icon><Picture /></el-icon>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { Picture } from '@element-plus/icons-vue';
  import Editor from './components/editor.vue';

  const store = useWorkSpaceStore();
  const { currentImage } = storeToRefs(store);
  const data = computed(() => {});
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
    top: 3rem;
  }
</style>
