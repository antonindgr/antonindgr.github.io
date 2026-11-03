/* Rendu du portfolio à partir de data.js — pas besoin de modifier ce fichier. */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nomComplet = `${PROFIL.prenom} ${PROFIL.nom}`;
const compLabel = (id) => (COMPETENCES.find((c) => c.id === id) || {}).label || id;

/* ---------- Thème clair / sombre ---------- */
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
$(".theme-btn").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

/* ---------- Menu mobile ---------- */
const links = $(".nav-links");
$(".menu-btn").addEventListener("click", (e) => {
  const open = links.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
links.addEventListener("click", () => links.classList.remove("open"));

/* ---------- Profil ---------- */
document.title = `${nomComplet} — Portfolio BTS SIO SISR`;
$("#logo").textContent = `~/${PROFIL.prenom.toLowerCase()}`;
$("#hero-titre").textContent = PROFIL.titre;
$("#hero-nom").textContent = nomComplet;
$("#hero-accroche").textContent = PROFIL.accroche;
$("#hero-recherche").textContent = PROFIL.recherche;
$("#cv-btn").href = PROFIL.cv;
$("#about-ecole").textContent = `${PROFIL.ecole} · ${PROFIL.promo}`;
$("#footer-nom").textContent = nomComplet;
$("#year").textContent = new Date().getFullYear();
$("#avatar").innerHTML = PROFIL.photo
  ? `<img src="${esc(PROFIL.photo)}" alt="Photo de ${esc(nomComplet)}">`
  : esc((PROFIL.prenom[0] || "") + (PROFIL.nom[0] || ""));

/* Aperçu des certifications (liste complète dans certifications.html) */
if ($("#certifs-apercu") && typeof CERTIFS !== "undefined") {
  $("#certifs-apercu").innerHTML = CERTIFS.map((c) => `<li>${esc(c.titre)} — ${esc(c.organisme)}${c.modules ? ` <span class="muted">(${c.modules.length} modules)</span>` : ""}</li>`).join("");
}

/* ---------- Projets + filtres ---------- */
let contextes = [];
let filtre = "Tous";

function renderFilters() {
  // Onglets toujours affichés, puis ceux qui apparaissent dans les projets (ex. « Stage »)
  contextes = ["Tous", ...new Set(["Formation", "Perso", ...PROJETS.map((p) => p.contexte)])];
  $("#filters").innerHTML = contextes
    .map((c) => `<button class="filter ${c === filtre ? "active" : ""}" data-f="${esc(c)}">${esc(c)}</button>`)
    .join("");
}
function renderProjets() {
  const visibles = PROJETS.filter((p) => filtre === "Tous" || p.contexte === filtre);
  if (!visibles.length) {
    $("#projets-grid").innerHTML = `<p class="section-intro">Aucun projet dans cette catégorie pour l'instant.</p>`;
    return;
  }
  $("#projets-grid").innerHTML = PROJETS.map((p, i) => ({ p, i }))
    .filter(({ p }) => filtre === "Tous" || p.contexte === filtre)
    .map(({ p, i }) => `
      <button class="card projet" data-i="${i}">
        <div class="projet-meta"><span class="ctx">${esc(p.contexte)}</span><span>${esc(p.periode)}</span></div>
        <h3>${esc(p.titre)}</h3>
        <p>${esc(p.resume)}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </button>`)
    .join("");
}
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest(".filter");
  if (!b) return;
  filtre = b.dataset.f;
  renderFilters();
  renderProjets();
});
renderFilters();
renderProjets();

