<template>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-cell center title="工作目录">
      <template #value>
        <van-icon name="search" class="search-icon" size="30" @click="changeWorkspacePath" />
      </template>
      <template #label>
        <span class="custom-title">{{ currentWorkspace }}</span>
      </template>
    </van-cell>
    <van-cell title="图片规格" style="margin-top: 30px">
      <template #right-icon>
        <el-switch v-model="isChangeImageSetting" active-text="修改" inactive-text="保存" />
      </template>
      <template #label>
        <van-cell-group>
          <van-cell center title="图片类型">
            <template #value>
              <van-radio-group :disabled="!isChangeImageSetting" v-model="imageSetting.type">
                <van-radio name="tiff">TIFF</van-radio>
                <van-radio name="png">PNG</van-radio>
                <van-radio name="jpeg">JPEG</van-radio>
                <van-radio name="pdf">PDF</van-radio>
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
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script language="ts" setup>
  import { computed, ref } from 'vue';

  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  const workspaceStore = useWorkSpaceStore();

  const { workspace, imageSetting } = storeToRefs(workspaceStore);
  onMounted(async () => {
    await workspaceStore.retrieveImageSetting();
    imageResolution.value = imageSetting.value.resolution + '';
  });

  const currentWorkspace = computed(() => {
    if (workspace && workspace.value) {
      return workspace.value;
    }
    return '未选择工作目录路径';
  });

  const changeWorkspacePath = () => {
    workspaceStore.changeWorkspace();
  };

  const isChangeImageSetting = ref(false);
  const imageResolution = ref('');

  watch(imageResolution, (newValue) => {
    imageSetting.value.resolution = parseInt(newValue);
  });

  watch(isChangeImageSetting, (newValue) => {
    if (!newValue) {
      workspaceStore.updateImageSetting();
    }
  });
</script>

<style></style>
