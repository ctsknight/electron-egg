'use strict';

const Service = require('ee-core').Service;
const Storage = require('ee-core').Storage;
const _ = require('lodash');

/**
 * 数据存储
 * @class
 */
class StorageService extends Service {

  constructor (ctx) {
    super(ctx);
    this.systemDB = Storage.JsonDB.connection('system');
    this.scannerDB = Storage.JsonDB.connection('scanner');  
    this.systemDBKey = {
      cache: 'cache'
    };

    const scannerDBKey = {
      imageSetting: {
        type: 'jpeg',
        resolution: 400,
        isCrpped: false,
        croppedArea: {
          x: 0,
          y: 0,
          with: 0,
          height: 0
        }
      },
      ip: '127.0.0.1',
      port: '8888'
    };

    this.scannerDB.db.defaults(scannerDBKey).write();
  }


  
  updateImageSettingData(imagesetting) {
    const data = this.scannerDB.db
    .assign({imageSetting: imagesetting})
    .write();

    return data;
  }


  getImageSettingData() {
    let data = this.scannerDB.db
    .get('imageSetting')
    .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  getIPSettingData() {
    let data = this.scannerDB.db
    .get('ip')
    .value();

    if (_.isEmpty(data)) {
      data = ''
    }

    return data;
  }

  updateIPSettingData(ipData) {
    const data = this.scannerDB.db
    .assign({ip: ipData})
    .write();

    return data;
  }

}

module.exports = StorageService;
