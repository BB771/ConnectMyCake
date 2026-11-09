import { useState } from 'react'
import Vitrine from './Vitrine'
import Explorer from './Explorer'
import Messagerie from './Messagerie'
import Admin from './Admin'

/* ─── Data ─────────────────────────────────────────────────── */

const ME = {
  name: 'Sophie Marchand',
  handle: 'sophie.patissiere',
  avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format',
  title: 'Cheffe Pâtissière',
  location: 'Lyon, France',
  badge: 'Meilleur Ouvrier',
  posts: 87,
  followers: '2.4K',
  following: 194,
}

const STORIES = [
  { id: 1, user: 'claire.b', name: 'Claire Blanc', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format', active: true },
  { id: 2, user: 'marc.r', name: 'Marc Roux', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format', active: true },
  { id: 3, user: 'elena.d', name: 'Elena Duval', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format', active: false },
  { id: 4, user: 'paul.v', name: 'Paul Vidal', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format', active: true },
  { id: 5, user: 'nadia.m', name: 'Nadia M.', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&auto=format', active: false },
]

const POSTS = [
  {
    id: 1,
    user: 'claire.b',
    displayName: 'Claire Blanc',
    title: 'Pâtissière — Maison Blanc, Paris 8e',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format',
    verified: true,
    time: '1h',
    caption: 'Nouvelle création pour la carte automne : tarte aux poires pochées au vin de Bourgogne, crème d\'amande légère et éclats de pralin. Une saison, une couleur.',
    image: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=700&h=480&fit=crop&auto=format',
    tags: ['#TarteAutomnale', '#PatisserieCreative', '#FaitMaison'],
    likes: 841,
    comments: 34,
    liked: false,
    saved: false,
    spec: 'Tarte · Fruits d\'automne',
  },
  {
    id: 2,
    user: 'marc.r',
    displayName: 'Marc Roux',
    title: 'Chef Pâtissier — Hôtel Le Grand, Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format',
    verified: true,
    time: '3h',
    caption: 'Six mois de R&D pour ce dessert : sphère de chocolat Valrhona 72%, cœur coulant yuzu, sol de biscuit au charbon. Le noir, le jaune, la surprise. Disponible à la carte dès vendredi.',
    image: 'https://images.unsplash.com/photo-1617455559710-8eb55a9dfb54?w=700&h=460&fit=crop&auto=format',
    tags: ['#Chocolat', '#Valrhona', '#DesignCulinaire', '#Gastronomie'],
    likes: 2103,
    comments: 79,
    liked: true,
    saved: true,
    spec: 'Entremets · Chocolat & Agrumes',
  },
  {
    id: 3,
    user: 'elena.d',
    displayName: 'Elena Duval',
    title: 'Artisane — Pâtisserie Duval, Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format',
    verified: false,
    time: '6h',
    caption: 'Samedi vitrine chargée 🍰 Nos éclairs signature, les millefeuilles vanille-caramel beurre salé, et les nouvelles tartelettes figues-romarin. Boulangerie ouverte à 7h30.',
    image: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=700&h=500&fit=crop&auto=format',
    tags: ['#Vitrine', '#PatisserieFrancaise', '#ArtisanPatissier'],
    likes: 1487,
    comments: 52,
    liked: false,
    saved: false,
    spec: 'Éclairs · Millefeuilles · Tartelettes',
  },
  {
    id: 4,
    user: 'paul.v',
    displayName: 'Paul Vidal',
    title: 'Chocolatier-Confiseur — Atelier Vidal, Nantes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    verified: true,
    time: '11h',
    caption: 'Retour de formation à l\'École du Grand Chocolat Valrhona. Deux jours d\'immersion sur les textures et les températures. L\'artisanat n\'a pas fini de m\'apprendre.',
    image: 'https://images.unsplash.com/photo-1766734974600-b6ea9a40a03a?w=700&h=440&fit=crop&auto=format',
    tags: ['#Chocolatier', '#Formation', '#Valrhona', '#Artisan'],
    likes: 634,
    comments: 28,
    liked: false,
    saved: false,
    spec: 'Chocolaterie fine · Confiserie',
  },
]

const COMMENTS_DB: Record<number, { user: string; avatar: string; text: string }[]> = {
  1: [
    { user: 'marc.r', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&auto=format', text: 'Les couleurs sont superbes. Quel vin as-tu utilisé pour le pochage ?' },
    { user: 'elena.d', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&auto=format', text: 'Magnifique travail Claire 👏' },
  ],
  2: [
    { user: 'claire.b', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format', text: 'L\'idée du sol en charbon est brillante. Tu publies la recette ?' },
    { user: 'paul.v', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format', text: 'Ce cœur coulant yuzu me hante depuis hier.' },
  ],
  3: [
    { user: 'marc.r', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&auto=format', text: 'Cette vitrine donne faim à 7h du matin.' },
  ],
  4: [
    { user: 'elena.d', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&auto=format', text: 'Tu reviens avec quelles nouvelles techniques ?' },
    { user: 'claire.b', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format', text: 'Valrhona c\'est une autre dimension 🍫' },
  ],
}

const TRENDING = [
  { tag: '#PatisserieCreative', posts: '18.4K publications' },
  { tag: '#ChocolatValrhona', posts: '12.1K publications' },
  { tag: '#VitrinePatissier', posts: '9.7K publications' },
  { tag: '#EntremetsModerne', posts: '7.3K publications' },
  { tag: '#ArtisanBouche', posts: '5.9K publications' },
  { tag: '#ConcoursMOF', posts: '4.2K publications' },
]

const SUGGESTIONS = [
  {
    name: 'Camille Fournier',
    handle: 'camille.f',
    title: 'Glacier-Confiseur',
    location: 'Annecy',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&auto=format',
    mutual: 5,
  },
  {
    name: 'Thomas Levy',
    handle: 'thomas.levy',
    title: 'Chef Pâtissier',
    location: 'Paris 6e',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    mutual: 8,
  },
  {
    name: 'Ines Garnier',
    handle: 'ines.g',
    title: 'Chocolatière',
    location: 'Toulouse',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
    mutual: 3,
  },
]

const EVENTS = [
  { name: 'Salon du Chocolat', date: '28–31 oct.', city: 'Paris' },
  { name: 'Concours MOF 2026', date: '14 nov.', city: 'Lyon' },
  { name: 'World Pastry Cup', date: '23 jan.', city: 'Sirha' },
]

/* ─── Icons ─────────────────────────────────────────────────── */

const Icon = {
  Heart: ({ filled }: { filled: boolean }) => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Comment: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Share: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Bookmark: ({ filled }: { filled: boolean }) => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Home: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Search: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Bell: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  More: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
    </svg>
  ),
  Pin: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Star: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
}

/* ─── Post card ─────────────────────────────────────────────── */

function PostCard({ post, onLike, onSave, onOpenVitrine }: {
  post: typeof POSTS[0]
  onLike: (id: number) => void
  onSave: (id: number) => void
  onOpenVitrine?: () => void
}) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [localComments, setLocalComments] = useState(COMMENTS_DB[post.id] || [])

  const submit = () => {
    if (!newComment.trim()) return
    setLocalComments(prev => [
      ...prev,
      { user: ME.handle, avatar: ME.avatar, text: newComment },
    ])
    setNewComment('')
  }

  return (
    <article style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 18,
      overflow: 'hidden',
      marginBottom: 22,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={post.avatar} alt={post.user} onClick={onOpenVitrine} style={{
              width: 46, height: 46, borderRadius: '50%', objectFit: 'cover',
              border: '2px solid var(--color-gold)', padding: 2,
              background: 'var(--color-surface-2)',
              cursor: 'pointer',
            }} />
            {post.verified && (
              <div style={{
                position: 'absolute', bottom: -1, right: -1,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--color-surface)',
              }}>
                <Icon.Star />
              </div>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span onClick={onOpenVitrine} style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text)', cursor: 'pointer' }}>{post.displayName}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 1 }}>{post.title}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)' }}>{post.time}</div>
          <button style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}>
            <Icon.More />
          </button>
        </div>
      </div>

      {/* Specialty pill */}
      <div style={{ padding: '0 20px 12px' }}>
        <span style={{
          display: 'inline-block',
          background: 'var(--color-surface-3)',
          border: '1px solid var(--color-border-warm)',
          borderRadius: 20, padding: '3px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--color-gold)',
          letterSpacing: '0.03em',
        }}>{post.spec}</span>
      </div>

      {/* Image */}
      <div style={{ background: '#0f0d0b', minHeight: 260 }}>
        <img
          src={post.image}
          alt={post.caption.slice(0, 60)}
          style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 440 }}
        />
      </div>

      {/* Caption */}
      <div style={{ padding: '16px 20px 4px' }}>
        <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.7, color: 'var(--color-text)' }}>
          {post.caption}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {post.tags.map(t => (
            <span key={t} style={{ fontSize: 12, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', cursor: 'pointer', opacity: 0.8 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 20px 16px', gap: 20, borderTop: '1px solid var(--color-border)' }}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
            color: post.liked ? 'var(--color-like)' : 'var(--color-muted)',
            transition: 'color 0.15s', padding: '10px 0',
          }}
        >
          <Icon.Heart filled={post.liked} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500 }}>
            {(post.likes + (post.liked ? 1 : 0)).toLocaleString('fr-FR')}
          </span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
            color: showComments ? 'var(--color-gold)' : 'var(--color-muted)',
            transition: 'color 0.15s', padding: '10px 0',
          }}
        >
          <Icon.Comment />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{localComments.length}</span>
        </button>

        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', padding: '10px 0', transition: 'color 0.15s' }}>
          <Icon.Share />
        </button>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => onSave(post.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: post.saved ? 'var(--color-gold)' : 'var(--color-muted)',
            transition: 'color 0.15s', padding: '10px 0',
          }}
        >
          <Icon.Bookmark filled={post.saved} />
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ borderTop: '1px solid var(--color-border)', padding: '16px 20px' }}>
          {localComments.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
              <img src={c.avatar} alt={c.user} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ background: 'var(--color-surface-2)', borderRadius: 12, padding: '8px 14px', flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--color-gold)', marginRight: 8 }}>{c.user}</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>{c.text}</span>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 10 }}>
            <img src={ME.avatar} alt={ME.handle} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Votre commentaire…"
              style={{
                flex: 1, background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-warm)',
                borderRadius: 24, padding: '9px 16px',
                color: 'var(--color-text)', fontSize: 13,
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>
        </div>
      )}
    </article>
  )
}

