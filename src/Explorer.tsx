import { useState } from 'react'

const METIERS = ['Tous', 'Pâtissier', 'Chocolatier', 'Glacier', 'Boulanger', 'Confiseur', 'Traiteur sucré']
const VILLES = ['Toutes', 'Paris', 'Lyon', 'Bordeaux', 'Marseille', 'Nantes', 'Strasbourg', 'Toulouse', 'Lille']
const TRIS = ['Pertinence', 'Mieux notés', 'Les plus suivis', 'Récents']

const ARTISANS = [
  {
    id: 1,
    name: 'Claire Blanc',
    handle: 'claire.b',
    metier: 'Pâtissier',
    title: 'Cheffe Pâtissière',
    location: 'Paris 8e',
    ville: 'Paris',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=600&h=300&fit=crop&auto=format',
    rating: 4.9,
    reviews: 312,
    followers: '3.8K',
    badge: 'MOF 2021',
    specs: ['Entremets', 'Tarte', 'Saison'],
    open: true,
  },
  {
    id: 2,
    name: 'Marc Roux',
    handle: 'marc.r',
    metier: 'Pâtissier',
    title: 'Chef Pâtissier',
    location: 'Bordeaux',
    ville: 'Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1617455559710-8eb55a9dfb54?w=600&h=300&fit=crop&auto=format',
    rating: 4.8,
    reviews: 204,
    followers: '5.2K',
    badge: 'Finaliste MOF',
    specs: ['Chocolat', 'Entremets', 'Desserts étoilés'],
    open: true,
  },
  {
    id: 3,
    name: 'Elena Duval',
    handle: 'elena.d',
    metier: 'Pâtissier',
    title: 'Artisane Pâtissière',
    location: 'Strasbourg',
    ville: 'Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=600&h=300&fit=crop&auto=format',
    rating: 4.7,
    reviews: 189,
    followers: '2.1K',
    badge: null,
    specs: ['Éclairs', 'Millefeuilles', 'Vitrine'],
    open: false,
  },
  {
    id: 4,
    name: 'Paul Vidal',
    handle: 'paul.v',
    metier: 'Chocolatier',
    title: 'Chocolatier-Confiseur',
    location: 'Nantes',
    ville: 'Nantes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1766734974600-b6ea9a40a03a?w=600&h=300&fit=crop&auto=format',
    rating: 4.9,
    reviews: 147,
    followers: '1.9K',
    badge: 'Valrhona Expert',
    specs: ['Bean-to-bar', 'Pralinés', 'Confiserie'],
    open: true,
  },
  {
    id: 5,
    name: 'Camille Fournier',
    handle: 'camille.f',
    metier: 'Glacier',
    title: 'Maître Glacier',
    location: 'Annecy',
    ville: 'Lyon',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1705933774160-24298027a349?w=600&h=300&fit=crop&auto=format',
    rating: 4.8,
    reviews: 98,
    followers: '1.2K',
    badge: null,
    specs: ['Sorbets', 'Glaces artisanales', 'Pièces glacées'],
    open: true,
  },
  {
    id: 6,
    name: 'Thomas Levy',
    handle: 'thomas.levy',
    metier: 'Pâtissier',
    title: 'Chef Pâtissier',
    location: 'Paris 6e',
    ville: 'Paris',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1660383534593-6b5221ab80d2?w=600&h=300&fit=crop&auto=format',
    rating: 4.6,
    reviews: 76,
    followers: '980',
    badge: null,
    specs: ['Macarons', 'Viennoiseries', 'Pièces montées'],
    open: false,
  },
  {
    id: 7,
    name: 'Ines Garnier',
    handle: 'ines.g',
    metier: 'Chocolatier',
    title: 'Chocolatière',
    location: 'Toulouse',
    ville: 'Toulouse',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1739132124985-6c9277e268b5?w=600&h=300&fit=crop&auto=format',
    rating: 4.7,
    reviews: 112,
    followers: '1.5K',
    badge: null,
    specs: ['Ganaches', 'Tablettes', 'Bonbons'],
    open: true,
  },
  {
    id: 8,
    name: 'Romain Estève',
    handle: 'romain.e',
    metier: 'Boulanger',
    title: 'Boulanger-Pâtissier',
    location: 'Lyon',
    ville: 'Lyon',
    avatar: 'https://images.unsplash.com/photo-1628565836616-96eabd510740?w=200&h=200&fit=crop&auto=format',
    cover: 'https://images.unsplash.com/photo-1683223063461-5d5a35bef2a2?w=600&h=300&fit=crop&auto=format',
    rating: 4.5,
    reviews: 221,
    followers: '2.7K',
    badge: null,
    specs: ['Pain au levain', 'Viennoiseries', 'Tartes'],
    open: true,
  },
]

