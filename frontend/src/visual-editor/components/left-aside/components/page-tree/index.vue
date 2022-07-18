<!--页面树-->
<template>
  <el-button type="primary" class="!my-10px !mx-6px" :icon="Plus" @click="scanImage"
    >Scan</el-button
  >
  <el-tree
    :data="pages"
    :props="defaultProps"
    node-key="path"
    highlight-current
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span
          >{{ node.label }}（{{ data.path }}）
          <template v-if="data.isDefault">
            <el-tag size="default">默认</el-tag>
          </template>
        </span>
        <span @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon><more-filled /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Delete" @click="delPage(data)">删除</el-dropdown-item>
                <el-dropdown-item :icon="Link" @click="setDefaultPage(data)"
                  >设为首页</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="tsx">
  export default {
    name: 'PageTree',
    label: '页面',
    order: 1,
    icon: Tickets,
  };
</script>

<script lang="tsx" setup>
  import { ref, computed, getCurrentInstance } from 'vue';
  import { useVisualData } from '@/visual-editor/hooks/useVisualData';
  import { useRouter, useRoute } from 'vue-router';
  import { Tickets, Plus, MoreFilled, Edit, Delete, Link } from '@element-plus/icons-vue';
  import { scannerStore } from '@/store/scan';
  import invoke from '@/api/ipcRenderer';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rules = {
    title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }],
    path: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
  };

  const router = useRouter();
  const route = useRoute();

  const { jsonData, setCurrentPage, deletePage } = useVisualData();

  const defaultProps = ref({
    children: 'children',
    label: 'title',
  });
  const currentNodeKey = ref(route.path);
  // 所有的页面
  const pages = computed(() =>
    Object.keys(jsonData.pages).map((key) => ({
      title: jsonData.pages[key].title,
      path: key,
    })),
  );

  const scanImage = async () => {
    const app = getCurrentInstance();
    const scanStore = scannerStore();
    // const imageurl = await invoke('controller.imagemanager.ipcScanImage', '异步');
    // scanStore.setCurrentImage(imageurl);
    console.log(await invoke('controller.imagemanager.getAllScanedImages', undefined));
  };
  // 点击当前节点
  const handleNodeClick = (data) => {
    setCurrentPage(data.path);
    router.push(data.path);
  };

  // 删除子页面
  const delPage = (data) => {
    console.log('删除子页面数据', data);
    deletePage(data.path, '/');
  };
  // 设置为默认页面
  const setDefaultPage = (data) => {
    console.log('设置该页面为默认页面', data);
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
