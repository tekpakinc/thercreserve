const app = document.querySelector('#app');

const symptomGuides = {
  'no-power': {
    title: 'No power or response',
    steps: ['Disconnect and inspect the battery for swelling or damage.', 'Confirm battery voltage with a cell checker or multimeter.', 'Check the battery and ESC connectors for heat damage or loose pins.', 'Turn the transmitter on first, then reconnect the vehicle.', 'Verify the ESC switch and receiver plugs are seated in the correct channels.']
  },
  'steering': {
    title: 'Steering is weak, slow, or unresponsive',
    steps: ['Lift the front wheels off the ground before testing.', 'Check the servo horn and steering links for looseness or binding.', 'Center steering trim and inspect transmitter endpoint settings.', 'Disconnect the servo horn and test the linkage by hand.', 'If movement is still weak, check BEC voltage and test a known-good servo.']
  },
  'overheating': {
    title: 'Motor or ESC is overheating',
    steps: ['Stop running and allow the electronics to cool completely.', 'Inspect the drivetrain for binding with the motor disengaged.', 'Check gear mesh and look for packed dirt, damaged bearings, or overtight wheels.', 'Confirm tire diameter, vehicle weight, and gearing are appropriate.', 'Use a temperature gauge; repeated temperatures above the manufacturer limit require a gearing or load change.']
  },
  'noise': {
    title: 'Clicking, grinding, or slipping',
    steps: ['Identify whether the noise occurs under acceleration, braking, or steering.', 'Inspect spur and pinion teeth and verify gear mesh.', 'Check driveshaft pins, wheel hexes, and slipper clutch adjustment.', 'Rotate each axle by hand and feel for rough bearings or differential skips.', 'Open the smallest suspect assembly first and photograph shim placement before disassembly.']
  }
};

