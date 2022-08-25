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
        <van-switch v-model="isChangeImageSetting" size="18" />
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
              <van-radio-group :disabled="!isChangeImageSetting" v-model="imageSetting.resolution">
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
  import { computed, ref, reactive } from 'vue';

  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';
  const workspaceStore = useWorkSpaceStore();

  const { workspace } = storeToRefs(workspaceStore);
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

  const imageSetting = reactive({
    resolution: '200',
    type: 'png',
  });
</script>

<style></style>
