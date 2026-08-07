const app = document.querySelector('#app');

const vehicles = {
  trx4: { name: 'Traxxas TRX-4 Sport', type: '1/10 Trail Crawler', guides: 84 },
  kraton: { name: 'ARRMA Kraton 6S', type: '1/8 Basher', guides: 61 },
  slash: { name: 'Traxxas Slash 4x4', type: '1/10 Short Course', guides: 73 },
  scx10: { name: 'Axial SCX10 III', type: '1/10 Trail Crawler', guides: 58 }
};

app.innerHTML = `
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="#top" aria-label="The RC Reserve home"><span class="brand-mark">RC</span><span><strong>The RC Reserve</strong><small>Garage intelligence</small></span></a>
      <nav aria-label="Main navigation"><a href="#garage">My garage</a><a href="#fixes">Fix library</a><a href="#community">Build notes</a></nav>
      <a class="header-action" href="#garage">Add a rig</a>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="container hero-inner">
        <p class="eyebrow"><i></i> Built for the bench, not the display case</p>
        <h1>Your RC.<br><em>Dialed in.</em></h1>
        <p class="lead">The vehicle-specific garage for fixing, tuning, and upgrading your rig—with community-tested advice that actually fits.</p>
        <form class="search" id="search-form"><span aria-hidden="true">⌕</span><label class="sr-only" for="site-search">Search fixes, parts, and setups</label><input id="site-search" placeholder="What are you working on?" autocomplete="off"><button>Find a fix <b>→</b></button></form>
        <p class="search-result" id="search-result" aria-live="polite"></p>
        <div class="popular"><span>Popular now</span><button data-query="ESC blinking red">ESC blinking</button><button data-query="steering slop">Steering slop</button><button data-query="gear mesh">Gear mesh</button></div>
        <div class="track-marks" aria-hidden="true"><i></i><i></i><i></i></div>
      </div>
    </section>

    <section class="garage" id="garage">
      <div class="container garage-grid">
        <div class="garage-copy"><p class="kicker">Your garage</p><h2>One rig.<br>Zero generic advice.</h2><p>Select your vehicle and The Reserve filters every fix, part, and setup for fit.</p></div>
        <div class="rig-card">
          <div class="rig-art" aria-hidden="true"><span class="rig-body"></span><i class="wheel wheel-a"></i><i class="wheel wheel-b"></i></div>
          <div class="rig-info"><label for="vehicle">Active vehicle</label><select id="vehicle">${Object.entries(vehicles).map(([id, vehicle]) => `<option value="${id}">${vehicle.name}</option>`).join('')}</select><p id="vehicle-meta">${vehicles.trx4.type} · ${vehicles.trx4.guides} compatible guides</p></div>
          <span class="ready">Ready</span>
        </div>
      </div>
    </section>

    <section class="fixes container" id="fixes">
      <div class="section-head"><div><p class="kicker orange">Start here</p><h2>What’s happening<br>at the bench?</h2></div><a href="#fix-grid">Browse all fixes ↗</a></div>
      <div class="fix-grid" id="fix-grid">
        <article class="fix-card orange-card"><header><span>Drivetrain</span><b>01</b></header><div class="part-diagram"><i></i><i></i><b>+</b></div><h3>Clicking under load? Start here.</h3><p>12 min · 42 garage saves</p><footer><span>Beginner</span><button aria-label="Open drivetrain guide">→</button></footer></article>
        <article class="fix-card blue-card"><header><span>Electronics</span><b>02</b></header><div class="part-diagram"><i></i><i></i><b>+</b></div><h3>ESC calibration, without the guesswork.</h3><p>8 min · 31 garage saves</p><footer><span>Beginner</span><button aria-label="Open ESC guide">→</button></footer></article>
        <article class="fix-card green-card"><header><span>Setup</span><b>03</b></header><div class="part-diagram"><i></i><i></i><b>+</b></div><h3>Trail-ready TRX-4 baseline.</h3><p>Parts + settings · 67 garage saves</p><footer><span>Intermediate</span><button aria-label="Open setup guide">→</button></footer></article>
      </div>
    </section>

    <section class="community" id="community">
      <div class="container community-grid">
        <div><p class="kicker ink">From the pits</p><h2>Stop buying parts twice.</h2><p>See what survived someone else’s rig first. Real build notes, indexed by vehicle and verified by time on the trail.</p></div>
        <article class="build-note"><header><span class="user-dot">JR</span><div><strong>Jordan R.</strong><small>TRX-4 Sport · 2h ago</small></div><b>✓ Tested</b></header><h3>Finally killed the steering slop</h3><p>Swapped the plastic horn, set endpoints to 86/88, and added one thin shim. Twelve trail hours later: still tight.</p><div class="tags"><span>25T alloy horn</span><span>0.2mm shim</span></div><button id="save-note">☆ Save build note</button></article>
      </div>
    </section>

    <section class="manifesto container"><div><p>Built around your vehicles—not a warehouse catalog.</p><h2>The next breakdown<br>is inevitable.</h2></div><a href="#garage">Build your garage <span>→</span></a></section>
  </main>

  <footer class="site-footer"><div class="container"><a class="brand" href="#top"><span class="brand-mark">RC</span><span><strong>The RC Reserve</strong><small>Garage intelligence</small></span></a><p>Knowledge for the run after the run.</p><span>© <b id="year"></b> TEK-PAK Inc.</span></div></footer>
`;

document.querySelector('#year').textContent = new Date().getFullYear();
const searchInput = document.querySelector('#site-search');
const searchResult = document.querySelector('#search-result');
const vehicleSelect = document.querySelector('#vehicle');

function showSearch(query) {
  const active = vehicles[vehicleSelect.value];
  searchInput.value = query;
  searchResult.textContent = query ? `Searching ${active.guides} compatible guides for “${query}” on your ${active.name}…` : '';
}

document.querySelector('#search-form').addEventListener('submit', (event) => { event.preventDefault(); showSearch(searchInput.value.trim()); });
document.querySelectorAll('[data-query]').forEach((button) => button.addEventListener('click', () => showSearch(button.dataset.query)));
vehicleSelect.addEventListener('change', () => { const active = vehicles[vehicleSelect.value]; document.querySelector('#vehicle-meta').textContent = `${active.type} · ${active.guides} compatible guides`; if (searchInput.value) showSearch(searchInput.value); });
document.querySelector('#save-note').addEventListener('click', (event) => { const saved = event.currentTarget.classList.toggle('saved'); event.currentTarget.textContent = saved ? '★ Saved to your garage' : '☆ Save build note'; });
