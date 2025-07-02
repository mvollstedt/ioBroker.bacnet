'use strict';

const utils = require('@iobroker/adapter-core');

class Bacnet extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'bacnet' });
    }

    async onReady() {
        this.log.info('BACnet Adapter started.');
        const devices = this.config.devices || this.native.devices || [];
        for (const dev of devices) {
            const id = `device_${dev.address.replace(/\W/g, '_')}_${dev.objectType}_${dev.instance}_${dev.propertyId}`;
            await this.setObjectNotExistsAsync(id, {
                type: 'state',
                common: {
                    name: dev.name || id,
                    type: 'mixed',
                    role: 'value',
                    read: true,
                    write: false
                },
                native: dev
            });
            this.log.info(`Created device state: ${id}`);
        }
    }
}

if (module.parent) {
    module.exports = options => new Bacnet(options);
} else {
    new Bacnet();
}
