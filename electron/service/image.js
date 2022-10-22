"use strict";

const Service = require("ee-core").Service;
// const sharp = require('sharp');
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const cv = require('../library/opencv');

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
    this.download_image(thumbnailDir+ thumbnailname, thumbnailUrl);
    this.download_image(workspace+'/'+filename, imageUrl);

  }

  
  async cropImage(rotate, area, format, workspace, filename, outputfile) {

    /**
    try {
      const filePath = path.join(workspace, filename);
      const outputPath = path.join(workspace, outputfile);
      if (format === 'tiff') {
        await sharp(filePath).tiff({ compression: 'deflate' }).rotate(rotate).extract(area).withMetadata().toFile(outputPath);
      } else {
        await sharp(filePath).rotate(rotate).extract(area).withMetadata().toFile(outputPath);
      }
      const thumbnailPath= workspace + '/thumbnail/'+filename.split('.')[0]+'.jpeg';
      await sharp(outputPath).resize(250,null).withMetadata().toFile(thumbnailPath)
    } catch (err) {
      console.error(err);
      throw (err.message);
    }*/
  }


  async getImageBuffer(filename) {

    try {
      console.log('Loading image buffer from ' + filename);
      // return await sharp(filename).jpeg().toBuffer();
      return "";
    } catch (err) {
      this.app.logger.error('getImageBuffer error: '+  err.message);
    }
  }
}



module.exports = ImageService;
