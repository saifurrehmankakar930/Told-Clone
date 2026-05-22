import { useState } from 'react'

export default function PostDetail({ post, onBack, onEdit, onDelete, onLike, onTagClick }) {
  const [liked, setLiked] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const handleLike = () => {
    if (!liked) { setLiked(true); onLike() }
  }

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} style={{
          fontFamily: 'var(--serif)',
          fontSize: 22,
          fontWeight: 700,
          marginTop: 32,
          marginBottom: 12,
          color: 'var(--ink)'
        }}>{line.slice(2, -2)}</h3>
      }
      if (line.trim() === '') return <div key={i} style={{ height: 12 }} />
      return <p key={i} style={{
        fontSize: 18,
        lineHeight: 1.8,
        color: '#2a2010',
        marginBottom: 4
      }}>{line}</p>
    })
  }

  return (
    <main style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Header band */}
      <div style={{
        background: post.coverColor,
        padding: '48px 24px 80px'
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 32,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            ← Back
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {post.tags.map(tag => (
              <button key={tag} onClick={() => onTagClick(tag)} style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: 20,
                padding: '4px 12px',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}>{tag}</button>
            ))}
          </div>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#fff',
            marginBottom: 24
          }}>{post.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(255,255,255,0.8)' }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff'
            }}>{post.avatar}</div>
            <div>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{post.author}</div>
              <div style={{ fontSize: 13 }}>{date} · {post.readTime} min read</div>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{
        maxWidth: 720,
        margin: '-40px auto 0',
        padding: '0 24px 80px'
      }}>
        <div style={{
          background: 'var(--paper)',
          borderRadius: 16,
          padding: 'clamp(28px, 5vw, 56px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
          border: '1px solid var(--border)'
        }}>
          {/* Excerpt / lead */}
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 20,
            lineHeight: 1.7,
            color: 'var(--muted)',
            fontStyle: 'italic',
            borderLeft: '3px solid var(--amber)',
            paddingLeft: 20,
            marginBottom: 36
          }}>{post.excerpt}</p>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 36 }}>
            {renderContent(post.content)}
          </div>

          {/* Actions bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 48,
            paddingTop: 28,
            borderTop: '1px solid var(--border)'
          }}>
            {/* Like */}
            <button onClick={handleLike} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: liked ? '#fff0f0' : 'var(--cream)',
              border: `1.5px solid ${liked ? '#fbbcbc' : 'var(--border)'}`,
              borderRadius: 30,
              padding: '10px 20px',
              color: liked ? 'var(--red)' : 'var(--muted)',
              fontWeight: 600, fontSize: 14, cursor: liked ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: 18 }}>{liked ? '♥' : '♡'}</span>
              {post.likes} {liked ? 'Liked!' : 'Likes'}
            </button>

            {/* Edit / Delete */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={onEdit} style={{
                background: 'var(--ink)', border: 'none',
                borderRadius: 8, padding: '10px 20px',
                color: 'var(--paper)', fontWeight: 600, fontSize: 14
              }}>Edit Post</button>

              {!confirmDelete ? (
                <button onClick={() => setConfirmDelete(true)} style={{
                  background: 'none',
                  border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '10px 16px',
                  color: 'var(--muted)', fontWeight: 600, fontSize: 14
                }}>Delete</button>
              ) : (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Sure?</span>
                  <button onClick={onDelete} style={{
                    background: 'var(--red)', border: 'none',
                    borderRadius: 8, padding: '10px 16px',
                    color: '#fff', fontWeight: 600, fontSize: 14
                  }}>Yes, delete</button>
                  <button onClick={() => setConfirmDelete(false)} style={{
                    background: 'none', border: '1.5px solid var(--border)',
                    borderRadius: 8, padding: '10px 12px',
                    color: 'var(--muted)', fontWeight: 600, fontSize: 14
                  }}>No</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
