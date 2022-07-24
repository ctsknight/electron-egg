"use strict";

const Service = require("ee-core").Service;

/**
 * image服务
 * @class
 */
class ImageService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * scanImage(args, timeNow)
   */
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
}

module.exports = ImageService;
