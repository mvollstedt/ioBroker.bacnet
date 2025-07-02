
/* global systemDictionary, load, save */

function load(settings, onChange) {
    if (!settings) return;
    values2table('devices', settings.devices || [], onChange);
    onChange(false);
}

function save(callback) {
    callback({ devices: table2values('devices') });
}
