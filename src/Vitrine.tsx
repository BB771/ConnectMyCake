import { useState } from 'react'

/* ─── Data ── */

const ARTISAN = {
  name: 'Claire Blanc',
  handle: 'claire.b',
  title: 'Cheffe Pâtissière',
  subtitle: 'Maison Blanc — Paris 8e',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format',
  banner: 'https://images.unsplash.com/photo-1726950189914-8fe1016eb9c7?w=1200&h=400&fit=crop&auto=format',
  badge: 'Meilleur Ouvrier de France',
  badgeYear: '2021',
  founded: '2014',
  bio: `Formée à l'École Ferrandi Paris puis auprès de Pierre Hermé pendant cinq ans, j'ai ouvert Maison Blanc en 2014 avec une seule conviction : la pâtisserie est un art vivant, à la croisée de la technique rigoureuse et de la générosité sensible.

Mon approche est résolument saisonnière. Je travaille avec des producteurs locaux d'Île-de-France et de Bourgogne pour garantir des produits au sommet de leur maturité. Chaque création naît d'une matière première exceptionnelle, jamais d'un concept.

Récompensée Meilleur Ouvrier de France en 2021, je continue de transmettre mon savoir-faire à travers des ateliers mensuels ouverts au public et aux professionnels.`,
  followers: '3.8K',
  following: 241,
  posts: 124,
  rating: 4.9,
  reviewCount: 312,
}

const GALLERY = [
  {
    id: 1,
    title: 'Tarte Infiniment Vanille',
    category: 'Tartes',
    image: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=600&h=700&fit=crop&auto=format',
    likes: 1284,
    span: 'tall',
  },
  {
    id: 2,
    title: 'Millefeuille Caramel Beurre Salé',
    category: 'Classiques',
    image: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=600&h=400&fit=crop&auto=format',
    likes: 892,
    span: 'normal',
  },
  {
    id: 3,
    title: 'Entremets Yuzu & Sésame',
    category: 'Entremets',
    image: 'https://images.unsplash.com/photo-1660383534593-6b5221ab80d2?w=600&h=500&fit=crop&auto=format',
    likes: 2103,
    span: 'normal',
  },
  {
    id: 4,
    title: 'Vitrine Automne 2026',
    category: 'Collections',
    image: 'https://images.unsplash.com/photo-1726950189914-8fe1016eb9c7?w=600&h=800&fit=crop&auto=format',
    likes: 3401,
    span: 'tall',
  },
  {
    id: 5,
    title: 'Éclairs Chocolat Grand Cru',
    category: 'Classiques',
    image: 'https://images.unsplash.com/photo-1506818068936-be94c01f9dbd?w=600&h=420&fit=crop&auto=format',
    likes: 754,
    span: 'normal',
  },
  {
    id: 6,
    title: 'Fraisier de Printemps',
    category: 'Saison',
    image: 'https://images.unsplash.com/photo-1705933774160-24298027a349?w=600&h=480&fit=crop&auto=format',
    likes: 1897,
    span: 'normal',
  },
  {
    id: 7,
    title: 'Atelier Laminage',
    category: 'Coulisses',
    image: 'https://images.unsplash.com/photo-1652283321082-72bb2b601abd?w=600&h=900&fit=crop&auto=format',
    likes: 432,
    span: 'tall',
  },
  {
    id: 8,
    title: 'Collection Chocolat Noir',
    category: 'Chocolats',
    image: 'https://images.unsplash.com/photo-1617455559710-8eb55a9dfb54?w=600&h=460&fit=crop&auto=format',
    likes: 1643,
    span: 'normal',
  },
  {
    id: 9,
    title: 'Paris-Brest Noisette Torréfiée',
    category: 'Classiques',
    image: 'https://images.unsplash.com/photo-1739132124985-6c9277e268b5?w=600&h=500&fit=crop&auto=format',
    likes: 987,
    span: 'normal',
  },
]

