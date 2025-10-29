const LIMIT = 1000;
function save(arr) { localStorage.setItem('absences', JSON.stringify(arr.slice(-LIMIT))); }

document.getElementById('absence-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        name: document.getElementById('student-name').value.trim(),
        grade: document.getElementById('grade').value.trim(),
        date: document.getElementById('absence-date').value,
        reason: document.getElementById('reason').value.trim()
    };
    const arr = JSON.parse(localStorage.getItem('absences')||'[]');
    arr.push(data);
    save(arr);
    render();
    e.target.reset();
});

function render() {
    const tbody = document.querySelector('#absences-table tbody');
    if (!tbody) return;
    const arr = JSON.parse(localStorage.getItem('absences')||'[]');
    tbody.innerHTML = '';
    const frag = document.createDocumentFragment();
    arr.forEach(i => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i.name}</td><td>${i.grade}</td><td>${i.date}</td><td>${i.reason}</td>`;
        frag.appendChild(tr);
    });
    tbody.appendChild(frag);
}
document.addEventListener('DOMContentLoaded', render);
