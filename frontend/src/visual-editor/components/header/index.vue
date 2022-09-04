<template>
  <el-row type="flex" class="header">
    <!--    左侧logo start-->
    <el-col :span="6" class="flex items-center">
      <div class="logo"></div>
      <!--h3 class="font-semibold">Microbox Scanner</h3-->
    </el-col>
    <!--    左侧logo end-->
    <!--    中间操作页面部分 start-->
    <el-col class="flex items-center" :span="12">
      <template v-for="(toolItem, toolIndex) in tools" :key="toolIndex">
        <div :class="[`w-1/${tools.length}`]" class="w-1/9">
          <div :class="{ disabled: !toolItem.isShow() }">
            <div
              class="tool-item flex flex-col items-center cursor-pointer"
              @click="toolItem.onClick"
            >
              <el-icon>
                <component :is="toolItem.icon" />
              </el-icon>
              <div class="title">{{ toolItem.title }}</div>
            </div>
          </div>
        </div>
      </template>
    </el-col>
    <!--    中间操作页面部分 end-->
    <!--    右侧工具栏 start-->

    <el-col :span="4" class="right-tools flex flex-row-reverse items-center">
      <el-tooltip class="item" effect="dark" content="扫描模式" placement="bottom">
        <el-switch
          v-model="scanMode"
          size="large"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="新扫"
          inactive-text="重扫"
        />
      </el-tooltip>
    </el-col>
    <el-col :span="2" class="right-tools flex flex-row-reverse items-center">
      <el-tooltip class="item" effect="dark" content="扫描" placement="bottom">
        <el-button
          type="primary"
          :icon="CameraFilled"
          size="large"
          circle
          class="flex-shrink-0 !p-6px"
          @click="scan"
        />
      </el-tooltip>
    </el-col>
    <!--    右侧工具栏 end-->
  </el-row>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ipcInvoke from '@/api/ipcRenderer';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  import { useTools } from './useTools';
  const tools = useTools();

  import { CameraFilled } from '@element-plus/icons-vue';
  import { ScanParams } from '@/common/types';
  const workspaceStore = useWorkSpaceStore();
  const { workspace, imageSetting, currentImage } = storeToRefs(workspaceStore);

  const scanMode = ref(true);
  const scan = () => {
    workspaceStore.setIsScanning(true);
    const scanparams: ScanParams = {
      type: imageSetting.value.type,
      resolution: imageSetting.value.resolution,
    };

    ipcInvoke('controller.image.ipcScanImage', {
      mode: scanMode.value ? 'new_scan' : 'repeat_scan',
      scanparams: JSON.stringify(scanparams),
      prefix: imageSetting.value.prefix,
      isCrpped: imageSetting.value.isCrpped,
      croppedArea: JSON.stringify(imageSetting.value.croppedArea),
      workspace: workspace.value,
      currentImageName: currentImage.value?.name,
    })
      .then((response) => {
        console.log('ipcScanImage: ' + scanMode.value);
        workspaceStore.setCurrentImage(response.currentImageItem);
        if (!scanMode.value) {
          workspaceStore.updateThumbnaiImage(currentImage.value?.name, response.thumbnailUrl);
        } else {
          workspaceStore.addImage(response.imageItem);
        }
      })
      .catch((error) => {
        console.error(error);
        ElNotification({
          type: 'error',
          message: '扫描图片出错: ' + error.message,
        });
      })
      .finally(() => workspaceStore.setIsScanning(false));
  };
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;

    .logo {
      width: 200px;
      height: 80px;
      background-image: url('@/assets/logo.png');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .tool-item {
      .title {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    .el-button {
      font-size: 22px;
    }

    .right-tools > * {
      margin-left: 8px;
    }

    .disabled {
      color: gray;
    }
  }
</style>
