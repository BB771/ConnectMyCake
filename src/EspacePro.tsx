import { useState } from 'react'

const OFFRES = [
  {
    id: 1,
    poste: 'Chef Pâtissier',
    entreprise: 'Maison Lenôtre',
    ville: 'Paris 16e',
    type: 'CDI',
    metier: 'Pâtissier',
    exp: '5 ans min.',
    salaire: '3 200 – 3 800 € brut',
    posted: 'il y a 2j',
    urgent: true,
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format',
    desc: 'Nous recherchons un Chef Pâtissier expérimenté pour rejoindre notre brigade de 12 personnes. Responsable de la carte des desserts, du management de l\'équipe et de la création des collections saisonnières.',
    missions: ['Création et renouvellement de la carte desserts', 'Management d\'une équipe de 4 pâtissiers', 'Approvisionnement et gestion des stocks', 'Formation des apprentis'],
    profil: ['Diplôme de Pâtissier (CAP/BTM minimum)', 'Expérience en pâtisserie de restaurant étoilé', 'Maîtrise du chocolat et des entremets modernes'],
  },
  {
    id: 2,
    poste: 'Pâtissier Confirmé',
    entreprise: 'Hôtel Le Bristol',
    ville: 'Paris 8e',
    type: 'CDI',
    metier: 'Pâtissier',
    exp: '3 ans min.',
    salaire: '2 600 – 3 100 € brut',
    posted: 'il y a 3j',
    urgent: false,
    logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format',
    desc: 'Le Bristol Paris recrute un Pâtissier Confirmé pour son restaurant Épicure (3 étoiles Michelin). Poste de premier commis avec évolution possible vers chef de partie.',
    missions: ['Production quotidienne des desserts à l\'assiette', 'Préparation des mises en place', 'Participation aux créations du Chef'],
    profil: ['Expérience en palace ou restaurant gastronomique', 'Rigueur et sens du détail', 'Passion pour le produit d\'exception'],
  },
  {
    id: 3,
    poste: 'Chocolatier Artisan',
    entreprise: 'Atelier Vidal',
    ville: 'Nantes',
    type: 'CDI',
    metier: 'Chocolatier',
    exp: '2 ans min.',
    salaire: '2 200 – 2 700 € brut',
    posted: 'il y a 1 sem.',
    urgent: false,
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    desc: 'Atelier Vidal, chocolaterie artisanale réputée à Nantes, recherche un Chocolatier passionné pour renforcer son équipe et participer au développement de nouvelles gammes.',
    missions: ['Fabrication des ganaches, pralinés, bonbons et tablettes', 'Contrôle qualité et température', 'Aide au développement de nouvelles recettes'],
    profil: ['Formation en chocolaterie ou confiserie', 'Maîtrise du tempérage', 'Créativité et autonomie'],
  },
  {
    id: 4,
    poste: 'Pâtissier – Ouverture Boutique',
    entreprise: 'Groupe Ladurée',
    ville: 'Lyon',
    type: 'CDI',
    metier: 'Pâtissier',
    exp: '2 ans min.',
    salaire: '2 400 – 2 900 € brut',
    posted: 'il y a 5j',
    urgent: true,
    logo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&auto=format',
    desc: 'Dans le cadre de l\'ouverture de notre nouvelle boutique à Lyon-Confluence, nous recherchons un Pâtissier motivé pour constituer notre équipe inaugurale.',
    missions: ['Production des macarons et gâteaux signature Ladurée', 'Mise en place quotidienne', 'Contribution à l\'image de la boutique'],
    profil: ['Sensibilité au produit haut de gamme', 'Excellent sens du service', 'Disponible dès janvier 2026'],
  },
  {
    id: 5,
    poste: 'Apprenti Glacier – Alternance',
    entreprise: 'Glacier Fournier',
    ville: 'Annecy',
    type: 'Alternance',
    metier: 'Glacier',
    exp: 'Débutant',
    salaire: 'Selon grille apprentissage',
    posted: 'il y a 2 sem.',
    urgent: false,
    logo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=60&h=60&fit=crop&auto=format',
    desc: 'Glacier Fournier, établissement de référence à Annecy, propose un contrat d\'apprentissage de 2 ans. Formation complète aux techniques glacerie artisanale.',
    missions: ['Fabrication de glaces et sorbets', 'Travail des coupes et desserts glacés', 'Accueil clientèle en boutique'],
    profil: ['En cours de CAP Glacier ou Pâtissier', 'Motivation et curiosité', 'Goût du travail bien fait'],
  },
  {
    id: 6,
    poste: 'Formateur Pâtisserie',
    entreprise: 'École Ferrandi Paris',
    ville: 'Paris 6e',
    type: 'CDD',
    metier: 'Formateur',
    exp: '7 ans min.',
    salaire: '3 500 – 4 200 € brut',
    posted: 'il y a 4j',
    urgent: false,
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    desc: 'Ferrandi Paris recherche un Formateur en Pâtisserie pour animer ses formations courtes et longues durées. Poste alliant expertise technique et pédagogie.',
    missions: ['Animation de cours théoriques et pratiques', 'Élaboration des programmes pédagogiques', 'Suivi des apprenants et évaluations', 'Veille technique et culinaire'],
    profil: ['Titre de Maître Artisan ou équivalent', 'Expérience significative en boutique ou restauration', 'Aptitudes pédagogiques avérées'],
  },
]

