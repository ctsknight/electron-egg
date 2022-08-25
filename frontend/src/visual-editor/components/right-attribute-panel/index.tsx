/*
 * @Author: 卜启缘
 * @Date: 2021-06-01 13:22:14
 * @LastEditTime: 2021-07-05 11:06:49
 * @LastEditors: 卜启缘
 * @Description: 属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\index.tsx
 * RightAttributePanel
 */

import { defineComponent, reactive, watch } from 'vue';
import styles from './index.module.scss';
import { ElTabPane, ElTabs } from 'element-plus';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';
import AttrEditor from './components/attr-editor/index.vue';
import ScannerSetting from './components/scannersetting/index.vue';

import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'RightAttributePanel',
  setup() {
    const { currentBlock } = useVisualData();

    const state = reactive({
      activeName: 'attr',
      isOpen: true,
    });

    watch(
      () => currentBlock.value.label,
      (newLabel) => {
        if (!newLabel?.startsWith('表单') && state.activeName == 'form-rule') {
          state.activeName = 'attr';
        }
      },
    );

    return () => (
      <>
        <div class={[styles.drawer, { [styles.isOpen]: state.isOpen }]}>
          <div class={styles.floatingActionBtn} onClick={() => (state.isOpen = !state.isOpen)}>
            {state.isOpen ? <DArrowRight /> : <DArrowLeft />}
          </div>
          <div class={styles.attrs}>
            <ElTabs
              v-model={state.activeName}
              type="border-card"
              stretch={true}
              class={styles.tabs}
            >
              <ElTabPane label="软件设置" name="attr">
                <AttrEditor />
              </ElTabPane>
              <ElTabPane label="扫描仪设置" name="animate">
                <ScannerSetting />
              </ElTabPane>
            </ElTabs>
          </div>
        </div>
      </>
    );
  },
});
