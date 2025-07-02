'use strict';

const utils = require('@iobroker/adapter-core');

class Bacnet extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: 'bacnet',
        });
    }

    async onReady() {
        await this.setObjectNotExistsAsync('info.connection', {
            type: 'state',
            common: {
                name: 'Device connected',
                type: 'boolean',
                role: 'indicator.connected',
                read: true,
                write: false,
                def: false
            },
            native: {}
        });
        await this.setStateAsync('info.connection', false, true);

        if (Array.isArray(this.config.devices)) {
            for (const dev of this.config.devices) {
                const dpId = `device_${dev.deviceId}_${dev.objectType}_${dev.instance}_${dev.propertyId}`;
                await this.setObjectNotExistsAsync(dpId, {
                    type: 'state',
                    common: {
                        name: dev.label || dpId,
                        type: 'mixed',
                        role: 'value',
                        read: true,
                        write: false
                    },
                    native: dev
                });
                this.log.info(`[BACnet] Gerät aus Config erzeugt: ${dpId}`);
            }
        } else {
            this.log.warn("[BACnet] Keine gültigen Geräte in Konfiguration gefunden.");
        }
    }
}

if (require.main === module) {
    (() => new Bacnet())();
} else {
    module.exports = (options) => new Bacnet(options);
}
