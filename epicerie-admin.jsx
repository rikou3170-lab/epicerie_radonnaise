import { useState, useEffect, useRef } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DONNÉES INITIALES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const INIT_PRODUCTS = [
  { id: 1, name: "Tomates anciennes", cat: "fruits", price: 3.90, unit: "kg", icon: "🍅", bio: true, local: true, active: true },
  { id: 2, name: "Pommes Golden", cat: "fruits", price: 2.80, unit: "kg", icon: "🍎", bio: false, local: true, active: true },
  { id: 3, name: "Salade batavia", cat: "fruits", price: 1.40, unit: "pièce", icon: "🥬", bio: false, local: true, active: true },
  { id: 4, name: "Courgettes", cat: "fruits", price: 2.50, unit: "kg", icon: "🥒", bio: true, local: false, active: true },
  { id: 5, name: "Carottes botte", cat: "fruits", price: 2.20, unit: "botte", icon: "🥕", bio: true, local: true, active: true },
  { id: 6, name: "Pommes de terre", cat: "fruits", price: 1.90, unit: "kg", icon: "🥔", bio: false, local: true, active: true },
  { id: 7, name: "Poireaux", cat: "fruits", price: 2.60, unit: "kg", icon: "🧅", bio: false, local: true, active: true },
  { id: 8, name: "Fraises de saison", cat: "fruits", price: 4.50, unit: "barq.", icon: "🍓", bio: false, local: false, active: true },
  { id: 10, name: "Baguette tradition", cat: "pain", price: 1.30, unit: "pièce", icon: "🥖", bio: false, local: true, active: true },
  { id: 11, name: "Pain de campagne", cat: "pain", price: 3.50, unit: "pièce", icon: "🍞", bio: false, local: true, active: true },
  { id: 12, name: "Croissants ×4", cat: "pain", price: 4.80, unit: "lot", icon: "🥐", bio: false, local: true, active: true },
  { id: 13, name: "Pain complet", cat: "pain", price: 3.80, unit: "pièce", icon: "🍞", bio: true, local: true, active: true },
  { id: 20, name: "Comté 18 mois AOP", cat: "fromage", price: 22.50, unit: "kg", icon: "🧀", bio: false, local: true, active: true },
  { id: 21, name: "Cancoillotte nature", cat: "fromage", price: 2.90, unit: "pot", icon: "🫕", bio: false, local: true, active: true },
  { id: 22, name: "Cancoillotte ail", cat: "fromage", price: 3.10, unit: "pot", icon: "🫕", bio: false, local: true, active: true },
  { id: 23, name: "Morbier AOP", cat: "fromage", price: 18.90, unit: "kg", icon: "🧀", bio: false, local: true, active: true },
  { id: 24, name: "Beurre fermier", cat: "fromage", price: 3.20, unit: "250g", icon: "🧈", bio: false, local: true, active: true },
  { id: 25, name: "Œufs plein air ×6", cat: "fromage", price: 2.80, unit: "boîte", icon: "🥚", bio: false, local: true, active: true },
  { id: 26, name: "Yaourts fermiers ×4", cat: "fromage", price: 3.60, unit: "lot", icon: "🥛", bio: false, local: true, active: true },
  { id: 30, name: "Miel de sapin", cat: "epicerie", price: 9.80, unit: "pot", icon: "🍯", bio: false, local: true, active: true },
  { id: 31, name: "Confiture mirabelle", cat: "epicerie", price: 5.50, unit: "pot", icon: "🫙", bio: false, local: true, active: true },
  { id: 32, name: "Pâtes artisanales", cat: "epicerie", price: 3.90, unit: "500g", icon: "🍝", bio: false, local: true, active: true },
  { id: 33, name: "Huile de colza", cat: "epicerie", price: 6.50, unit: "L", icon: "🫒", bio: true, local: true, active: true },
  { id: 40, name: "Paella maison", cat: "plats", price: 9.50, unit: "part", icon: "🥘", bio: false, local: false, active: true, platDuJour: true },
  { id: 41, name: "Beignets de PDT", cat: "plats", price: 6.50, unit: "×6", icon: "🥔", bio: false, local: true, active: true, platDuJour: true },
  { id: 42, name: "Filet de sandre", cat: "plats", price: 12.90, unit: "part", icon: "🐟", bio: false, local: true, active: true, platDuJour: true },
  { id: 43, name: "Quiche lorraine", cat: "plats", price: 7.50, unit: "part", icon: "🥧", bio: false, local: false, active: false, platDuJour: true },
  { id: 44, name: "Salade composée", cat: "plats", price: 6.90, unit: "barq.", icon: "🥗", bio: false, local: false, active: true, platDuJour: true },
  { id: 50, name: "Vin du Jura blanc", cat: "boissons", price: 8.90, unit: "75cl", icon: "🍷", bio: false, local: true, active: true },
  { id: 51, name: "Bière artisanale", cat: "boissons", price: 3.50, unit: "33cl", icon: "🍺", bio: false, local: true, active: true },
  { id: 52, name: "Jus de pomme", cat: "boissons", price: 4.20, unit: "L", icon: "🧃", bio: true, local: true, active: true },
  { id: 53, name: "Sirop de sapin", cat: "boissons", price: 7.80, unit: "50cl", icon: "🌲", bio: false, local: true, active: true },
  { id: 60, name: "Saucisse de Morteau", cat: "local", price: 8.50, unit: "pièce", icon: "🌭", bio: false, local: true, active: true },
  { id: 61, name: "Saucisse de Montbéliard", cat: "local", price: 4.50, unit: "pièce", icon: "🌭", bio: false, local: true, active: true },
  { id: 62, name: "Kirsch AOC", cat: "local", price: 24.00, unit: "50cl", icon: "🍒", bio: false, local: true, active: true },
  { id: 63, name: "Griottines", cat: "local", price: 12.50, unit: "pot", icon: "🍒", bio: false, local: true, active: true },
  { id: 64, name: "Macvin du Jura", cat: "local", price: 14.90, unit: "75cl", icon: "🍇", bio: false, local: true, active: true },
];

