/* ============================================================
   📝 FICHIER À PERSONNALISER — toutes tes infos sont ici.
   Tu n'as normalement pas besoin de toucher aux autres fichiers.
   ============================================================ */

const PROFIL = {
  prenom: "Antonin",
  nom: "Degory",
  titre: "Étudiant BTS SIO — option SISR",
  accroche:
    "Passionné de cybersécurité, j'administre, je sécurise et je supervise des infrastructures systèmes et réseaux.",
  ecole: "Ensitech — Montigny-le-Bretonneux",
  promo: "2026 – 2028",
  recherche: "Recherche une alternance / un stage en administration systèmes & cybersécurité",
  email: "antonindegory@gmail.com",
  github: "https://github.com/antonindgr",
  linkedin: "https://www.linkedin.com/in/antonin-degory-08455b382/",
  cv: "assets/docs/CV.pdf", // dépose ton CV à cet emplacement
  photo: "", // ex: "assets/img/photo.jpg" (laisser vide = initiales)
};

/* Projets GitHub ajoutés automatiquement :
   chaque dépôt PUBLIC de ce compte qui a le topic ci-dessous s'affiche tout seul
   dans « Réalisations », avec le filtre « GitHub ».
   Sur GitHub : page du dépôt → engrenage à côté de « About » → Topics → portfolio.
   Ajoute aussi les topics c1 à c6 pour cocher les compétences dans le tableau E5
   (ex. : portfolio, c1, c2, c5).
   Onglet : ajoute le topic perso (ou stage) ; sans ce topic, le projet va dans « Formation ». */
const GITHUB_AUTO = {
  utilisateur: "antonindgr",
  topic: "portfolio",
};

/* Compétences techniques affichées sous forme de badges */
const SKILLS = [
  { cat: "Systèmes", items: ["Windows Server", "Active Directory", "GPO", "Debian / Ubuntu", "Proxmox", "VMware"] },
  { cat: "Réseaux", items: ["Cisco IOS", "VLAN", "Routage", "DHCP / DNS", "pfSense", "VPN WireGuard"] },
  { cat: "Cybersécurité", items: ["Durcissement", "Wazuh (SIEM)", "Nmap", "Wireshark", "Gestion des droits", "RGPD"] },
  { cat: "Outils", items: ["GLPI", "Zabbix", "Git / GitHub", "PowerShell", "Bash", "Docker"] },
];

/* ------------------------------------------------------------
   Compétences du Bloc 1 (référentiel BTS SIO) — tableau de synthèse E5
   ------------------------------------------------------------ */
const COMPETENCES = [
  { id: "C1", label: "Gérer le patrimoine informatique" },
  { id: "C2", label: "Répondre aux incidents et aux demandes d'assistance et d'évolution" },
  { id: "C3", label: "Développer la présence en ligne de l'organisation" },
  { id: "C4", label: "Travailler en mode projet" },
  { id: "C5", label: "Mettre à disposition des utilisateurs un service informatique" },
  { id: "C6", label: "Organiser son développement professionnel" },
];

/* ------------------------------------------------------------
   Réalisations professionnelles
   - contexte : "Formation" | "Perso" | "Stage"
   - competences : liste d'id de COMPETENCES ci-dessus
   - liens : documentation, dépôt GitHub, PDF…
   ------------------------------------------------------------ */
const PROJETS = [
  {
    titre: "Vigie : console de surveillance des connexions SSH",
    contexte: "Formation",
    periode: "Nov. 2026",
    resume: "Outil Python qui lit le journal SSH, repère les attaques par force brute, classe les adresses selon le plan d'adressage et produit un rapport HTML avec une décision par adresse.",
    tags: ["Python", "SSH", "Force brute", "Pare-feu", "XSS"],
    competences: ["C1", "C2", "C4", "C5", "C6"],
    image: "assets/img/vigie-rapport.png",
    description:
      "Cas fictif Bergerat-Tournier : chaque nuit, des inconnus essaient des mots de passe sur le serveur SSH de l'entrepôt, mais personne ne lit le journal. J'ai développé en six étapes une console qui analyse le journal, détecte les rafales d'échecs (5 en 60 secondes), indique si l'adresse est interne ou externe, teste les ports de mon propre poste et propose des règles de pare-feu sans les appliquer.",
    etapes: [
      "Lecture et découpage des lignes du journal d'authentification",
      "Détection des attaques par force brute (fenêtre glissante de 60 s)",
      "Classement des adresses avec le plan d'adressage (CSV, notation CIDR)",
      "Test des ports ouverts sur 127.0.0.1 uniquement",
      "Rapport HTML protégé contre l'injection de code (html.escape)",
      "Règles de pare-feu netsh proposées, jamais exécutées",
    ],
    liens: [{ label: "Dépôt GitHub", url: "https://github.com/antonindgr/vigie-bergerat-tournier" }],
  },
];
