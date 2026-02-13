import './styles/main.css';
import {
  changeEmail,
  logInEmail,
  logInGoogle,
  logOut,
  signUpEmail,
  subscribeAuth,
  triggerPasswordReset,
  triggerVerification
} from './services/auth.js';
import { sanitizeInput } from './utils/sanitize.js';
import { createRateLimiter } from './utils/rateLimiter.js';
import { renderAbout } from './pages/about.js';
import { renderHome } from './pages/home.js';
import { renderSettings } from './pages/settings.js';

const app = document.querySelector('#app');

const products = [
  { id: 1, name: 'RC Drift Chassis', price: 329.99 },
  { id: 2, name: 'Brushless Motor Pack', price: 119.5 },
  { id: 3, name: '4S LiPo Battery', price: 59.0 }
];

const authLimiter = createRateLimiter({ windowMs: 60_000, limit: 7 });
let state = { user: null, guestMode: false, route: 'home', notice: '' };

function nav() {
  return `<header>
    <h1>The RC Reserve</h1>
    <nav>
      <button data-route="home">Shop</button>
      <button data-route="about">About</button>
      <button data-route="settings">Settings</button>
      ${state.user ? '<button data-action="logout">Logout</button>' : '<button data-action="open-auth">Login / Sign Up</button>'}
    </nav>
  </header>`;
}

function authOverlay() {
  if (state.user || state.guestMode) return '';
  return `<section class="overlay"><div class="card">
      <button class="close" data-action="guest">✕</button>
      <h2>Welcome Back</h2>
      <p>Sign in with Google, email/password, or create an account.</p>
      <button data-action="google">Continue with Google</button>
      <form id="login-form"><h3>Email Login</h3>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required minlength="8" />
        <button type="submit">Log In</button>
      </form>
      <form id="signup-form"><h3>Create Account</h3>
        <input name="name" placeholder="Display Name" required maxlength="60" />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required minlength="8" />
        <button type="submit">Sign Up + Verify Email</button>
      </form>
    </div></section>`;
}

const pageBody = () => (state.route === 'about' ? renderAbout() : state.route === 'settings' ? renderSettings(state.user) : renderHome(products));

function render() {
  app.innerHTML = `${nav()}${state.notice ? `<p class="notice">${sanitizeInput(state.notice)}</p>` : ''}${pageBody()}${authOverlay()}`;
}

const setNotice = (msg) => {
  state.notice = msg;
  render();
};

async function guarded(action, fn) {
  const check = authLimiter.hit(`auth:${action}`);
  if (!check.allowed) return setNotice(`Too many attempts. Retry in ${Math.ceil(check.retryAfterMs / 1000)}s.`);
  try { await fn(); } catch (error) { setNotice(error?.message ?? 'Request failed.'); }
}

app.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.route) {
    state.route = target.dataset.route;
    return render();
  }

  const action = target.dataset.action;
  if (!action) return;
  if (action === 'open-auth') { state.guestMode = false; return render(); }
  if (action === 'guest') { state.guestMode = true; return setNotice('Browsing as guest. Sign in to buy.'); }
  if (action === 'google') return guarded('google', async () => { await logInGoogle(); setNotice('Signed in with Google.'); });
  if (action === 'logout') return guarded('logout', async () => { await logOut(); state.guestMode = false; setNotice('Logged out.'); });
  if (action === 'verify') {
    if (!state.user) return setNotice('Please login first.');
    return guarded('verify', async () => { await triggerVerification(state.user); setNotice('Verification email sent.'); });
  }
  if (action === 'buy') {
    if (!state.user) { state.guestMode = false; render(); return setNotice('Please log in or sign up before buying.'); }
    if (!state.user.emailVerified) return setNotice('Verify your email before checkout.');
    return setNotice('Prototype checkout success.');
  }
});

app.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();

  if (form.id === 'login-form') {
    const email = sanitizeInput(form.email.value);
    return guarded('login', async () => { await logInEmail(email, form.password.value); setNotice('Logged in.'); });
  }
  if (form.id === 'signup-form') {
    const name = sanitizeInput(form.name.value);
    const email = sanitizeInput(form.email.value);
    return guarded('signup', async () => { await signUpEmail(name, email, form.password.value); setNotice('Account created. Check your email for verification link.'); });
  }
  if (form.id === 'reset-form') {
    const email = sanitizeInput(form.email.value);
    return guarded('reset', async () => { await triggerPasswordReset(email); setNotice('Reset email sent.'); });
  }
  if (form.id === 'change-email-form') {
    if (!state.user) return setNotice('Login required to change email.');
    const email = sanitizeInput(form.email.value);
    return guarded('change-email', async () => { await changeEmail(state.user, email); setNotice('Email changed. Verify your new email.'); });
  }
});

subscribeAuth((user) => {
  state.user = user;
  render();
});

render();