const TYPES = ['Tous', 'CDI', 'CDD', 'Alternance', 'Stage', 'Freelance']
const METIERS_FILTER = ['Tous', 'Pâtissier', 'Chocolatier', 'Glacier', 'Boulanger', 'Formateur']

const BADGE_COLORS: Record<string, string> = {
  CDI: '#6ee7b7',
  CDD: '#93c5fd',
  Alternance: '#c4b5fd',
  Stage: '#fcd34d',
  Freelance: '#fb923c',
}

function ChevronDown() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
}
function MapPin() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function Clock() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function Euro() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h8m-8 4h6"/><path d="M16 6a6 6 0 1 0 0 12"/></svg>
}
function Check() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
}
function X() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}

function OffreModal({ offre, onClose }: { offre: typeof OFFRES[0]; onClose: () => void }) {
  const [applied, setApplied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', file: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--color-surface-3)',
    border: '1px solid var(--color-border-warm)',
    borderRadius: 10, padding: '11px 14px',
    color: 'var(--color-text)', fontSize: 14,
    fontFamily: 'var(--font-body)',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontFamily: 'var(--font-mono)',
    color: 'var(--color-muted)', letterSpacing: '0.08em',
    textTransform: 'uppercase', display: 'block', marginBottom: 6,
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-warm)', borderRadius: 20, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-muted)', zIndex: 1 }}><X /></button>

        {/* Header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
            <img src={offre.logo} alt={offre.entreprise} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--color-text)', margin: 0 }}>{offre.poste}</h2>
                {offre.urgent && <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.4)', color: '#fb923c', borderRadius: 20, padding: '2px 10px' }}>Urgent</span>}
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-text-dim)', marginBottom: 10 }}>{offre.entreprise}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { icon: <MapPin />, text: offre.ville },
                  { icon: <Clock />, text: offre.posted },
                  { icon: <Euro />, text: offre.salaire },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--color-text-dim)', fontSize: 13 }}>
                    <span style={{ color: 'var(--color-gold)' }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', background: `rgba(${offre.type === 'CDI' ? '110,231,183' : '196,181,253'},0.1)`, border: `1px solid rgba(${offre.type === 'CDI' ? '110,231,183' : '196,181,253'},0.3)`, color: BADGE_COLORS[offre.type], borderRadius: 20, padding: '3px 12px' }}>{offre.type}</span>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', color: 'var(--color-gold)', borderRadius: 20, padding: '3px 12px' }}>{offre.metier}</span>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', borderRadius: 20, padding: '3px 12px' }}>{offre.exp}</span>
          </div>
        </div>

        {applied ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(110,231,183,0.1)', border: '2px solid #6ee7b7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#6ee7b7' }}><Check /></div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 8 }}>Candidature envoyée</div>
            <p style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7 }}>Votre candidature a été transmise à {offre.entreprise}. Vous recevrez une réponse dans les 10 jours ouvrés.</p>
            <button onClick={onClose} style={{ marginTop: 20, background: 'var(--color-gold)', border: 'none', borderRadius: 20, padding: '10px 28px', color: '#1a1408', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Fermer</button>
          </div>
        ) : (
          <div style={{ padding: '24px 28px 28px' }}>
            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Description</div>
              <p style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.75, margin: 0 }}>{offre.desc}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Missions</div>
                {offre.missions.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }}><Check /></span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>{m}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Profil recherché</div>
                {offre.profil.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }}><Check /></span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application form */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Postuler</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Nom complet</label>
                    <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Votre nom" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+33 6 …" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="votre@email.com" type="email" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Lettre de motivation</label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Expliquez votre parcours et votre intérêt pour ce poste…" rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={labelStyle}>CV (PDF, lien ou nom du fichier)</label>
                  <input value={form.file} onChange={e => update('file', e.target.value)} placeholder="Glissez votre CV ou saisissez un lien…" style={inputStyle} />
                </div>
                <button onClick={() => setApplied(true)} style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 12, padding: '13px 0', color: '#1a1408', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%', marginTop: 4 }}>
                  Envoyer ma candidature
                </button>
                <p style={{ fontSize: 11, color: 'var(--color-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)', margin: 0 }}>Candidature gratuite · Vos données ne sont partagées qu'avec {offre.entreprise}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EspacePro() {
  const [typeFilter, setTypeFilter] = useState('Tous')
  const [metierFilter, setMetierFilter] = useState('Tous')
  const [searchQ, setSearchQ] = useState('')
  const [selectedOffre, setSelectedOffre] = useState<typeof OFFRES[0] | null>(null)
  const [savedOffres, setSavedOffres] = useState<Set<number>>(new Set())
  const [showDepotForm, setShowDepotForm] = useState(false)
  const [depotSent, setDepotSent] = useState(false)

  const toggleSave = (id: number) => setSavedOffres(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })

  const filtered = OFFRES.filter(o => {
    if (typeFilter !== 'Tous' && o.type !== typeFilter) return false
    if (metierFilter !== 'Tous' && o.metier !== metierFilter) return false
    if (searchQ && !o.poste.toLowerCase().includes(searchQ.toLowerCase()) &&
        !o.entreprise.toLowerCase().includes(searchQ.toLowerCase()) &&
        !o.ville.toLowerCase().includes(searchQ.toLowerCase())) return false
    return true
  })

  const pill = (label: string, active: boolean, onClick: () => void, color?: string) => (
    <button onClick={onClick} style={{
      background: active ? (color || 'var(--color-gold)') : 'var(--color-surface-2)',
      border: '1px solid ' + (active ? 'transparent' : 'var(--color-border)'),
      borderRadius: 20, padding: '7px 16px',
      color: active ? (color ? '#fff' : '#1a1408') : 'var(--color-text-dim)',
      fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer',
      transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
      fontFamily: 'var(--font-body)',
    }}>{label}</button>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 60px' }}>
      {selectedOffre && <OffreModal offre={selectedOffre} onClose={() => setSelectedOffre(null)} />}

      {/* Depot offre modal */}
      {showDepotForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setShowDepotForm(false)}>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-warm)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 520, position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDepotForm(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-muted)' }}><X /></button>
            {depotSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(110,231,183,0.1)', border: '2px solid #6ee7b7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6ee7b7' }}><Check /></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 8 }}>Offre soumise</div>
                <p style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7 }}>Votre offre sera publiée après vérification par notre équipe (24h).</p>
                <button onClick={() => { setShowDepotForm(false); setDepotSent(false) }} style={{ marginTop: 16, background: 'var(--color-gold)', border: 'none', borderRadius: 20, padding: '10px 28px', color: '#1a1408', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Fermer</button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 24 }}>Déposer une offre d'emploi</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { label: 'Intitulé du poste', ph: 'Ex. Chef Pâtissier, Chocolatier…' },
                    { label: 'Entreprise', ph: 'Nom de votre établissement' },
                    { label: 'Ville', ph: 'Paris, Lyon…' },
                    { label: 'Contact RH', ph: 'rh@maison.fr' },
                  ].map(({ label, ph }) => (
                    <div key={label}>
                      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{label}</label>
                      <input placeholder={ph} style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border-warm)', borderRadius: 10, padding: '11px 14px', color: 'var(--color-text)', fontSize: 14, fontFamily: 'var(--font-body)' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description du poste</label>
                    <textarea rows={4} placeholder="Missions, profil recherché, conditions…" style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border-warm)', borderRadius: 10, padding: '11px 14px', color: 'var(--color-text)', fontSize: 14, fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.6 }} />
                  </div>
                  <button onClick={() => setDepotSent(true)} style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 12, padding: '13px 0', color: '#1a1408', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Soumettre l'offre</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, gap: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Espace Pro</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-dim)', margin: 0 }}>{filtered.length} offre{filtered.length > 1 ? 's' : ''} · Métiers de bouche</p>
        </div>
        <button onClick={() => setShowDepotForm(true)} style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 12, padding: '11px 22px', color: '#1a1408', fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          + Déposer une offre
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Poste, entreprise, ville…" style={{ width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border-warm)', borderRadius: 14, padding: '14px 16px 14px 48px', color: 'var(--color-text)', fontSize: 15, fontFamily: 'var(--font-body)' }} />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Type de contrat</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TYPES.map(t => pill(t, typeFilter === t, () => setTypeFilter(t)))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Métier</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {METIERS_FILTER.map(m => pill(m, metierFilter === m, () => setMetierFilter(m)))}
          </div>
        </div>
      </div>

      {/* Offres list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(o => (
          <div key={o.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '20px 22px', display: 'flex', gap: 18, alignItems: 'flex-start', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onClick={() => setSelectedOffre(o)}>

            <img src={o.logo} alt={o.entreprise} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text)' }}>{o.poste}</span>
                    {o.urgent && <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.4)', color: '#fb923c', borderRadius: 20, padding: '2px 10px' }}>Urgent</span>}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-dim)' }}>{o.entreprise}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
                  <button onClick={e => { e.stopPropagation(); toggleSave(o.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: savedOffres.has(o.id) ? 'var(--color-gold)' : 'var(--color-muted)', padding: 4 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={savedOffres.has(o.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', background: `rgba(${o.type === 'CDI' ? '110,231,183' : '196,181,253'},0.1)`, border: `1px solid rgba(${o.type === 'CDI' ? '110,231,183' : '196,181,253'},0.3)`, color: BADGE_COLORS[o.type], borderRadius: 20, padding: '3px 12px' }}>{o.type}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                {[{ icon: <MapPin />, t: o.ville }, { icon: <Euro />, t: o.salaire }, { icon: <Clock />, t: o.exp }, { icon: null, t: o.posted }].map(({ icon, t }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--color-text-dim)' }}>
                    {icon && <span style={{ color: 'var(--color-gold)' }}>{icon}</span>}
                    {!icon && <span style={{ color: 'var(--color-muted)' }}>·</span>}
                    {t}
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {o.desc}
              </p>
            </div>

            <button onClick={e => { e.stopPropagation(); setSelectedOffre(o) }} style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 10, padding: '10px 20px', color: '#1a1408', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', alignSelf: 'center', flexShrink: 0 }}>
              Postuler
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-muted)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', marginBottom: 8 }}>Aucune offre</div>
            <div style={{ fontSize: 14 }}>Essayez d'élargir vos critères</div>
          </div>
        )}
      </div>
    </div>
  )
}
