"use strict";

const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const is = require("electron-is");
const { exec } = require("child_process");
const Controller = require("ee-core").Controller;
const Utils = require("ee-core").Utils;
const electronApp = require("electron").app;
const {
  dialog,
  webContents,
  shell,
  BrowserWindow,
  BrowserView,
  Notification,
  powerMonitor,
  screen,
  nativeTheme,
} = require("electron");
const autoLaunchManager = require("../library/autoLaunch");
const dayjs = require("dayjs");
const { times } = require("lodash");

let myTimer = null;
let browserViewObj = null;
let notificationObj = null;

/**
 * 示例控制器
 * @class
 */
class ImageManagerController extends Controller {
  constructor(ctx) {
    super(ctx);
    const config = Utils.getCoreDB().getItem("config");
    this.imageDir = config.baseDir + "/resources/images/";
  }

  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。invoke()方法时，event == IpcMainInvokeEvent; send()/sendSync()方法时，event == IpcMainEvent
   */

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
  async getAllScanedImages(args, event) {
    return fs
      .readdirSync(this.imageDir+'converter', { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name);
  }

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
  async ipcScanImage(args, event) {
    let timeNow = dayjs().valueOf();

    const params = args;
    const result = await this.service.image.scanImage(
      args,
      this.imageDir,
      timeNow
    );

    console.log("ipcScanImage: " + result.msg);
    return result.msg;
  }
}

module.exports = ImageManagerController;
