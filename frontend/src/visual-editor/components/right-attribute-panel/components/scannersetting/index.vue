<template>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-field v-model="serverip" center clearable label="主机地址" placeholder="请输入主机地址">
      <template #button>
        <van-button size="small" type="primary" @click="testServer">发送验证</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script language="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { Dialog } from 'vant';

  import { useWorkSpaceStore } from '@/store/workspace';
  import { storeToRefs } from 'pinia';

  const serverip = ref('');

  const testServer = () => {
    Dialog.alert({
      message: '代码是写出来给人看的，附带能在机器上运行。',
    }).then(() => {
      // on close
    });
  };
</script>

<style></style>
