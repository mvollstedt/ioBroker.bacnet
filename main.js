'use strict';
const utils = require('@iobroker/adapter-core');
class Bacnet extends utils.Adapter {
  constructor(options) { super({ ...options, name: 'bacnet' }); }
  async onReady() { this.log.info('Bacnet started'); }
}
module.exports = (options) => new Bacnet(options);