app.innerHTML = `
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="#top" aria-label="The RC Reserve home"><span class="brand-mark">RC</span><span><strong>The RC Reserve</strong><small>Free RC tools</small></span></a>
      <nav aria-label="Main navigation"><a href="#tools">Tools</a><a href="#troubleshoot">Fix my RC</a><a href="#library">Vehicle library</a></nav>
      <div class="header-actions"><button class="install-header" data-pwa-install-trigger><span>↓</span> Install app</button><a class="maker-link" href="https://tekpakinc.net" target="_blank" rel="noreferrer">By Tek-Pak Inc. ↗</a></div>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow"><i></i> No account. No paywall. Just useful.</p>
          <h1>Wrench<br><em>smarter.</em></h1>
          <p class="lead">Fast calculators, practical troubleshooting, and vehicle references for RC hobbyists—from first repair to race-day setup.</p>
          <div class="hero-actions"><a class="button primary" href="#tools">Open the toolbox <b>→</b></a><a class="button quiet" href="#troubleshoot">Help me diagnose a problem</a></div>
          <p class="maker-note">A free community tool built by <a href="https://tekpakinc.net" target="_blank" rel="noreferrer">Tek-Pak Inc.</a></p>
        </div>
        <div class="bench-card" aria-label="Available tools overview">
          <div class="bench-top"><span>RC RESERVE / TOOLBOX</span><span>FREE ACCESS</span></div>
          <strong>04</strong><p>ready-to-use tools</p>
          <ul><li><b>01</b> Gear & speed</li><li><b>02</b> Battery runtime</li><li><b>03</b> Troubleshooter</li><li><b>04</b> Vehicle finder</li></ul>
          <div class="bench-status"><i></i> Works right in your browser</div>
        </div>
      </div>
    </section>

    <section class="tool-section" id="tools">
      <div class="container">
        <div class="section-heading"><div><p class="kicker">Quick tools</p><h2>Answers before<br>the next run.</h2></div><p>Real-world estimates for setup decisions. Always confirm component limits with the manufacturer.</p></div>
        <div class="tool-tabs" role="tablist" aria-label="RC calculators">
          <button class="active" role="tab" aria-selected="true" aria-controls="gear-panel" id="gear-tab" data-tool="gear">Gear & speed</button>
          <button role="tab" aria-selected="false" aria-controls="battery-panel" id="battery-tab" data-tool="battery">Battery runtime</button>
          <button role="tab" aria-selected="false" aria-controls="convert-panel" id="convert-tab" data-tool="convert">Unit converter</button>
        </div>

        <div class="calculator active" id="gear-panel" role="tabpanel" aria-labelledby="gear-tab">
          <div class="calc-inputs">
            <label>Pinion teeth<input id="pinion" type="number" min="1" max="100" value="15"></label>
            <label>Spur teeth<input id="spur" type="number" min="1" max="200" value="54"></label>
            <label>Motor KV<input id="kv" type="number" min="100" max="15000" value="3200"></label>
            <label>Battery voltage<input id="voltage" type="number" min="1" max="60" step="0.1" value="11.1"></label>
            <label>Tire diameter (in)<input id="tire" type="number" min="0.5" max="15" step="0.1" value="4.3"></label>
            <label>Internal ratio<input id="internal" type="number" min="1" max="20" step="0.01" value="2.85"></label>
          </div>
          <div class="results"><p>Estimated results</p><div><span><b id="ratio-result">10.26:1</b>Final drive ratio</span><span><b id="rpm-result">35,520</b>Motor RPM</span><span><b id="speed-result">27.7 mph</b>Theoretical speed</span></div><small>Speed is a no-load estimate. Surface, battery sag, tire growth, efficiency, and vehicle weight affect actual speed.</small></div>
        </div>

        <div class="calculator" id="battery-panel" role="tabpanel" aria-labelledby="battery-tab" hidden>
          <div class="calc-inputs three"><label>Battery capacity (mAh)<input id="capacity" type="number" min="100" max="50000" value="5000"></label><label>Average current draw (A)<input id="amps" type="number" min="0.1" max="500" step="0.1" value="18"></label><label>Usable capacity (%)<input id="usable" type="number" min="50" max="100" value="80"></label></div>
          <div class="results"><p>Estimated result</p><div><span><b id="runtime-result">13.3 min</b>Approximate runtime</span><span><b id="used-result">4,000 mAh</b>Usable capacity</span></div><small>Average current draw varies widely. Use a conservative value and never discharge a LiPo below its safe voltage.</small></div>
        </div>

        <div class="calculator" id="convert-panel" role="tabpanel" aria-labelledby="convert-tab" hidden>
          <div class="calc-inputs three"><label>Value<input id="convert-value" type="number" step="0.01" value="25"></label><label>Convert from<select id="convert-from"><option value="mm-in">Millimeters → inches</option><option value="in-mm">Inches → millimeters</option><option value="mph-kph">MPH → km/h</option><option value="kph-mph">km/h → MPH</option><option value="oz-g">Ounces → grams</option><option value="g-oz">Grams → ounces</option></select></label><div class="conversion-output"><span>Converted value</span><b id="convert-result">0.984 in</b></div></div>
        </div>
      </div>
    </section>

    <section class="diagnose-section" id="troubleshoot">
      <div class="container diagnose-grid">
        <div><p class="kicker lime">Fix my RC</p><h2>Start with the symptom.</h2><p>A calm, safe first-pass checklist for the most common bench problems. Work from simple checks toward disassembly.</p><label class="select-label" for="symptom">What is the rig doing?</label><select id="symptom">${Object.entries(symptomGuides).map(([key, guide]) => `<option value="${key}">${guide.title}</option>`).join('')}</select><p class="safety">Disconnect the battery before opening electronics or working near moving driveline parts.</p></div>
        <div class="checklist"><div class="checklist-head"><span>DIAGNOSTIC / FIRST PASS</span><button id="reset-checklist">Reset</button></div><h3 id="symptom-title">${symptomGuides['no-power'].title}</h3><ol id="symptom-steps"></ol><p id="progress">0 of 5 checked</p></div>
      </div>
    </section>

    <section class="library-section container" id="library">
      <div class="section-heading"><div><p class="kicker orange">Reference library</p><h2>Find your platform.</h2></div><p>A growing Git-maintained index of popular vehicles. Every correction is reviewable and every change has a history.</p></div>
      <div class="library-controls"><label class="search-field"><span>⌕</span><input id="vehicle-search" placeholder="Search brand, model, category, or scale" aria-label="Search vehicle library"></label><select id="category-filter" aria-label="Filter vehicle category"><option value="all">All categories</option></select></div>
      <p class="library-count" id="library-count">Loading vehicle library…</p><div class="vehicle-grid" id="vehicle-grid"></div>
      <div class="contribute"><div><span>MISSING A VEHICLE?</span><h3>Help make the library better.</h3><p>Submit a model, correction, or source through GitHub. Nothing publishes until it has been reviewed.</p></div><a href="https://github.com/tekpakinc/thercreserve/issues/new" target="_blank" rel="noreferrer">Contribute on GitHub ↗</a></div>
    </section>

    <section class="tekpak"><div class="container tekpak-grid"><div><p class="kicker">Why this is free</p><h2>Useful software should introduce itself by being useful.</h2></div><div><p>The RC Reserve is a Tek-Pak Inc. project: a simple, practical tool made to help the hobby community without a subscription or sales pitch.</p><a href="https://tekpakinc.net" target="_blank" rel="noreferrer">See what else Tek-Pak builds <span>→</span></a></div></div></section>
  </main>

  <footer><div class="container footer-grid"><a class="brand" href="#top"><span class="brand-mark">RC</span><span><strong>The RC Reserve</strong><small>Free RC tools</small></span></a><p>Free to use. Built for the hobby.</p><span>© <b id="year"></b> Tek-Pak Inc.</span></div></footer>
  <nav class="mobile-tab-bar" aria-label="Mobile navigation"><a href="#top"><span>⌂</span><small>Home</small></a><a href="#tools"><span>⌁</span><small>Tools</small></a><a href="#troubleshoot"><span>✓</span><small>Fix</small></a><a href="#library"><span>▦</span><small>Library</small></a><button data-pwa-install-trigger><span>↓</span><small>Install</small></button></nav>
`;

