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
        prefix: 'microbox',
        type: 'jpeg',
        resolution: 400,
        isCrpped: false,
        croppedArea: {
          left: 0,
          top: 0,
          with: 0,
          height: 0
        }
      },
      pdfExportTypep: 'single',
      ip: '127.0.0.1',
      workspace: '',
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

  getBaseUrl() {
    let ipData = this.scannerDB.db
    .get('ip')
    .value();

    if (_.isEmpty(ipData)) {
      ipData = ''
    }

    return 'http://' + ipData+':8888';
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

  getPDFExportTypeSettingData() {
    let data = this.scannerDB.db
    .get('pdfExportTypep')
    .value();

    if (_.isEmpty(data)) {
      data = ''
    }

    return data;
  }
  updatePDFExportTypeSettingData(type) {
    const data = this.scannerDB.db
    .assign({pdfExportTypep: type})
    .write();

    return data;
  }

  getWorkspaceSettingData() {
    let data = this.scannerDB.db
    .get('workspace')
    .value();

    if (_.isEmpty(data)) {
      data = ''
    }

    return data;
  }
  updateWorkspaceSettingData(workspaceData) {
    const data = this.scannerDB.db
    .assign({workspace: workspaceData})
    .write();

    return data;
  }

}

module.exports = StorageService;
