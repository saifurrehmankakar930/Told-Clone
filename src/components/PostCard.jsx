export default function PostCard({ post, onClick }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  return (
    <article
      onClick={onClick}
      style={{
        background: 'var(--paper)',
        border: '1.5px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--amber)'
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Color band */}
      <div style={{
        height: 6,
        background: `linear-gradient(90deg, ${post.coverColor}, ${post.coverColor}88)`
      }} />

      <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--amber)',
              background: '#c8863a14',
              padding: '3px 8px',
              borderRadius: 4
            }}>{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--ink)',
          marginBottom: 10,
          flex: 1
        }}>{post.title}</h2>

        {/* Excerpt */}
        <p style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: 'var(--muted)',
          marginBottom: 20,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>{post.excerpt}</p>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: post.coverColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              color: '#fff'
            }}>{post.avatar}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{post.author}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{date}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {post.readTime} min read
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
              ♥ {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
