/* ═══════════════════════════════════════════════════════════════════════
 *  COMMANDES DE PLATEAUX — règles de dates, prix, choix, suivi, rappels d'agenda et avis envoyés à l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// Réglages par défaut (modifiables par Marion : Commandes → Calendrier & e-mail)
var CMD_DEF = {
    active: !0,
    delaiMin: 2,
    horizon: 60,
    jours: [0, 1, 2, 3, 4, 5, 6],
    fermes: [],
    mode: "retrait",
    note: "",
    heureDefaut: "17:00",
    script: "",
  },
  IC = (t) => ({ ...CMD_DEF, ...(t || {}) }),
  O_ = (t) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(t || ""),
  FE = O_;

// Prix d'un plateau avec ses choix, et liste des fromages à raclette.
var LISTE_RACLETTE = {
  titre: "Vos fromages à raclette",
  min: 1,
  max: 3,
  options: [
    "Raclette nature",
    "Raclette au fenugrec",
    "Raclette à l'ail des ours",
    "Raclette aux 5 baies",
    "Raclette Estivale (poivron / tomate)",
    "Raclette à la caméline",
    "Morbier",
    "Bargkass nature",
    "Bargkass à l'ortie",
    "Bargkass au serpolet",
  ].map((t) => ({ nom: t, supp: 0 })),
};
