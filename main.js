'use strict';
const utils = require('@iobroker/adapter-core');
class Bacnet extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'bacnet' });
    }
    async onReady() {
        this.log.info('BACnet Adapter gestartet.');
        const devices = this.config.devices || [];
        this.log.info('Configuration devices:', devices);
        for (const dev of devices) {
            const id = `device_${dev.deviceId}_${dev.objectType}_${dev.instance}_${dev.propertyId}`;
            await this.setObjectNotExistsAsync(id, {
                type: 'state',
                common: {
                    name: dev.label || id,
                    type: 'mixed',
                    role: 'value',
                    read: true,
                    write: false
                },
                native: dev
            });
            this.log.info(`Gerät angelegt: ${id}`);
        }
    }
}
if (require.main === module) {
    new Bacnet();
} else {
    module.exports = options => new Bacnet(options);
}