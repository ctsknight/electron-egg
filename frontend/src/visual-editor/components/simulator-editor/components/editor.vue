<template>
  <div class="editor">
    <div class="canvas" @dblclick="dblclick">
      <img ref="image" :alt="data.name" :src="data.url" @loadstart="start" @load="start" />
    </div>
  </div>
</template>

<script>
  import { inject } from 'vue';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';

  export default {
    name: 'Editor',
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    setup() {
      const emitter = inject('emitter');
      return { emitter };
    },
    data() {
      return {
        canvasData: null,
        cropBoxData: null,
        croppedData: null,
        cropper: null,
      };
    },
    mounted() {
      window.addEventListener('keydown', (this.onKeydown = this.keydown.bind(this)));
      this.emitter.on('editor-action', (action) => {
        this.doAction(action);
      });
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeydown);
      this.stop();
    },
    methods: {
      doAction(action) {
        const eventActions = ['clear', 'restore', 'finished', 'save', 'preview'];
        const { cropper } = this;
        if (!cropper && !eventActions.includes(action)) {
          console.log('not cropper to doAction: ' + action);
          return;
        }
        switch (action) {
          case 'move':
          case 'crop':
            cropper.setDragMode(action);
            break;
          case 'zoom-in':
            cropper.zoom(0.1);
            break;
          case 'zoom-out':
            cropper.zoom(-0.1);
            break;
          case 'rotate-left':
            cropper.rotate(-30);
            break;
          case 'rotate-right':
            cropper.rotate(30);
            break;
          case 'flip-horizontal':
            cropper.scaleX(-cropper.getData().scaleX || -1);
            break;
          case 'flip-vertical':
            cropper.scaleY(-cropper.getData().scaleY || -1);
            break;
          case 'clear':
            this.clear();
            break;
          case 'restore':
            this.restore();
            break;
          case 'finished':
            this.crop();
            break;
          case 'save':
            console.log('croppedData:  ' + JSON.stringify(this.croppedData));
            this.$emit('save-event', this.croppedData);
            break;
          case 'preview':
            console.log('preview:  ');
            this.$emit('preview-event');

            break;
          default:
        }
      },
      keydown(e) {
        switch (e.key) {
          // Undo crop
          case 'z':
            if (e.ctrlKey) {
              e.preventDefault();
              this.restore();
            }
            break;
          // Delete the image
          case 'Delete':
            this.reset();
            break;
          default:
        }
        const { cropper } = this;
        if (!cropper) {
          return;
        }
        switch (e.key) {
          // Crop the image
          case 'Enter':
            this.crop();
            break;
          // Clear crop area
          case 'Escape':
            this.clear();
            break;
          // Move to the left
          case 'ArrowLeft':
            e.preventDefault();
            cropper.move(-1, 0);
            break;
          // Move to the top
          case 'ArrowUp':
            e.preventDefault();
            cropper.move(0, -1);
            break;
          // Move to the right
          case 'ArrowRight':
            e.preventDefault();
            cropper.move(1, 0);
            break;
          // Move to the bottom
          case 'ArrowDown':
            e.preventDefault();
            cropper.move(0, 1);
            break;
          // Enter crop mode
          case 'c':
            cropper.setDragMode('crop');
            break;
          // Enter move mode
          case 'm':
            cropper.setDragMode('move');
            break;
          // Zoom in
          case 'i':
            cropper.zoom(0.1);
            break;
          // Zoom out
          case 'o':
            cropper.zoom(-0.1);
            break;
          // Rotate left
          case 'l':
            cropper.rotate(-30);
            break;
          // Rotate right
          case 'r':
            cropper.rotate(30);
            break;
          // Flip horizontal
          case 'h':
            cropper.scaleX(-cropper.getData().scaleX || -1);
            break;
          // Flip vertical
          case 'v':
            cropper.scaleY(-cropper.getData().scaleY || -1);
            break;
          default:
        }
      },
      dblclick(e) {
        if (e.target.className.indexOf('cropper-face') >= 0) {
          e.preventDefault();
          e.stopPropagation();
          this.crop();
        }
      },
      start() {
        const { data } = this;
        if (data.cropped || this.cropper) {
          console.log('cropper started return');
          return;
        }
        console.log('cropper started');
        this.update({
          loaded: true,
        });
        this.cropper = new Cropper(this.$refs.image, {
          autoCrop: false,
          dragMode: 'move',
          background: false,
          ready: () => {
            if (this.croppedData) {
              this.cropper
                .crop()
                .setData(this.croppedData)
                .setCanvasData(this.canvasData)
                .setCropBoxData(this.cropBoxData);
              this.croppedData = null;
              this.canvasData = null;
              this.cropBoxData = null;
            }
          },
          crop: ({ detail }) => {
            if (detail.width > 0 && detail.height > 0 && !data.cropping) {
              console.log('details:' + JSON.stringify(detail));
              this.update({
                cropping: true,
              });
            }
          },
        });
      },
      stop() {
        if (this.cropper) {
          console.log('cropping stopped');
          this.cropper.destroy();
          this.cropper = null;
        }
      },
      crop() {
        const { cropper, data } = this;
        if (data.cropping) {
          this.croppedData = cropper.getData();
          this.canvasData = cropper.getCanvasData();
          this.cropBoxData = cropper.getCropBoxData();
          this.containerData = cropper.getContainerData();

          this.update({
            cropped: true,
            cropping: false,
            previousUrl: data.url,
            url: cropper
              .getCroppedCanvas(
                data.type === 'image/png'
                  ? {}
                  : {
                      fillColor: '#fff',
                    },
              )
              .toDataURL(data.type),
          });
          this.stop();
        }
      },
      clear() {
        if (this.data.cropping) {
          this.cropper.clear();
          this.update({
            cropping: false,
          });
        }
      },
      restore() {
        if (this.data.cropped) {
          this.update({
            cropped: false,
            previousUrl: '',
            url: this.data.previousUrl,
          });
        }
      },
      reset() {
        this.stop();
        this.update({
          cropped: false,
          cropping: false,
          loaded: false,
          name: '',
          previousUrl: '',
          type: '',
          url: '',
        });
      },
      update(data) {
        Object.assign(this.data, data);
        this.emitter.emit('editor-update', {
          loaded: true,
          cropped: data.cropped,
          cropping: data.cropping,
          saved: false,
        });
      },
    },
  };
</script>

<style scoped>
  .editor {
    height: 100%;
  }
  .canvas {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    & > img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  .toolbar {
    background-color: rgba(5, 5, 5, 0.5);
    bottom: 1rem;
    color: #fff;
    height: 2rem;
    left: 50%;
    margin-left: -8rem;
    position: absolute;
    width: 16rem;
    z-index: 2015;
  }
  .toolbar__button {
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    float: left;
    font-size: 0.875rem;
    height: 2rem;
    text-align: center;
    width: 2rem;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #0074d9;
      color: #fff;
    }
  }
</style>
