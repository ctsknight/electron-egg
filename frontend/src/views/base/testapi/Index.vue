<template>
  <div id="app-base-test-api">
    <div class="one-block-1">
      <span>
        1. opencv.js测试
      </span>
    </div>  
    <div class="one-block-2">
      <a-space>
        <a-button @click="handleInvoke"> opencv </a-button>
        结果：{{ message }}
      </a-space>
    </div>
  </div>
</template>
<script>
import { ipcApiRoute, requestHttp } from '@/api/main'

export default {
  data() {
    return {
      type: 1,
      message: '',
    };
  },
  methods: {
    exec (id) {
      const params = {
        id: id
      }
      this.$ipcInvoke(ipcApiRoute.test, params).then(res => {
        console.log('res:', res)
      }) 
    },
    exec2 (id) {
      const params = {
        id: id
      }
      requestHttp(ipcApiRoute.test, params).then(res => {
        console.log('res2:', res)
      }) 
    },
    async handleInvoke () {
      const msg = await this.$ipcInvoke(ipcApiRoute.ipcInvokeMsgOpenCV, '异步');
      console.log('msg:', msg);
      this.message = msg;
    },    
  }
};
</script>
<style lang="less" scoped>
#app-base-test-api {
  padding: 0px 10px;
  text-align: left;
  width: 100%;
  .one-block-1 {
    font-size: 16px;
    padding-top: 10px;
  }
  .one-block-2 {
    padding-top: 10px;
  }
}
</style>
