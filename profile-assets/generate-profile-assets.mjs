import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const htmlDir = path.join(__dirname, 'html');

const palette = {
  bg: '#050505',
  text: '#E0E0E0',
  lime: '#CCFF00',
  orange: '#FF3E00',
  line: '#222222',
  panel: '#0C0C0C',
  panelAlt: '#101010',
  muted: '#8E8E8E'
};

const mimeByExtension = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const assets = {
  identity: {
    logo: 'assets/identity/aglae_full_logo.svg',
    avatar: 'assets/identity/sebastien_avatar.svg'
  },
  education: {
    univNice: 'assets/education/univ-nice.svg'
  },
  flags: {
    fr: 'assets/flags/fr.webp',
    jp: 'assets/flags/jp.webp'
  },
  awards: {
    amadeus: 'assets/awards/amadeus-logo.svg',
    trophy: 'assets/awards/trophy.png'
  },
  credentials: {
    diploma: 'assets/credentials/diploma.svg'
  },
  projects: {
    aeroModel: 'assets/projects/aeromodel-logo-blue.svg',
    aeroModelName: 'assets/projects/aeromodel-name-logo-blue.svg',
    aeroModelOg: 'assets/projects/aeromodel-og.png',
    coreDash: 'assets/projects/coredash-color-logo.svg',
    dashSystems: 'assets/projects/dash-systems-color-logo.svg',
    myAirline: 'assets/projects/myairlinemanager-color-logo.png',
    fnesi: 'assets/projects/fnesi-color-logo.png',
    hana: 'assets/projects/hana-games-color-logo.svg',
    inria: 'assets/projects/inria-color-logo.svg',
    studiel: 'assets/projects/studiel-color-logo.svg'
  }
};

async function readAssetDataUrl(relativePath) {
  const assetPath = path.join(rootDir, relativePath);
  const assetBuffer = await readFile(assetPath);
  const extension = path.extname(assetPath).toLowerCase();
  const mimeType = mimeByExtension[extension] ?? 'application/octet-stream';
  return `data:${mimeType};base64,${assetBuffer.toString('base64')}`;
}

async function readFontDataUrl(relativePath) {
  const fontPath = path.join(rootDir, 'node_modules', ...relativePath.split('/'));
  const font = await readFile(fontPath);
  return `data:font/woff;base64,${font.toString('base64')}`;
}

function htmlTag(label, tone = 'lime') {
  const color = tone === 'orange' ? palette.orange : palette.lime;
  return `
    <div class="panel tag">
      <div class="tag-dot" style="background:${color};"></div>
      <div class="mono tag-label">${label}</div>
    </div>`;
}

function projectCardHtml(project) {
  return `
    <article class="panel project-card">
      <div class="project-head">
        <div class="project-head-copy">
          <div class="mono accent-orange period">${project.period}</div>
          <h3 class="headline project-title">${project.title}</h3>
        </div>
        <img src="${project.logo}" width="84" height="84" class="project-logo" alt="${project.title}" />
      </div>
      <p class="project-summary">${project.summary}</p>
      <div class="project-impact-row">
        <div class="mono muted impact-label">Impact</div>
        <p class="project-impact">${project.impact}</p>
      </div>
      <div class="mono accent-lime project-stack">${project.stack}</div>
    </article>`;
}

