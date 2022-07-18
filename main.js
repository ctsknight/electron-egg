const Appliaction = require('ee-core').Appliaction;
const { app, protocol } = require('electron');
const path = require('path');

class Main extends Appliaction {

  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready () {
    // do some things
  }

  /**
   * electron app ready
   */
  async electronAppReady () {
  
  }

  /**
   * main window have been loaded
   */
  async windowReady () {
    // do some things

    protocol.registerFileProtocol('scanner-file-protocol', (request, callback) => {
      const url = request.url
        .replace('scanner-file-protocol://', '')
        .replace(/(.*)(#t=.*)/, '$1') // remove "#t=*" query at the end (used in video paths)
        console.log(url)
      try {
        callback({ path: path.normalize(`${url}`) })
      }
      catch (error) {
        console.error(error)
      }
    })

  }

  /**
   * before app close
   */  
  async beforeClose () {
    // do some things

  }

}

new Main();
 
