async function login(user, pass) {
    try {
        const res = await fetch('data/mock-api.json', {cache:'no-store'});
        if (!res.ok) throw new Error('Mock API indisponível');
        const data = await res.json();
        return data.monitors.some(m => m.username===user && m.password===pass);
    } catch { return false; }
}

document.getElementById('login-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (await login(u,p)) {
        localStorage.setItem('loggedIn','true');
        location.href='main.html';
    } else alert('Usuário ou senha incorretos');
});
