import { useState, useRef, useEffect } from 'react'

const CONTACTS = [
  {
    id: 1,
    name: 'Marc Roux',
    handle: 'marc.r',
    title: 'Chef Pâtissier · Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format',
    online: true,
    unread: 2,
    lastMsg: 'Oui, je peux vous envoyer la fiche technique demain.',
    lastTime: '10:42',
  },
  {
    id: 2,
    name: 'Elena Duval',
    handle: 'elena.d',
    title: 'Artisane · Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format',
    online: false,
    unread: 0,
    lastMsg: 'Merci pour les photos ! Très inspirant.',
    lastTime: 'Hier',
  },
  {
    id: 3,
    name: 'Paul Vidal',
    handle: 'paul.v',
    title: 'Chocolatier · Nantes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    online: true,
    unread: 0,
    lastMsg: 'La formation Valrhona était exceptionnelle.',
    lastTime: 'Lun',
  },
  {
    id: 4,
    name: 'Camille Fournier',
    handle: 'camille.f',
    title: 'Maître Glacier · Annecy',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&auto=format',
    online: false,
    unread: 1,
    lastMsg: 'Demande de devis envoyée — 3 parfums pour 200 couverts.',
    lastTime: 'Dim',
  },
  {
    id: 5,
    name: 'Thomas Levy',
    handle: 'thomas.levy',
    title: 'Chef Pâtissier · Paris 6e',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    online: false,
    unread: 0,
    lastMsg: 'D\'accord pour le partenariat. Je vous rappelle.',
    lastTime: '18 sep',
  },
]

type Msg = { id: number; from: 'me' | 'them'; text: string; time: string; type: 'text' | 'devis' }

const INITIAL_MESSAGES: Record<number, Msg[]> = {
  1: [
    { id: 1, from: 'them', text: 'Bonjour Sophie ! J\'ai vu votre tarte aux poires sur Mielle — superbe travail. Quel Bourgogne avez-vous utilisé pour le pochage ?', time: '10:15', type: 'text' },
    { id: 2, from: 'me', text: 'Merci Marc ! Un Chambolle-Musigny 2022, léger et parfumé. Il ne couvre pas la poire, au contraire.', time: '10:28', type: 'text' },
    { id: 3, from: 'them', text: 'Intéressant. Je travaille justement sur une tarte pommes-épices pour la carte d\'automne. On pourrait échanger nos fiches techniques ?', time: '10:39', type: 'text' },
    { id: 4, from: 'them', text: 'Oui, je peux vous envoyer la fiche technique demain.', time: '10:42', type: 'text' },
  ],
  2: [
    { id: 1, from: 'me', text: 'Elena ! Votre vitrine du samedi m\'a donné envie de traverser la France ce week-end.', time: 'Hier 14:20', type: 'text' },
    { id: 2, from: 'them', text: 'Haha ! Vous seriez les bienvenues. On a encore quelques éclairs au citron vert-basilic ce soir.', time: 'Hier 14:35', type: 'text' },
    { id: 3, from: 'me', text: 'J\'adore cette association. Merci pour les photos ! Très inspirant.', time: 'Hier 14:51', type: 'text' },
    { id: 4, from: 'them', text: 'Merci pour les photos ! Très inspirant.', time: 'Hier 15:02', type: 'text' },
  ],
  3: [
    { id: 1, from: 'them', text: 'Sophie, j\'ai assisté à la présentation Valrhona la semaine dernière. Votre nom a été cité comme référence pour les entremets modernes !', time: 'Lun 09:10', type: 'text' },
    { id: 2, from: 'me', text: 'Vraiment ? C\'est très touchant. Comment s\'est passée la formation ?', time: 'Lun 11:22', type: 'text' },
    { id: 3, from: 'them', text: 'La formation Valrhona était exceptionnelle.', time: 'Lun 11:35', type: 'text' },
  ],
  4: [
    { id: 1, from: 'them', text: 'Bonjour, je cherche un pâtissier pour un événement de 200 couverts en janvier. Seriez-vous disponible ?', time: 'Dim 16:00', type: 'devis' },
    { id: 2, from: 'them', text: 'Demande de devis envoyée — 3 parfums pour 200 couverts.', time: 'Dim 16:01', type: 'text' },
  ],
  5: [
    { id: 1, from: 'me', text: 'Thomas, j\'ai vu votre article sur les viennoiseries grand format. Bravo ! Avez-vous pensé à un atelier commun ?', time: '18 sep 17:30', type: 'text' },
    { id: 2, from: 'them', text: 'Avec plaisir ! Je travaille sur une idée de pop-up pâtisserie pour le printemps. Ça vous intéresse ?', time: '18 sep 18:05', type: 'text' },
    { id: 3, from: 'me', text: 'Absolument ! Appelons-nous la semaine prochaine ?', time: '18 sep 18:20', type: 'text' },
    { id: 4, from: 'them', text: 'D\'accord pour le partenariat. Je vous rappelle.', time: '18 sep 18:45', type: 'text' },
  ],
}

function SendIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}
function AttachIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
}
function DevisIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
}
function InfoIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
}

export default function Messagerie() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0])
  const [messages, setMessages] = useState<Record<number, Msg[]>>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [showDevisForm, setShowDevisForm] = useState(false)
  const [devisForm, setDevisForm] = useState({ occasion: '', date: '', guests: '', budget: '', details: '' })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeContact])

  const send = (text: string, type: 'text' | 'devis' = 'text') => {
    if (!text.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [
        ...(prev[activeContact.id] || []),
        { id: Date.now(), from: 'me', text, time, type },
      ],
    }))
    setInput('')

    // Simulate reply after 1.2s
    setTimeout(() => {
      const replies: Record<number, string> = {
        1: 'Bonne idée ! Je prépare ça et je vous envoie ça demain matin.',
        2: 'Avec plaisir ! Je vous transmets mes photos de préparation aussi.',
        3: 'Je vous tiens au courant dès que j\'ai les détails de la prochaine session.',
        4: 'Parfait, je reviens vers vous rapidement avec nos disponibilités.',
        5: 'Je bloque un créneau la semaine prochaine. On se retrouve ?',
      }
      setMessages(prev => ({
        ...prev,
        [activeContact.id]: [
          ...(prev[activeContact.id] || []),
          { id: Date.now() + 1, from: 'them', text: replies[activeContact.id] || 'Reçu, merci !', time, type: 'text' },
        ],
      }))
    }, 1200)
  }

  const sendDevis = () => {
    const summary = `Demande de devis — ${devisForm.occasion} · ${devisForm.guests} convives · ${devisForm.date}${devisForm.budget ? ` · Budget : ${devisForm.budget}` : ''}${devisForm.details ? `\n${devisForm.details}` : ''}`
    send(summary, 'devis')
    setShowDevisForm(false)
    setDevisForm({ occasion: '', date: '', guests: '', budget: '', details: '' })
  }

  const activeMessages = messages[activeContact.id] || []

  return (
    <div style={{ height: 'calc(100vh - 62px)', display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '20px 20px 0' }}>
      {/* Contacts list */}
      <div style={{
        width: 300, flexShrink: 0,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px 0 0 16px',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '18px 18px 12px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', fontWeight: 300, color: 'var(--color-text)', marginBottom: 12 }}>Messages</div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input placeholder="Rechercher…" style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 20, padding: '8px 12px 8px 34px', color: 'var(--color-text)', fontSize: 13, fontFamily: 'var(--font-body)' }} />
          </div>
        </div>

        {CONTACTS.map(c => (
          <div
            key={c.id}
            onClick={() => setActiveContact(c)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer',
              background: activeContact.id === c.id ? 'var(--color-surface-2)' : 'none',
              borderBottom: '1px solid var(--color-border)',
              transition: 'background 0.1s',
              borderLeft: activeContact.id === c.id ? '2px solid var(--color-gold)' : '2px solid transparent',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={c.avatar} alt={c.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
              {c.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#6ee7b7', border: '2px solid var(--color-surface)' }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontWeight: c.unread > 0 ? 700 : 500, fontSize: 14, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', flexShrink: 0, marginLeft: 6 }}>{c.lastTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: c.unread > 0 ? 'var(--color-text-dim)' : 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{c.lastMsg}</span>
                {c.unread > 0 && (
                  <span style={{ background: 'var(--color-gold)', color: '#1a1408', fontSize: 10, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 6, fontFamily: 'var(--font-mono)' }}>{c.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: 'none',
        borderRadius: '0 16px 16px 0',
        overflow: 'hidden',
      }}>
        {/* Chat header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <img src={activeContact.avatar} alt={activeContact.name} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} />
              {activeContact.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#6ee7b7', border: '2px solid var(--color-surface)' }} />}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text)' }}>{activeContact.name}</div>
              <div style={{ fontSize: 12, color: activeContact.online ? '#6ee7b7' : 'var(--color-muted)' }}>{activeContact.online ? 'En ligne' : activeContact.title}</div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: 4 }}><InfoIcon /></button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeMessages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-end' }}>
              {msg.from === 'them' && (
                <img src={activeContact.avatar} alt={activeContact.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ maxWidth: '68%' }}>
                {msg.type === 'devis' ? (
                  <div style={{
                    background: msg.from === 'me' ? 'rgba(201,169,110,0.12)' : 'var(--color-surface-2)',
                    border: '1px solid ' + (msg.from === 'me' ? 'rgba(201,169,110,0.35)' : 'var(--color-border)'),
                    borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '12px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: 'var(--color-gold)' }}>
                      <DevisIcon />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Demande de devis</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-dim)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{msg.text}</p>
                  </div>
                ) : (
                  <div style={{
                    background: msg.from === 'me' ? 'var(--color-gold)' : 'var(--color-surface-2)',
                    borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '10px 16px',
                  }}>
                    <p style={{ fontSize: 14, color: msg.from === 'me' ? '#1a1408' : 'var(--color-text)', margin: 0, lineHeight: 1.6 }}>{msg.text}</p>
                  </div>
                )}
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', marginTop: 4, textAlign: msg.from === 'me' ? 'right' : 'left', paddingLeft: msg.from === 'them' ? 4 : 0, paddingRight: msg.from === 'me' ? 4 : 0 }}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Devis form */}
        {showDevisForm && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Demande de devis</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[
                { k: 'occasion', ph: 'Occasion (mariage, gala…)' },
                { k: 'date', ph: 'Date (JJ/MM/AAAA)' },
                { k: 'guests', ph: 'Nombre de convives' },
              ].map(({ k, ph }) => (
                <input
                  key={k}
                  value={devisForm[k as keyof typeof devisForm]}
                  onChange={e => setDevisForm(f => ({ ...f, [k]: e.target.value }))}
                  placeholder={ph}
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 13, fontFamily: 'var(--font-body)' }}
                />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginBottom: 12 }}>
              <input
                value={devisForm.budget}
                onChange={e => setDevisForm(f => ({ ...f, budget: e.target.value }))}
                placeholder="Budget estimé (optionnel)"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 13, fontFamily: 'var(--font-body)' }}
              />
              <input
                value={devisForm.details}
                onChange={e => setDevisForm(f => ({ ...f, details: e.target.value }))}
                placeholder="Précisions (saveurs, thème, allergies…)"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px', color: 'var(--color-text)', fontSize: 13, fontFamily: 'var(--font-body)' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowDevisForm(false)} style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 16px', color: 'var(--color-muted)', fontSize: 13, cursor: 'pointer' }}>Annuler</button>
              <button onClick={sendDevis} style={{ background: 'var(--color-gold)', border: 'none', borderRadius: 8, padding: '8px 20px', color: '#1a1408', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Envoyer la demande</button>
            </div>
          </div>
        )}

        {/* Input bar */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
          <button
            onClick={() => setShowDevisForm(d => !d)}
            title="Demande de devis"
            style={{
              background: showDevisForm ? 'rgba(201,169,110,0.15)' : 'var(--color-surface-2)',
              border: '1px solid ' + (showDevisForm ? 'var(--color-gold)' : 'var(--color-border)'),
              borderRadius: 10, padding: '10px 12px', cursor: 'pointer',
              color: showDevisForm ? 'var(--color-gold)' : 'var(--color-muted)',
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
              transition: 'all 0.15s',
            }}
          >
            <DevisIcon /> Devis
          </button>
          <button style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '10px 12px', cursor: 'pointer', color: 'var(--color-muted)', display: 'flex' }}>
            <AttachIcon />
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder={`Message à ${activeContact.name.split(' ')[0]}…`}
            rows={1}
            style={{
              flex: 1, background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border-warm)',
              borderRadius: 12, padding: '10px 16px',
              color: 'var(--color-text)', fontSize: 14,
              fontFamily: 'var(--font-body)', resize: 'none',
              lineHeight: 1.5, maxHeight: 120, overflowY: 'auto',
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              background: input.trim() ? 'var(--color-gold)' : 'var(--color-surface-2)',
              border: 'none', borderRadius: 10, padding: '10px 14px',
              color: input.trim() ? '#1a1408' : 'var(--color-muted)',
              cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', transition: 'all 0.15s',
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
