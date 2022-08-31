<template>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-field v-model="ipAddr" center clearable label="主机地址" placeholder="请输入主机地址">
      <template #button>
        <van-button size="small" type="primary">发送验证</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
    <van-field v-model="authCode" center clearable label="注册码" placeholder="请输入注册码">
      <template #button>
        <van-button size="small" type="primary">发送注册码</van-button>
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