const INIT_DEALS = [
  { id: "d1", title: "Panier Primeur", desc: "5 fruits & légumes de saison", price: 9.90, oldPrice: 14.50, icon: "🧺", tag: "−31%", active: true },
  { id: "d2", title: "Formule P'tit Déj", desc: "Baguette + croissants + jus de pomme", price: 7.50, oldPrice: 10.30, icon: "☀️", tag: "Matin", active: true },
  { id: "d3", title: "Apéro Comtois", desc: "Comté + Morteau + vin du Jura", price: 15.90, oldPrice: 22.00, icon: "🧀", tag: "Best", active: true },
  { id: "d4", title: "Repas Express", desc: "Plat du jour + boisson + dessert", price: 11.90, oldPrice: 15.50, icon: "🥘", tag: "Midi", active: true },
];

const INIT_HOURS = [
  { day: "Lundi", hours: "8h30–13h00 / 16h00–19h30", open: true },
  { day: "Mardi", hours: "7h00–19h30", open: true },
  { day: "Mercredi", hours: "7h00–19h30", open: true },
  { day: "Jeudi", hours: "7h00–19h30", open: true },
  { day: "Vendredi", hours: "7h00–19h30", open: true },
  { day: "Samedi", hours: "7h00–19h30", open: true },
  { day: "Dimanche", hours: "8h30–12h00", open: true },
];

const INIT_ORDERS = [
  { id: "CMD-001", customer: "Jean-Pierre M.", phone: "06 12 34 56 78", items: [{ name: "Comté 18 mois", qty: 1, price: 22.50 }, { name: "Baguette tradition", qty: 2, price: 1.30 }, { name: "Paella maison", qty: 1, price: 9.50 }], total: 34.60, status: "new", time: "08:45", stamps: 6 },
  { id: "CMD-002", customer: "Marie-Claude D.", phone: "06 98 76 54 32", items: [{ name: "Saucisse de Morteau", qty: 2, price: 8.50 }, { name: "Cancoillotte nature", qty: 3, price: 2.90 }], total: 25.70, status: "ready", time: "09:12", stamps: 5 },
  { id: "CMD-003", customer: "Famille Roussel", phone: "06 45 67 89 01", items: [{ name: "Panier Primeur", qty: 1, price: 9.90 }, { name: "Pain de campagne", qty: 1, price: 3.50 }, { name: "Yaourts fermiers ×4", qty: 2, price: 3.60 }], total: 20.60, status: "new", time: "10:30", stamps: 4 },
  { id: "CMD-004", customer: "Patrick L.", phone: "06 23 45 67 89", items: [{ name: "Filet de sandre", qty: 2, price: 12.90 }, { name: "Vin du Jura blanc", qty: 1, price: 8.90 }], total: 34.70, status: "done", time: "07:20", stamps: 6 },
];

const INIT_MEMBERS = [
  { id: "m1", name: "Jean-Pierre M.", stamps: 14, totalSpent: 342.50, lastVisit: "19/03/2026" },
  { id: "m2", name: "Marie-Claude D.", stamps: 8, totalSpent: 215.80, lastVisit: "19/03/2026" },
  { id: "m3", name: "Famille Roussel", stamps: 19, totalSpent: 487.30, lastVisit: "18/03/2026" },
  { id: "m4", name: "Patrick L.", stamps: 6, totalSpent: 178.90, lastVisit: "19/03/2026" },
  { id: "m5", name: "Sylvie B.", stamps: 11, totalSpent: 298.40, lastVisit: "17/03/2026" },
  { id: "m6", name: "François & Anne G.", stamps: 3, totalSpent: 89.60, lastVisit: "16/03/2026" },
  { id: "m7", name: "Mme Perrin", stamps: 20, totalSpent: 612.00, lastVisit: "18/03/2026" },
  { id: "m8", name: "Lucas T.", stamps: 2, totalSpent: 45.20, lastVisit: "15/03/2026" },
];

