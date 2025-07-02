// global load, save, setChanged, values2table, table2values
function addRow(onChange) {
    const tbody = document.querySelector('#devices tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = '<td><input data-name="label"></td>'
                 + '<td><input type="number" data-name="deviceId" value="0"></td>'
                 + '<td><input type="number" data-name="objectType" value="0"></td>'
                 + '<td><input type="number" data-name="instance" value="0"></td>'
                 + '<td><input type="number" data-name="propertyId" value="0"></td>'
                 + '<td><span class="btn delete">Löschen</span></td>';
    tbody.appendChild(tr);
    tr.querySelector('.delete').onclick = () => { tr.remove(); onChange(true); };
    tr.querySelectorAll('input').forEach(i => i.onchange = () => onChange(true));
}

function load(settings, onChange) {
    console.log('BACnet UI load', settings);
    values2table('devices', settings.devices || [], onChange);
    onChange(false);
}

function save(callback) {
    const devs = table2values('devices');
    console.log('BACnet UI save', devs);
    callback({ devices: devs });
}

window.addRow = addRow;
window.load = load;
window.save = save;
document.getElementById('add').onclick = () => addRow(setChanged);
