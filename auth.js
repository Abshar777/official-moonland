// Mock sign-in only: the credentials live in this file, so anyone can read them.
const MOCK_USER = { username: 'shahla', password: 'moon-mock-2026', name: 'Shahla Safeer' };
const SESSION_KEY = 'glr-session';

function signIn(username, password) {
  const ok = username.trim().toLowerCase() === MOCK_USER.username && password === MOCK_USER.password;
  if (ok) {
    try { sessionStorage.setItem(SESSION_KEY, MOCK_USER.name); } catch (e) {}
  }
  return ok;
}

function currentUser() {
  try { return sessionStorage.getItem(SESSION_KEY); } catch (e) { return null; }
}

function signOut() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  location.href = 'signin.html';
}
