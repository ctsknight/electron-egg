<!--页面树-->
<template>
  <div style="margin: 10px" v-for="image in images" :key="image.name">
    <thumbnail-show :image="image" />
  </div>
</template>

<script lang="tsx">
  export default {
    name: 'PageTree',
    label: 'Workspace',
    order: 1,
    icon: Tickets,
  };
</script>

<script lang="tsx" setup>
  import { Tickets } from '@element-plus/icons-vue';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  import ThumbnailShow from './thumbnail-show.vue';

  const workspaceStore = useWorkSpaceStore();

  const { images } = storeToRefs(workspaceStore);
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    display: flex;
    padding-right: 8px;
    font-size: 14px;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
</style>
