const app = document.querySelector('#app');

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="/" aria-label="The RC Reserve home">
          <span class="brand-mark" aria-hidden="true">RC</span>
          <span class="brand-copy">
            <strong>The RC Reserve</strong>
            <small>Parts. Builds. Culture.</small>
          </span>
        </a>
        <a class="header-link" href="mailto:info@tekpakinc.net?subject=The%20RC%20Reserve%20Inquiry">Contact</a>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow"><span></span> New site in the works</p>
            <h1>Built for people who take play seriously.</h1>
            <p class="lead">The RC Reserve is becoming a dedicated destination for remote-control vehicles, performance parts, upgrades, project builds, and the people who keep the hobby moving.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#notify">Get Launch Updates</a>
              <a class="button button-secondary" href="#preview">See What’s Coming</a>
            </div>
            <div class="status-line"><span class="status-dot"></span><strong>Current status:</strong> workshop doors closed while we finish the new site.</div>
          </div>

          <div class="hero-panel" aria-label="RC Reserve construction status">
            <div class="panel-top">
              <span>THE RC RESERVE</span>
              <span>BUILD 01</span>
            </div>
            <div class="track-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
            <div class="panel-center">
              <span class="panel-label">SITE DEVELOPMENT</span>
              <strong>UNDER<br />CONSTRUCTION</strong>
              <span class="panel-sub">Tuning the details before launch.</span>
            </div>
            <div class="panel-footer"><span>SHOP</span><span>BUILDS</span><span>COMMUNITY</span></div>
          </div>
        </div>
      </section>

      <section class="preview-section" id="preview">
        <div class="container">
          <div class="section-heading">
            <p class="section-kicker">Coming to the reserve</p>
            <h2>More than another parts catalog.</h2>
            <p>We are building a practical RC hub around products, projects, and enthusiast culture.</p>
          </div>
          <div class="feature-grid">
            <article class="feature-card"><span class="feature-number">01</span><h3>Vehicles & Parts</h3><p>RC cars, trucks, electronics, batteries, motors, driveline components, and replacement parts.</p></article>
            <article class="feature-card"><span class="feature-number">02</span><h3>Performance Upgrades</h3><p>Curated upgrades for speed, durability, handling, crawling, drifting, and custom builds.</p></article>
            <article class="feature-card"><span class="feature-number">03</span><h3>Build Features</h3><p>Project spotlights, setup ideas, product notes, and practical inspiration from the workbench.</p></article>
            <article class="feature-card"><span class="feature-number">04</span><h3>Hobby Community</h3><p>A place for enthusiasts, new builders, racers, bashers, crawlers, and collectors to connect.</p></article>
          </div>
        </div>
      </section>

      <section class="notify-section" id="notify">
        <div class="container notify-grid">
          <div>
            <p class="section-kicker">Stay in the loop</p>
            <h2>Be first through the gate.</h2>
            <p>Join the launch list for opening updates, featured builds, new inventory, and RC Reserve announcements.</p>
          </div>
          <form class="notify-form" action="https://formsubmit.co/info@tekpakinc.net" method="POST">
            <input type="hidden" name="_subject" value="The RC Reserve Launch List Signup" />
            <input type="hidden" name="_template" value="table" />
            <input type="text" name="_honey" class="hidden-field" tabindex="-1" autocomplete="off" />
            <label for="name">Name</label>
            <input id="name" name="name" type="text" maxlength="80" placeholder="Your name" required />
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" maxlength="120" placeholder="you@example.com" required />
            <label for="interest">What are you into?</label>
            <select id="interest" name="interest">
              <option value="General RC">General RC</option>
              <option value="Bashing">Bashing</option>
              <option value="Racing">Racing</option>
              <option value="Crawling">Crawling</option>
              <option value="Drifting">Drifting</option>
              <option value="Collecting">Collecting</option>
              <option value="Building and Upgrades">Building &amp; Upgrades</option>
            </select>
            <button class="button button-primary" type="submit">Join the Launch List</button>
            <small>Only RC Reserve updates. No inbox demolition derby.</small>
          </form>
        </div>
      </section>
    </main>

    <footer>
      <div class="container footer-row">
        <div><strong>The RC Reserve</strong><span>A TEK-PAK Inc. project</span></div>
        <p>Parts. Builds. Culture.</p>
        <p>&copy; <span id="year"></span> The RC Reserve</p>
      </div>
    </footer>
  </div>
`;

document.querySelector('#year').textContent = new Date().getFullYear();