const SPECIALTIES = [
  {
    label: 'Entremets modernes',
    desc: 'Architectures de saveurs en plusieurs textures — mousse, crémeux, gélifié, croustillant.',
    icon: '◈',
  },
  {
    label: 'Pâtisserie de saison',
    desc: 'Collections renouvelées chaque trimestre selon les arrivages des producteurs partenaires.',
    icon: '◉',
  },
  {
    label: 'Chocolaterie fine',
    desc: 'Travail du chocolat bean-to-bar et des grands crus Valrhona, Cluizel et Bonnat.',
    icon: '◆',
  },
  {
    label: 'Pièces montées sur mesure',
    desc: 'Création personnalisée pour mariages, événements d\'entreprise et occasions privées.',
    icon: '◇',
  },
  {
    label: 'Ateliers & transmission',
    desc: 'Cours mensuels pour amateurs passionnés et sessions de perfectionnement pour professionnels.',
    icon: '◎',
  },
  {
    label: 'Consultation R&D',
    desc: 'Accompagnement de restaurants étoilés dans la création de leur carte des desserts.',
    icon: '◐',
  },
]

const CERTIFICATIONS = [
  { name: 'Meilleur Ouvrier de France', year: '2021' },
  { name: 'Finaliste Coupe du Monde Pâtisserie', year: '2019' },
  { name: 'École Ferrandi Paris — Diplôme Excellence', year: '2008' },
  { name: 'Stage Pierre Hermé Paris', year: '2009–2014' },
  { name: 'Formateur agréé CFA Paris', year: 'depuis 2018' },
]

const HOURS = [
  { day: 'Lundi', h: 'Fermé' },
  { day: 'Mardi', h: '8h30 – 19h30' },
  { day: 'Mercredi', h: '8h30 – 19h30' },
  { day: 'Jeudi', h: '8h30 – 19h30' },
  { day: 'Vendredi', h: '8h30 – 20h00' },
  { day: 'Samedi', h: '8h00 – 20h00' },
  { day: 'Dimanche', h: '8h00 – 14h00' },
]

const TODAY_IDX = new Date().getDay() // 0=Sun
const DAY_MAP = [6, 0, 1, 2, 3, 4, 5] // JS getDay() to our array idx

const REVIEWS = [
  {
    id: 1,
    name: 'Margaux L.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    date: 'Septembre 2026',
    text: 'J\'ai commandé la pièce montée pour notre mariage. Claire a réussi à retranscrire exactement notre vision avec une précision et une élégance remarquables. Nos invités en parlent encore.',
    tag: 'Pièce montée sur mesure',
  },
  {
    id: 2,
    name: 'Thomas R.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    date: 'Août 2026',
    text: 'Atelier millefeuille exceptionnel. La pédagogie est bienveillante, les tours de mains transmis avec générosité. J\'ai pu reproduire chez moi dès le lendemain.',
    tag: 'Atelier pâtisserie',
  },
  {
    id: 3,
    name: 'Isabelle M.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&auto=format',
    rating: 5,
    date: 'Juillet 2026',
    text: 'L\'entremets yuzu-sésame est une révélation. L\'équilibre des saveurs est parfait, la texture aérienne. C\'est la meilleure pâtisserie de Paris, sans hésitation.',
    tag: 'Entremets',
  },
  {
    id: 4,
    name: 'Julien F.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format',
    rating: 4,
    date: 'Juin 2026',
    text: 'Qualité constante, produits d\'une fraîcheur irréprochable. La file d\'attente le samedi matin vaut largement la peine. Le café servi en boutique est un bonus bienvenu.',
    tag: 'Vitrine boutique',
  },
]

const CATS = ['Toutes', 'Tartes', 'Entremets', 'Classiques', 'Chocolats', 'Collections', 'Saison', 'Coulisses']

/* ─── Icons ── */

