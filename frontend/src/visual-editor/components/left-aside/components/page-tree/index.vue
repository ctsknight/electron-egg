<!--页面树-->
<template> TODO: show all images </template>

<script lang="tsx">
  export default {
    name: 'PageTree',
    label: 'Workspace',
    order: 1,
    icon: Tickets,
  };
</script>

<script lang="tsx" setup>
  import { Tickets, Edit, Plus, MoreFilled } from '@element-plus/icons-vue';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';

  const workspaceStore = useWorkSpaceStore();

  const { workspace } = storeToRefs(workspaceStore);
  // 设置为默认页面
  const changeWorkspacePath = () => {
    console.log('更改工作目录1');
    workspaceStore.changeWorkspace();
  };
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
