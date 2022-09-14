<template>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-field v-model="ipAddr" center clearable label="Host" placeholder="请输入主机地址">
      <template #button>
        <van-button size="small" type="primary">Conntection Test</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-field v-model="authCode" center clearable label="Registration" placeholder="请输入注册码">
      <template #button>
        <van-button size="small" type="primary">Send</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>

<script language="ts" setup>
  import ipcInvoke from '@/api/ipcRenderer';

  const ipAddr = ref('');
  const authCode = ref('');

  onMounted(async () => {
    ipAddr.value = await ipcInvoke('controller.setting.getIpSetting', '');
  });

  watch(ipAddr, (newValue) => ipcInvoke('controller.setting.setIpSetting', { ip: newValue }));
</script>

<style></style>
