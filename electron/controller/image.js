"use strict";

const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const is = require("electron-is");
const { exec } = require("child_process");
const Controller = require("ee-core").Controller;
const Utils = require("ee-core").Utils;
const electronApp = require("electron").app;
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
class ImageController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
  async getImagesFromWorkspace(args, event) {

    console.log(args);
    return fs
      .readdirSync(args.workspace, { withFileTypes: true })
      .filter((item) => !item.isDirectory()&& path.extname(item.name).match(/\.(jpe?g|png|gif|tiff|pdf|svg|bmp)$/))
      .map((item) =>  {
        return {
          name: item.name,
          path: 'scanner-file-protocol://' + args.workspace + '/' + item.name,
          size: fs.statSync(path.join(args.workspace, item.name)).size,
          format: path.extname(item.name).substring(1)
        };
      });
  }

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
  async ipcScanImage(args, event) {

    const params = args;
    const result = await this.service.image.scanImage(
      args,
      this.imageDir,
      timeNow
    );

    console.log("ipcScanImage : " + result.msg);
    return result.msg;
  }
}

module.exports = ImageController;
