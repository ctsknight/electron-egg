"use strict";

const Service = require("ee-core").Service;
const sharp = require('sharp');
const axios = require('axios');
/**
 * image服务
 * @class
 */
class ImageService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async scanImage(params, filename) {
    const baseUrl = this.service.storage.getBaseUrl();

    axios({
      method: 'get',
      url: baseUrl+'/capture',
      params: params,
      responseType: 'stream'
    })
      .then(function (response) {
        response.data.pipe(fs.createWriteStream(filename))
      });
  
  }

  
  async cropImage(area, filename, outputfile) {

    try {
      const info = await sharp(filename).extract(area).toFile(outputfile);
    } catch (err) {
      console.error(err);
    }
  }

  async getImageBuffer(filename) {

    try {
      return await sharp(filename).jpeg().toBuffer();
    } catch (err) {
      console.error(err);
    }
  }
}



module.exports = ImageService;
