import { useState } from 'react'

export default function Header({ view, onHome, onNewPost, search, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header style={{
      background: 'var(--ink)',
      borderBottom: '2px solid var(--amber)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      animation: 'slideDown 0.4s ease'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Logo */}
        <button onClick={onHome} style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          cursor: 'pointer'
        }}>
          <span style={{
            fontFamily: 'var(--serif)',
            fontSize: 26,
            fontWeight: 900,
            color: 'var(--paper)',
            letterSpacing: '-0.5px',
            fontStyle: 'italic'
          }}>Blogging App</span>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--amber)',
            display: 'inline-block',
            marginBottom: 2
          }} />
        </button>

        {/* Center nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' }}>
          {searchOpen || view === 'home' ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '6px 14px',
              maxWidth: 360,
              width: '100%',
              gap: 8,
              animation: 'fadeIn 0.2s ease'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="Search stories…"
                autoFocus={searchOpen}
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: 'var(--paper)', fontSize: 14, width: '100%',
                  '::placeholder': { color: 'rgba(255,255,255,0.3)' }
                }}
              />
              {search && (
                <button onClick={() => onSearch('')} style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                  fontSize: 16, padding: 0, lineHeight: 1
                }}>×</button>
              )}
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {view === 'home' ? null : (
            <button onClick={() => { setSearchOpen(s => !s) }} style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '7px 10px',
              color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s'
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          )}
          <button onClick={onNewPost} style={{
            background: 'var(--amber)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            color: 'var(--ink)',
            fontWeight: 600,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Post
          </button>
        </div>
      </div>
    </header>
  )
}
