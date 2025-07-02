// global load, save, setChanged
function addRow(onChange) {
    const tbody = document.querySelector('#devices tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><input data-name="name"></td><td><input data-name="address"></td><td><input type="number" data-name="objectType"></td><td><input type="number" data-name="instance"></td><td><input type="number" data-name="propertyId"></td><td><span class="btn delete">Löschen</span></td>`;
    tbody.appendChild(tr);
    tr.querySelector('.delete').onclick=()=>{tr.remove(); onChange(true);};
    tr.querySelectorAll('input').forEach(i=>i.onchange=()=>onChange(true));
}

function load(settings, onChange) {
    const devices = settings.devices||[];
    const tbody = document.querySelector('#devices tbody');
    tbody.innerHTML='';
    devices.forEach(dev=>{
        const tr = document.createElement('tr');
        tr.innerHTML=`<td><input data-name="name" value="${dev.name||''}"></td><td><input data-name="address" value="${dev.address||''}"></td><td><input type="number" data-name="objectType" value="${dev.objectType||0}"></td><td><input type="number" data-name="instance" value="${dev.instance||0}"></td><td><input type="number" data-name="propertyId" value="${dev.propertyId||0}"></td><td><span class="btn delete">Löschen</span></td>`;
        tbody.appendChild(tr);
        tr.querySelector('.delete').onclick=()=>{tr.remove(); onChange(true);};
        tr.querySelectorAll('input').forEach(i=>i.onchange=()=>onChange(true));
    });
    onChange(false);
}

function save(callback) {
    const rows = document.querySelectorAll('#devices tbody tr');
    const devices = [...rows].map(tr=>{
        const dev={};
        tr.querySelectorAll('input').forEach(inp=>{
            dev[inp.dataset.name]= inp.type==='number'?Number(inp.value):inp.value;
        });
        return dev;
    });
    callback({devices});
}

window.addRow=addRow; window.load=load; window.save=save;
document.getElementById('add').onclick=()=>addRow(setChanged);
