/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-07-11 18:36:24
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\index.tsx
 */
import { defineComponent, computed, watch } from 'vue';
import { ElForm, ElFormItem, ElButton } from 'element-plus';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';
import { EditPen } from '@element-plus/icons-vue';
import { useWorkSpaceStore } from '@/store/workspace';
import { storeToRefs } from 'pinia';
export const AttrEditor = defineComponent({
  setup() {
    const { currentBlock } = useVisualData();

    const compPaddingAttrs = ['paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'];

    const workspaceStore = useWorkSpaceStore();

    const { workspace } = storeToRefs(workspaceStore);

    const changeWorkspacePath = () => {
      workspaceStore.changeWorkspace();
    };
    /**
     * @description 监听组件padding值的变化
     */
    watch(
      compPaddingAttrs.map((item) => () => currentBlock.value.styles?.[item]),
      (val: string[]) => {
        const isSame = val.every((item) => currentBlock.value.styles?.tempPadding == item);
        if (isSame || new Set(val).size === 1) {
          if (Reflect.has(currentBlock.value, 'styles')) {
            currentBlock.value.styles.tempPadding = val[0];
          }
        } else {
          currentBlock.value.styles.tempPadding = '';
        }
      },
    );

    /**
     * @description 总的组件padding变化时进行的操作
     */
    const compPadding = computed({
      get: () => currentBlock.value.styles?.tempPadding,
      set(val) {
        compPaddingAttrs.forEach((item) => (currentBlock.value.styles[item] = val));
        currentBlock.value.styles.tempPadding = val;
      },
    });

    // 表单项
    const FormEditor = () => {
      const content: JSX.Element[] = [];
      content.push(
        <>
          <ElFormItem label="当前工作目录:" labelWidth={'100px'}>
            <ElButton type="primary" icon={EditPen} circle onClick={() => changeWorkspacePath()} />
          </ElFormItem>
          {workspace.value}
        </>,
      );
      return (
        <>
          <ElForm labelPosition={'left'}>{content}</ElForm>
        </>
      );
    };

    return () => (
      <>
        <FormEditor />
      </>
    );
  },
});
