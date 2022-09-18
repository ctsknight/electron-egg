import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

// 语言环境信息
const messages = {
  en: {
    move: 'Move',
    language: 'Languages',
  },
  cn: {
    move: '移动',
    language: '语言',
  },
};

// VueI18n 实例
const i18n = createI18n({
  locale: 'cn',
  allowComposition: true, // you need to specify that!
  messages,
});

export const setupI18N = (app: App) => {
  app.use(i18n);
};
