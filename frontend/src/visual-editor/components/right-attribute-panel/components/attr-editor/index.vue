<template>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-cell center title="工作目录">
      <template #value>
        <van-icon
          name="replay"
          class="search-icon"
          size="28"
          style="margin-right: 10px"
          @click="reload"
        />

        <van-icon name="desktop-o" class="search-icon" size="30" @click="changeWorkspacePath" />
      </template>
      <template #label>
        <span class="custom-title">{{ currentWorkspace }}</span>
      </template>
    </van-cell>
    <van-cell center title="当前图片：">
      <template #value> {{ currentImageName }} </template>
    </van-cell>
  </van-cell-group>
  <van-form>
    <van-cell-group>
      <van-cell title="图片规格" style="margin-top: 30px">
        <template #right-icon>
          <el-switch v-model="isChangeImageSetting" active-text="修改" inactive-text="保存" />
        </template>
      </van-cell>
      <van-field
        v-model="imageSetting.prefix"
        center
        clearable
        label="图片名称前缀"
        placeholder="图片名称前缀"
        :disabled="!isChangeImageSetting"
        :rules="[{ required: true, message: '请填写扫描图片名称前缀' }]"
      />
      <van-cell center title="图片类型">
        <template #value>
          <van-radio-group :disabled="!isChangeImageSetting" v-model="imageSetting.type">
            <van-radio name="tiff">TIFF</van-radio>
            <van-radio name="png">PNG</van-radio>
            <van-radio name="jpeg">JPEG</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell center title="分辨率">
        <template #value>
          <van-radio-group :disabled="!isChangeImageSetting" v-model="imageResolution">
            <van-radio name="200">200</van-radio>
            <van-radio name="300">300</van-radio>
            <van-radio name="400">400</van-radio>
            <van-radio name="600">600</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </van-cell-group>
  </van-form>

  <!--   <van-cell-group style="margin-top: 20px">
    <van-cell title="保存当前图片顺序">
      <template #value>
        <van-icon name="passed" color="#1989fa" size="28" @click="exportType('keep-order')" />
      </template>
    </van-cell>
  </van-cell-group>
 -->
  <van-cell-group style="margin-top: 30px">
    <van-cell title="导出PDF">
      <template #right-icon>
        <van-icon name="share" color="#1989fa" size="28" @click="exportType('export-pdf')" />
      </template>
      <template #label>
        <van-radio-group v-model="pdfExportType" direction="horizontal" style="padding-top: 15px">
          <van-radio name="single">单页导出</van-radio>
          <van-radio name="multi">整体导出</van-radio>
        </van-radio-group>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script language="ts" setup>
  import { ElMessage, ElMessageBox } from 'element-plus';
  import ipcInvoke from '@/api/ipcRenderer';

  import { computed, ref } from 'vue';
  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  const workspaceStore = useWorkSpaceStore();

  const { workspace, imageSetting, currentImage } = storeToRefs(workspaceStore);

  const currentWorkspace = computed(() => {
    if (workspace && workspace.value) {
      return workspace.value;
    }
    return '未选择工作目录路径';
  });

  const currentImageName = computed(() => {
    if (currentImage && currentImage.value) {
      return currentImage.value.name;
    }
    return '';
  });
  const changeWorkspacePath = async () => {
    await workspaceStore.changeWorkspace();
    workspaceStore.syncImages();
  };

  const reload = async () => {
    workspaceStore.syncImages();
  };
  const pdfExportType = ref('single');

  onMounted(async () => {
    await workspaceStore.retrieveImageSetting();
    imageResolution.value = imageSetting.value.resolution + '';
    await workspaceStore.readWorkspaceFromDB();
    workspaceStore.syncImages();
    pdfExportType.value = await ipcInvoke('controller.setting.getPdfExportType', '');
  });

  const isChangeImageSetting = ref(false);
  const imageResolution = ref('');

  watch(imageResolution, (newValue) => {
    imageSetting.value.resolution = parseInt(newValue);
  });

  watch(isChangeImageSetting, (newValue) => {
    if (!newValue) {
      if (imageSetting.value.prefix) {
        workspaceStore.updateImageSetting();
      } else {
        ElMessage({
          type: 'error',
          message: '未填写图片名称前缀， 更新失败！',
        });
      }
    }
  });

  watch(pdfExportType, (newValue) =>
    ipcInvoke('controller.setting.setPdfExportType', { pdfExportTypep: newValue }),
  );

  const emitter = inject('emitter');

  const exportType = (type) => {
    ElMessageBox.confirm('此操作会影响工作目标内的文件，确认继续?', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
      .then(() => {
        emitter.emit('export-action', type);
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        });
      });
  };
</script>

<style></style>
