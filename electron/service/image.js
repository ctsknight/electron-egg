"use strict";

const Service = require("ee-core").Service;
const sharp = require('sharp');
const axios = require('axios');
const fs = require("fs");

/**
 * image服务
 * @class
 */
class ImageService extends Service {
  constructor(ctx) {
    super(ctx);
    this.download_image = (filename, url) =>
    axios({
      url,
      responseType: 'stream',
    }).then(
      response =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(filename))
            .on('finish', () => {console.log("download finished : " + filename); resolve();})
            .on('error', e => reject( 'Error by downloading '+filename + ': ' + e));
        }),
    );
    
  }

  async scanImage(params) {
    const baseUrl = this.service.storage.getBaseUrl();

    const response = await axios({
      method: 'get',
      url: baseUrl+'/capture',
      params: params
    })

    return response.data
  }

  async downloadScannedImage(workspace, filename, thumbnailname, imageUrl, thumbnailUrl) {
    const thumbnailDir = workspace + '/thumbnail/';
    if (!fs.existsSync(thumbnailDir)){
      fs.mkdirSync(thumbnailDir);
    }
    this.download_image(thumbnailDir+ thumbnailname, thumbnailUrl);
    this.download_image(workspace+'/'+filename, imageUrl);

  }

  
  async cropImage(area, filename, outputfile) {

    try {
      const info = await sharp(filename).extract(area).toFile(outputfile);
    } catch (err) {
      this.app.logger.error('cropImage error: '+  err.message);
    }
  }

  async getImageBuffer(filename) {

    try {
      return await sharp(filename).jpeg().toBuffer();
    } catch (err) {
      this.app.logger.error('getImageBuffer error: '+  err.message);
    }
  }
}



module.exports = ImageService;
