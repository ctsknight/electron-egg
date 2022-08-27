"use strict";

const Service = require("ee-core").Service;
const sharp = require('sharp');

/**
 * image服务
 * @class
 */
class ImageService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async scanImage(args, imageDir, timeNow) {
    let input = imageDir + "original/output.tif";
    // const image = await sharp(input).resize(1920).toFile(output);
    let obj = {
      status: "ok",
      params: args,
      msg: input,
    };
    return obj;
  }

  
  async cropImage(area, filename, outputfile) {

    try {
      const info = await sharp(filename).extract(area).toFile(outputfile);
    } catch (err) {
      console.error(err);
    }
  }
}



module.exports = ImageService;