document.querySelector('#year').textContent = new Date().getFullYear();

const number = (id) => Number(document.querySelector(id).value);
function updateGear() {
  const pinion = number('#pinion'); const spur = number('#spur'); const kv = number('#kv'); const voltage = number('#voltage'); const tire = number('#tire'); const internal = number('#internal');
  const ratio = (spur / pinion) * internal; const rpm = kv * voltage; const mph = (rpm / ratio) * (Math.PI * tire) * 60 / 63360;
  document.querySelector('#ratio-result').textContent = Number.isFinite(ratio) ? `${ratio.toFixed(2)}:1` : '—';
  document.querySelector('#rpm-result').textContent = Number.isFinite(rpm) ? Math.round(rpm).toLocaleString() : '—';
  document.querySelector('#speed-result').textContent = Number.isFinite(mph) ? `${mph.toFixed(1)} mph` : '—';
}
function updateRuntime() {
  const capacity = number('#capacity'); const amps = number('#amps'); const usable = number('#usable') / 100; const used = capacity * usable; const minutes = (used / 1000) / amps * 60;
  document.querySelector('#runtime-result').textContent = Number.isFinite(minutes) ? `${minutes.toFixed(1)} min` : '—';
  document.querySelector('#used-result').textContent = Number.isFinite(used) ? `${Math.round(used).toLocaleString()} mAh` : '—';
}
function updateConversion() {
  const value = number('#convert-value'); const type = document.querySelector('#convert-from').value;
  const conversions = { 'mm-in': [value / 25.4, 'in'], 'in-mm': [value * 25.4, 'mm'], 'mph-kph': [value * 1.60934, 'km/h'], 'kph-mph': [value / 1.60934, 'mph'], 'oz-g': [value * 28.3495, 'g'], 'g-oz': [value / 28.3495, 'oz'] };
  const [result, unit] = conversions[type]; document.querySelector('#convert-result').textContent = `${result.toFixed(3).replace(/\.0+$/, '')} ${unit}`;
}
document.querySelectorAll('#gear-panel input').forEach((input) => input.addEventListener('input', updateGear));
document.querySelectorAll('#battery-panel input').forEach((input) => input.addEventListener('input', updateRuntime));
document.querySelector('#convert-value').addEventListener('input', updateConversion); document.querySelector('#convert-from').addEventListener('change', updateConversion);
document.querySelectorAll('[data-tool]').forEach((tab) => tab.addEventListener('click', () => { document.querySelectorAll('[data-tool]').forEach((item) => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab); }); document.querySelectorAll('.calculator').forEach((panel) => { const active = panel.id === `${tab.dataset.tool}-panel`; panel.classList.toggle('active', active); panel.hidden = !active; }); }));

