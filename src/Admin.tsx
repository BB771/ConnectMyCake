import { useState } from 'react'

/* ─── Types & Data ── */

type AdminSection = 'dashboard' | 'artisans' | 'contenus' | 'signalements' | 'parametres'

const STATS = [
  { label: 'Artisans inscrits', value: '1 284', delta: '+47', trend: 'up', sub: 'ce mois' },
  { label: 'Publications', value: '8 931', delta: '+312', trend: 'up', sub: 'ce mois' },
  { label: 'Messages échangés', value: '24.7K', delta: '+1.2K', trend: 'up', sub: 'ce mois' },
  { label: 'Signalements ouverts', value: '7', delta: '-3', trend: 'down', sub: 'à traiter' },
  { label: 'Revenus abonnements', value: '3 840 €', delta: '+280 €', trend: 'up', sub: 'ce mois' },
]

const CHART_MONTHS = ['Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep']
const CHART_DATA = [38, 62, 55, 80, 91, 124]
const CHART_MAX = 130

const ARTISANS = [
  { id: 1, name: 'Claire Blanc', handle: 'claire.b', metier: 'Pâtissier', ville: 'Paris 8e', status: 'vérifié', badge: 'MOF', joined: '12 jan. 2024', followers: '3 800', posts: 124, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format' },
  { id: 2, name: 'Marc Roux', handle: 'marc.r', metier: 'Pâtissier', ville: 'Bordeaux', status: 'vérifié', badge: null, joined: '3 mar. 2024', followers: '5 200', posts: 98, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format' },
  { id: 3, name: 'Elena Duval', handle: 'elena.d', metier: 'Pâtissier', ville: 'Strasbourg', status: 'en attente', badge: null, joined: '28 mai 2024', followers: '2 100', posts: 67, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&auto=format' },
  { id: 4, name: 'Paul Vidal', handle: 'paul.v', metier: 'Chocolatier', ville: 'Nantes', status: 'vérifié', badge: 'Valrhona', joined: '7 fév. 2024', followers: '1 900', posts: 54, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format' },
  { id: 5, name: 'Camille Fournier', handle: 'camille.f', metier: 'Glacier', ville: 'Annecy', status: 'en attente', badge: null, joined: '15 jun. 2024', followers: '1 200', posts: 31, avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=60&h=60&fit=crop&auto=format' },
  { id: 6, name: 'Thomas Levy', handle: 'thomas.levy', metier: 'Pâtissier', ville: 'Paris 6e', status: 'suspendu', badge: null, joined: '2 avr. 2024', followers: '980', posts: 22, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format' },
  { id: 7, name: 'Ines Garnier', handle: 'ines.g', metier: 'Chocolatier', ville: 'Toulouse', status: 'vérifié', badge: null, joined: '20 jan. 2024', followers: '1 500', posts: 79, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format' },
]

const CONTENUS = [
  { id: 1, user: 'claire.b', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format', preview: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=120&h=80&fit=crop&auto=format', caption: 'Nouvelle création pour la carte automne : tarte aux poires pochées…', date: '24 sep. 2026', likes: 841, reports: 0, status: 'publié' },
  { id: 2, user: 'marc.r', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format', preview: 'https://images.unsplash.com/photo-1617455559710-8eb55a9dfb54?w=120&h=80&fit=crop&auto=format', caption: 'Six mois de R&D pour ce dessert : sphère de chocolat Valrhona 72%…', date: '24 sep. 2026', likes: 2103, reports: 0, status: 'publié' },
  { id: 3, user: 'thomas.levy', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format', preview: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=120&h=80&fit=crop&auto=format', caption: 'Promo vitrine — offre spéciale, réduction 50%, cliquez ici…', date: '23 sep. 2026', likes: 12, reports: 4, status: 'signalé' },
  { id: 4, user: 'elena.d', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&auto=format', preview: 'https://images.unsplash.com/photo-1726950189914-8fe1016eb9c7?w=120&h=80&fit=crop&auto=format', caption: 'Samedi vitrine chargée, éclairs signature, millefeuilles vanille-caramel…', date: '22 sep. 2026', likes: 1487, reports: 0, status: 'publié' },
  { id: 5, user: 'inconnu.u', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&auto=format', preview: 'https://images.unsplash.com/photo-1683223063461-5d5a35bef2a2?w=120&h=80&fit=crop&auto=format', caption: 'Achetez mes produits pas chers, qualité garantie, livraison rapide…', date: '21 sep. 2026', likes: 3, reports: 7, status: 'signalé' },
]

const SIGNALEMENTS = [
  { id: 1, type: 'Publication', user: 'thomas.levy', reason: 'Contenu commercial non autorisé', date: '23 sep.', priority: 'haute', reports: 4, status: 'ouvert' },
  { id: 2, type: 'Publication', user: 'inconnu.u', reason: 'Spam et contenu trompeur', date: '21 sep.', priority: 'critique', reports: 7, status: 'ouvert' },
  { id: 3, type: 'Profil', user: 'faux.compte', reason: 'Usurpation d\'identité', date: '20 sep.', priority: 'critique', reports: 3, status: 'ouvert' },
  { id: 4, type: 'Commentaire', user: 'anon.22', reason: 'Harcèlement', date: '19 sep.', priority: 'haute', reports: 2, status: 'traité' },
  { id: 5, type: 'Publication', user: 'pub.bot', reason: 'Publicité déguisée', date: '18 sep.', priority: 'normale', reports: 1, status: 'traité' },
]

const PRIORITY_COLORS: Record<string, string> = {
  critique: '#ef4444',
  haute: '#fb923c',
  normale: '#c9a96e',
}

/* ─── Icons ── */
const Ic = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Content: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Briefcase: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  Flag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Star: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  TrendUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  LogOut: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
}

/* ─── Reusable ── */

function StatusBadge({ s }: { s: string }) {
  const cfg: Record<string, { bg: string; color: string; label: string }> = {
    'vérifié':    { bg: 'rgba(110,231,183,0.1)', color: '#6ee7b7', label: 'Vérifié' },
    'en attente': { bg: 'rgba(251,191,36,0.1)',  color: '#fbbf24', label: 'En attente' },
    'suspendu':   { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', label: 'Suspendu' },
    'publié':     { bg: 'rgba(110,231,183,0.1)', color: '#6ee7b7', label: 'Publié' },
    'signalé':    { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', label: 'Signalé' },
    'active':     { bg: 'rgba(110,231,183,0.1)', color: '#6ee7b7', label: 'Active' },
    'expirée':    { bg: 'rgba(100,100,120,0.15)', color: '#6b6356', label: 'Expirée' },
    'ouvert':     { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', label: 'Ouvert' },
    'traité':     { bg: 'rgba(110,231,183,0.1)', color: '#6ee7b7', label: 'Traité' },
  }
  const c = cfg[s] || cfg['en attente']
  return (
    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', background: c.bg, color: c.color, border: `1px solid ${c.color}40`, borderRadius: 20, padding: '3px 10px', whiteSpace: 'nowrap' as const }}>
      {c.label}
    </span>
  )
}

function ActionBtn({ onClick, color = 'var(--color-gold)', children }: { onClick?: () => void; color?: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: `1px solid ${color}50`, borderRadius: 8, padding: '5px 10px', color, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'background 0.1s', fontFamily: 'var(--font-body)' }}>
      {children}
    </button>
  )
}

const th: React.CSSProperties = {
  textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10,
  color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
  padding: '10px 14px', borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap',
}
const td: React.CSSProperties = {
  padding: '13px 14px', borderBottom: '1px solid var(--color-border)', verticalAlign: 'middle',
}

/* ─── Sections ── */

function Dashboard() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 24px', letterSpacing: '-0.02em' }}>Vue d'ensemble</h2>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 10 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 500, color: 'var(--color-text)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: s.trend === 'up' ? '#6ee7b7' : '#ef4444' }}>
                {s.trend === 'up' ? <Ic.TrendUp /> : <Ic.TrendDown />}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.delta}</span>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Bar chart */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Nouvelles inscriptions</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            {CHART_DATA.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-gold)' }}>{v}</span>
                <div style={{ width: '100%', background: i === CHART_DATA.length - 1 ? 'var(--color-gold)' : 'rgba(201,169,110,0.3)', borderRadius: '4px 4px 0 0', height: `${(v / CHART_MAX) * 100}%`, transition: 'height 0.4s ease', minHeight: 4 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-muted)' }}>{CHART_MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metier breakdown */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Répartition par métier</div>
          {[
            { label: 'Pâtissier', pct: 61, n: '783' },
            { label: 'Chocolatier', pct: 18, n: '231' },
            { label: 'Boulanger', pct: 12, n: '154' },
            { label: 'Glacier', pct: 6, n: '77' },
            { label: 'Autres', pct: 3, n: '39' },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text)' }}>{m.n} <span style={{ color: 'var(--color-muted)' }}>({m.pct}%)</span></span>
              </div>
              <div style={{ height: 5, background: 'var(--color-surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.pct}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick alerts */}
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px 24px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Alertes récentes</div>
        {[
          { msg: '2 comptes en attente de vérification manuelle', priority: 'haute', time: 'il y a 1h' },
          { msg: 'Publication signalée 7× — utilisateur inconnu.u', priority: 'critique', time: 'il y a 2h' },
          { msg: '3 nouvelles offres d\'emploi à valider', priority: 'normale', time: 'il y a 4h' },
          { msg: 'Pic de trafic détecté — +340% vs semaine normale', priority: 'normale', time: 'il y a 6h' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: PRIORITY_COLORS[a.priority], flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, color: 'var(--color-text-dim)' }}>{a.msg}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Artisans() {
  const [artisans, setArtisans] = useState(ARTISANS)
  const [filter, setFilter] = useState('Tous')
  const [search, setSearch] = useState('')

  const FILTERS = ['Tous', 'Vérifiés', 'En attente', 'Suspendus']

  const verify = (id: number) => setArtisans(prev => prev.map(a => a.id === id ? { ...a, status: 'vérifié' } : a))
  const suspend = (id: number) => setArtisans(prev => prev.map(a => a.id === id ? { ...a, status: 'suspendu' } : a))
  const restore = (id: number) => setArtisans(prev => prev.map(a => a.id === id ? { ...a, status: 'en attente' } : a))

  const filtered = artisans.filter(a => {
    if (filter === 'Vérifiés' && a.status !== 'vérifié') return false
    if (filter === 'En attente' && a.status !== 'en attente') return false
    if (filter === 'Suspendus' && a.status !== 'suspendu') return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.handle.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: 0 }}>Gestion des artisans</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? 'var(--color-gold)' : 'var(--color-surface-2)', border: '1px solid ' + (filter === f ? 'transparent' : 'var(--color-border)'), borderRadius: 20, padding: '7px 16px', color: filter === f ? '#1a1408' : 'var(--color-text-dim)', fontSize: 13, fontWeight: filter === f ? 600 : 400, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par nom ou identifiant…" style={{ width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '12px 16px', color: 'var(--color-text)', fontSize: 14, fontFamily: 'var(--font-body)' }} />
      </div>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Artisan', 'Métier', 'Ville', 'Publications', 'Abonnés', 'Inscrit le', 'Statut', 'Actions'].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} style={{ transition: 'background 0.1s' }}>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={a.avatar} alt={a.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      {a.badge && <div style={{ position: 'absolute', bottom: -1, right: -1, width: 14, height: 14, borderRadius: '50%', background: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--color-surface)' }}><Ic.Star /></div>}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{a.name}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>@{a.handle}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...td, fontSize: 13, color: 'var(--color-text-dim)' }}>{a.metier}</td>
                <td style={{ ...td, fontSize: 13, color: 'var(--color-text-dim)' }}>{a.ville}</td>
                <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text)' }}>{a.posts}</td>
                <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text)' }}>{a.followers}</td>
                <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>{a.joined}</td>
                <td style={td}><StatusBadge s={a.status} /></td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {a.status === 'en attente' && <ActionBtn onClick={() => verify(a.id)} color="#6ee7b7"><Ic.Check /> Valider</ActionBtn>}
                    {a.status === 'vérifié' && <ActionBtn onClick={() => suspend(a.id)} color="#ef4444"><Ic.X /> Suspendre</ActionBtn>}
                    {a.status === 'suspendu' && <ActionBtn onClick={() => restore(a.id)} color="#fbbf24"><Ic.Check /> Réactiver</ActionBtn>}
                    <ActionBtn color="var(--color-muted)"><Ic.Eye /></ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)' }}>
          {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

function Contenus() {
  const [contenus, setContenus] = useState(CONTENUS)
  const remove = (id: number) => setContenus(prev => prev.filter(c => c.id !== id))
  const approve = (id: number) => setContenus(prev => prev.map(c => c.id === id ? { ...c, status: 'publié', reports: 0 } : c))

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 24px' }}>Modération des contenus</h2>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Publication', 'Auteur', 'Date', 'Likes', 'Signalements', 'Statut', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {contenus.map(c => (
              <tr key={c.id} style={{ background: c.reports >= 4 ? 'rgba(239,68,68,0.03)' : 'none' }}>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <img src={c.preview} alt="" style={{ width: 64, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--color-text-dim)', maxWidth: 260, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>{c.caption}</span>
                  </div>
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={c.avatar} alt={c.user} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-dim)' }}>@{c.user}</span>
                  </div>
                </td>
                <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>{c.date}</td>
                <td style={{ ...td, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text)' }}>{c.likes.toLocaleString('fr-FR')}</td>
                <td style={td}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: c.reports > 0 ? '#ef4444' : 'var(--color-muted)', fontWeight: c.reports > 0 ? 600 : 400 }}>{c.reports > 0 ? `⚠ ${c.reports}` : '—'}</span>
                </td>
                <td style={td}><StatusBadge s={c.status} /></td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {c.status === 'signalé' && <ActionBtn onClick={() => approve(c.id)} color="#6ee7b7"><Ic.Check /> Valider</ActionBtn>}
                    <ActionBtn onClick={() => remove(c.id)} color="#ef4444"><Ic.Trash /> Suppr.</ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Signalements() {
  const [items, setItems] = useState(SIGNALEMENTS)
  const resolve = (id: number) => setItems(prev => prev.map(s => s.id === id ? { ...s, status: 'traité' } : s))
  const remove = (id: number) => setItems(prev => prev.filter(s => s.id !== id))

  const open = items.filter(s => s.status === 'ouvert')
  const done = items.filter(s => s.status === 'traité')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: 0 }}>Signalements</h2>
        {open.length > 0 && <span style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{open.length} ouvert{open.length > 1 ? 's' : ''}</span>}
      </div>

      {open.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>À traiter</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {open.map(s => (
              <div key={s.id} style={{ background: 'var(--color-surface)', border: `1px solid ${PRIORITY_COLORS[s.priority]}30`, borderLeft: `3px solid ${PRIORITY_COLORS[s.priority]}`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', background: `${PRIORITY_COLORS[s.priority]}15`, color: PRIORITY_COLORS[s.priority], border: `1px solid ${PRIORITY_COLORS[s.priority]}40`, borderRadius: 20, padding: '2px 10px', textTransform: 'capitalize' }}>{s.priority}</span>
                    <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{s.type}</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)' }}>@{s.user}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 4 }}>{s.reason}</div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{s.reports} signalement{s.reports > 1 ? 's' : ''} · {s.date}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <ActionBtn onClick={() => resolve(s.id)} color="#6ee7b7"><Ic.Check /> Résoudre</ActionBtn>
                  <ActionBtn onClick={() => remove(s.id)} color="#ef4444"><Ic.Trash /> Supprimer</ActionBtn>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Traités</div>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden' }}>
            {done.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: i < done.length - 1 ? '1px solid var(--color-border)' : 'none', opacity: 0.6 }}>
                <StatusBadge s="traité" />
                <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{s.type}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-dim)' }}>@{s.user}</span>
                <span style={{ fontSize: 13, color: 'var(--color-muted)', flex: 1 }}>{s.reason}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)' }}>{s.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Parametres() {
  const [settings, setSettings] = useState({
    inscriptionOuverte: true,
    moderationAuto: true,
    emailNotifs: true,
    offresValidation: true,
    maxPostsPerDay: '10',
    maintenanceMode: false,
    platformName: 'Mielle',
    supportEmail: 'support@mielle.fr',
  })
  const toggle = (k: keyof typeof settings) => setSettings(s => ({ ...s, [k]: !s[k] }))
  const update = (k: keyof typeof settings, v: string) => setSettings(s => ({ ...s, [k]: v }))
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const Toggle = ({ k }: { k: keyof typeof settings }) => (
    <button onClick={() => toggle(k)} style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      background: settings[k] ? 'var(--color-gold)' : 'var(--color-surface-2)',
      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: settings[k] ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </button>
  )

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>{title}</div>
      {children}
    </div>
  )

  const Row = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-border)', gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: desc ? 3 : 0 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>{desc}</div>}
      </div>
      {children}
    </div>
  )

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 24px' }}>Paramètres plateforme</h2>

      <Section title="Plateforme">
        <Row label="Nom de la plateforme">
          <input value={settings.platformName} onChange={e => update('platformName', e.target.value)} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 14, width: 200, fontFamily: 'var(--font-body)' }} />
        </Row>
        <Row label="Email support">
          <input value={settings.supportEmail} onChange={e => update('supportEmail', e.target.value)} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 14, width: 220, fontFamily: 'var(--font-body)' }} />
        </Row>
        <Row label="Mode maintenance" desc="Affiche une page de maintenance aux utilisateurs">
          <Toggle k="maintenanceMode" />
        </Row>
      </Section>

      <Section title="Inscriptions & accès">
        <Row label="Inscriptions ouvertes" desc="Autoriser de nouveaux comptes à s'inscrire">
          <Toggle k="inscriptionOuverte" />
        </Row>
        <Row label="Maximum de publications par jour">
          <input type="number" value={settings.maxPostsPerDay} onChange={e => update('maxPostsPerDay', e.target.value)} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 14, width: 80, fontFamily: 'var(--font-mono)', textAlign: 'center' }} />
        </Row>
      </Section>

      <Section title="Modération">
        <Row label="Modération automatique" desc="Filtrer automatiquement les contenus suspects">
          <Toggle k="moderationAuto" />
        </Row>
        <Row label="Validation manuelle des offres d'emploi" desc="Toute offre requiert une approbation admin avant publication">
          <Toggle k="offresValidation" />
        </Row>
      </Section>

      <Section title="Notifications">
        <Row label="Notifications email admin" desc="Recevoir un email lors d'un nouveau signalement critique">
          <Toggle k="emailNotifs" />
        </Row>
      </Section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 12, padding: '11px 22px', color: 'var(--color-muted)', fontSize: 14, cursor: 'pointer' }}>Annuler</button>
        <button onClick={save} style={{ background: saved ? '#6ee7b7' : 'var(--color-gold)', border: 'none', borderRadius: 12, padding: '11px 28px', color: saved ? '#0f2e1e' : '#1a1408', fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
          {saved ? <><Ic.Check /> Enregistré</> : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}

/* ─── Admin shell ── */

export default function Admin({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<AdminSection>('dashboard')

  const NAV = [
    { key: 'dashboard',    icon: <Ic.Dashboard />,  label: 'Tableau de bord' },
    { key: 'artisans',     icon: <Ic.Users />,       label: 'Artisans' },
    { key: 'contenus',     icon: <Ic.Content />,     label: 'Contenus' },
    { key: 'signalements', icon: <Ic.Flag />,        label: 'Signalements', badge: 3 },
    { key: 'parametres',   icon: <Ic.Settings />,    label: 'Paramètres' },
  ] as const

  const SECTIONS: Record<AdminSection, React.ReactNode> = {
    dashboard:    <Dashboard />,
    artisans:     <Artisans />,
    contenus:     <Contenus />,
    signalements: <Signalements />,
    parametres:   <Parametres />,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ color: 'var(--color-gold)', display: 'flex' }}><Ic.Shield /></div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-gold-light)', letterSpacing: '-0.02em' }}>Mielle</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Administration</div>
        </div>

        {/* Admin user */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold), #2a1f0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1408', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-mono)' }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Admin</div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>Super Admin</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: section === item.key ? 'rgba(201,169,110,0.12)' : 'none',
                color: section === item.key ? 'var(--color-gold)' : 'var(--color-muted)',
                fontFamily: 'var(--font-body)', fontSize: 14,
                fontWeight: section === item.key ? 600 : 400,
                marginBottom: 2, textAlign: 'left',
                transition: 'all 0.1s',
                borderLeft: section === item.key ? '2px solid var(--color-gold)' : '2px solid transparent',
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {'badge' in item && (item as { badge?: number }).badge ? (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{(item as { badge?: number }).badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Back */}
        <div style={{ padding: '14px 10px', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={onBack}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'none', color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}
          >
            <Ic.LogOut /> Retour à Mielle
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '36px 40px 60px' }}>
        {SECTIONS[section]}
      </main>
    </div>
  )
}
