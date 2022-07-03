<template>
  <div class="simulator-container">
    <img :src="store.currentImage" />
  </div>
</template>

<script lang="tsx">
  import { scannerStore } from '@/store/scan';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SimulatorEditor',
    components: {},
    emits: ['on-selected'],
    setup() {
      const store = scannerStore();
      return {
        store,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @import './func.scss';

  .simulator-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding-right: 380px;
    align-items: center;
    justify-content: center;

    @media (max-width: 1114px) {
      padding-right: 0;
    }
  }

  .simulator-editor {
    width: 660px;
    height: 740px;
    min-width: 660px;
    padding: 60px 150px 0;
    overflow: hidden auto;
    background: #fafafa;
    border-radius: 5px;
    box-sizing: border-box;
    background-clip: content-box;
    contain: layout;

    &::-webkit-scrollbar {
      width: 0;
    }

    &-content {
      min-height: 100%;
      transform: translate(0);
      box-shadow: 0 8px 12px #ebedf0;
    }
  }

  .list-group-item {
    position: relative;
    padding: 3px;
    cursor: move;

    > div {
      position: relative;
    }

    &.focus {
      @include showComponentBorder;
    }

    &.drag::after {
      display: none;
    }

    &:not(.has-slot) {
      content: '';
    }

    &.focusWithChild {
      @include showContainerBorder;
    }

    i {
      cursor: pointer;
    }
  }
</style>
