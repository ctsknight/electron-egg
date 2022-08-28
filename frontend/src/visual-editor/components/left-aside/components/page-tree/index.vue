<!--页面树-->
<template>
  <el-table
    v-dragable="dragOptions"
    :data="images"
    highlight-current-row
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" width="50" />
    <el-table-column label="扫描图片列表">
      <template #default="scope">
        <div class="block">
          <el-image :src="scope.row.path" fit="fill">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
            <template #error>
              <div class="image-slot">
                <el-icon :size="150"><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <span class="demonstration">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
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
  import { vDragable } from 'element-plus-table-dragable';
  import { ImageItem } from '@/common/types';
  import { ElTable, ElMessage } from 'element-plus';
  const emitter = inject('emitter');

  const workspaceStore = useWorkSpaceStore();

  const { images } = storeToRefs(workspaceStore);

  onMounted(() => {
    emitter.on('export-action', (type) => {
      switch (type) {
        case 'keep-order':
          console.log('Keep order order ');
          break;
        case 'export-pdf':
          if (multipleSelection.value.length > 0) {
            console.log('export-pdf ');
          } else {
            ElMessage.error('请先选择要输出到图片');
          }
          break;
        default:
          break;
      }
    });
  });

  const dragOptions = [
    {
      selector: 'thead tr', // add drag support for column
      option: {
        // sortablejs's option
        animation: 150,
        onEnd: (evt) => {
          console.log(evt.oldIndex, evt.newIndex);
        },
      },
    },
    {
      selector: 'tbody', // add drag support for row
      option: {
        // sortablejs's option
        animation: 150,
        onEnd: (evt) => {
          ElMessage.success(`Drag the ${evt.oldIndex}th row to ${evt.newIndex}`);
          console.log(evt.oldIndex, evt.newIndex);
        },
      },
    },
  ];

  const multipleSelection = ref<ImageItem[]>([]);
  const handleSelectionChange = (val: ImageItem[]) => {
    multipleSelection.value = val;
  };

  const currentRow = ref();

  const handleCurrentChange = (val: ImageItem | undefined) => {
    currentRow.value = val;
    workspaceStore.changeCurrentImage(val);
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

  .block {
    padding: 10px 0;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
  }

  .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 5px;
  }
  .el-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }

  .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
  }
</style>
