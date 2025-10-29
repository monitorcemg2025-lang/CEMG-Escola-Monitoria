const LIMIT = 1000;
function save(arr) { localStorage.setItem('schedules', JSON.stringify(arr.slice(-LIMIT))); }

document.getElementById('schedule-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        monitorName: document.getElementById('monitor-name').value.trim(),
        date: document.getElementById('date').value,
        entry: document.getElementById('entry-time').value,
        exit: document.getElementById('exit-time').value
    };
    const arr = JSON.parse(localStorage.getItem('schedules')||'[]');
    arr.push(data);
    save(arr);
    render();
    e.target.reset();
});

function render() {
    const tbody = document.querySelector('#schedule-table tbody');
    if (!tbody) return;
    const arr = JSON.parse(localStorage.getItem('schedules')||'[]');
    tbody.innerHTML = '';
    const frag = document.createDocumentFragment();
    arr.forEach(i => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i.monitorName}</td><td>${i.date}</td><td>${i.entry}</td><td>${i.exit}</td>`;
        frag.appendChild(tr);
    });
    tbody.appendChild(frag);
}
document.addEventListener('DOMContentLoaded', render);
