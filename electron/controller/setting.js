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
class SettingController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
  getImageSetting(args, event) {
    return this.service.storage.getImageSettingData();
  }

  setImageSetting(args, event) {
    console.log("setImageSetting", args);
    this.service.storage.updateImageSettingData(JSON.parse(args.imageSetting));
  }

  getIpSetting(args, event) {
    return this.service.storage.getIPSettingData();
  }

  setIpSetting(args, event) {
    console.log("setIpSetting", args);
    this.service.storage.updateIPSettingData(args.ip);
  }
  
  getWorkspaceSetting(args, event) {
    return this.service.storage.getWorkspaceSettingData();
  }

  setWorkspaceSetting(args, event) {
    this.service.storage.updateWorkspaceSettingData(args.workspace);
  }

  getPdfExportType(args, event) {
    return this.service.storage.getPDFExportTypeSettingData();
  }

  setPdfExportType(args, event) {
    this.service.storage.updatePDFExportTypeSettingData(args.pdfExportTypep);
  }
}


module.exports = SettingController;
