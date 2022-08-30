"use strict";

const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const is = require("electron-is");
const { exec } = require("child_process");
const Controller = require("ee-core").Controller;
const imgToPDF = require('image-to-pdf')

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

    return fs
      .readdirSync(args.workspace, { withFileTypes: true })
      .filter((item) => !item.isDirectory()&& path.extname(item.name).match(/\.(jpe?g|png|tiff|bmp)$/))
      .map((item) =>  {
        return {
          name: item.name,
          path: args.workspace + '/' + item.name,
          size: fs.statSync(path.join(args.workspace, item.name)).size,
          format: path.extname(item.name).substring(1),
          thumbnailpath: 'scanner-file-protocol://' + args.workspace + '/' + item.name
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

  /**
   * 异步消息类型
   * @param args 前端传的参数
   * @param event - IpcMainInvokeEvent 文档：https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-invoke-event
   */
   async ipcCropImage(args, event) {

    console.log('ipcCropImage: ' + JSON.stringify(args));
    const params = args;
    const area = JSON.parse(params.area);
    const imageDir = this.service.storage.getWorkspaceSettingData();
    await this.service.image.cropImage(
      {left: Math.round(area.x), top: Math.round(area.y), width: Math.round(area.width), height: Math.round(area.height)},
      imageDir+'/'+params.name,
      imageDir+'/cropped_'+params.name
    );
  
    exec('mv '+imageDir+'/cropped_'+params.name+' '+ imageDir+'/'+params.name);
  }

  async ipcGetCurrentImage(args, event) {

    console.log('ipcGetCurrentImage: ' + JSON.stringify(args));
    const params = args;
    const imageBuffer = await this.service.image.getImageBuffer(params.path);
    let url = ''
    if (imageBuffer) {
      url ='data:image/jpeg;base64, '+imageBuffer.toString('base64');
    }
    return {
      name: params.name,
      url: url,
      previousUrl: '',
      path: params.path,
      cropped: false,
      cropping: false,
    }
  }

  async ipcConvertImagesToPDF(args, event) {

    console.log('ipcConvertImagesToPDF');
    const imageitems = JSON.parse(args.imageitems);
    const exportMode = this.service.storage.getPDFExportTypeSettingData();
    const imagesettingData = this.service.storage.getImageSettingData();
    let exportImages = [];
    for (let i = 0; i < imageitems.length; i++) {
      const imageItem = await this.ipcGetCurrentImage(imageitems[i]);
      exportImages.push(imageItem);
    }
    const imageDir = this.service.storage.getWorkspaceSettingData();

    if (exportMode === 'single') { 
      exportImages.forEach(element => {
        console.log(element.name);
        imgToPDF([element.url], imgToPDF.sizes.A4).pipe(fs.createWriteStream(imageDir+'/'+element.name.split('.')[0]+'.pdf'));
      });
    } else {
      const pages = exportImages.map(image => image.url);
      imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream(imageDir+'/'+imagesettingData.prefix+'.pdf'));
    }

  }
}


module.exports = ImageController;
