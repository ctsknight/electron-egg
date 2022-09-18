<template>
  <div>
    <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
      <van-field v-model="ipAddr" center clearable label="Host" placeholder="请输入主机地址">
        <template #button>
          <van-button size="small" type="primary">Conntection Test</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group style="margin-top: 20px; margin-bottom: 20px">
      <van-field
        v-model="authCode"
        center
        clearable
        label="Registration"
        placeholder="请输入注册码"
      >
        <template #button>
          <van-button size="small" type="primary">Send</van-button>
        </template>
      </van-field>
    </van-cell-group>
    {{ $t('language') }}
    <van-cell center title='{{t("language")}}'>
      <template #value>
        <van-radio-group v-model="language">
          <van-radio name="en">English</van-radio>
          <van-radio name="cn">中文</van-radio>
          <van-radio name="de">Deutsch</van-radio>
        </van-radio-group>
      </template>
    </van-cell>
  </div>
</template>

<script language="ts" setup>
  import ipcInvoke from '@/api/ipcRenderer';
  import { useBaseConfigStore } from '@/store/baseconfig';
  const baseConfig = useBaseConfigStore();
  // @ts-ignore
  import { useI18n } from 'vue-i18n';
  const i18n = useI18n();

  const ipAddr = ref('');
  const authCode = ref('');
  const language = ref('');

  onMounted(async () => {
    ipAddr.value = await ipcInvoke('controller.setting.getIpSetting', '');
  });

  watch(ipAddr, (newValue) => ipcInvoke('controller.setting.setIpSetting', { ip: newValue }));

  watch(language, (newValue) => {
    // @ts-ignore
    baseConfig.changeLanguage(newValue);
    i18n.locale.value = newValue;
  });
</script>

<style></style>