async function getProjects() {
  return [
    {
      title: 'Dash Systems',
      period: '2026 -> Present',
      summary: 'Freelance website and delivery framework for premium websites, back-offices, mobile apps, connected systems, and custom enterprise software.',
      impact: 'Turns a freelance offer into a structured product narrative with clear scope, visual credibility, and a concrete path from brief to delivery.',
      stack: 'NEXT.JS / REACT / TYPESCRIPT / SEO / UX / ANIMATION / DEPLOYMENT',
      logo: await readAssetDataUrl(assets.projects.dashSystems)
    },
    {
      title: 'AeroModel',
      period: '2026 -> Present',
      summary: 'Aircraft visualization API that generates angle-specific plane images with airline liveries for aviation, branding, compliance, marketing, and internal tools.',
      impact: 'Packages aircraft imagery into a fast product layer that can plug into booking funnels, dashboards, approvals, and media workflows without manual asset production.',
      stack: 'NEXT.JS / IMAGE API / CLOUDFLARE / EDGE DELIVERY / B2B SAAS / PRODUCT DESIGN',
      logo: await readAssetDataUrl(assets.projects.aeroModel)
    },
    {
      title: 'Core Dash',
      period: '2025 -> Present',
      summary: 'AI-first dashboard platform where I orchestrate advanced agents and keep product vision, UX coherence, business logic, and delivery quality under control.',
      impact: 'A concrete demonstration that AI-assisted development can stay rigorous when architecture and supervision remain deliberate.',
      stack: 'NEXT.JS / REACT / TYPESCRIPT / .NET / GRPC / POSTGRES / MONGO / REDIS / DOCKER',
      logo: await readAssetDataUrl(assets.projects.coreDash)
    },
    {
      title: 'My Airline Manager',
      period: '2024 -> Present',
      summary: 'Massively connected airline simulation developed with Hana Games, built around a server-authoritative backend and an optimized procedural globe.',
      impact: 'Combines product design, backend architecture, simulation logic, anti-cheat thinking, and AI-assisted content production inside one coherent game platform.',
      stack: 'UNITY / C# / .NET / GO / SCYLLADB / GARNET / AWS / DOCKER / GRPC',
      logo: await readAssetDataUrl(assets.projects.myAirline)
    },
    {
      title: 'FNESI App',
      period: '2024 -> 2025',
      summary: 'Cross-platform learning ecosystem for nursing students with quizzes, mock exams, progress tracking, back-office tooling, and resilient infrastructure.',
      impact: 'Supports large educational usage at national scale and reflects my ability to ship stable products under real operational constraints.',
      stack: 'UNITY / REACT / AWS / NATS / REDIS / POSTGRES / GRPC / GITHUB ACTIONS',
      logo: await readAssetDataUrl(assets.projects.fnesi)
    },
    {
      title: 'Hana Games',
      period: '2022 -> Present',
      summary: 'Independent studio co-founded with Mike Chiappe to build ambitious games with a small-team mindset and strict execution discipline.',
      impact: 'This studio is where product ambition, game feel, infrastructure ownership, and long-term creative direction all meet.',
      stack: 'UNITY / .NET / REACT / VITE / FIGMA / BLENDER / MOBILE / CLOUD',
      logo: await readAssetDataUrl(assets.projects.hana)
    },
    {
      title: 'ONE m2m at Inria',
      period: '2021',
      summary: 'Java plugin work on automated IoT deployment within OM2M and the oneM2M standard for interoperable smart infrastructure.',
      impact: 'A strong foundation in protocols, standards, embedded ecosystems, and the discipline required by a research environment.',
      stack: 'JAVA / OSGI / OM2M / MQTT / COAP / REST / ARDUINO / RASPBERRY PI',
      logo: await readAssetDataUrl(assets.projects.inria)
    },
    {
      title: 'Studiel',
      period: '2022',
      summary: 'Backend modernization and refactoring work in a Microsoft-oriented B2B environment with routing, legacy cleanup, and maintainability concerns.',
      impact: 'A useful signal of my ability to take unclear legacy logic, simplify it aggressively, and make it support future change.',
      stack: 'C# / .NET / ASP.NET / SQL / WEB SERVICES / OBSERVABILITY',
      logo: await readAssetDataUrl(assets.projects.studiel)
    }
  ];
}

async function getFontFaces() {
  const syne = await readFontDataUrl('@fontsource/syne/files/syne-latin-800-normal.woff');
  const manrope = await readFontDataUrl('@fontsource/manrope/files/manrope-latin-500-normal.woff');
  const jetbrains = await readFontDataUrl('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff');

  return `
    @font-face { font-family: 'Syne'; src: url(${syne}) format('woff'); font-weight: 800; }
    @font-face { font-family: 'Body Sans'; src: url(${manrope}) format('woff'); font-weight: 500; }
    @font-face { font-family: 'JetBrains Mono'; src: url(${jetbrains}) format('woff'); font-weight: 500; }
  `;
}

