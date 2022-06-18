'use strict';

const Service = require('ee-core').Service;
//const cv = require('../library/opencv');
const sharp = require('sharp');

/**
 * image服务
 * @class
 */
class ImageService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  /**
   * getOpencvInfo
   */
  async getOpencvInfo (args) {
    let obj = {
      status:'ok',
      params: args,
      msg: cv.getBuildInformation()
    }

    return obj;
  }




    /**
   * getImageInfo
   */
     async getImage (args, timeNow) {
      let input = __dirname+'/'+'output.tif';
      let output = __dirname+'/'+timeNow+'.png';
      const image = await sharp(input)
        .resize(1920)
        .toFile(output);
      let obj = {
        status:'ok',
        params: args,
        msg: output
      }
      return obj;        
    }
}

module.exports = ImageService;