function renderChecklist() {
  const guide = symptomGuides[document.querySelector('#symptom').value]; document.querySelector('#symptom-title').textContent = guide.title;
  document.querySelector('#symptom-steps').innerHTML = guide.steps.map((step, index) => `<li><label><input type="checkbox" data-step="${index}"><span>${step}</span></label></li>`).join('');
  document.querySelector('#progress').textContent = `0 of ${guide.steps.length} checked`;
  document.querySelectorAll('[data-step]').forEach((box) => box.addEventListener('change', () => { const checked = document.querySelectorAll('[data-step]:checked').length; document.querySelector('#progress').textContent = `${checked} of ${guide.steps.length} checked`; }));
}
document.querySelector('#symptom').addEventListener('change', renderChecklist); document.querySelector('#reset-checklist').addEventListener('click', renderChecklist); renderChecklist();

let vehicles = [];
function renderVehicles() {
  const query = document.querySelector('#vehicle-search').value.toLowerCase().trim(); const category = document.querySelector('#category-filter').value;
  const matches = vehicles.filter((vehicle) => (category === 'all' || vehicle.category === category) && [vehicle.brand, vehicle.model, vehicle.category, vehicle.scale, vehicle.platform].join(' ').toLowerCase().includes(query));
  document.querySelector('#library-count').textContent = `${matches.length} of ${vehicles.length} vehicles`;
  document.querySelector('#vehicle-grid').innerHTML = matches.length ? matches.map((vehicle) => `<article class="vehicle-card"><header><span>${vehicle.category}</span><b>${vehicle.scale}</b></header><h3>${vehicle.brand}<br><strong>${vehicle.model}</strong></h3><dl><div><dt>Platform</dt><dd>${vehicle.platform}</dd></div><div><dt>Drive</dt><dd>${vehicle.drive}</dd></div><div><dt>Power</dt><dd>${vehicle.power}</dd></div></dl><a href="${vehicle.officialUrl}" target="_blank" rel="noreferrer">Official reference ↗</a></article>`).join('') : '<p class="empty-state">No vehicles match that search yet. Try a broader term or submit it to the library.</p>';
}
fetch('./data/vehicles.json').then((response) => { if (!response.ok) throw new Error('Vehicle data unavailable'); return response.json(); }).then((data) => { vehicles = data.vehicles; const categories = [...new Set(vehicles.map((vehicle) => vehicle.category))].sort(); document.querySelector('#category-filter').insertAdjacentHTML('beforeend', categories.map((category) => `<option value="${category}">${category}</option>`).join('')); renderVehicles(); }).catch(() => { document.querySelector('#library-count').textContent = 'Vehicle library is temporarily unavailable.'; });
document.querySelector('#vehicle-search').addEventListener('input', renderVehicles); document.querySelector('#category-filter').addEventListener('change', renderVehicles);
