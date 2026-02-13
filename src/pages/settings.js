import { safeText } from '../utils/sanitize.js';

export function renderSettings(user) {
  return `<main>
      <h2>Account Settings</h2>
      ${user ? `<p>Signed in as ${safeText(user.email, 'unknown')}</p>` : '<p>Login required.</p>'}
      <form id="reset-form">
        <input name="email" type="email" value="${safeText(user?.email)}" placeholder="Email for reset" required />
        <button type="submit">Send Password Reset Email</button>
      </form>
      <form id="change-email-form">
        <input name="email" type="email" placeholder="New email" required />
        <button type="submit">Change Email (Re-verify)</button>
      </form>
      <button data-action="verify">Resend Verification Email</button>
    </main>`;
}