const CATS = [
  { id: "fruits", label: "Primeur", icon: "🥬" },
  { id: "pain", label: "Boulangerie", icon: "🥖" },
  { id: "fromage", label: "Crèmerie", icon: "🧀" },
  { id: "epicerie", label: "Épicerie", icon: "🫒" },
  { id: "plats", label: "Plats du jour", icon: "🥘" },
  { id: "boissons", label: "Boissons", icon: "🍷" },
  { id: "local", label: "Terroir", icon: "🍯" },
];

const ICONS = ["🍅","🍎","🥬","🥒","🥕","🥔","🧅","🍓","🥖","🍞","🥐","🧀","🫕","🧈","🥚","🥛","🍯","🫙","🍝","🫒","🌾","🥘","🥔","🐟","🥧","🥗","🍷","🍺","🧃","🌲","💧","🌭","🍒","🍇","🧺","☀️","🎁","🛒","🏷️"];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --bg: #F6F3EE;
  --bg2: #EDEAE4;
  --sidebar: #1E1410;
  --sidebar2: #2C1F18;
  --sidebar-hover: #3A2A20;
  --sidebar-active: #C7442B;
  --card: #FFFFFF;
  --text: #1E1410;
  --text2: #6B5744;
  --text3: #A08B76;
  --accent: #C7442B;
  --accent2: #A83820;
  --green: #2D8544;
  --green-bg: #E5F5EA;
  --orange: #D97B1E;
  --orange-bg: #FFF3E0;
  --blue: #2E6B8A;
  --blue-bg: #E3F0F7;
  --red: #C7442B;
  --red-bg: #FDEDED;
  --gold: #C49A2A;
  --gold-bg: #FBF5E3;
  --border: #E0D8CE;
  --shadow: 0 1px 4px rgba(30,20,16,0.06);
  --shadow2: 0 4px 16px rgba(30,20,16,0.1);
  --radius: 12px;
  --radius-sm: 8px;
  --serif: 'DM Serif Display', Georgia, serif;
  --sans: 'DM Sans', -apple-system, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body, #root {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
}

.admin {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ── SIDEBAR ─────────────────── */
.sidebar {
  width: 240px;
  min-width: 240px;
  background: var(--sidebar);
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sb-header {
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sb-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.sb-logo-icon {
  width: 36px; height: 36px;
  background: var(--accent);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 700;
}

.sb-logo-text {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.15;
}

.sb-badge {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.08);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.6);
}

.sb-badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green);
}

.sb-nav {
  flex: 1;
  padding: 12px 10px;
}

.sb-section {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(255,255,255,0.3);
  padding: 16px 10px 6px;
  font-weight: 600;
}

.sb-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  transition: all 0.15s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  position: relative;
}

.sb-item:hover { background: var(--sidebar-hover); color: white; }

.sb-item.active {
  background: var(--sidebar-active);
  color: white;
  font-weight: 600;
}

.sb-item-icon { font-size: 18px; width: 22px; text-align: center; }

.sb-item-badge {
  margin-left: auto;
  background: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.sb-item.active .sb-item-badge { background: rgba(255,255,255,0.25); }

.sb-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  line-height: 1.5;
}

/* ── MAIN ────────────────────── */
.main-area {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar h1 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content {
  flex: 1;
  padding: 24px 28px;
  max-width: 1200px;
}

/* ── STAT CARDS ──────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: var(--shadow);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.stat-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-icon.green { background: var(--green-bg); }
.stat-icon.orange { background: var(--orange-bg); }
.stat-icon.blue { background: var(--blue-bg); }
.stat-icon.red { background: var(--red-bg); }
.stat-icon.gold { background: var(--gold-bg); }

.stat-trend {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
}

.stat-trend.up { background: var(--green-bg); color: var(--green); }
.stat-trend.down { background: var(--red-bg); color: var(--red); }

.stat-value {
  font-size: 28px;
  font-weight: 700;
  font-family: var(--sans);
  line-height: 1;
  margin-bottom: 3px;
}

.stat-label {
  font-size: 12px;
  color: var(--text3);
  font-weight: 500;
}

/* ── BUTTONS ─────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: var(--radius-sm);
  border: none;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-primary { background: var(--accent); color: white; }
.btn-primary:hover { background: var(--accent2); }

.btn-green { background: var(--green); color: white; }
.btn-green:hover { opacity: 0.9; }

.btn-outline { background: var(--card); color: var(--text); border: 1.5px solid var(--border); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }

.btn-ghost { background: none; color: var(--text2); }
.btn-ghost:hover { color: var(--accent); }

.btn-sm { padding: 6px 10px; font-size: 12px; }

.btn-danger { background: none; color: var(--red); }
.btn-danger:hover { background: var(--red-bg); }

/* ── TABLE ───────────────────── */
.table-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  margin-bottom: 20px;
}

.table-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.table-header h3 {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 400;
}

.table-filters {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-chip {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1.5px solid var(--border);
  background: var(--card);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--text2);
  font-family: var(--sans);
}