const Icon = {
  Star: ({ filled = true, size = 14 }: { filled?: boolean; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Heart: ({ filled }: { filled: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.86-.86a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Clock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Award: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Bookmark: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
}

/* ─── Sub-components ── */

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, color: 'var(--color-gold)' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Icon.Star key={i} filled={i <= rating} size={size} />
      ))}
    </div>
  )
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<'contact' | 'commande'>('contact')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', occasion: '', date: '', guests: '' })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--color-surface-2)',
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
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-warm)',
        borderRadius: 20, padding: 32,
        width: '100%', maxWidth: 520,
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 18, right: 18,
          background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
          borderRadius: '50%', width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--color-muted)',
        }}><Icon.X /></button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(201,169,110,0.15)', border: '2px solid var(--color-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: 'var(--color-gold)',
            }}><Icon.Check /></div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 10 }}>Message envoyé</div>
            <p style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7 }}>
              Claire vous répondra sous 24 heures. Merci de votre intérêt pour Maison Blanc.
            </p>
            <button onClick={onClose} style={{
              marginTop: 24, background: 'var(--color-gold)', border: 'none',
              borderRadius: 20, padding: '10px 28px', color: '#1a1408',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>Fermer</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', fontWeight: 400, color: 'var(--color-text)', marginBottom: 4 }}>
                Contacter Maison Blanc
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>Claire Blanc · Cheffe Pâtissière</div>
            </div>

            {/* Type toggle */}
            <div style={{ display: 'flex', background: 'var(--color-surface-2)', borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
              {(['contact', 'commande'] as const).map(t => (
                <button key={t} onClick={() => setType(t)} style={{
                  flex: 1, background: type === t ? 'var(--color-gold)' : 'none',
                  border: 'none', borderRadius: 9, padding: '9px 0',
                  color: type === t ? '#1a1408' : 'var(--color-muted)',
                  fontWeight: type === t ? 700 : 400, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                  {t === 'contact' ? 'Message simple' : 'Demande de commande'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Nom</label>
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

              {type === 'commande' && (
                <>
                  <div>
                    <label style={labelStyle}>Occasion</label>
                    <select value={form.occasion} onChange={e => update('occasion', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                      <option value="">Choisir une occasion…</option>
                      <option>Mariage</option>
                      <option>Anniversaire</option>
                      <option>Événement d'entreprise</option>
                      <option>Baptême / communion</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Date souhaitée</label>
                      <input value={form.date} onChange={e => update('date', e.target.value)} type="date" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Nombre de convives</label>
                      <input value={form.guests} onChange={e => update('guests', e.target.value)} placeholder="Ex. 80" style={inputStyle} />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label style={labelStyle}>{type === 'commande' ? 'Détails & inspirations' : 'Message'}</label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  placeholder={type === 'commande' ? 'Décrivez vos envies, couleurs, saveurs préférées…' : 'Votre message…'}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <button
                onClick={() => setSent(true)}
                style={{
                  background: 'var(--color-gold)', border: 'none',
                  borderRadius: 12, padding: '13px 0',
                  color: '#1a1408', fontWeight: 700, fontSize: 15,
                  cursor: 'pointer', width: '100%',
                  letterSpacing: '0.01em', marginTop: 4,
                }}
              >
                {type === 'commande' ? 'Envoyer ma demande de commande' : 'Envoyer le message'}
              </button>

              <p style={{ fontSize: 11, color: 'var(--color-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                Réponse sous 24h · Devis gratuit et sans engagement
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Main component ── */

export default function Vitrine({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'galerie' | 'apropos' | 'boutique' | 'avis'>('galerie')
  const [activeCat, setActiveCat] = useState('Toutes')
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [showContact, setShowContact] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [expandBio, setExpandBio] = useState(false)

  const filteredGallery = activeCat === 'Toutes'
    ? GALLERY
    : GALLERY.filter(g => g.category === activeCat)

  const toggleLike = (id: number) => setLikedItems(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })

  const todayHours = HOURS[DAY_MAP[TODAY_IDX]]
  const isOpen = todayHours.h !== 'Fermé'

  const tabs = [
    { key: 'galerie', label: 'Créations' },
    { key: 'apropos', label: 'À propos' },
    { key: 'boutique', label: 'Boutique' },
    { key: 'avis', label: `Avis (${ARTISAN.reviewCount})` },
  ] as const

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}

      {/* ── Back nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11,10,9,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 58,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'var(--color-text-dim)', fontSize: 13, fontFamily: 'var(--font-body)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Fil
        </button>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', fontWeight: 300, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
          {ARTISAN.subtitle}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-dim)' }}>
            <Icon.Share />
          </button>
          <button style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-dim)' }}>
            <Icon.Bookmark />
          </button>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', background: '#111' }}>
        <img
          src={ARTISAN.banner}
          alt="Maison Blanc vitrine"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 20%, rgba(11,10,9,0.6) 60%, var(--color-bg) 100%)',
        }} />

        {/* MOF ribbon */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(11,10,9,0.75)', backdropFilter: 'blur(8px)',
          border: '1px solid var(--color-gold)',
          borderRadius: 20, padding: '5px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          color: 'var(--color-gold)',
        }}>
          <Icon.Award />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em' }}>MOF {ARTISAN.badgeYear}</span>
        </div>
      </div>

      {/* ── Profile info ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -52 }}>
          <div style={{ position: 'relative' }}>
            <img src={ARTISAN.avatar} alt={ARTISAN.name} style={{
              width: 96, height: 96, borderRadius: '50%', objectFit: 'cover',
              border: '4px solid var(--color-bg)', display: 'block',
            }} />
            <div style={{
              position: 'absolute', bottom: 2, right: 2,
              background: 'var(--color-gold)', borderRadius: '50%',
              width: 22, height: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid var(--color-bg)', color: '#1a1408',
            }}>
              <Icon.Star size={11} />
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
            <button
              onClick={() => setFollowed(f => !f)}
              style={{
                background: followed ? 'var(--color-surface-2)' : 'transparent',
                border: '1.5px solid ' + (followed ? 'var(--color-border-warm)' : 'var(--color-gold)'),
                borderRadius: 22, padding: '9px 20px',
                color: followed ? 'var(--color-muted)' : 'var(--color-gold)',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {followed ? 'Abonné·e' : 'Suivre'}
            </button>
            <button
              onClick={() => setShowContact(true)}
              style={{
                background: 'var(--color-gold)', border: 'none',
                borderRadius: 22, padding: '9px 22px',
                color: '#1a1408', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', letterSpacing: '0.01em',
              }}
            >
              Contacter / Commander
            </button>
          </div>
        </div>

        {/* Name & stats */}
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            {ARTISAN.name}
          </h1>
          <div style={{ fontSize: 14, color: 'var(--color-text-dim)', marginBottom: 8 }}>{ARTISAN.title} · {ARTISAN.subtitle}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <Stars rating={5} size={14} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-gold)', fontWeight: 500 }}>{ARTISAN.rating}</span>
            <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>({ARTISAN.reviewCount} avis)</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-border-warm)', display: 'inline-block', margin: '0 4px' }} />
            <Icon.MapPin />
            <span style={{ fontSize: 13, color: 'var(--color-muted)' }}>Paris 8e</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-border-warm)', display: 'inline-block', margin: '0 4px' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: isOpen ? '#6ee7b7' : 'var(--color-like)', background: isOpen ? 'rgba(110,231,183,0.1)' : 'rgba(224,112,112,0.1)', borderRadius: 10, padding: '2px 10px' }}>
              {isOpen ? 'Ouvert' : 'Fermé'} · {todayHours.h}
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 28 }}>
            {[[ARTISAN.posts.toString(), 'créations'], [ARTISAN.followers, 'abonnés'], [ARTISAN.following.toString(), 'suivis'], [ARTISAN.founded, 'depuis']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: 'var(--color-text)' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: 32, gap: 0 }}>
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 22px',
                color: activeTab === key ? 'var(--color-gold)' : 'var(--color-muted)',
                fontWeight: activeTab === key ? 600 : 400,
                fontSize: 14, fontFamily: 'var(--font-body)',
                borderBottom: '2px solid ' + (activeTab === key ? 'var(--color-gold)' : 'transparent'),
                marginBottom: -1,
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab: Galerie ── */}
        {activeTab === 'galerie' && (
          <>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {CATS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    background: activeCat === cat ? 'var(--color-gold)' : 'var(--color-surface-2)',
                    border: '1px solid ' + (activeCat === cat ? 'transparent' : 'var(--color-border)'),
                    borderRadius: 20, padding: '6px 16px',
                    color: activeCat === cat ? '#1a1408' : 'var(--color-text-dim)',
                    fontSize: 13, fontWeight: activeCat === cat ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.15s',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry grid */}
            <div style={{
              columns: '3 280px', columnGap: 16,
              paddingBottom: 60,
            }}>
              {filteredGallery.map(item => (
                <div
                  key={item.id}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: 16,
                    borderRadius: 14,
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#111',
                    cursor: 'pointer',
                    border: '1px solid var(--color-border)',
                  }}
                  className="gallery-item"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end', padding: 14,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-gold)', opacity: 0.9, marginBottom: 4, letterSpacing: '0.06em' }}>
                          {item.category}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{item.title}</div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleLike(item.id) }}
                        style={{
                          background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 20,
                          padding: '6px 10px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 5,
                          color: likedItems.has(item.id) ? 'var(--color-like)' : 'rgba(255,255,255,0.8)',
                          transition: 'color 0.15s',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <Icon.Heart filled={likedItems.has(item.id)} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                          {(item.likes + (likedItems.has(item.id) ? 1 : 0)).toLocaleString('fr-FR')}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Tab: À propos ── */}
        {activeTab === 'apropos' && (
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 40, paddingBottom: 60 }}>
            <div>
              {/* Bio */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Biographie</div>
                <div style={{ fontSize: 15, color: 'var(--color-text)', lineHeight: 1.85, position: 'relative' }}>
                  {expandBio
                    ? ARTISAN.bio.split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 16px' }}>{p}</p>)
                    : <p style={{ margin: 0 }}>{ARTISAN.bio.split('\n\n')[0]}</p>}
                  {!expandBio && (
                    <button
                      onClick={() => setExpandBio(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: 13, cursor: 'pointer', padding: '8px 0 0', display: 'block', fontFamily: 'var(--font-body)' }}
                    >
                      Lire la suite →
                    </button>
                  )}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Spécialités & savoir-faire</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {SPECIALTIES.map(s => (
                    <div key={s.label} style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 14, padding: '18px 20px',
                    }}>
                      <div style={{ fontSize: 20, color: 'var(--color-gold)', marginBottom: 10, fontFamily: 'monospace' }}>{s.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-dim)', lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Parcours & distinctions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {CERTIFICATIONS.map((c, i) => (
                  <div key={c.name} style={{
                    display: 'flex', gap: 16, padding: '16px 0',
                    borderBottom: i < CERTIFICATIONS.length - 1 ? '1px solid var(--color-border)' : 'none',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }}><Icon.Award /></div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4 }}>{c.name}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', marginTop: 3 }}>{c.year}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ marginTop: 32 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Réseaux & site web</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: <Icon.Instagram />, label: '@maison.blanc.paris', href: '#' },
                    { icon: <Icon.Globe />, label: 'maison-blanc.fr', href: '#' },
                    { icon: <Icon.Mail />, label: 'contact@maison-blanc.fr', href: '#' },
                  ].map(({ icon, label, href }) => (
                    <a key={label} href={href} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      color: 'var(--color-text-dim)', fontSize: 13,
                      textDecoration: 'none', padding: '8px 14px',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 10,
                    }}>
                      <span style={{ color: 'var(--color-gold)' }}>{icon}</span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Boutique ── */}
        {activeTab === 'boutique' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, paddingBottom: 60 }}>
            {/* Map placeholder */}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--color-border)',
                height: 220,
                background: 'var(--color-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1628565836616-96eabd510740?w=1000&h=400&fit=crop&auto=format"
                  alt="Maison Blanc devanture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
                  <div style={{ color: 'var(--color-gold)', background: 'rgba(11,10,9,0.75)', backdropFilter: 'blur(8px)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.MapPin />
                  </div>
                  <div style={{ background: 'rgba(11,10,9,0.8)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '8px 20px', border: '1px solid var(--color-border-warm)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text)' }}>24 rue du Faubourg Saint-Honoré, Paris 8e</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Coordonnées</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <Icon.MapPin />, label: 'Adresse', value: '24 rue du Faubourg Saint-Honoré\n75008 Paris' },
                  { icon: <Icon.Phone />, label: 'Téléphone', value: '+33 1 42 65 18 47' },
                  { icon: <Icon.Mail />, label: 'Email', value: 'contact@maison-blanc.fr' },
                  { icon: <Icon.Globe />, label: 'Site web', value: 'maison-blanc.fr' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 14, color: 'var(--color-text)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowContact(true)} style={{
                marginTop: 24, width: '100%',
                background: 'var(--color-gold)', border: 'none',
                borderRadius: 12, padding: '12px 0',
                color: '#1a1408', fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
              }}>
                Prendre contact
              </button>
            </div>

            {/* Hours */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Horaires</div>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: isOpen ? '#6ee7b7' : 'var(--color-like)',
                  background: isOpen ? 'rgba(110,231,183,0.1)' : 'rgba(224,112,112,0.1)',
                  borderRadius: 10, padding: '3px 10px',
                }}>
                  {isOpen ? '● Ouvert' : '● Fermé'}
                </span>
              </div>
              {HOURS.map((h, i) => {
                const isToday = DAY_MAP[TODAY_IDX] === i
                return (
                  <div key={h.day} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                    background: isToday ? 'rgba(201,169,110,0.1)' : 'none',
                    border: isToday ? '1px solid rgba(201,169,110,0.2)' : '1px solid transparent',
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: isToday ? 600 : 400,
                      color: isToday ? 'var(--color-gold)' : 'var(--color-text-dim)',
                    }}>{h.day}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 12,
                      color: h.h === 'Fermé' ? 'var(--color-muted)' : (isToday ? 'var(--color-gold)' : 'var(--color-text)'),
                    }}>{h.h}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Tab: Avis ── */}
        {activeTab === 'avis' && (
          <div style={{ paddingBottom: 60 }}>
            {/* Rating summary */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16, padding: 28,
              display: 'flex', alignItems: 'center', gap: 40,
              marginBottom: 32,
            }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1 }}>{ARTISAN.rating}</div>
                <div style={{ margin: '8px 0 4px' }}><Stars rating={5} size={16} /></div>
                <div style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{ARTISAN.reviewCount} avis</div>
              </div>

              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map(n => {
                  const pct = n === 5 ? 82 : n === 4 ? 13 : n === 3 ? 4 : n === 2 ? 1 : 0
                  return (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-muted)', width: 12, textAlign: 'right' }}>{n}</span>
                      <Icon.Star size={11} />
                      <div style={{ flex: 1, height: 6, background: 'var(--color-surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-gold)', borderRadius: 3, transition: 'width 0.6s ease' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)', width: 28 }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>

              <button onClick={() => setShowContact(true)} style={{
                background: 'transparent', border: '1.5px solid var(--color-gold)',
                borderRadius: 12, padding: '12px 22px',
                color: 'var(--color-gold)', fontWeight: 600, fontSize: 13,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                Laisser un avis
              </button>
            </div>

            {/* Reviews */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {REVIEWS.map(r => (
                <div key={r.id} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 16, padding: 22,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={r.avatar} alt={r.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{r.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', marginTop: 2 }}>{r.date}</div>
                      </div>
                    </div>
                    <Stars rating={r.rating} size={13} />
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.75, margin: '0 0 14px' }}>{r.text}</p>

                  <span style={{
                    fontSize: 11, fontFamily: 'var(--font-mono)',
                    color: 'var(--color-gold)', background: 'rgba(201,169,110,0.08)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    borderRadius: 20, padding: '3px 12px',
                  }}>{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
