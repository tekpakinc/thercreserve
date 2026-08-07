(() => {
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  let installPrompt = null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/', updateViaCache: 'none' });
        await registration.update();
        registration.waiting?.postMessage('SKIP_WAITING');
      } catch (error) {
        console.warn('[RC Reserve app]', error);
      }
    });
  }

  function showIOSHelp() {
    document.querySelector('[data-install-help]')?.remove();
    const sheet = document.createElement('div');
    sheet.className = 'install-sheet';
    sheet.dataset.installHelp = '';
    sheet.innerHTML = `<button class="install-sheet-backdrop" data-close-install aria-label="Close install instructions"></button><section role="dialog" aria-modal="true" aria-labelledby="install-title"><div class="install-sheet-handle"></div><img src="/assets/icons/icon-192.png" alt=""><p class="kicker">Install on iPhone or iPad</p><h2 id="install-title">Keep it on your home screen.</h2><ol><li>Open this page in <strong>Safari</strong>.</li><li>Tap the <strong>Share</strong> button <span class="share-symbol">↥</span>.</li><li>Scroll and choose <strong>Add to Home Screen</strong>.</li><li>Tap <strong>Add</strong>.</li></ol><button class="button primary" data-close-install>Got it</button></section>`;
    sheet.querySelectorAll('[data-close-install]').forEach((button) => button.addEventListener('click', () => sheet.remove()));
    document.body.appendChild(sheet);
  }

  async function requestInstall() {
    if (standalone()) return;
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      hideBanner();
    } else if (isIOS) showIOSHelp();
    else showInstallHelp();
  }

  function showInstallHelp() {
    const message = document.querySelector('[data-install-status]');
    if (message) message.textContent = 'Use your browser menu and choose “Install app” or “Add to Home screen.”';
    document.querySelector('[data-install-banner]')?.scrollIntoView({ behavior: 'smooth' });
  }

  function hideBanner() { document.querySelector('[data-install-banner]')?.remove(); }

  function showBanner() {
    if (standalone() || document.querySelector('[data-install-banner]')) return;
    const dismissed = Number(localStorage.getItem('rc-install-dismissed') || 0);
    if (Date.now() - dismissed < 7 * 24 * 60 * 60 * 1000) return;
    const banner = document.createElement('aside');
    banner.className = 'install-banner'; banner.dataset.installBanner = ''; banner.setAttribute('aria-label', 'Install The RC Reserve');
    banner.innerHTML = `<img src="/assets/icons/icon-192.png" alt=""><div><strong>Install RC Reserve</strong><span data-install-status>Add it to your home screen. It’s free and works offline.</span></div><button class="install-now">Install</button><button class="install-dismiss" aria-label="Dismiss install suggestion">×</button>`;
    banner.querySelector('.install-now').addEventListener('click', requestInstall);
    banner.querySelector('.install-dismiss').addEventListener('click', () => { localStorage.setItem('rc-install-dismissed', String(Date.now())); banner.remove(); });
    document.body.appendChild(banner);
  }

  window.addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); installPrompt = event; showBanner(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; hideBanner(); localStorage.setItem('rc-installed', 'true'); });
  document.addEventListener('click', (event) => { if (event.target.closest('[data-pwa-install-trigger]')) requestInstall(); });
  window.addEventListener('load', () => { if (isIOS && !standalone()) showBanner(); });
})();