.filter-chip:hover { border-color: var(--accent); color: var(--accent); }
.filter-chip.active { background: var(--accent); color: white; border-color: var(--accent); }

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text3);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

td {
  padding: 12px 16px;
  font-size: 13px;
  border-bottom: 1px solid #F2EDE6;
  vertical-align: middle;
}

tr:last-child td { border-bottom: none; }

tr:hover { background: #FDFBF8; }

/* ── STATUS BADGES ───────────── */
.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-new { background: var(--orange-bg); color: var(--orange); }
.status-ready { background: var(--blue-bg); color: var(--blue); }
.status-done { background: var(--green-bg); color: var(--green); }
.status-active { background: var(--green-bg); color: var(--green); }
.status-inactive { background: var(--bg2); color: var(--text3); }

/* ── TOGGLE ──────────────────── */
.toggle {
  width: 40px; height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle.on { background: var(--green); }
.toggle.off { background: var(--border); }

.toggle::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: white;
  top: 2px;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.toggle.on::after { left: 20px; }
.toggle.off::after { left: 2px; }

/* ── FORMS ───────────────────── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group.full { grid-column: 1 / -1; }

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text2);
}

.form-input {
  padding: 9px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: var(--sans);
  color: var(--text);
  background: var(--card);
  transition: border-color 0.15s;
  outline: none;
  width: 100%;
}

.form-input:focus { border-color: var(--accent); }

.form-select {
  padding: 9px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: var(--sans);
  color: var(--text);
  background: var(--card);
  outline: none;
  width: 100%;
  cursor: pointer;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.form-check input { width: 16px; height: 16px; accent-color: var(--accent); }

.icon-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  background: var(--bg);
  border-radius: var(--radius-sm);
  max-height: 80px;
  overflow-y: auto;
}

.icon-opt {
  width: 32px; height: 32px;
  border-radius: 6px;
  border: 1.5px solid transparent;
  background: var(--card);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.icon-opt:hover { border-color: var(--accent); }
.icon-opt.sel { border-color: var(--accent); background: var(--red-bg); }

/* ── MODAL ───────────────────── */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30,20,16,0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s ease;
}

.modal {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  width: 520px;
  max-width: 95vw;
  max-height: 85vh;
  overflow-y: auto;
  animation: slideUp 0.2s ease;
}

.modal-head {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-head h3 {
  font-family: var(--serif);
  font-size: 18px;
}

.modal-body { padding: 20px 24px; }

.modal-foot {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: none;
  background: var(--bg);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text2);
}

.close-btn:hover { background: var(--border); }

/* ── ORDER DETAIL ────────────── */
.order-detail-items {
  margin: 12px 0;
  padding: 12px;
  background: var(--bg);
  border-radius: var(--radius-sm);
}

.order-detail-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
}

.order-detail-total {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 8px;
  border-top: 1.5px solid var(--border);
  font-weight: 700;
  font-size: 15px;
}

/* ── MEMBER CARD ─────────────── */
.member-stamps {
  display: flex;
  gap: 3px;
  align-items: center;
}

.mini-stamp {
  width: 14px; height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
}

.mini-stamp.filled { background: var(--gold); }
.mini-stamp.empty { background: var(--bg2); }

.stamp-count {
  font-size: 12px;
  font-weight: 700;
  margin-left: 6px;
  color: var(--text);
}

