import { reactive, inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  ZoomIn,
  ZoomOut,
  SuccessFilled,
  RefreshLeft,
  RefreshRight,
  Refresh,
  Crop,
  Download,
  RemoveFilled,
  VideoPlay,
  Pointer,
} from '@element-plus/icons-vue';
import 'element-plus/es/components/message/style/css';

export const useTools = () => {
  const emitter = inject('emitter');
  const state = reactive({
    loaded: false,
    cropped: false,
    cropping: false,
    saved: false,
  });
  emitter.on('editor-update', (data) => {
    state.loaded = data.loaded;
    state.cropped = data.cropped;
    state.cropping = data.cropping;
    state.saved = data.saved;
  });
  return [
    {
      title: 'Move',
      icon: Pointer,
      onClick: () => {
        if (state.loaded && !state.cropped) {
          emitter.emit('editor-action', 'move');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropped;
      },
    },
    {
      title: 'Crop',
      icon: Crop,
      onClick: () => {
        if (state.loaded && !state.cropped) {
          emitter.emit('editor-action', 'crop');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropped;
      },
    },
    {
      title: 'ZoomIn',
      icon: ZoomIn,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'zoom-in');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },
    {
      title: 'ZoomOut',
      icon: ZoomOut,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'zoom-out');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },
    {
      title: 'RefreshLeft',
      icon: RefreshLeft,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'rotate-left');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },
    {
      title: 'RefreshRight',
      icon: RefreshRight,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'rotate-right');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },
    /**
    {
      title: '左右置换',
      icon: Switch,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'flip-horizontal');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },
    
    {
      title: '上下置换',
      icon: Sort,
      onClick: () => {
        if (state.loaded && !state.cropping && !state.cropped) {
          emitter.emit('editor-action', 'flip-vertical');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.loaded && !state.cropping && !state.cropped;
      },
    },*/
    {
      title: 'clear',
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
      title: 'Done',
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
      title: 'Reset',
      icon: Refresh,
      onClick: () => {
        if (state.cropped && !state.saved) {
          emitter.emit('editor-action', 'restore');
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
          return;
        }
      },
      isShow: () => {
        return state.cropped && !state.saved;
      },
    },

    {
      title: 'Save',
      icon: Download,
      onClick: () => {
        if (state.cropped && !state.saved) {
          ElMessageBox.confirm('确认保存已修改图片?', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          })
            .then(() => {
              emitter.emit('editor-action', 'save');
              state.saved = true;
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '保存取消',
              });
            });
        } else {
          ElMessage({
            type: 'warning',
            message: '无效操作',
          });
        }
      },
      isShow: () => {
        return state.cropped && !state.saved;
      },
    },
    {
      title: 'Preview',
      icon: VideoPlay,
      onClick: () => {
        emitter.emit('editor-action', 'preview');
      },
      isShow: () => {
        return state.loaded;
      },
    },
  ];
};
