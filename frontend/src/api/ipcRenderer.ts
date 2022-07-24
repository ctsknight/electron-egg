const { ipcRenderer: ipc } = (window.require && window.require('electron')) || {};

/**
 * 发送异步消息（invoke/handle 模型）
 * @param channel
 * @param param
 * @returns {Promise}
 */
const ipcInvoke = (channel: any, param: any) => {
  const message = ipc.invoke(channel, param);
  return message;
};

export default ipcInvoke;