/* ── RESPONSIVE ──────────────── */
@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .sidebar { width: 60px; min-width: 60px; }
  .sb-header, .sb-section, .sb-item span:not(.sb-item-icon), .sb-footer, .sb-badge { display: none; }
  .sb-logo { justify-content: center; }
  .sb-item { justify-content: center; padding: 12px; }
  .sb-item-icon { font-size: 20px; }
  .sb-item-badge { position: absolute; top: 4px; right: 4px; }
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Admin() {
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [deals, setDeals] = useState(INIT_DEALS);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [hours, setHours] = useState(INIT_HOURS);
  const [members] = useState(INIT_MEMBERS);
  const [modal, setModal] = useState(null);

  const newOrders = orders.filter(o => o.status === "new").length;

  const NAV = [
    { section: "Général" },
    { id: "dashboard", icon: "📊", label: "Tableau de bord" },
    { id: "orders", icon: "📋", label: "Commandes", badge: newOrders },
    { section: "Catalogue" },
    { id: "products", icon: "📦", label: "Produits" },
    { id: "plats", icon: "🥘", label: "Plats du jour" },
    { id: "deals", icon: "🏷️", label: "Bons Plans" },
    { section: "Clients" },
    { id: "members", icon: "⭐", label: "Fidélité" },
    { section: "Paramètres" },
    { id: "hours", icon: "🕐", label: "Horaires" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="admin">
        <aside className="sidebar">
          <div className="sb-header">
            <div className="sb-logo">
              <div className="sb-logo-icon">É</div>
              <div className="sb-logo-text">Épicerie<br/>Raddonnaise</div>
            </div>
            <div className="sb-badge"><span className="sb-badge-dot" /> Admin — Marion</div>
          </div>
          <nav className="sb-nav">
            {NAV.map((item, i) =>
              item.section ? (
                <div className="sb-section" key={i}>{item.section}</div>
              ) : (
                <button
                  key={item.id}
                  className={`sb-item ${page === item.id ? "active" : ""}`}
                  onClick={() => setPage(item.id)}
                >
                  <span className="sb-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge > 0 && <span className="sb-item-badge">{item.badge}</span>}
                </button>
              )
            )}
          </nav>
          <div className="sb-footer">
            LTMP – SARL<br/>
            4 Av. des Vosges<br/>
            70280 Raddon-et-Chapendu
          </div>
        </aside>

        <div className="main-area">
          {page === "dashboard" && <DashboardPage orders={orders} products={products} members={members} setPage={setPage} />}
          {page === "orders" && <OrdersPage orders={orders} setOrders={setOrders} />}
          {page === "products" && <ProductsPage products={products} setProducts={setProducts} modal={modal} setModal={setModal} catFilter="all" />}
          {page === "plats" && <ProductsPage products={products} setProducts={setProducts} modal={modal} setModal={setModal} catFilter="plats" />}
          {page === "deals" && <DealsPage deals={deals} setDeals={setDeals} modal={modal} setModal={setModal} />}
          {page === "members" && <MembersPage members={members} />}
          {page === "hours" && <HoursPage hours={hours} setHours={setHours} />}
        </div>
      </div>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DashboardPage({ orders, products, members, setPage }) {
  const todayOrders = orders.length;
  const todayRevenue = orders.reduce((s, o) => s + o.total, 0);
  const newOrders = orders.filter(o => o.status === "new");
  const activeProducts = products.filter(p => p.active).length;
  const totalMembers = members.length;
  const totalStamps = members.reduce((s, m) => s + m.stamps, 0);

  return (
    <>
      <div className="topbar">
        <h1>Tableau de bord</h1>
        <div className="topbar-right">
          <span style={{ fontSize: 13, color: "var(--text3)" }}>Jeudi 19 mars 2026</span>
        </div>
      </div>
      <div className="content">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon orange">📋</div>
              <span className="stat-trend up">+3 auj.</span>
            </div>
            <div className="stat-value">{todayOrders}</div>
            <div className="stat-label">Commandes aujourd'hui</div>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon green">💰</div>
              <span className="stat-trend up">+12%</span>
            </div>
            <div className="stat-value">{todayRevenue.toFixed(0)}€</div>
            <div className="stat-label">Chiffre du jour</div>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon blue">📦</div>
            </div>
            <div className="stat-value">{activeProducts}</div>
            <div className="stat-label">Produits actifs</div>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <div className="stat-icon gold">⭐</div>
            </div>
            <div className="stat-value">{totalMembers}</div>
            <div className="stat-label">Clients fidélité ({totalStamps} tampons)</div>
          </div>
        </div>

        {newOrders.length > 0 && (
          <div className="table-card">
            <div className="table-header">
              <h3>🔔 Nouvelles commandes</h3>
              <button className="btn btn-outline btn-sm" onClick={() => setPage("orders")}>Voir tout →</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Client</th>
                  <th>Heure</th>
                  <th>Total</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {newOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 700 }}>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.time}</td>
                    <td style={{ fontWeight: 700 }}>{o.total.toFixed(2)}€</td>
                    <td><span className="status status-new">● Nouvelle</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="table-card">
            <div className="table-header">
              <h3>🥘 Plats du jour actifs</h3>
            </div>
            <table>
              <thead><tr><th></th><th>Plat</th><th>Prix</th><th>Dispo</th></tr></thead>
              <tbody>
                {products.filter(p => p.platDuJour).map(p => (
                  <tr key={p.id}>
                    <td>{p.icon}</td>
                    <td>{p.name}</td>
                    <td style={{ fontWeight: 600 }}>{p.price.toFixed(2)}€</td>
                    <td><span className={`status ${p.active ? "status-active" : "status-inactive"}`}>{p.active ? "Oui" : "Non"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <div className="table-header">
              <h3>🏷️ Bons Plans en cours</h3>
            </div>
            <div style={{ padding: "12px 16px" }}>
              {INIT_DEALS.filter(d => d.active).map(d => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--bg2)" }}>
                  <span style={{ fontSize: 24 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{d.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{d.desc}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--accent)" }}>{d.price.toFixed(2)}€</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ORDERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OrdersPage({ orders, setOrders }) {
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState(null);

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (detail?.id === id) setDetail(d => ({ ...d, status }));
  };

  return (
    <>
      <div className="topbar">
        <h1>Commandes</h1>
        <div className="topbar-right">
          <span style={{ fontSize: 13, color: "var(--text3)" }}>{orders.length} commandes aujourd'hui</span>
        </div>
      </div>
      <div className="content">
        <div className="table-card">
          <div className="table-header">
            <h3>Toutes les commandes</h3>
            <div className="table-filters">
              {[{ id: "all", label: "Toutes" }, { id: "new", label: "🟠 Nouvelles" }, { id: "ready", label: "🔵 Prêtes" }, { id: "done", label: "✅ Terminées" }].map(f => (
                <button key={f.id} className={`filter-chip ${filter === f.id ? "active" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>
              ))}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Client</th>
                <th>Articles</th>
                <th>Total</th>
                <th>Heure</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 700 }}>{o.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.customer}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{o.phone}</div>
                  </td>
                  <td>{o.items.length} article{o.items.length > 1 ? "s" : ""}</td>
                  <td style={{ fontWeight: 700 }}>{o.total.toFixed(2)}€</td>
                  <td>{o.time}</td>
                  <td>
                    <span className={`status status-${o.status}`}>
                      {o.status === "new" ? "● Nouvelle" : o.status === "ready" ? "● Prête" : "✓ Terminée"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setDetail(o)}>Détail</button>
                      {o.status === "new" && <button className="btn btn-green btn-sm" onClick={() => updateStatus(o.id, "ready")}>✓ Prête</button>}
                      {o.status === "ready" && <button className="btn btn-primary btn-sm" onClick={() => updateStatus(o.id, "done")}>✓ Retirée</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Commande {detail.id}</h3>
              <button className="close-btn" onClick={() => setDetail(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><div className="form-label">Client</div><div style={{ fontWeight: 600 }}>{detail.customer}</div></div>
                <div><div className="form-label">Téléphone</div><div>{detail.phone}</div></div>
                <div><div className="form-label">Heure</div><div>{detail.time}</div></div>
                <div><div className="form-label">Tampons gagnés</div><div style={{ color: "var(--gold)", fontWeight: 700 }}>+{detail.stamps} ⭐</div></div>
              </div>
              <div className="order-detail-items">
                {detail.items.map((item, i) => (
                  <div className="order-detail-item" key={i}>
                    <span>{item.qty}× {item.name}</span>
                    <span style={{ fontWeight: 600 }}>{(item.qty * item.price).toFixed(2)}€</span>
                  </div>
                ))}
                <div className="order-detail-total">
                  <span>Total</span>
                  <span>{detail.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              {detail.status === "new" && (
                <button className="btn btn-green" onClick={() => { updateStatus(detail.id, "ready"); }}>
                  📱 Marquer prête & SMS client
                </button>
              )}
              {detail.status === "ready" && (
                <button className="btn btn-primary" onClick={() => { updateStatus(detail.id, "done"); setDetail(null); }}>
                  ✓ Commande retirée
                </button>
              )}
              {detail.status === "done" && (
                <span className="status status-done">✓ Terminée</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRODUCTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ProductsPage({ products, setProducts, modal, setModal, catFilter }) {
  const [filter, setFilter] = useState(catFilter === "plats" ? "plats" : "all");
  const isPlatsView = catFilter === "plats";

  const filtered = products.filter(p => {
    if (isPlatsView) return p.platDuJour;
    if (filter === "all") return true;
    return p.cat === filter;
  });

  const toggleActive = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const openAdd = () => setModal({ type: "product", data: { name: "", cat: isPlatsView ? "plats" : "fruits", price: "", unit: "pièce", icon: "🍅", bio: false, local: false, active: true, platDuJour: isPlatsView } });

  const openEdit = (p) => setModal({ type: "product", data: { ...p, price: String(p.price) }, editId: p.id });

  const saveProduct = (data) => {
    const product = { ...data, price: parseFloat(data.price) || 0 };
    if (modal.editId) {
      setProducts(prev => prev.map(p => p.id === modal.editId ? { ...p, ...product } : p));
    } else {
      const maxId = Math.max(...products.map(p => p.id), 0);
      setProducts(prev => [...prev, { ...product, id: maxId + 1 }]);
    }
    setModal(null);
  };

  return (
    <>
      <div className="topbar">
        <h1>{isPlatsView ? "Plats du jour" : "Produits"}</h1>
        <div className="topbar-right">
          <button className="btn btn-primary" onClick={openAdd}>+ {isPlatsView ? "Nouveau plat" : "Nouveau produit"}</button>
        </div>
      </div>
      <div className="content">
        <div className="table-card">
          <div className="table-header">
            <h3>{filtered.length} {isPlatsView ? "plat(s)" : "produit(s)"}</h3>
            {!isPlatsView && (
              <div className="table-filters">
                <button className={`filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tous</button>
                {CATS.map(c => (
                  <button key={c.id} className={`filter-chip ${filter === c.id ? "active" : ""}`} onClick={() => setFilter(c.id)}>{c.icon} {c.label}</button>
                ))}
              </div>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Bio</th>
                <th>Local</th>
                <th>Actif</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ opacity: p.active ? 1 : 0.5 }}>
                  <td style={{ fontSize: 22 }}>{p.icon}</td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>
                      {CATS.find(c => c.id === p.cat)?.icon} {CATS.find(c => c.id === p.cat)?.label || p.cat}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{p.price.toFixed(2)}€<span style={{ color: "var(--text3)", fontWeight: 400 }}> / {p.unit}</span></td>
                  <td>{p.bio ? <span className="status status-active">BIO</span> : "—"}</td>
                  <td>{p.local ? <span className="status status-active" style={{ background: "var(--gold-bg)", color: "#8B6914" }}>LOCAL</span> : "—"}</td>
                  <td><button className={`toggle ${p.active ? "on" : "off"}`} onClick={() => toggleActive(p.id)} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.type === "product" && (
        <ProductModal data={modal.data} isEdit={!!modal.editId} onSave={saveProduct} onClose={() => setModal(null)} />
      )}
    </>
  );
}

function ProductModal({ data, isEdit, onSave, onClose }) {
  const [form, setForm] = useState(data);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? "Modifier le produit" : "Nouveau produit"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Nom</label>
              <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Ex: Comté 18 mois" />
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="form-select" value={form.cat} onChange={e => set("cat", e.target.value)}>
                {CATS.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Icône</label>
              <div className="icon-picker">
                {ICONS.map(ic => (
                  <button key={ic} className={`icon-opt ${form.icon === ic ? "sel" : ""}`} onClick={() => set("icon", ic)}>{ic}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Prix (€)</label>
              <input className="form-input" type="number" step="0.10" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Unité</label>
              <select className="form-select" value={form.unit} onChange={e => set("unit", e.target.value)}>
                {["pièce","kg","L","pot","lot","barq.","botte","250g","500g","75cl","50cl","33cl","boîte","×6","part"].map(u =>
                  <option key={u} value={u}>{u}</option>
                )}
              </select>
            </div>
            <div className="form-group full" style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center", paddingTop: 8 }}>
              <label className="form-check"><input type="checkbox" checked={form.bio} onChange={e => set("bio", e.target.checked)} /> Bio</label>
              <label className="form-check"><input type="checkbox" checked={form.local} onChange={e => set("local", e.target.checked)} /> Local</label>
              <label className="form-check"><input type="checkbox" checked={form.platDuJour || false} onChange={e => set("platDuJour", e.target.checked)} /> Plat du jour</label>
              <label className="form-check"><input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)} /> Actif</label>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)} disabled={!form.name || !form.price}>
            {isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEALS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DealsPage({ deals, setDeals, modal, setModal }) {
  const openAdd = () => setModal({ type: "deal", data: { title: "", desc: "", price: "", oldPrice: "", icon: "🧺", tag: "", active: true } });

  const openEdit = (d) => setModal({ type: "deal", data: { ...d, price: String(d.price), oldPrice: String(d.oldPrice) }, editId: d.id });

  const toggleDeal = (id) => setDeals(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));

  const deleteDeal = (id) => setDeals(prev => prev.filter(d => d.id !== id));

  const saveDeal = (data) => {
    const deal = { ...data, price: parseFloat(data.price) || 0, oldPrice: parseFloat(data.oldPrice) || 0 };
    if (modal.editId) {
      setDeals(prev => prev.map(d => d.id === modal.editId ? { ...d, ...deal } : d));
    } else {
      setDeals(prev => [...prev, { ...deal, id: `d${Date.now()}` }]);
    }
    setModal(null);
  };

  return (
    <>
      <div className="topbar">
        <h1>Bons Plans</h1>
        <div className="topbar-right">
          <button className="btn btn-primary" onClick={openAdd}>+ Nouveau bon plan</button>
        </div>
      </div>
      <div className="content">
        <div className="table-card">
          <div className="table-header">
            <h3>{deals.length} bon(s) plan(s)</h3>
          </div>
          <table>
            <thead>
              <tr><th></th><th>Titre</th><th>Description</th><th>Prix</th><th>Ancien prix</th><th>Tag</th><th>Actif</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {deals.map(d => (
                <tr key={d.id} style={{ opacity: d.active ? 1 : 0.5 }}>
                  <td style={{ fontSize: 24 }}>{d.icon}</td>
                  <td style={{ fontWeight: 700 }}>{d.title}</td>
                  <td style={{ color: "var(--text2)", fontSize: 12, maxWidth: 200 }}>{d.desc}</td>
                  <td style={{ fontWeight: 700, color: "var(--accent)" }}>{d.price.toFixed(2)}€</td>
                  <td style={{ textDecoration: "line-through", color: "var(--text3)" }}>{d.oldPrice.toFixed(2)}€</td>
                  <td><span className="status status-new">{d.tag}</span></td>
                  <td><button className={`toggle ${d.active ? "on" : "off"}`} onClick={() => toggleDeal(d.id)} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(d)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteDeal(d.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal?.type === "deal" && (
        <DealModal data={modal.data} isEdit={!!modal.editId} onSave={saveDeal} onClose={() => setModal(null)} />
      )}
    </>
  );
}

function DealModal({ data, isEdit, onSave, onClose }) {
  const [form, setForm] = useState(data);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? "Modifier le bon plan" : "Nouveau bon plan"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Titre</label>
              <input className="form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Ex: Panier Primeur" />
            </div>
            <div className="form-group full">
              <label className="form-label">Description</label>
              <input className="form-input" value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="Ex: 5 fruits & légumes de saison" />
            </div>
            <div className="form-group">
              <label className="form-label">Prix promo (€)</label>
              <input className="form-input" type="number" step="0.10" value={form.price} onChange={e => set("price", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Ancien prix (€)</label>
              <input className="form-input" type="number" step="0.10" value={form.oldPrice} onChange={e => set("oldPrice", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tag</label>
              <input className="form-input" value={form.tag} onChange={e => set("tag", e.target.value)} placeholder="Ex: −30%, Best, Midi" />
            </div>
            <div className="form-group">
              <label className="form-label">Icône</label>
              <div className="icon-picker">
                {ICONS.map(ic => (
                  <button key={ic} className={`icon-opt ${form.icon === ic ? "sel" : ""}`} onClick={() => set("icon", ic)}>{ic}</button>
                ))}
              </div>
            </div>
            <div className="form-group full" style={{ display: "flex", flexDirection: "row", gap: 20, paddingTop: 8 }}>
              <label className="form-check"><input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)} /> Actif</label>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)} disabled={!form.title || !form.price}>
            {isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MEMBERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MembersPage({ members }) {
  const sorted = [...members].sort((a, b) => b.stamps - a.stamps);

  return (
    <>
      <div className="topbar">
        <h1>Programme Fidélité</h1>
        <div className="topbar-right">
          <span style={{ fontSize: 13, color: "var(--text3)" }}>{members.length} membres</span>
        </div>
      </div>
      <div className="content">
        <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="stat-card">
            <div className="stat-top"><div className="stat-icon gold">⭐</div></div>
            <div className="stat-value">{members.reduce((s, m) => s + m.stamps, 0)}</div>
            <div className="stat-label">Tampons distribués</div>
          </div>
          <div className="stat-card">
            <div className="stat-top"><div className="stat-icon green">💰</div></div>
            <div className="stat-value">{members.reduce((s, m) => s + m.totalSpent, 0).toFixed(0)}€</div>
            <div className="stat-label">CA membres fidélité</div>
          </div>
          <div className="stat-card">
            <div className="stat-top"><div className="stat-icon blue">🎁</div></div>
            <div className="stat-value">{members.filter(m => m.stamps >= 20).length}</div>
            <div className="stat-label">Cartes complètes (20/20)</div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h3>Tous les membres</h3>
          </div>
          <table>
            <thead>
              <tr><th>Client</th><th>Tampons</th><th>Progression</th><th>Total dépensé</th><th>Dernière visite</th></tr>
            </thead>
            <tbody>
              {sorted.map(m => {
                const pct = (m.stamps / 20) * 100;
                return (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td>
                      <div className="member-stamps">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className={`mini-stamp ${i < m.stamps ? "filled" : "empty"}`} />
                        ))}
                        <span className="stamp-count">{m.stamps}/20</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ width: 100, height: 6, background: "var(--bg2)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: "var(--gold)", borderRadius: 3 }} />
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{m.totalSpent.toFixed(2)}€</td>
                    <td style={{ color: "var(--text2)" }}>{m.lastVisit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOURS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HoursPage({ hours, setHours }) {
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");

  const saveHour = (idx) => {
    setHours(prev => prev.map((h, i) => i === idx ? { ...h, hours: draft } : h));
    setEditing(null);
  };

  const toggleDay = (idx) => {
    setHours(prev => prev.map((h, i) => i === idx ? { ...h, open: !h.open } : h));
  };

  return (
    <>
      <div className="topbar">
        <h1>Horaires d'ouverture</h1>
      </div>
      <div className="content">
        <div className="table-card">
          <div className="table-header">
            <h3>Horaires de la semaine</h3>
          </div>
          <table>
            <thead>
              <tr><th>Jour</th><th>Horaires</th><th>Ouvert</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {hours.map((h, i) => (
                <tr key={h.day}>
                  <td style={{ fontWeight: 700, width: 120 }}>{h.day}</td>
                  <td>
                    {editing === i ? (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input className="form-input" style={{ width: 260 }} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && saveHour(i)} autoFocus />
                        <button className="btn btn-green btn-sm" onClick={() => saveHour(i)}>✓</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>✕</button>
                      </div>
                    ) : (
                      <span style={{ opacity: h.open ? 1 : 0.4 }}>{h.open ? h.hours : "Fermé"}</span>
                    )}
                  </td>
                  <td><button className={`toggle ${h.open ? "on" : "off"}`} onClick={() => toggleDay(i)} /></td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(i); setDraft(h.hours); }}>✏️ Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card" style={{ maxWidth: 500 }}>
          <div className="table-header">
            <h3>💡 Rappel</h3>
          </div>
          <div style={{ padding: 20, fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
            Les horaires affichés ici sont ceux que les clients voient dans l'application.
            N'oublie pas de mettre à jour aussi le site Wix et la page Facebook si tu changes les horaires de façon permanente.
          </div>
        </div>
      </div>
    </>
  );
}
