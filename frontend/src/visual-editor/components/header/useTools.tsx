import { reactive, inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  ZoomIn,
  ZoomOut,
  SuccessFilled,
  RefreshLeft,
  RefreshRight,
  Refresh,
  Switch,
  Sort,
  Crop,
  Download,
  RemoveFilled,
} from '@element-plus/icons-vue';
import 'element-plus/es/components/message/style/css';

export const useTools = () => {
  const emitter = inject('emitter');
  const state = reactive({
    loaded: false,
    cropped: false,
    cropping: false,
  });
  emitter.on('editor-update', (data) => {
    console.log(data);
    state.loaded = data.loaded;
    state.cropped = data.cropped;
    state.cropping = data.cropping;
  });
  return [
    {
      title: '剪切',
      icon: Crop,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'crop');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '放大',
      icon: ZoomIn,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'zoom-in');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '缩小',
      icon: ZoomOut,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'zoom-out');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '左旋',
      icon: RefreshLeft,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'rotate-left');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '右旋',
      icon: RefreshRight,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'rotate-right');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '左右置换',
      icon: Switch,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'flip-horizontal');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '上下置换',
      icon: Sort,
      onClick: () => {
        if (!state.loaded) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'flip-vertical');
      },
      isShow: () => {
        return state.loaded;
      },
    },
    {
      title: '清除',
      icon: RemoveFilled,
      onClick: () => {
        if (!state.cropping) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'clear');
      },
      isShow: () => {
        return state.cropping;
      },
    },
    {
      title: '操作完成',
      icon: SuccessFilled,
      onClick: () => {
        if (!state.cropping) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'finished');
      },
      isShow: () => {
        return state.cropping;
      },
    },
    {
      title: '重置',
      icon: Refresh,
      onClick: () => {
        if (!state.cropped) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        emitter.emit('editor-action', 'restore');
      },
      isShow: () => {
        return state.cropped;
      },
    },

    {
      title: '保存本地',
      icon: Download,
      onClick: () => {
        if (!state.cropped) {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
        ElMessageBox.confirm('确认保存已修改图片?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
          .then(() => {
            emitter.emit('editor-action', 'save');
            ElMessage({
              type: 'success',
              message: '保存成功',
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '保存取消',
            });
          });
      },
      isShow: () => {
        return state.loaded;
      },
    },
  ];
};
