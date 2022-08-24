<!--页面树-->
<template>
  <el-card v-if="!isShow" style="margin: 10px" shadow="always">
    <div style="padding: 14px">
      <span>暂无图片显示</span>
    </div>
  </el-card>
  <div style="margin: 10px" v-for="image in images" :key="image.name" v-else>
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
  import { Tickets, PictureFilled } from '@element-plus/icons-vue';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  import ThumbnailShow from './thumbnail-show.vue';

  const workspaceStore = useWorkSpaceStore();

  const { images } = storeToRefs(workspaceStore);

  const isShow = computed(() => images && images.value.length > 0);
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
