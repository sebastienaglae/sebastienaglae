const fs = require('fs');
const path = require('path');

const fontCss = fs.readFileSync(path.join(__dirname, 'html/_fonts.css'), 'utf8');

// ── PROFILE HERO ──────────────────────────────────────────────────────────────
const profileHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Profile</title>
  <script src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js"><\/script>
  <style>
    ${fontCss}

    :root {
      --bg: #060503;
      --text: #EAE0D4;
      --amber: #F5A623;
      --line: #1E1912;
      --panel: #0D0A07;
      --panel-alt: #131009;
      --muted: #8A7B6E;
      --red: #E84B2D;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #030201; color: var(--text); font-family: 'Body Sans', sans-serif; }
    .app { min-height: 100vh; display: flex; flex-direction: column; padding: 18px; gap: 18px; }
    .toolbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border: 1px solid var(--line); background: var(--panel); }
    .toolbar-left { display: flex; flex-direction: column; gap: 6px; }
    .toolbar-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px; text-transform: uppercase; }
    .toolbar-sub { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--muted); }
    .toolbar-right { display: flex; align-items: center; gap: 10px; }
    .scale-select, .dl-btn { height: 42px; border: 1px solid var(--line); background: var(--panel); color: var(--text); font-family: 'JetBrains Mono', monospace; font-size: 14px; }
    .scale-select { padding: 0 10px; }
    .dl-btn { padding: 0 16px; cursor: pointer; border-color: var(--amber); }
    .dl-btn:hover { background: #130F08; }
    .canvas-wrap { display: flex; justify-content: center; overflow: auto; padding-bottom: 24px; }
    .capture-root { width: 1440px; min-width: 1440px; background: var(--bg); color: var(--text); }
    .frame { position: relative; overflow: hidden; border: 1px solid var(--line); background: var(--bg); }
    .headline { font-family: 'Syne', sans-serif; font-weight: 800; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .panel { background: var(--panel); border: 1px solid var(--line); }
    .panel-alt { background: var(--panel-alt); border: 1px solid var(--line); }

    /* HERO */
    .hero { position: relative; display: grid; grid-template-columns: 1fr 360px; padding: 44px 44px 44px 60px; gap: 28px; }
    .amber-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 10px; background: var(--amber); }
    .hero-left { display: flex; flex-direction: column; gap: 18px; }
    .hero-kicker { font-size: 12px; letter-spacing: 1.8px; text-transform: uppercase; color: var(--amber); font-family: 'JetBrains Mono', monospace; }
    .hero-name { font-size: 70px; line-height: 0.92; letter-spacing: -1px; }
    .hero-role { font-size: 20px; color: var(--muted); font-family: 'Syne', sans-serif; font-weight: 800; margin-top: 4px; }
    .hero-bio { font-size: 18px; line-height: 1.58; max-width: 700px; margin: 0; }
    .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid var(--line); background: var(--panel); }
    .tag-dot { width: 7px; height: 7px; flex-shrink: 0; }
    .tag-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.4px; line-height: 1.3; }
    .hero-right { display: flex; flex-direction: column; gap: 14px; }
    .info-card { border: 1px solid var(--amber); background: var(--panel); padding: 18px 20px; display: flex; flex-direction: column; gap: 8px; }
    .info-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; color: var(--amber); letter-spacing: 1.2px; }
    .info-val { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; line-height: 1.2; }
    .info-sub { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--muted); line-height: 1.6; }
    .links-card { border: 1px solid var(--line); background: var(--panel); padding: 16px 20px; display: flex; flex-direction: column; gap: 6px; }
    .link-row { display: flex; gap: 10px; align-items: center; }
    .link-dot { width: 5px; height: 5px; background: var(--muted); flex-shrink: 0; }
    .link-text { font-size: 14px; line-height: 1.5; color: var(--text); }

    /* PROJECTS */
    .section { border-top: 1px solid var(--line); padding: 28px 44px; }
    .section-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; }
    .section-kicker { font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 1.4px; color: var(--amber); }
    .section-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; line-height: 1; }
    .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .project-card { border: 1px solid var(--line); background: var(--panel); padding: 20px 22px; display: flex; flex-direction: column; gap: 10px; }
    .project-period { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--amber); }
    .project-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; line-height: 1; }
    .project-desc { font-size: 16px; line-height: 1.55; margin: 0; flex: 1 1 auto; }
    .project-stack { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--muted); margin-top: auto; }

    /* BOTTOM */
    .bottom-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
    .edu-card, .award-card { border: 1px solid var(--line); background: var(--panel); padding: 18px 20px; display: flex; flex-direction: column; gap: 0; }
    .bottom-section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--amber); margin-bottom: 12px; }
    .edu-row { display: flex; align-items: flex-start; gap: 14px; padding: 10px 0; border-top: 1px solid var(--line); }
    .edu-row-first { border-top: 0 !important; padding-top: 0 !important; }
    .edu-year { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); min-width: 76px; padding-top: 3px; }
    .edu-name { font-size: 15px; line-height: 1.35; }
    .edu-school { font-size: 12px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
    .award-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-top: 1px solid var(--line); }
    .award-row-first { border-top: 0 !important; padding-top: 0 !important; }
    .award-dot { width: 6px; height: 6px; background: var(--amber); flex-shrink: 0; margin-top: 7px; }
    .award-text { font-size: 15px; line-height: 1.4; }
    .award-meta { font-size: 12px; color: var(--muted); font-family: 'JetBrains Mono', monospace; line-height: 1.4; }

    @media (max-width: 1500px) {
      .toolbar { flex-direction: column; align-items: stretch; gap: 12px; }
      .toolbar-right { justify-content: space-between; }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Profile</div>
        <div class="toolbar-sub">Open in a browser · click Download PNG.</div>
      </div>
      <div class="toolbar-right">
        <select class="scale-select" id="scale">
          <option value="1">1×</option>
          <option value="2" selected>2×</option>
          <option value="3">3×</option>
        </select>
        <button class="dl-btn" id="download">Download PNG</button>
      </div>
    </div>
    <div class="canvas-wrap">
      <div id="capture" class="capture-root">
        <div class="frame">

          <!-- IDENTITY -->
          <div class="hero">
            <div class="amber-bar"></div>
            <div class="hero-left">
              <div class="mono hero-kicker">Full-Stack · Game Dev · AI Orchestration · IoT</div>
              <div>
                <div class="headline hero-name">Sébastien</div>
                <div class="headline hero-name" style="color:var(--amber)">Aglaé</div>
              </div>
              <div class="hero-role">Software Developer — South of France, open to Osaka</div>
              <p class="hero-bio">I build ambitious software products across front-end, back-end, mobile, IoT, and game development, with AI orchestration when it serves the product. Co-founder of Hana Games, creator of Core Dash, and a product-minded developer who moves from vision to delivery.</p>
              <div class="tag-row">
                <div class="tag"><div class="tag-dot" style="background:var(--amber)"></div><div class="tag-label">REACT / NEXT.JS / TS</div></div>
                <div class="tag"><div class="tag-dot" style="background:var(--amber)"></div><div class="tag-label">UNITY / C#</div></div>
                <div class="tag"><div class="tag-dot" style="background:var(--amber)"></div><div class="tag-label">.NET / gRPC / POSTGRES</div></div>
                <div class="tag"><div class="tag-dot" style="background:var(--red)"></div><div class="tag-label">AI ORCHESTRATION</div></div>
                <div class="tag"><div class="tag-dot" style="background:var(--amber)"></div><div class="tag-label">IoT / CLOUD / MOBILE</div></div>
              </div>
            </div>
            <div class="hero-right">
              <div class="info-card">
                <div class="info-label">Location</div>
                <div class="info-val">Sophia Antipolis, France</div>
                <div class="info-sub">Open to full-time in Osaka, Japan</div>
              </div>
              <div class="info-card" style="border-color:var(--line)">
                <div class="info-label">Current roles</div>
                <div class="info-sub">↳ Dash Systems — Freelance studio</div>
                <div class="info-sub">↳ Hana Games — Co-founder</div>
                <div class="info-sub">↳ Core Dash — Creator</div>
              </div>
              <div class="links-card">
                <div class="info-label" style="margin-bottom:6px">Endpoints</div>
                <div class="link-row"><div class="link-dot"></div><div class="link-text">sebastien-aglae.fr</div></div>
                <div class="link-row"><div class="link-dot"></div><div class="link-text">core-dash.com</div></div>
                <div class="link-row"><div class="link-dot"></div><div class="link-text">dash-systems.fr</div></div>
              </div>
            </div>
          </div>

          <!-- PROJECTS -->
          <div class="section">
            <div class="section-header">
              <div class="mono section-kicker">Selected work</div>
              <div class="headline section-title">Projects</div>
            </div>
            <div class="project-grid">
              <div class="project-card">
                <div class="mono project-period">2026 → Present</div>
                <div class="headline project-name">Dash Systems</div>
                <p class="project-desc">Freelance studio delivering premium websites, back-offices, mobile apps, and custom software — clear scope, structured delivery, end-to-end.</p>
                <div class="mono project-stack">Next.js · React · TypeScript · SEO · Deployment</div>
              </div>
              <div class="project-card">
                <div class="mono project-period">2025 → Present</div>
                <div class="headline project-name">Core Dash</div>
                <p class="project-desc">AI-first dashboard platform built through agent orchestration — Claude and Gemini as production partners, architecture and vision supervised throughout.</p>
                <div class="mono project-stack">Next.js · .NET · gRPC · Postgres · Redis · Docker</div>
              </div>
              <div class="project-card" style="background:var(--panel-alt); border-color:#191510">
                <div class="mono project-period" style="color:var(--muted)">2026 → Present</div>
                <div class="headline project-name" style="font-size:22px; color:var(--muted)">AeroModel</div>
                <p class="project-desc" style="font-size:15px; color:var(--muted)">Aircraft visualization API — angle-specific renders with airline liveries for aviation, branding, and compliance tools.</p>
                <div class="mono project-stack" style="font-size:10px">Next.js · Image API · Cloudflare · B2B</div>
              </div>
            </div>
          </div>

          <!-- EDUCATION & AWARDS -->
          <div class="section">
            <div class="section-header">
              <div class="mono section-kicker">Background</div>
              <div class="headline section-title">Education & Awards</div>
            </div>
            <div class="bottom-grid">
              <div class="edu-card">
                <div class="bottom-section-label">Education</div>
                <div class="edu-row edu-row-first">
                  <div class="edu-year">2022–2024</div>
                  <div><div class="edu-name">Master · MIAGE</div><div class="edu-school">Université Côte d'Azur — Sophia Antipolis</div></div>
                </div>
                <div class="edu-row">
                  <div class="edu-year">2021–2022</div>
                  <div><div class="edu-name">Licence · MIAGE</div><div class="edu-school">Université Côte d'Azur</div></div>
                </div>
                <div class="edu-row">
                  <div class="edu-year">2019–2021</div>
                  <div><div class="edu-name">DUT · Computer Science</div><div class="edu-school">IUT Nice Côte d'Azur</div></div>
                </div>
                <div class="edu-row">
                  <div class="edu-year">Licenses</div>
                  <div><div class="edu-name">French + Japanese Driving License</div><div class="edu-school">JAF translation issued for Japan</div></div>
                </div>
              </div>
              <div class="award-card">
                <div class="bottom-section-label">Awards</div>
                <div class="award-row award-row-first">
                  <div class="award-dot"></div>
                  <div><div class="award-text">Games on Web 2024 — Speed Run Award</div><div class="award-meta">CGI · BabylonJS · Olympic Edition</div></div>
                </div>
                <div class="award-row">
                  <div class="award-dot"></div>
                  <div><div class="award-text">Games on Web 2023 — 2nd Place</div><div class="award-meta">CGI · Theme: To Be Green</div></div>
                </div>
                <div class="award-row">
                  <div class="award-dot"></div>
                  <div><div class="award-text">Games on Web 2022 — Coup de Pouce</div><div class="award-meta">CGI · Theme: You Are Unique</div></div>
                </div>
                <div class="award-row">
                  <div class="award-dot"></div>
                  <div><div class="award-text">Amadeus Hackathon — 1st Place</div><div class="award-meta">Accessibility Challenge · 2022</div></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <script>
    const button = document.getElementById('download');
    const scale = document.getElementById('scale');
    const capture = document.getElementById('capture');
    button.addEventListener('click', async () => {
      const prev = button.textContent;
      button.textContent = 'Rendering...';
      button.disabled = true;
      try {
        const px = Number(scale.value);
        const w = capture.scrollWidth, h = capture.scrollHeight;
        const dataUrl = await htmlToImage.toPng(capture, {
          width: w, height: h, canvasWidth: w * px, canvasHeight: h * px,
          pixelRatio: 1, cacheBust: true, backgroundColor: '#060503'
        });
        const a = document.createElement('a');
        a.href = dataUrl; a.download = 'profile.png'; a.click();
      } catch (e) { console.error(e); alert('PNG export failed. See console.'); }
      finally { button.textContent = prev; button.disabled = false; }
    });
  <\/script>
</body>
</html>`;

// ── VOYAGEONS CARD ────────────────────────────────────────────────────────────
// Voyageons rectangular SVG with adjusted colors for dark background
// fill="black" on text → fill="#DDF2F4" (light near-white)
// fill="black" on mountain icon → fill="#0D9488" (teal-600)
// fill="white" / stroke="white" stays as-is

const voyageonsLogoSvg = `<svg width="580" height="82" viewBox="0 0 965 135" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M630.041 26C635.198 26 639.693 27.1373 643.524 29.4122C647.355 31.6872 650.338 34.8432 652.475 38.8791C652.792 39.4574 653.085 40.0512 653.359 40.6581V27.9801H659.88V79.8295C659.88 86.801 658.848 92.4159 656.785 96.6722C654.722 100.928 651.406 104.047 646.839 106.028C642.345 108.009 636.341 109 628.826 109C626.1 109 623.337 108.853 620.537 108.56C617.811 108.339 615.195 108.046 612.69 107.679V100.632C615.343 100.999 618.106 101.293 620.979 101.513C623.926 101.807 626.69 101.954 629.268 101.954C634.867 101.954 639.325 101.223 642.64 99.755C645.955 98.2874 648.311 95.9372 649.711 92.7086C651.184 89.553 651.921 85.3694 651.921 80.1589V73.9205C651.779 74.2056 651.631 74.4888 651.479 74.7666C649.269 78.7286 646.285 81.7727 642.529 83.9006C638.772 86.0287 634.499 87.0942 629.711 87.0944C625.511 87.0944 621.678 86.2884 618.215 84.6739C614.827 83.0596 611.919 80.8561 609.488 78.0679C607.056 75.2058 605.177 71.975 603.851 68.3791C602.525 64.7836 601.86 61.0053 601.86 57.0431V55.4999C601.86 51.611 602.525 47.9045 603.851 44.3824C605.177 40.787 607.057 37.6305 609.488 34.9155C611.919 32.1275 614.864 29.9614 618.327 28.4205C621.863 26.806 625.768 26 630.041 26ZM631.145 33.0464C626.872 33.0466 623.151 34.0712 619.984 36.1258C616.816 38.1806 614.385 40.9708 612.69 44.4934C610.996 47.9425 610.149 51.8701 610.149 56.2732C610.149 60.7493 610.996 64.7494 612.69 68.2716C614.459 71.7939 616.927 74.5469 620.095 76.5282C623.263 78.5091 626.946 79.4998 631.145 79.5001C635.123 79.5001 638.662 78.6564 641.756 76.9686C644.923 75.2076 647.427 72.7476 649.269 69.5928C651.11 66.4372 652.033 62.7658 652.033 58.5827V53.1904C652.033 49.1542 651.076 45.6296 649.161 42.6208C647.319 39.6124 644.85 37.2656 641.756 35.5779C638.662 33.89 635.123 33.0464 631.145 33.0464Z" fill="#DDF2F4"/>
<path d="M487.464 77.846H490.294L505.873 27.9801H513.939L493.385 93.26C492.207 97.0022 490.585 100.012 488.522 102.286C486.459 104.634 483.99 106.322 481.117 107.349C478.244 108.377 474.966 108.889 471.283 108.889H464.209V101.513H471.725C474.303 101.513 476.515 101.185 478.357 100.525C480.198 99.9377 481.745 98.872 482.997 97.3311C484.249 95.7901 485.316 93.6618 486.2 90.947L488.125 84.7814H482.224L461.006 27.9801H469.514L487.464 77.846Z" fill="#DDF2F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M414.906 26C419.841 26.0002 424.187 26.8816 427.944 28.6424C431.775 30.3303 435.018 32.6048 437.67 35.4669C440.322 38.3287 442.311 41.5943 443.637 45.2632C445.037 48.8591 445.737 52.5305 445.737 56.2732V57.8129C445.737 61.555 445.075 65.2241 443.749 68.8195C442.423 72.4154 440.434 75.6838 437.782 78.6193C435.203 81.4813 431.997 83.7934 428.166 85.5547C424.336 87.2424 419.915 88.086 414.906 88.0862C409.896 88.0862 405.473 87.2426 401.642 85.5547C397.886 83.7937 394.682 81.4806 392.03 78.6193C389.452 75.6838 387.46 72.4154 386.06 68.8195C384.734 65.2241 384.072 61.555 384.072 57.8129V56.2732C384.072 52.5305 384.771 48.8591 386.171 45.2632C387.571 41.5942 389.598 38.3288 392.25 35.4669C394.902 32.6048 398.108 30.3303 401.865 28.6424C405.696 26.8813 410.044 26 414.906 26ZM414.906 33.4868C410.265 33.4868 406.246 34.5489 402.857 36.6771C399.469 38.7316 396.855 41.5575 395.014 45.1522C393.246 48.6748 392.361 52.6399 392.361 57.0431C392.361 61.3726 393.246 65.3347 395.014 68.9304C396.782 72.4528 399.323 75.315 402.638 77.5165C406.027 79.6447 410.117 80.7103 414.906 80.7103C419.768 80.7101 423.856 79.6445 427.171 77.5165C430.56 75.3149 433.138 72.453 434.906 68.9304C436.674 65.3347 437.559 61.3726 437.559 57.0431C437.559 52.6399 436.64 48.6748 434.798 45.1522C433.03 41.5566 430.448 38.7318 427.059 36.6771C423.671 34.5497 419.62 33.487 414.906 33.4868Z" fill="#DDF2F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M712.141 26C718.255 26.0002 723.338 27.3595 727.389 30.0746C731.515 32.7898 734.611 36.2736 736.674 40.5298C738.737 44.7128 739.769 49.2277 739.769 54.0712V58.3643H691.727C691.87 62.2142 692.594 65.7735 693.906 69.0414C695.453 72.6371 697.775 75.4994 700.869 77.6275C704.037 79.7553 708.014 80.8213 712.803 80.8213C717.886 80.8213 722.011 79.6805 725.179 77.4056C728.346 75.0574 730.301 72.3076 731.038 69.1524H738.773C738.037 73.041 736.49 76.4165 734.133 79.2781C731.775 82.0668 728.789 84.2321 725.179 85.7732C721.569 87.314 717.444 88.0862 712.803 88.0862C707.793 88.0861 703.445 87.2426 699.762 85.5547C696.078 83.7935 693.057 81.4812 690.7 78.6193C688.342 75.6838 686.573 72.4154 685.394 68.8195C684.29 65.2241 683.737 61.5174 683.737 57.7019V56.1623C683.737 52.4196 684.289 48.7482 685.394 45.1522C686.573 41.5569 688.343 38.3286 690.7 35.4669C693.057 32.6048 696.006 30.3303 699.542 28.6424C703.152 26.8813 707.353 26 712.141 26ZM712.141 33.2649C707.573 33.2649 703.778 34.3305 700.757 36.4587C697.737 38.5868 695.453 41.4115 693.906 44.9338C692.999 47.1018 692.371 49.4507 692.023 51.9802H731.769C731.476 48.9586 730.754 46.2435 729.6 43.8345C728.127 40.5321 725.915 37.9604 722.968 36.1258C720.096 34.2188 716.486 33.2651 712.141 33.2649Z" fill="#DDF2F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M789.649 26C794.586 26 798.933 26.8811 802.69 28.6424C806.521 30.3302 809.762 32.6052 812.414 35.4669C815.066 38.3286 817.055 41.5944 818.381 45.2632C819.78 48.8591 820.483 52.5305 820.483 56.2732V57.8129C820.483 61.5552 819.818 65.2239 818.492 68.8195C817.166 72.4154 815.177 75.6838 812.525 78.6193C809.947 81.481 806.74 83.7936 802.91 85.5547C799.079 87.2422 794.659 88.0861 789.649 88.0862C784.64 88.0862 780.22 87.2422 776.389 85.5547C772.632 83.7936 769.426 81.481 766.774 78.6193C764.195 75.6838 762.206 72.4154 760.807 68.8195C759.481 65.2239 758.815 61.5552 758.815 57.8129V56.2732C758.815 52.5305 759.518 48.8591 760.918 45.2632C762.318 41.5947 764.341 38.3285 766.993 35.4669C769.645 32.605 772.851 30.3303 776.608 28.6424C780.439 26.8811 784.787 26 789.649 26ZM789.649 33.4868C785.008 33.4868 780.993 34.5492 777.604 36.6771C774.215 38.7317 771.599 41.5569 769.757 45.1522C767.989 48.6748 767.104 52.6399 767.104 57.0431C767.104 61.3724 767.989 65.3348 769.757 68.9304C771.525 72.4525 774.067 75.3151 777.381 77.5165C780.77 79.6447 784.861 80.7103 789.649 80.7103C794.512 80.7103 798.602 79.6447 801.918 77.5165C805.306 75.3151 807.885 72.4525 809.653 68.9304C811.421 65.3349 812.306 61.3722 812.306 57.0431C812.306 52.6399 811.383 48.6748 809.542 45.1522C807.773 41.5569 805.195 38.7317 801.806 36.6771C798.417 34.5489 794.364 33.4868 789.649 33.4868Z" fill="#DDF2F4"/>
<path d="M941.459 26.2219C947.722 26.2219 952.806 27.687 956.711 30.6225C960.689 33.5579 962.716 37.7418 962.789 43.1722H955.054C954.98 40.3836 953.801 38.0337 951.517 36.1258C949.233 34.2179 945.88 33.2649 941.459 33.2649C936.892 33.2649 933.466 34.2557 931.182 36.2367C928.973 38.2179 927.869 40.64 927.868 43.5016C927.868 45.9234 928.715 47.9418 930.41 49.5563C932.104 51.0972 934.755 52.0536 938.364 52.4206L944.996 53.0795C950.89 53.74 955.68 55.4271 959.364 58.1423C963.121 60.8575 965 64.748 965 69.8112C965 73.2603 964.002 76.3785 962.013 79.1672C960.097 81.8825 957.372 84.0136 953.835 85.5547C950.299 87.0953 946.174 87.8642 941.459 87.8642C933.945 87.8642 928.16 86.2488 924.108 83.0198C920.057 79.7175 917.996 75.3146 917.922 69.8112H925.658C925.805 72.5996 927.057 75.1308 929.414 77.4056C931.845 79.6805 935.86 80.8212 941.459 80.8213C946.69 80.8213 950.595 79.7557 953.174 77.6275C955.826 75.4259 957.153 72.7825 957.153 69.7003C957.153 66.8389 956.045 64.6386 953.835 63.0977C951.699 61.4834 948.568 60.4552 944.443 60.0149L937.814 59.3526C932.51 58.7655 928.197 57.1535 924.881 54.5116C921.64 51.7967 920.022 48.0899 920.021 43.3941C920.021 39.9451 920.906 36.9361 922.674 34.3676C924.442 31.7993 926.908 29.8148 930.075 28.4205C933.317 26.9528 937.113 26.222 941.459 26.2219Z" fill="#DDF2F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M553.087 27.3212C559.054 27.3212 563.844 28.0556 567.454 29.5232C571.138 30.9909 573.829 33.303 575.524 36.4587C577.218 39.5407 578.065 43.6503 578.065 48.7864V86.2136H571.433V74.4823C570.929 76.1593 570.272 77.6874 569.445 79.0597C567.677 81.9216 565.28 84.087 562.26 85.5547C559.24 87.0219 555.704 87.7532 551.652 87.7532C547.527 87.7532 543.879 87.0224 540.711 85.5547C537.543 84.087 535.074 81.9558 533.306 79.1672C531.612 76.3788 530.764 73.0035 530.764 69.0414C530.764 65.152 531.649 61.8494 533.417 59.1341C535.259 56.4188 537.875 54.3628 541.264 52.9685C544.727 51.501 548.889 50.7665 553.752 50.7665H570.107V48.0166C570.107 43.6869 568.965 40.3843 566.681 38.1093C564.398 35.7612 560.862 34.5863 556.074 34.5861C553.863 34.5861 551.614 34.6237 549.33 34.6971C547.12 34.7704 544.984 34.8797 542.921 35.0265C540.932 35.0999 539.163 35.2092 537.616 35.3559V28.091C539.236 27.9443 540.896 27.7974 542.59 27.6506C544.285 27.5039 546.017 27.4322 547.785 27.4322C549.626 27.3588 551.393 27.3212 553.087 27.3212ZM553.198 57.0431C548.557 57.0432 544.984 58.1805 542.479 60.4553C540.048 62.6569 538.834 65.5566 538.834 69.1524C538.834 72.8212 540.124 75.7556 542.702 77.9569C545.28 80.0847 548.778 81.1506 553.198 81.1507C555.924 81.1507 558.54 80.6725 561.045 79.7185C563.549 78.6913 565.648 77.0035 567.343 74.6557C569.037 72.234 569.959 68.9312 570.107 64.7484V57.0431H553.198Z" fill="#DDF2F4"/>
<path d="M340.5 79.5001H343.344L359.087 27.9801H367.264L349.14 86.2136H334.554L314 27.9801H322.508L340.5 79.5001Z" fill="#DDF2F4"/>
<path d="M872.748 26.2219C880.115 26.2221 885.605 28.5309 889.215 33.1539C892.825 37.7039 894.629 44.1279 894.629 52.4206V86.2136H886.451V50.659C886.451 45.5955 885.052 41.5209 882.252 38.4387C879.453 35.3566 875.547 33.8163 870.538 33.8163C865.381 33.8163 861.218 35.4317 858.05 38.6607C854.957 41.8159 853.41 45.9973 853.41 51.2069V86.2136H845.121V27.9801H851.749V41.6637C852.063 40.536 852.431 39.4602 852.856 38.4387C854.477 34.5495 856.908 31.5404 860.15 29.4122C863.391 27.2842 867.482 26.2219 872.418 26.2219H872.748Z" fill="#DDF2F4"/>
<path d="M0 134.533H299.761L255.916 72.9287L248.447 78.9033L222.926 41.8721L205.792 55.9824L181.271 24.9551L174.739 30.4814L149.848 0L128.521 27.9258L122.008 22.415L88.4854 66.9434L71.4609 52.9219L49.4385 82.9521L41.9316 76.9473L0 134.533Z" fill="#0D9488"/>
<path d="M136.416 62.083C136.725 59.9224 138.87 58.5323 140.969 59.1328C142.704 59.6294 143.803 61.3341 143.539 63.1191L143.039 66.501L142.474 72.5488L142.908 68.5947C143.152 66.3664 144.548 64.4293 146.584 63.4922C149.633 62.0895 153.247 63.2872 154.854 66.2334L157.9 71.8184C157.963 71.9331 158.075 72.0126 158.204 72.0342L163.573 72.9287L163.502 70.0391C163.481 69.2109 164.137 68.5227 164.965 68.502C165.793 68.4815 166.48 69.1359 166.501 69.9639L166.587 73.4307L167.874 73.6455C169.101 73.8501 170 74.9117 170 76.1553C170 77.7078 168.622 78.9034 167.084 78.6904C166.963 78.6737 166.841 78.6567 166.718 78.6396L167.501 109.964C167.522 110.792 166.867 111.48 166.039 111.501C165.211 111.522 164.523 110.867 164.502 110.039L163.706 78.2217C160.057 77.713 156.358 77.1788 156 77C155.709 76.8542 153.509 74.7408 151.5 72.6787L150.061 83.5469C150.023 83.8347 150.111 84.1247 150.304 84.3418L157.809 92.7842C157.934 92.9249 158.017 93.0984 158.048 93.2842L160.592 108.554C160.819 109.917 159.924 111.215 158.568 111.486C157.159 111.768 155.794 110.836 155.544 109.421L153.063 95.4102C153.023 95.1795 152.902 94.9702 152.723 94.8193L148.032 90.8691C147.519 90.4367 146.733 90.6232 146.469 91.2402L144 97L137.419 110.161C136.653 111.692 134.746 112.248 133.278 111.367C131.985 110.591 131.489 108.961 132.132 107.596L138.979 93.043C138.993 93.0143 139.004 92.9846 139.013 92.9541L140.977 86.082C140.992 86.0279 141.003 85.972 141.009 85.916L141.747 79.1816C141.087 81.1674 138.993 82.4088 136.857 81.9053C134.699 81.3962 133.322 79.2804 133.73 77.1006L136 64.9961L136.416 62.083Z" fill="white"/>
<path d="M161.031 49.6279L157.649 50.5332C157.66 50.5467 157.669 50.5607 157.68 50.5742C157.697 50.5976 157.715 50.621 157.732 50.6445C157.778 50.7057 157.821 50.7681 157.864 50.8311C157.877 50.85 157.891 50.8686 157.903 50.8877C157.998 51.0286 158.086 51.1739 158.17 51.3232C158.697 52.2628 159 53.3458 159 54.5C159 58.0898 156.09 61 152.5 61C148.91 61 146 58.0899 146 54.5C146 52.3116 147.082 50.3771 148.74 49.1992C148.768 49.1794 148.796 49.1591 148.824 49.1396C148.87 49.108 148.917 49.0773 148.964 49.0469C148.997 49.0255 149.03 49.0042 149.063 48.9834C149.123 48.9464 149.183 48.9101 149.243 48.875C149.255 48.8681 149.267 48.8614 149.279 48.8545C149.917 48.49 150.622 48.2309 151.371 48.0996C151.375 48.099 151.378 48.0983 151.382 48.0977C151.462 48.0837 151.543 48.0706 151.625 48.0596C151.647 48.0565 151.67 48.0536 151.692 48.0508C151.766 48.0416 151.84 48.033 151.915 48.0264C151.949 48.0233 151.982 48.0221 152.016 48.0195C152.074 48.0153 152.132 48.0106 152.19 48.0078C152.4 47.9976 152.608 47.9978 152.815 48.0078C152.839 48.0089 152.863 48.0103 152.887 48.0117C152.959 48.016 153.03 48.0217 153.102 48.0283C153.143 48.0321 153.184 48.0364 153.226 48.041C153.295 48.0489 153.365 48.0573 153.435 48.0674C153.463 48.0714 153.491 48.0757 153.519 48.0801C153.575 48.089 153.631 48.099 153.686 48.1094C154.472 48.2543 155.209 48.5392 155.868 48.9395L160.514 47.6953L161.031 49.6279Z" fill="white"/>
<path d="M172.148 39.166C172.573 39.6854 173.188 40.0127 173.855 40.0742C174.523 40.1357 175.188 39.9264 175.7 39.4932L180.195 35.6875L201.388 62.502V62.5029L219.934 86.5576C220.726 87.5857 222.174 87.8361 223.266 87.1338C224.357 86.4313 224.73 85.0099 224.123 83.8623L211.866 60.6924L221.385 52.8535L245.318 87.582C245.712 88.1534 246.326 88.5356 247.013 88.6367C247.699 88.7378 248.397 88.5486 248.938 88.1152L254.404 83.7402L285.217 127.033H14.7363L43.373 87.7051L48.8252 92.0664C49.3571 92.4919 50.0396 92.6822 50.7148 92.5928C51.3901 92.5033 51.9995 92.142 52.4023 91.5928L72.8164 63.7539L82.5557 71.7734L73.6455 90.9795C73.1071 92.1402 73.5318 93.52 74.6299 94.1768C75.7282 94.8336 77.1453 94.555 77.9131 93.5312L92.9746 73.4492L123.223 33.2686L127.688 37.0479C128.211 37.4902 128.893 37.6988 129.573 37.625C130.254 37.5511 130.875 37.2015 131.291 36.6572L150.043 12.0996L172.148 39.166Z" stroke="white" stroke-width="5" stroke-linejoin="round"/>
</svg>`;

const voyageonsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Voyageons</title>
  <script src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js"><\/script>
  <style>
    ${fontCss}

    :root {
      --bg: #030B0D;
      --text: #DDF2F4;
      --teal: #14B8A6;
      --teal-dim: #0D9488;
      --line: #0E2428;
      --panel: #06141A;
      --panel-alt: #091D24;
      --muted: #4E7A82;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #020809; color: var(--text); font-family: 'Body Sans', sans-serif; }
    .app { min-height: 100vh; display: flex; flex-direction: column; padding: 18px; gap: 18px; }
    .toolbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border: 1px solid var(--line); background: var(--panel); }
    .toolbar-left { display: flex; flex-direction: column; gap: 6px; }
    .toolbar-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px; text-transform: uppercase; }
    .toolbar-sub { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--muted); }
    .toolbar-right { display: flex; align-items: center; gap: 10px; }
    .scale-select, .dl-btn { height: 42px; border: 1px solid var(--line); background: var(--panel); color: var(--text); font-family: 'JetBrains Mono', monospace; font-size: 14px; }
    .scale-select { padding: 0 10px; }
    .dl-btn { padding: 0 16px; cursor: pointer; border-color: var(--teal); }
    .dl-btn:hover { background: #091D24; }
    .canvas-wrap { display: flex; justify-content: center; overflow: auto; padding-bottom: 24px; }
    .capture-root { width: 1440px; min-width: 1440px; background: var(--bg); color: var(--text); }
    .frame { position: relative; overflow: hidden; border: 1px solid var(--line); background: var(--bg); }
    .headline { font-family: 'Syne', sans-serif; font-weight: 800; }
    .mono { font-family: 'JetBrains Mono', monospace; }

    /* BRAND HEADER */
    .brand-header {
      position: relative;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      padding: 44px 48px 40px 60px;
      gap: 32px;
    }
    .teal-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 10px; background: var(--teal); }
    .brand-left { display: flex; flex-direction: column; gap: 14px; }
    .brand-logo { display: block; }
    .brand-tagline { font-size: 18px; line-height: 1.5; color: var(--muted); max-width: 640px; }
    .brand-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
    .coming-soon-badge {
      display: flex; align-items: center; gap: 10px;
      border: 1px solid var(--teal); padding: 12px 20px;
      background: var(--panel);
    }
    .coming-soon-dot { width: 8px; height: 8px; background: var(--teal); border-radius: 50%; }
    .coming-soon-text { font-family: 'JetBrains Mono', monospace; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--teal); }
    .coming-soon-url { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: var(--text); }

    /* FEATURES */
    .features-section { border-top: 1px solid var(--line); padding: 32px 48px 40px; }
    .features-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 24px; }
    .features-kicker { font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 1.4px; color: var(--teal); }
    .features-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; line-height: 1; }
    .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .feature-card {
      border: 1px solid var(--line); background: var(--panel);
      padding: 24px 22px; display: flex; flex-direction: column; gap: 12px;
    }
    .feature-icon { font-size: 26px; line-height: 1; }
    .feature-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; line-height: 1.2; }
    .feature-desc { font-size: 15px; line-height: 1.6; color: var(--muted); flex: 1 1 auto; }
    .feature-tag {
      display: inline-flex; align-items: center; gap: 6px;
      border: 1px solid var(--teal); padding: 4px 10px;
      font-family: 'JetBrains Mono', monospace; font-size: 10px;
      text-transform: uppercase; letter-spacing: 1px; color: var(--teal);
      width: fit-content; margin-top: auto;
    }

    /* FOOTER */
    .card-footer {
      border-top: 1px solid var(--line);
      padding: 20px 48px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-left { display: flex; align-items: center; gap: 14px; }
    .footer-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); }
    .footer-url { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; color: var(--teal); }
    .footer-status { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

    @media (max-width: 1500px) {
      .toolbar { flex-direction: column; align-items: stretch; gap: 12px; }
      .toolbar-right { justify-content: space-between; }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Voyageons</div>
        <div class="toolbar-sub">Open in a browser · click Download PNG.</div>
      </div>
      <div class="toolbar-right">
        <select class="scale-select" id="scale">
          <option value="1">1×</option>
          <option value="2" selected>2×</option>
          <option value="3">3×</option>
        </select>
        <button class="dl-btn" id="download">Download PNG</button>
      </div>
    </div>
    <div class="canvas-wrap">
      <div id="capture" class="capture-root">
        <div class="frame">

          <!-- BRAND HEADER -->
          <div class="brand-header">
            <div class="teal-bar"></div>
            <div class="brand-left">
              <div class="brand-logo">
                ${voyageonsLogoSvg}
              </div>
              <p class="brand-tagline">Collaborative travel planner — plan trips together from the first idea to the memory book. Real-time sync, interactive maps, shared budgets, and AI-powered tools.</p>
            </div>
            <div class="brand-right">
              <div class="coming-soon-badge">
                <div class="coming-soon-dot"></div>
                <div class="coming-soon-text">Coming soon</div>
              </div>
              <div class="coming-soon-url">voyageons.app</div>
            </div>
          </div>

          <!-- FEATURES -->
          <div class="features-section">
            <div class="features-header">
              <div class="features-kicker">What it does</div>
              <div class="headline features-title">Key features</div>
            </div>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">🗺</div>
                <div class="headline feature-name">Collaborative<br />Trip Planning</div>
                <p class="feature-desc">Plan in real-time with your whole group — shared itinerary, members, roles, presence, activity feed, comments, and polls so everyone stays aligned.</p>
                <div class="feature-tag"><span style="width:5px;height:5px;background:var(--teal);flex-shrink:0;display:inline-block"></span>Real-time sync</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📍</div>
                <div class="headline feature-name">Interactive Map<br />&amp; Itinerary</div>
                <p class="feature-desc">Day-by-day timeline with 30+ item types, a fullscreen map with smart POI detection, real routes, transit layers, and offline map packs.</p>
                <div class="feature-tag"><span style="width:5px;height:5px;background:var(--teal);flex-shrink:0;display:inline-block"></span>30+ item types</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="headline feature-name">Budget &amp;<br />Expense Tracking</div>
                <p class="feature-desc">Shared costs with per-item splits, multi-currency support, settlement suggestions, a category donut, per-day breakdown, and a budget target.</p>
                <div class="feature-tag"><span style="width:5px;height:5px;background:var(--teal);flex-shrink:0;display:inline-block"></span>Multi-currency</div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🤖</div>
                <div class="headline feature-name">AI Assistant<br />&amp; Export</div>
                <p class="feature-desc">Trip-aware AI help plus full export suite: PDF itinerary, iCal calendar, expenses CSV, and a complete data ZIP — all triggerable from ⌘K.</p>
                <div class="feature-tag"><span style="width:5px;height:5px;background:var(--teal);flex-shrink:0;display:inline-block"></span>PDF · iCal · CSV</div>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="card-footer">
            <div class="footer-left">
              <div class="footer-label">Launching at</div>
              <div class="footer-url">voyageons.app</div>
            </div>
            <div class="footer-status">Coming soon · Web · iOS · Android · PWA</div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <script>
    const button = document.getElementById('download');
    const scale = document.getElementById('scale');
    const capture = document.getElementById('capture');
    button.addEventListener('click', async () => {
      const prev = button.textContent;
      button.textContent = 'Rendering...';
      button.disabled = true;
      try {
        const px = Number(scale.value);
        const w = capture.scrollWidth, h = capture.scrollHeight;
        const dataUrl = await htmlToImage.toPng(capture, {
          width: w, height: h, canvasWidth: w * px, canvasHeight: h * px,
          pixelRatio: 1, cacheBust: true, backgroundColor: '#030B0D'
        });
        const a = document.createElement('a');
        a.href = dataUrl; a.download = 'voyageons.png'; a.click();
      } catch (e) { console.error(e); alert('PNG export failed. See console.'); }
      finally { button.textContent = prev; button.disabled = false; }
    });
  <\/script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'html/profile-hero.html'), profileHtml);
fs.writeFileSync(path.join(__dirname, 'html/voyageons-card.html'), voyageonsHtml);

console.log('profile-hero.html:', (profileHtml.length / 1024).toFixed(0) + 'KB');
console.log('voyageons-card.html:', (voyageonsHtml.length / 1024).toFixed(0) + 'KB');
console.log('Done.');