function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function MapPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  )
}

export default function Explorer({ onOpenVitrine }: { onOpenVitrine: () => void }) {
  const [query, setQuery] = useState('')
  const [metier, setMetier] = useState('Tous')
  const [ville, setVille] = useState('Toutes')
  const [tri, setTri] = useState('Pertinence')
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [onlyBadge, setOnlyBadge] = useState(false)
  const [followed, setFollowed] = useState<Set<number>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const toggleFollow = (id: number) => setFollowed(prev => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
  })

  const results = ARTISANS.filter(a => {
    if (query && !a.name.toLowerCase().includes(query.toLowerCase()) &&
        !a.specs.join(' ').toLowerCase().includes(query.toLowerCase()) &&
        !a.title.toLowerCase().includes(query.toLowerCase())) return false
    if (metier !== 'Tous' && a.metier !== metier) return false
    if (ville !== 'Toutes' && a.ville !== ville) return false
    if (onlyOpen && !a.open) return false
    if (onlyBadge && !a.badge) return false
    return true
  }).sort((a, b) => {
    if (tri === 'Mieux notés') return b.rating - a.rating
    if (tri === 'Les plus suivis') return parseFloat(b.followers) - parseFloat(a.followers)
    return 0
  })

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} style={{
      background: active ? 'var(--color-gold)' : 'var(--color-surface-2)',
      border: '1px solid ' + (active ? 'transparent' : 'var(--color-border)'),
      borderRadius: 20, padding: '7px 16px',
      color: active ? '#1a1408' : 'var(--color-text-dim)',
      fontSize: 13, fontWeight: active ? 600 : 400,
      cursor: 'pointer', transition: 'all 0.15s',
      whiteSpace: 'nowrap' as const, fontFamily: 'var(--font-body)',
    }}>{label}</button>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 60px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Explorer les artisans
        </h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-dim)', margin: 0 }}>
          {results.length} artisan{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }}>
          <SearchIcon />
        </div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Nom, spécialité, technique…"
          style={{
            width: '100%', background: 'var(--color-surface)',
            border: '1px solid var(--color-border-warm)',
            borderRadius: 14, padding: '14px 52px 14px 48px',
            color: 'var(--color-text)', fontSize: 15,
            fontFamily: 'var(--font-body)',
          }}
        />
        <button
          onClick={() => setShowFilters(f => !f)}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: showFilters ? 'var(--color-gold)' : 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
            color: showFilters ? '#1a1408' : 'var(--color-text-dim)',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
          }}
        >
          <FilterIcon /> Filtres
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 16, padding: 24, marginBottom: 24,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Métier</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {METIERS.map(m => pill(m, metier === m, () => setMetier(m)))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Ville</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {VILLES.map(v => pill(v, ville === v, () => setVille(v)))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Options</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={onlyOpen} onChange={e => setOnlyOpen(e.target.checked)} style={{ accentColor: 'var(--color-gold)' }} />
                  <span style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>Ouvert maintenant</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={onlyBadge} onChange={e => setOnlyBadge(e.target.checked)} style={{ accentColor: 'var(--color-gold)' }} />
                  <span style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>Distinctions (MOF, concours…)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort & quick-filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {METIERS.filter(m => m !== 'Tous').map(m => pill(m, metier === m, () => setMetier(metier === m ? 'Tous' : m)))}
        </div>
        <div style={{ display: 'flex', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
          {TRIS.map(t => (
            <button key={t} onClick={() => setTri(t)} style={{
              background: tri === t ? 'var(--color-surface-2)' : 'none',
              border: 'none', padding: '8px 14px',
              color: tri === t ? 'var(--color-gold)' : 'var(--color-muted)',
              fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
              fontWeight: tri === t ? 600 : 400,
              borderRight: '1px solid var(--color-border)',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-muted)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', marginBottom: 8 }}>Aucun résultat</div>
          <div style={{ fontSize: 14 }}>Essayez d'élargir vos critères de recherche</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {results.map(a => (
            <div key={a.id} style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 18, overflow: 'hidden',
              transition: 'border-color 0.15s',
            }}>
              {/* Cover + avatar */}
              <div style={{ position: 'relative', height: 130, background: '#111', cursor: 'pointer' }} onClick={onOpenVitrine}>
                <img src={a.cover} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

                {a.badge && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    background: 'rgba(11,10,9,0.8)', backdropFilter: 'blur(6px)',
                    border: '1px solid var(--color-gold)', borderRadius: 20,
                    padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--color-gold)',
                  }}>{a.badge}</div>
                )}

                <div style={{
                  position: 'absolute', bottom: -24, left: 16,
                  border: '3px solid var(--color-surface)', borderRadius: '50%',
                }}>
                  <img src={a.avatar} alt={a.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>

              <div style={{ padding: '32px 18px 18px' }}>
                {/* Name + status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div
                      onClick={onOpenVitrine}
                      style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text)', cursor: 'pointer', marginBottom: 2 }}
                    >{a.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>{a.title}</div>
                  </div>
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    color: a.open ? '#6ee7b7' : 'var(--color-muted)',
                    background: a.open ? 'rgba(110,231,183,0.1)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid ' + (a.open ? 'rgba(110,231,183,0.3)' : 'var(--color-border)'),
                    borderRadius: 10, padding: '3px 9px', whiteSpace: 'nowrap', marginTop: 2,
                  }}>{a.open ? '● Ouvert' : '● Fermé'}</span>
                </div>

                {/* Location + rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-muted)' }}>
                    <MapPin />
                    <span style={{ fontSize: 12 }}>{a.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-gold)' }}>
                    <StarIcon />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text)' }}>{a.rating}</span>
                    <span style={{ fontSize: 11, color: 'var(--color-muted)' }}>({a.reviews})</span>
                  </div>
                </div>

                {/* Specs */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {a.specs.map(s => (
                    <span key={s} style={{
                      fontSize: 11, fontFamily: 'var(--font-mono)',
                      color: 'var(--color-gold)', background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.2)',
                      borderRadius: 20, padding: '3px 10px',
                    }}>{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => toggleFollow(a.id)}
                    style={{
                      flex: 1, background: followed.has(a.id) ? 'var(--color-surface-2)' : 'transparent',
                      border: '1.5px solid ' + (followed.has(a.id) ? 'var(--color-border)' : 'var(--color-gold)'),
                      borderRadius: 10, padding: '9px 0',
                      color: followed.has(a.id) ? 'var(--color-muted)' : 'var(--color-gold)',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {followed.has(a.id) ? 'Abonné·e' : 'Suivre'}
                  </button>
                  <button
                    onClick={onOpenVitrine}
                    style={{
                      flex: 2, background: 'var(--color-gold)', border: 'none',
                      borderRadius: 10, padding: '9px 0',
                      color: '#1a1408', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    Voir la vitrine
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
