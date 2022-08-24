<template>
  <el-card shadow="hover" @click="changeCurrentImage(image)">
    <vue-pdf-embed :source="image.path" :page="1" v-if="image.format == '.pdf'" />
    <el-image :src="image.path" fit="fill" v-else>
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
      <template #error>
        <div class="image-slot">
          <el-icon :size="150"><Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <div style="padding: 14px">
      <span>{{ image.name }}</span>
      <div>
        <span>Size: {{ imageSize }} MB</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { Thumbnail } from '@/common/types';
  import { Picture } from '@element-plus/icons-vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { useWorkSpaceStore } from '@/store/workspace';

  interface Props {
    image: Thumbnail;
  }
  const { image } = defineProps<Props>();

  const imageSize = computed(() => parseFloat(image.size / (1024 * 1024)).toFixed(2));

  const workspaceStore = useWorkSpaceStore();

  const changeCurrentImage = (image: Thumbnail) => {
    workspaceStore.changeCurrentImage(image);
  };
</script>

<style></style>
