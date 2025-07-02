'use strict';
const utils = require('@iobroker/adapter-core');
class BacnetAdapter extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'bacnet' });
        this.on('ready', this.onReady.bind(this));
    }

    async onReady() {
        this.log.info('BACnet Adapter gestartet.');

        const devices = this.config.devices || [];
        for (const device of devices) {
            const id = `device_${device.deviceId}`;
            await this.setObjectNotExistsAsync(id, {
                type: 'channel',
                common: { name: device.name || `Gerät ${device.deviceId}` },
                native: device
            });
            await this.setObjectNotExistsAsync(`${id}.presentValue`, {
                type: 'state',
                common: {
                    name: 'Present Value',
                    type: 'number',
                    role: 'value',
                    read: true,
                    write: false
                },
                native: {}
            });
        }
    }
}

if (module.parent) {
    module.exports = (options) => new BacnetAdapter(options);
} else {
    new BacnetAdapter();
}