function buildDocument({ title, fileName, captureWidth, bodyMarkup, fontFaces }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <script src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js"></script>
    <style>
      ${fontFaces}

      :root {
        --bg: ${palette.bg};
        --text: ${palette.text};
        --lime: ${palette.lime};
        --orange: ${palette.orange};
        --line: ${palette.line};
        --panel: ${palette.panel};
        --panel-alt: ${palette.panelAlt};
        --muted: ${palette.muted};
      }

      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #000; color: var(--text); }
      body { font-family: 'Body Sans', sans-serif; }
      .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 18px;
        background: radial-gradient(circle at top, #121212, #050505 42%);
      }
      .toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 16px;
        border: 1px solid var(--line);
        background: rgba(12, 12, 12, 0.92);
        backdrop-filter: blur(10px);
      }
      .toolbar-left { display: flex; flex-direction: column; gap: 6px; }
      .toolbar-title { font-family: 'Syne', sans-serif; font-size: 28px; text-transform: uppercase; }
      .toolbar-subtitle { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--muted); }
      .toolbar-right { display: flex; align-items: center; gap: 10px; }
      .scale-select, .download-button {
        height: 42px;
        border: 1px solid var(--line);
        background: var(--panel);
        color: var(--text);
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
      }
      .scale-select { padding: 0 10px; }
      .download-button { padding: 0 16px; cursor: pointer; border-color: var(--orange); }
      .download-button:hover { background: #141414; }
      .canvas-wrap { display: flex; justify-content: center; overflow: auto; padding-bottom: 24px; }
      .capture-root { width: ${captureWidth}px; min-width: ${captureWidth}px; margin: 0; flex: 0 0 auto; background: var(--bg); color: var(--text); }
      .frame { position: relative; overflow: hidden; border: 1px solid var(--line); background: var(--bg); }
      .headline { font-family: 'Syne', sans-serif; font-weight: 800; text-transform: uppercase; }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .panel { background: var(--panel); border: 1px solid var(--line); }
      .panel-alt { background: var(--panel-alt); border: 1px solid var(--line); }
      .accent-lime { color: var(--lime); }
      .accent-orange { color: var(--orange); }
      .muted { color: var(--muted); }
      .tag { display: flex; align-items: center; gap: 10px; padding: 8px 12px; min-height: 0; }
      .tag-dot { width: 8px; height: 8px; }
      .tag-label { font-size: 13px; letter-spacing: 0.6px; line-height: 1.35; }
      .project-card { display: flex; flex-direction: column; gap: 14px; padding: 22px 24px; }
      .project-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; }
      .project-head-copy { display: flex; flex-direction: column; gap: 10px; flex: 1 1 auto; min-width: 0; }
      .period { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
      .project-title { margin: 0; font-size: 34px; line-height: 1; overflow-wrap: anywhere; }
      .project-logo { object-fit: contain; flex: 0 0 auto; width: 72px; height: 72px; }
      .project-summary, .project-impact { margin: 0; font-size: 18px; line-height: 1.5; }
      .project-impact-row { display: flex; gap: 16px; align-items: flex-start; }
      .impact-label { min-width: 72px; font-size: 14px; text-transform: uppercase; }
      .project-impact { font-size: 17px; }
      .project-stack { font-size: 14px; line-height: 1.5; text-transform: uppercase; }
      .split-card {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
        width: 100%;
        min-height: 0;
        padding: 28px;
        gap: 24px;
        align-items: stretch;
        color: var(--text);
      }
      .split-copy { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
      .eyebrow { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }
      .split-title { margin: 0; font-size: 42px; line-height: 1; overflow-wrap: anywhere; }
      .split-text { margin: 0; font-size: 20px; line-height: 1.45; }
      .side-panel { display: flex; flex-direction: column; justify-content: center; gap: 14px; min-width: 0; padding: 20px; }
      .detail-list { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .detail-item { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding: 10px 0; border-top: 1px solid var(--line); }
      .detail-item:first-child { border-top: 0; padding-top: 0; }
      .detail-main { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .detail-icon { width: 20px; height: 20px; object-fit: contain; flex: 0 0 auto; }
      .detail-title { font-size: 16px; line-height: 1.35; }
      .detail-meta { font-size: 13px; line-height: 1.35; text-align: right; color: var(--muted); text-transform: uppercase; }
      .education-card { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.85fr); width: 100%; padding: 28px; gap: 24px; color: var(--text); }
      .education-badge { display: flex; flex-direction: column; justify-content: center; gap: 12px; min-width: 0; padding: 20px; }
      .education-logo { width: 88px; height: 88px; object-fit: contain; }
      .license-row { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .license-row .mono { font-size: 15px; line-height: 1.4; }
      .inline-flag { width: 42px; height: 28px; object-fit: cover; flex: 0 0 auto; }
      .side-art { width: 140px; height: auto; max-width: 100%; object-fit: contain; align-self: flex-end; opacity: 0.9; }
      .hero-shell { display: flex; width: 100%; min-height: 0; padding: 36px; color: var(--text); }
      .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(360px, 0.85fr);
        width: 100%;
        gap: 28px;
        z-index: 1;
      }
      .hero-main { display: flex; flex-direction: column; gap: 24px; min-width: 0; padding-left: 10px; }
      .hero-topbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
      .hero-copy { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
      .hero-kicker { font-size: 14px; text-transform: uppercase; letter-spacing: 1.2px; }
      .hero-title { margin: 0; font-size: 74px; line-height: 0.94; letter-spacing: -1.5px; overflow-wrap: anywhere; }
      .hero-role { font-size: 18px; line-height: 1.2; letter-spacing: 0.4px; }
      .hero-lead { font-size: 24px; line-height: 1.32; max-width: 100%; }
      .hero-body { font-size: 20px; line-height: 1.42; max-width: 100%; }
      .hero-bottom { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 20px; align-items: start; }
      .hero-side { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
      .hero-avatar-panel { display: flex; align-items: center; justify-content: center; min-height: 260px; padding: 20px; }
      .hero-avatar { width: min(240px, 100%); height: auto; object-fit: contain; }
      .hero-metric-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      .hero-metric-card { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding: 18px; }
      .metric-title { margin: 0; font-size: 24px; line-height: 1; }
      .metric-text { font-size: 17px; line-height: 1.38; }
      .matrix-shell { display: flex; flex-direction: column; width: 100%; padding: 34px; gap: 22px; color: var(--text); }
      .matrix-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
      .matrix-title-block { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .matrix-title { margin: 0; font-size: 64px; line-height: 0.94; }
      .matrix-tags { display: flex; gap: 10px; flex-wrap: wrap; max-width: 100%; }
      .capability-shell { display: flex; flex-direction: column; width: 100%; padding: 34px; gap: 26px; color: var(--text); }
      .capability-hero { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr); gap: 24px; align-items: stretch; }
      .capability-main { display: flex; flex-direction: column; gap: 18px; padding: 28px; }
      .capability-logo { width: 240px; max-width: 100%; height: auto; object-fit: contain; }
      .capability-url { font-size: 18px; line-height: 1.4; overflow-wrap: anywhere; }
      .capability-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
      .capability-card { display: flex; flex-direction: column; gap: 12px; padding: 22px; min-width: 0; }
      .capability-card-title { margin: 0; font-size: 28px; line-height: 1; overflow-wrap: anywhere; }
      .capability-card-copy { margin: 0; font-size: 17px; line-height: 1.5; }
      .capability-card-label { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }
      @media (max-width: 980px) {
        .toolbar { flex-direction: column; align-items: stretch; }
        .toolbar-right { justify-content: space-between; }
        .split-card,
        .education-card,
        .capability-hero,
        .capability-grid,
        .hero-grid,
        .hero-bottom,
        .hero-metric-grid { grid-template-columns: 1fr; }
        .hero-shell,
        .matrix-shell,
        .capability-shell { padding: 24px; }
        .hero-title { font-size: 56px; }
        .split-title,
        .matrix-title { font-size: 34px; }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="toolbar-title">${title}</div>
          <div class="toolbar-subtitle">Open this file in a browser, then click Download PNG. Direct HTML to PNG.</div>
        </div>
        <div class="toolbar-right">
          <select id="scale" class="scale-select">
            <option value="1">1x</option>
            <option value="2" selected>2x</option>
            <option value="3">3x</option>
          </select>
          <button class="download-button" id="download">Download PNG</button>
        </div>
      </div>
      <div class="canvas-wrap">
        <div id="capture" class="capture-root">${bodyMarkup}</div>
      </div>
    </div>
    <script>
      const button = document.getElementById('download');
      const scale = document.getElementById('scale');
      const capture = document.getElementById('capture');

      button.addEventListener('click', async () => {
        const previousText = button.textContent;
        button.textContent = 'Rendering...';
        button.disabled = true;

        try {
          const pixelRatio = Number(scale.value);
          const exportWidth = capture.scrollWidth;
          const exportHeight = capture.scrollHeight;
          const dataUrl = await htmlToImage.toPng(capture, {
            width: exportWidth,
            height: exportHeight,
            canvasWidth: exportWidth * pixelRatio,
            canvasHeight: exportHeight * pixelRatio,
            pixelRatio: 1,
            cacheBust: true,
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#050505'
          });

          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = '${fileName}.png';
          link.click();
        } catch (error) {
          console.error(error);
          alert('PNG export failed. See the browser console for details.');
        } finally {
          button.textContent = previousText;
          button.disabled = false;
        }
      });
    </script>
  </body>
</html>`;
}

async function buildAwardsCardPage(fontFaces) {
  const amadeus = await readAssetDataUrl(assets.awards.amadeus);
  const trophy = await readAssetDataUrl(assets.awards.trophy);

  return buildDocument({
    title: 'Awards Card',
    fileName: 'awards-card',
    captureWidth: 900,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="split-card">
          <div class="split-copy">
            <div class="mono accent-orange eyebrow">Trophies / contests</div>
            <div class="headline split-title">Competition track record</div>
            <p class="split-text">Individual contest results across Games on Web and the Amadeus Accessibility Challenge.</p>
          </div>
          <div class="panel side-panel">
            <img src="${amadeus}" width="220" height="42" style="object-fit:contain; max-width:100%; height:auto;" alt="Amadeus" />
            <div class="detail-list">
              <div class="detail-item">
                <div class="detail-main">
                  <img src="${trophy}" width="20" height="20" class="detail-icon" alt="Trophy" />
                  <div class="detail-title">Games on Web 2022 — Coup de Pouce Award</div>
                </div>
                <div class="mono detail-meta">Special award</div>
              </div>
              <div class="detail-item">
                <div class="detail-main">
                  <img src="${trophy}" width="20" height="20" class="detail-icon" alt="Trophy" />
                  <div class="detail-title">Games on Web 2023 — To Be Green</div>
                </div>
                <div class="mono detail-meta">2nd place</div>
              </div>
              <div class="detail-item">
                <div class="detail-main">
                  <img src="${trophy}" width="20" height="20" class="detail-icon" alt="Trophy" />
                  <div class="detail-title">Games on Web 2024 — Speed Run Award</div>
                </div>
                <div class="mono detail-meta">Award</div>
              </div>
              <div class="detail-item">
                <div class="detail-main">
                  <img src="${trophy}" width="20" height="20" class="detail-icon" alt="Trophy" />
                  <div class="detail-title">Amadeus Hackathon — Accessibility Challenge</div>
                </div>
                <div class="mono detail-meta">1st place</div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  });
}

async function buildDrivingLicensesPage(fontFaces) {
  const fr = await readAssetDataUrl(assets.flags.fr);
  const jp = await readAssetDataUrl(assets.flags.jp);

  return buildDocument({
    title: 'Driving Licenses',
    fileName: 'driving-licenses',
    captureWidth: 900,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="split-card">
          <div class="split-copy">
            <div class="mono accent-orange eyebrow">Driving licenses</div>
            <div class="headline split-title">Mobility across France and Japan</div>
            <p class="split-text">French driving license and Japanese driving authorization through official translation issued by JAF.</p>
          </div>
          <div class="panel side-panel">
            <div class="license-row">
              <img src="${fr}" width="42" height="28" class="inline-flag" alt="France" />
              <div class="mono">French driving license</div>
            </div>
            <div class="license-row">
              <img src="${jp}" width="42" height="28" class="inline-flag" alt="Japan" />
              <div class="mono">Japanese translation via JAF</div>
            </div>
            ${htmlTag('CAR LICENSE / FRANCE')}
            ${htmlTag('OFFICIAL TRANSLATION / JAPAN', 'orange')}
          </div>
        </div>
      </div>`
  });
}

async function buildEducationPage(fontFaces) {
  const univNice = await readAssetDataUrl(assets.education.univNice);

  return buildDocument({
    title: 'Education Card',
    fileName: 'education-card',
    captureWidth: 900,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="education-card">
          <div class="split-copy">
            <div class="mono accent-orange eyebrow">Education</div>
            <div class="headline split-title">Three degrees in computer science and MIAGE</div>
            <p class="split-text">Formal education from DUT to Master, focused on software engineering, system integration, databases, and project delivery.</p>
          </div>
          <div class="panel education-badge">
            <img src="${univNice}" width="88" height="88" class="education-logo" alt="Université Côte d'Azur" />
            <div class="detail-list">
              <div class="detail-item">
                <div class="detail-title">Master MIAGE</div>
                <div class="mono detail-meta">2022 → 2024</div>
              </div>
              <div class="detail-item">
                <div class="detail-title">Licence MIAGE</div>
                <div class="mono detail-meta">2021 → 2022</div>
              </div>
              <div class="detail-item">
                <div class="detail-title">DUT Computer Science</div>
                <div class="mono detail-meta">2019 → 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  });
}

async function buildHeroPage(fontFaces) {
  const logo = await readAssetDataUrl(assets.identity.logo);
  const avatar = await readAssetDataUrl(assets.identity.avatar);
  const jp = await readAssetDataUrl(assets.flags.jp);

  return buildDocument({
    title: 'Profile Hero',
    fileName: 'profile-hero',
    captureWidth: 1440,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="hero-shell">
          <div style="position:absolute; left:0; top:0; bottom:0; width:10px; background:${palette.lime};"></div>
          <div style="position:absolute; left:0; right:0; top:122px; height:1px; background:${palette.line};"></div>
          <div style="position:absolute; left:0; right:0; bottom:132px; height:1px; background:${palette.line};"></div>
          <div class="hero-grid">
            <div class="hero-main">
              <div class="hero-topbar">
                <img src="${logo}" width="196" height="58" style="object-fit:contain; max-width:100%; height:auto;" alt="Sebastien Aglae" />
                <div class="panel" style="display:flex; align-items:center; gap:12px; padding:10px 14px; flex-wrap:wrap;">
                  <img src="${jp}" width="30" height="20" style="object-fit:cover;" alt="Japan" />
                  <div class="mono" style="font-size:14px; line-height:1.4;">Searching in Osaka, Japan</div>
                </div>
              </div>
              <div class="hero-copy">
                <div class="mono accent-orange hero-kicker">Front-end / Back-end / Mobile / IoT / Game developer</div>
                <div class="headline hero-title">Sebastien<br />Aglae</div>
                <div class="headline hero-role accent-lime">Software developer</div>
                <div class="hero-lead">I build ambitious software products across front-end, back-end, mobile, IoT, and game development, with AI orchestration when it serves the product.</div>
                <div class="hero-body">Co-founder of Hana Games, creator of Core Dash, and a product-minded developer comfortable moving from product vision to implementation details.</div>
                <div style="display:flex; flex-wrap:wrap; gap:10px; max-width:100%;">
                  ${htmlTag('UNITY / C# / .NET', 'lime')}
                  ${htmlTag('REACT / NEXT.JS / TYPESCRIPT', 'lime')}
                  ${htmlTag('GRPC / POSTGRES / REDIS', 'lime')}
                  ${htmlTag('AI ORCHESTRATION', 'orange')}
                  ${htmlTag('IOT / CLOUD / SIMULATION', 'lime')}
                </div>
                <div class="panel" style="display:flex; flex-direction:column; gap:8px; padding:18px 20px; width:fit-content; max-width:100%; border-color:${palette.orange};">
                  <div class="mono accent-orange" style="font-size:14px; text-transform:uppercase; letter-spacing:1px;">Open to roles</div>
                  <div class="headline" style="font-size:24px; line-height:1;">Osaka, Japan</div>
                </div>
              </div>
              <div class="hero-bottom">
                <div style="display:flex; flex-direction:column; gap:8px; min-width:0;">
                  <div class="mono muted" style="font-size:14px; text-transform:uppercase;">Endpoints</div>
                  <div style="font-size:21px; line-height:1.35; overflow-wrap:anywhere;">sebastien-aglae.fr</div>
                  <div style="font-size:21px; line-height:1.35; overflow-wrap:anywhere;">core-dash.com</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; min-width:0;">
                  <div class="mono muted" style="font-size:14px; text-transform:uppercase;">Operational profile</div>
                  <div style="font-size:19px; line-height:1.4;">Small-team execution, strong product ownership, and architecture-first thinking.</div>
                </div>
              </div>
            </div>
            <div class="hero-side">
              <div class="panel hero-avatar-panel">
                <img src="${avatar}" width="250" height="250" class="hero-avatar" alt="Sebastien Aglae avatar" />
              </div>
              <div class="hero-metric-grid">
                <div class="panel-alt hero-metric-card">
                  <div class="mono accent-orange" style="font-size:14px; text-transform:uppercase;">Role</div>
                  <div class="headline metric-title">Co-founder</div>
                  <div class="metric-text">Hana Games and product leadership on My Airline Manager.</div>
                </div>
                <div class="panel-alt hero-metric-card">
                  <div class="mono accent-orange" style="font-size:14px; text-transform:uppercase;">Range</div>
                  <div class="headline metric-title">Versatile</div>
                  <div class="metric-text">Front-end, back-end, mobile, IoT, cloud, AI, and game development.</div>
                </div>
              </div>
              <div class="panel-alt hero-metric-card">
                <div class="mono accent-orange" style="font-size:14px; text-transform:uppercase;">Proof points</div>
                <div class="metric-text">My Airline Manager, the national-scale FNESI platform, award-winning game projects, and AI-native product delivery through Core Dash.</div>
              </div>
              <div class="panel-alt">
                <div class="split-card" style="padding:20px; grid-template-columns:1fr;">
                  <div class="split-copy">
                    <div class="mono accent-orange eyebrow">Contest summary</div>
                    <div class="headline" style="font-size:28px; line-height:0.98;">Participated in 4 contests</div>
                    <p class="split-text" style="font-size:17px;">Games on Web 2022, 2023, 2024, and the Amadeus Accessibility Challenge.</p>
                  </div>
                </div>
              </div>
              <div class="panel-alt">
                <div class="split-card" style="padding:20px; grid-template-columns:1fr;">
                  <div class="split-copy">
                    <div class="mono accent-orange eyebrow">License summary</div>
                    <div class="headline" style="font-size:28px; line-height:0.98;">French and Japanese licenses</div>
                    <p class="split-text" style="font-size:17px;">French driving license and Japanese driving authorization through official translation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  });
}

async function buildMatrixPage(fontFaces) {
  const projects = await getProjects();

  return buildDocument({
    title: 'Project Matrix',
    fileName: 'project-matrix',
    captureWidth: 1440,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="matrix-shell">
          <div class="matrix-header">
            <div class="matrix-title-block">
              <div class="mono accent-orange" style="font-size:15px; text-transform:uppercase; letter-spacing:1.3px;">Selected work / system range / execution profile</div>
              <div class="headline matrix-title">Project matrix</div>
            </div>
            <div class="matrix-tags">
              ${htmlTag('GAME DEV')}
              ${htmlTag('FULL-STACK SYSTEMS')}
              ${htmlTag('AI TOOLING', 'orange')}
              ${htmlTag('IOT / CLOUD')}
            </div>
          </div>
          ${projects.map((project) => projectCardHtml(project)).join('')}
        </div>
      </div>`
  });
}

async function buildDashSystemsPage(fontFaces) {
  const dashSystems = await readAssetDataUrl(assets.projects.dashSystems);

  const capabilities = [
    {
      title: 'Front-end Web',
      label: 'Premiere impression / conversion',
      copy: 'Un site qui donne immediatement confiance, qui se charge vite et qui reste clair sur chaque ecran.'
    },
    {
      title: 'Back-end & Architecture',
      label: 'Fiabilite / fondations',
      copy: 'Le socle technique qui fait tourner le produit proprement, sans fragilite cachee.'
    },
    {
      title: 'Back-office sur mesure',
      label: 'Outils internes / autonomie',
      copy: 'Un espace d administration pense pour les vraies personnes qui vont l utiliser chaque jour.'
    },
    {
      title: 'Applications mobiles',
      label: 'Usage / mobilite',
      copy: 'Des applications mobiles fiables, rapides et agreables a prendre en main sur iOS comme sur Android.'
    },
    {
      title: 'Logiciels & outils metier',
      label: 'Besoins specifiques / desktop',
      copy: 'Quand un site web ne suffit pas, je peux aussi intervenir sur des outils metier plus specifiques.'
    },
    {
      title: 'IoT & systemes connectes',
      label: 'Hardware / temps reel',
      copy: 'Du capteur a l interface finale, avec des donnees visibles et exploitables en temps reel.'
    },
    {
      title: 'Solutions custom & enterprise',
      label: 'Sur mesure / cas complexes',
      copy: 'Pour les besoins qui ne rentrent dans aucune case standard, avec un niveau de personnalisation eleve.'
    }
  ];

  return buildDocument({
    title: 'Dash Systems Capabilities',
    fileName: 'dash-systems-capabilities',
    captureWidth: 1440,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="capability-shell">
          <div class="capability-hero">
            <div class="panel capability-main">
              <div class="mono accent-orange eyebrow">Dash Systems / freelance website / offer map</div>
              <img src="${dashSystems}" width="240" height="72" class="capability-logo" alt="Dash Systems" />
              <div class="headline split-title">Ce que je peux construire</div>
              <p class="split-text">Une vue d ensemble simple pour comprendre ce qui peut etre livre. Chaque competence s ouvre ensuite avec une representation visuelle plus concrete.</p>
              <div style="display:flex; flex-wrap:wrap; gap:10px; max-width:100%;">
                ${htmlTag('SITES PREMIUM')}
                ${htmlTag('BACK-END / API')}
                ${htmlTag('BACK-OFFICE')}
                ${htmlTag('MOBILE / IOT', 'orange')}
                ${htmlTag('CUSTOM / ENTERPRISE')}
              </div>
            </div>
            <div class="panel-alt capability-main">
              <div class="mono accent-orange eyebrow">Endpoint</div>
              <a href="https://www.dash-systems.fr/" target="_blank" rel="noreferrer" class="capability-url">www.dash-systems.fr</a>
              <p class="split-text">Des systemes solides. Des experiences qui respirent. Un cadre freelance pour concevoir, livrer et maintenir des produits numeriques complets.</p>
              <div class="detail-list">
                <div class="detail-item">
                  <div class="detail-title">Positioning</div>
                  <div class="mono detail-meta">Freelance haut de gamme</div>
                </div>
                <div class="detail-item">
                  <div class="detail-title">Delivery</div>
                  <div class="mono detail-meta">Conception → mise en ligne</div>
                </div>
                <div class="detail-item">
                  <div class="detail-title">Support</div>
                  <div class="mono detail-meta">Maintenance / documentation</div>
                </div>
              </div>
            </div>
          </div>
          <div class="capability-grid">
            ${capabilities
              .map(
                (capability) => `
                  <article class="panel capability-card">
                    <div class="mono accent-orange capability-card-label">${capability.label}</div>
                    <h3 class="headline capability-card-title">${capability.title}</h3>
                    <p class="capability-card-copy">${capability.copy}</p>
                  </article>`
              )
              .join('')}
          </div>
        </div>
      </div>`
  });
}

async function buildAeroModelPage(fontFaces) {
  const aeroModelName = await readAssetDataUrl(assets.projects.aeroModelName);
  const aeroModelMark = await readAssetDataUrl(assets.projects.aeroModel);
  const aeroModelPreview = await readAssetDataUrl(assets.projects.aeroModelOg);

  const highlights = [
    {
      title: 'Choose the aircraft',
      label: 'Catalog / ready to use',
      copy: 'Pick the right plane model from a structured catalog instead of building custom visuals case by case.'
    },
    {
      title: 'Apply the right livery',
      label: 'Branding / airline fit',
      copy: 'Use an airline livery when needed or keep the aircraft neutral for product and comparison views.'
    },
    {
      title: 'Request the exact angle',
      label: 'Precision / consistency',
      copy: 'Generate the perspective needed for booking flows, internal approvals, marketing assets, or operational tools.'
    },
    {
      title: 'Ship through one API',
      label: 'Front / CMS / back-office',
      copy: 'Plug the rendering flow into websites, dashboards, documentation, and back-offices without manual image operations.'
    },
    {
      title: 'Made for high-demand sectors',
      label: 'Aviation / media / digital',
      copy: 'Built for aviation, marketing, technology, design, and logistics teams that need clean aircraft visuals on demand.'
    },
    {
      title: 'Edge-first delivery',
      label: 'Cloudflare / speed',
      copy: 'Fast global delivery, predictable outputs, and a product shape designed for repeated integration rather than one-off asset production.'
    }
  ];

  return buildDocument({
    title: 'AeroModel Showcase',
    fileName: 'aeromodel-showcase',
    captureWidth: 1440,
    fontFaces,
    bodyMarkup: `
      <div class="frame">
        <div class="capability-shell">
          <div class="capability-hero">
            <div class="panel capability-main">
              <div class="mono accent-orange eyebrow">AeroModel / aircraft visualization API / Dash Systems product</div>
              <img src="${aeroModelName}" width="260" height="72" class="capability-logo" alt="AeroModel" />
              <div class="headline split-title">Aircraft visuals, faster than flight</div>
              <p class="split-text">Compose angle-specific aircraft images with airline liveries in milliseconds for aviation, compliance, branding, and marketing workflows.</p>
              <div style="display:flex; flex-wrap:wrap; gap:10px; max-width:100%;">
                ${htmlTag('CLOUDFLARE EDGE', 'orange')}
                ${htmlTag('API-FIRST DELIVERY')}
              </div>
            </div>
            <div class="panel-alt capability-main">
              <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                <img src="${aeroModelMark}" width="34" height="34" style="object-fit:contain;" alt="AeroModel mark" />
                <div class="mono accent-orange eyebrow">Live endpoint</div>
              </div>
              <a href="https://aeromodel.dash-systems.fr/" target="_blank" rel="noreferrer" class="capability-url">aeromodel.dash-systems.fr</a>
              <img src="${aeroModelPreview}" width="560" height="294" style="width:100%; height:auto; object-fit:cover; border:1px solid ${palette.line}; background:${palette.bg};" alt="AeroModel preview" />
              <div class="detail-list">
                <div class="detail-item">
                  <div class="detail-title">Core use case</div>
                  <div class="mono detail-meta">Aircraft imagery API</div>
                </div>
                <div class="detail-item">
                  <div class="detail-title">Fit</div>
                  <div class="mono detail-meta">Branding / compliance / marketing</div>
                </div>
                <div class="detail-item">
                  <div class="detail-title">Deployment</div>
                  <div class="mono detail-meta">Websites / tools / dashboards</div>
                </div>
              </div>
            </div>
          </div>
          <div class="capability-grid">
            ${highlights
              .map(
                (highlight) => `
                  <article class="panel capability-card">
                    <div class="mono accent-orange capability-card-label">${highlight.label}</div>
                    <h3 class="headline capability-card-title">${highlight.title}</h3>
                    <p class="capability-card-copy">${highlight.copy}</p>
                  </article>`
              )
              .join('')}
          </div>
        </div>
      </div>`
  });
}

async function main() {
  await mkdir(htmlDir, { recursive: true });
  const fontFaces = await getFontFaces();

  const pages = [
    ['aeromodel-showcase.html', await buildAeroModelPage(fontFaces)],
    ['awards-card.html', await buildAwardsCardPage(fontFaces)],
    ['dash-systems-capabilities.html', await buildDashSystemsPage(fontFaces)],
    ['driving-licenses.html', await buildDrivingLicensesPage(fontFaces)],
    ['education-card.html', await buildEducationPage(fontFaces)],
    ['profile-hero.html', await buildHeroPage(fontFaces)],
    ['project-matrix.html', await buildMatrixPage(fontFaces)]
  ];

  for (const [fileName, content] of pages) {
    await writeFile(path.join(htmlDir, fileName), content, 'utf8');
  }

  console.log('Generated HTML export pages in profile-assets/html');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
