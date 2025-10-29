function checkLibs() {
    if (!window.jspdf) { alert('jsPDF não carregado'); return false; }
    if (!window.jspdf.autoTable) { alert('AutoTable não carregado'); return false; }
    return true;
}
function getAbsences() { return JSON.parse(localStorage.getItem('absences')||'[]'); }
function getSchedules() { return JSON.parse(localStorage.getItem('schedules')||'[]'); }

function filter(data, period) {
    const today = new Date();
    return data.filter(i => {
        if (!i.date) return false;
        const d = new Date(i.date);
        switch(period){
            case 'daily': return d.toDateString()===today.toDateString();
            case 'weekly': { const w = new Date(today); w.setDate(today.getDate()-7); return d>=w && d<=today; }
            case 'monthly': { const m = new Date(today); m.setMonth(today.getMonth()-1); return d>=m && d<=today; }
            default: return true;
        }
    });
}

/* ---------- FALTAS ---------- */
async function generateAbsencesPDF(p) {
    if (!checkLibs()) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = filter(getAbsences(), p);
    doc.text('Centro de Excelência Miguel das Graças – Relatório de Faltas',10,10);
    if (!data.length) doc.text('Nenhum registro.',10,20);
    else doc.autoTable({
        head:[['Aluno','Série','Data','Motivo']],
        body:data.map(i=>[i.name,i.grade,i.date,i.reason]),
        startY:20,
        styles:{fontSize:8,cellPadding:3},
        headStyles:{fillColor:[41,128,185]},
        theme:'grid'
    });
    try { doc.save(`faltas_${p}.pdf`); alert('PDF baixado!'); }
    catch(e){ alert('Erro ao salvar PDF. Verifique bloqueadores de pop-up.'); }
}

/* ---------- HORÁRIOS ---------- */
async function generateSchedulesPDF(p) {
    if (!checkLibs()) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = filter(getSchedules(), p);
    doc.text('Centro de Excelência Miguel das Graças – Relatório de Horários',10,10);
    if (!data.length) doc.text('Nenhum registro.',10,20);
    else doc.autoTable({
        head:[['Monitor','Data','Entrada','Saída']],
        body:data.map(i=>[i.monitorName,i.date,i.entry,i.exit]),
        startY:20,
        styles:{fontSize:8,cellPadding:3},
        headStyles:{fillColor:[41,128,185]},
        theme:'grid'
    });
    try { doc.save(`horarios_${p}.pdf`); alert('PDF baixado!'); }
    catch(e){ alert('Erro ao salvar PDF. Verifique bloqueadores de pop-up.'); }
}
