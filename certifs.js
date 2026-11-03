/* ============================================================
   📜 TES CERTIFICATIONS
   Deux formats possibles :
   1) Un « dossier » qui regroupe plusieurs modules (comme le MOOC RGPD) :
      { titre, organisme, description, modules: [ {titre, date, score, attestation}, ... ] }
   2) Une certification seule :
      { titre, organisme, date, description, attestation }
   Les attestations PDF se mettent dans assets/docs/
   ============================================================ */

const CERTIFS = [
  {
    titre: "MOOC L'Atelier RGPD (terminé)",
    organisme: "CNIL",
    description:
      "Formation complète terminée : les 6 modules du MOOC de la CNIL sont validés. Règlement général sur la protection des données : notions clés, principes, responsabilités des acteurs, outils de la conformité, collectivités territoriales, travail et données personnelles.",
    modules: [
      {
        titre: "Module 1 : Le RGPD et ses notions clés",
        date: "29 oct. 2026",
        score: "100 %",
        attestation: "assets/docs/RGPD-module1.pdf",
      },
      {
        titre: "Module 2 : Les principes de la protection des données",
        date: "29 oct. 2026",
        score: "100 %",
        attestation: "assets/docs/RGPD-module2.pdf",
      },
      {
        titre: "Module 3 : Les responsabilités des acteurs",
        date: "29 oct. 2026",
        score: "100 %",
        attestation: "assets/docs/RGPD-module3.pdf",
      },
      {
        titre: "Module 4 : Le DPO et les outils de la conformité",
        date: "1er nov. 2026",
        score: "100 %",
        attestation: "assets/docs/RGPD-module4.pdf",
      },
      {
        titre: "Module 5 : Les collectivités territoriales",
        date: "2 nov. 2026",
        score: "98 %",
        attestation: "assets/docs/RGPD-module5.pdf",
      },
      {
        titre: "Module 6 : Travail et données personnelles",
        date: "2 nov. 2026",
        score: "100 %",
        attestation: "assets/docs/RGPD-module6.pdf",
      },
    ],
  },
];