/* ---------- Fenêtre de détail ---------- */
const modal = $("#modal");
function openProjet(i) {
  const p = PROJETS[i];
  $("#modal-body").innerHTML = `
    <div class="projet-meta"><span class="ctx">${esc(p.contexte)}</span><span>${esc(p.periode)}</span></div>
    <h3>${esc(p.titre)}</h3>
    ${p.image ? `<img class="projet-img" src="${esc(p.image)}" alt="Capture : ${esc(p.titre)}">` : ""}
    <p>${esc(p.description)}</p>
    <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    ${p.etapes?.length ? `<h4>Étapes réalisées</h4><ol>${p.etapes.map((e) => `<li>${esc(e)}</li>`).join("")}</ol>` : ""}
    ${p.competences?.length ? `<h4>Compétences mobilisées</h4>
    <ul class="comp-list">${p.competences.map((c) => `<li><b>${esc(c)}</b>${esc(compLabel(c))}</li>`).join("")}</ul>` : ""}
    ${p.liens?.length ? `<h4>Documents</h4><div class="contact-links">${p.liens.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>` : ""}`;
  modal.showModal();
}
$("#projets-grid").addEventListener("click", (e) => {
  const c = e.target.closest(".projet");
  if (c) openProjet(+c.dataset.i);
});
$(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* ---------- Tableau de synthèse E5 ---------- */
function renderE5() {
  const lignes = PROJETS.filter((p) => p.competences?.length);
  $("#e5-table").innerHTML = `
  <thead><tr><th>Réalisation</th>${COMPETENCES.map((c) => `<th title="${esc(c.label)}">${esc(c.id)}</th>`).join("")}</tr></thead>
  <tbody>${lignes.map((p) => `
    <tr><td>${esc(p.titre)}<span class="ctx-small">${esc(p.contexte)} · ${esc(p.periode)}</span></td>
    ${COMPETENCES.map((c) => `<td>${p.competences.includes(c.id) ? '<span class="check" aria-label="oui">✓</span>' : ""}</td>`).join("")}</tr>`).join("")}
  </tbody>`;
}
renderE5();
$("#e5-legend").innerHTML = COMPETENCES.map((c) => `<li><b>${esc(c.id)}</b>${esc(c.label)}</li>`).join("");

/* ---------- Contact ---------- */
$("#contact-links").innerHTML = [
  PROFIL.email && `<a class="btn primary" href="mailto:${esc(PROFIL.email)}">✉ ${esc(PROFIL.email)}</a>`,
  PROFIL.github && `<a class="btn" href="${esc(PROFIL.github)}" target="_blank" rel="noopener">GitHub</a>`,
  PROFIL.linkedin && `<a class="btn" href="${esc(PROFIL.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
  PROFIL.cv && `<a class="btn" href="${esc(PROFIL.cv)}" target="_blank" rel="noopener">CV (PDF)</a>`,
].filter(Boolean).join("");

/* ---------- Projets GitHub automatiques ----------
   Récupère les dépôts publics qui ont le topic GITHUB_AUTO.topic.
   Un dépôt déjà présent dans PROJETS (même lien) n'est pas ajouté deux fois. */
async function chargerGithub() {
  if (typeof GITHUB_AUTO === "undefined" || !GITHUB_AUTO.utilisateur) return;
  try {
    const rep = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_AUTO.utilisateur)}/repos?per_page=100&sort=updated`);
    if (!rep.ok) return;
    const depots = await rep.json();
    const dejaLa = new Set(PROJETS.flatMap((p) => (p.liens || []).map((l) => l.url.replace(/\/$/, "").toLowerCase())));
    const mois = ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
    const nouveaux = depots
      .filter((d) => !d.fork && (d.topics || []).includes(GITHUB_AUTO.topic))
      .filter((d) => !dejaLa.has(d.html_url.toLowerCase()))
      .map((d) => {
        const date = new Date(d.created_at);
        const topics = d.topics || [];
        const estComp = (t) => /^c[1-6]$/i.test(t);
        // Onglet choisi par topic : « perso », « stage » ou « formation » (par défaut)
        const CONTEXTES_TOPICS = { perso: "Perso", stage: "Stage", formation: "Formation" };
        const ctxTopic = topics.find((t) => CONTEXTES_TOPICS[t]);
        const contexte = ctxTopic ? CONTEXTES_TOPICS[ctxTopic] : "Formation";
        const competences = topics.filter(estComp).map((t) => t.toUpperCase()).sort();
        const tags = [d.language, ...topics.filter((t) => t !== GITHUB_AUTO.topic && !estComp(t) && !CONTEXTES_TOPICS[t])].filter(Boolean).slice(0, 5);
        return {
          titre: d.name.replace(/[-_]/g, " "),
          contexte,
          periode: `${mois[date.getMonth()]} ${date.getFullYear()}`,
          resume: d.description || "Projet publié sur GitHub.",
          tags,
          competences,
          description: d.description || "Projet publié sur GitHub : voir le dépôt pour le détail.",
          etapes: [],
          liens: [{ label: "Dépôt GitHub", url: d.html_url }],
        };
      });
    if (!nouveaux.length) return;
    PROJETS.push(...nouveaux);
    renderFilters();
    renderProjets();
    renderE5();
  } catch (e) {
    /* Pas de réseau ou limite de l'API GitHub : on garde les projets de data.js. */
  }
}
chargerGithub();
