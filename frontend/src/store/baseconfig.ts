import { defineStore } from 'pinia';
import cn_el from 'element-plus/lib/locale/lang/zh-cn';
import en_el from 'element-plus/lib/locale/lang/en';
import de_el from 'element-plus/lib/locale/lang/de';
import enUS from 'vant/es/locale/lang/en-US';
import deDE from 'vant/es/locale/lang/de-DE';
import zhCN from 'vant/es/locale/lang/zh-CN';
import { Locale } from 'vant';

type BaseConfigState = {
  language: any;
};

export const useBaseConfigStore = defineStore<string, BaseConfigState>('baseConfigState', {
  state: () => {
    return {
      language: cn_el,
    };
  },
  actions: {
    changeLanguage(language: string) {
      console.log(language);
      switch (language) {
        case 'en':
          Locale.use('en-US', enUS);
          this.language = en_el;
          break;
        case 'de':
          Locale.use('de-DE', deDE);
          this.language = de_el;
          break;
        case 'cn':
          Locale.use('zh-CN', zhCN);
          this.language = cn_el;
          break;
      }
    },
  },
});
