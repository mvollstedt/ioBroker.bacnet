'use strict';

const utils = require('@iobroker/adapter-core');

class Bacnet extends utils.Adapter {
    constructor(options) {
        super({
            ...options,
            name: 'bacnet',
        });
    }

    async onReady() {
        this.log.info('BACnet Adapter gestartet.');
    }

    onUnload(callback) {
        try {
            callback();
        } catch (e) {
            callback();
        }
    }
}

if (require.main !== module) {
    module.exports = (options) => new Bacnet(options);
} else {
    new Bacnet();
}