/* ─── App ───────────────────────────────────────────────────── */

function MsgIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function NavBar({ activeNav, setActiveNav, onShowVitrine, onShowAdmin }: {
  activeNav: string
  setActiveNav: (v: string) => void
  onShowVitrine: () => void
  onShowAdmin?: () => void
}) {
  const navItems = [
    { key: 'home', icon: <Icon.Home />, label: 'Fil' },
    { key: 'search', icon: <Icon.Search />, label: 'Explorer' },
    { key: 'messages', icon: <MsgIcon />, label: 'Messages' },
    { key: 'notifs', icon: <Icon.Bell />, label: 'Alertes' },
  ]
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(11,10,9,0.88)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 62,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, cursor: 'pointer' }} onClick={() => setActiveNav('home')}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-gold-light)', letterSpacing: '-0.03em' }}>Mielle</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: 2 }}>Métiers de bouche</span>
      </div>
      <nav style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: 40, padding: '4px 6px', gap: 2 }}>
        {navItems.map(({ key, icon, label }) => (
          <button key={key} onClick={() => setActiveNav(key)} style={{
            background: activeNav === key ? 'var(--color-surface-3)' : 'none',
            border: 'none', cursor: 'pointer',
            color: activeNav === key ? 'var(--color-gold)' : 'var(--color-muted)',
            borderRadius: 32, padding: '8px 16px',
            transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 13, fontWeight: activeNav === key ? 600 : 400,
            fontFamily: 'var(--font-body)',
          }} title={label}>
            {icon}
          </button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 22, padding: '8px 18px', color: '#1a1408', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon.Plus /> Publier
        </button>
        <div style={{ position: 'relative' }}>
          <img src={ME.avatar} alt={ME.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: '2px solid var(--color-gold)', padding: 2, background: 'var(--color-surface-2)' }} onClick={onShowVitrine} />
          {onShowAdmin && (
            <button onClick={onShowAdmin} title="Administration" style={{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', border: '2px solid var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const [posts, setPosts] = useState(POSTS)
  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const [activeNav, setActiveNav] = useState('home')
  const [searchQ, setSearchQ] = useState('')
  const [showVitrine, setShowVitrine] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  if (showAdmin) return <Admin onBack={() => setShowAdmin(false)} />
  if (showVitrine) return <Vitrine onBack={() => setShowVitrine(false)} />
  if (activeNav === 'search') return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} onShowVitrine={() => setShowVitrine(true)} onShowAdmin={() => setShowAdmin(true)} />
      <Explorer onOpenVitrine={() => setShowVitrine(true)} />
    </div>
  )
  if (activeNav === 'messages') return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} onShowVitrine={() => setShowVitrine(true)} onShowAdmin={() => setShowAdmin(true)} />
      <Messagerie />
    </div>
  )

  const toggleLike = (id: number) => setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p))
  const toggleSave = (id: number) => setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p))
  const toggleFollow = (handle: string) => setFollowed(prev => {
    const s = new Set(prev); s.has(handle) ? s.delete(handle) : s.add(handle); return s
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} onShowVitrine={() => setShowVitrine(true)} onShowAdmin={() => setShowAdmin(true)} />

      {/* ── Body ── */}
      <div style={{
        maxWidth: 1140, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 310px',
        gap: 28, padding: '28px 20px',
      }}>
        {/* ── Feed ── */}
        <main>
          {/* Stories */}
          <section style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 18, padding: '18px 22px',
            marginBottom: 26,
          }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Actualités du jour
            </div>
            <div style={{ display: 'flex', gap: 22, overflowX: 'auto', paddingBottom: 4 }}>
              {/* Own story */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, flexShrink: 0, cursor: 'pointer' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  border: '1.5px dashed var(--color-border-warm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-gold)', background: 'var(--color-surface-2)',
                }}>
                  <Icon.Plus />
                </div>
                <span style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center', whiteSpace: 'nowrap' }}>Ma vitrine</span>
              </div>

              {STORIES.map(s => (
                <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, flexShrink: 0, cursor: 'pointer' }}>
                  <div style={{
                    padding: 3, borderRadius: '50%',
                    background: s.active
                      ? 'linear-gradient(135deg, #c9a96e, #e8c98a, #c9a96e)'
                      : 'var(--color-border)',
                  }}>
                    <img src={s.avatar} alt={s.name} style={{
                      width: 52, height: 52, borderRadius: '50%', objectFit: 'cover',
                      display: 'block', border: '2px solid var(--color-surface)',
                    }} />
                  </div>
                  <span style={{ fontSize: 10, color: s.active ? 'var(--color-text)' : 'var(--color-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {s.user}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Posts */}
          {posts.map(post => (
            <PostCard key={post.id} post={post} onLike={toggleLike} onSave={toggleSave} onOpenVitrine={() => setShowVitrine(true)} />
          ))}
        </main>

        {/* ── Sidebar ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* My profile / vitrine card */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 18, overflow: 'hidden',
          }}>
            {/* Banner */}
            <div style={{
              height: 72,
              background: 'linear-gradient(135deg, #2a1f0a 0%, #1a1208 50%, #0f0d0b 100%)',
              borderBottom: '1px solid var(--color-border)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(201,169,110,0.15) 0%, transparent 60%)' }} />
            </div>

            <div style={{ padding: '0 20px 20px', marginTop: -28 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ position: 'relative' }}>
                  <img src={ME.avatar} alt={ME.name} style={{
                    width: 56, height: 56, borderRadius: '50%', objectFit: 'cover',
                    border: '3px solid var(--color-surface)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    background: 'var(--color-gold)', borderRadius: '50%',
                    width: 18, height: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid var(--color-surface)',
                  }}>
                    <Icon.Star />
                  </div>
                </div>
                <button style={{
                  background: 'none', border: '1px solid var(--color-border-warm)',
                  borderRadius: 20, padding: '5px 14px',
                  color: 'var(--color-gold)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>
                  Ma vitrine
                </button>
              </div>

              <div style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text)' }}>{ME.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginTop: 2 }}>{ME.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                  <Icon.Pin />
                  <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{ME.location}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-border-warm)', display: 'inline-block', margin: '0 2px' }} />
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    color: 'var(--color-gold)', border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: 10, padding: '1px 7px',
                  }}>{ME.badge}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 14 }}>
                {[[ME.posts.toString(), 'créations'], [ME.followers, 'abonnés'], [ME.following.toString(), 'suivis']].map(([n, l]) => (
                  <div key={l} style={{ background: 'var(--color-surface-2)', borderRadius: 10, padding: '10px 6px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--color-text)' }}>{n}</div>
                    <div style={{ fontSize: 10, color: 'var(--color-muted)', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }}>
              <Icon.Search />
            </div>
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Chercher un artisan, une spécialité…"
              style={{
                width: '100%', background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 24, padding: '11px 16px 11px 42px',
                color: 'var(--color-text)', fontSize: 13,
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          {/* Trending */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 18, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 16 }}>
              Tendances
            </div>
            {TRENDING.map((t, i) => (
              <div key={t.tag} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0', cursor: 'pointer',
                borderBottom: i < TRENDING.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <span style={{ fontSize: 13, color: 'var(--color-gold)', fontFamily: 'var(--font-mono)' }}>{t.tag}</span>
                <span style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{t.posts}</span>
              </div>
            ))}
          </div>

          {/* Events */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 18, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 16 }}>
              Événements
            </div>
            {EVENTS.map((e, i) => (
              <div key={e.name} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                borderBottom: i < EVENTS.length - 1 ? '1px solid var(--color-border)' : 'none',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-border-warm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-gold)', flexShrink: 0,
                }}>
                  <Icon.Calendar />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{e.date} · {e.city}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 18, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text)', marginBottom: 16 }}>
              Artisans à suivre
            </div>
            {/* Quick vitrine shortcut */}
          <button
            onClick={() => setShowVitrine(true)}
            style={{
              width: '100%', background: 'none',
              border: '1px solid var(--color-border-warm)',
              borderRadius: 10, padding: '10px 14px',
              color: 'var(--color-gold)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 14, fontFamily: 'var(--font-body)',
            }}
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&auto=format" alt="Claire" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
            Voir la vitrine de Claire Blanc →
          </button>
          {SUGGESTIONS.map((s, i) => (
              <div key={s.handle} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingBottom: i < SUGGESTIONS.length - 1 ? 14 : 0,
                marginBottom: i < SUGGESTIONS.length - 1 ? 14 : 0,
                borderBottom: i < SUGGESTIONS.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <img src={s.avatar} alt={s.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-dim)', marginTop: 1 }}>{s.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Icon.Pin />
                    <span style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{s.location}</span>
                    <span style={{ fontSize: 10, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>· {s.mutual} contacts communs</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(s.handle)}
                  style={{
                    background: followed.has(s.handle) ? 'var(--color-surface-3)' : 'var(--color-gold)',
                    border: '1px solid ' + (followed.has(s.handle) ? 'var(--color-border-warm)' : 'transparent'),
                    borderRadius: 20, padding: '5px 14px',
                    color: followed.has(s.handle) ? 'var(--color-muted)' : '#1a1408',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  {followed.has(s.handle) ? 'Abonné·e' : 'Suivre'}
                </button>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 10, color: 'var(--color-muted)', lineHeight: 2, fontFamily: 'var(--font-mono)', paddingLeft: 4 }}>
            À propos · Aide · Confidentialité<br />
            Conditions d'utilisation · CGV<br />
            © 2026 Mielle — Réseau des Métiers de Bouche
          </div>
        </aside>
      </div>
    </div>
  )
}
