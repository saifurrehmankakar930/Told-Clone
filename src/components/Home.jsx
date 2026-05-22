import PostCard from './PostCard.jsx'

export default function Home({ posts, allTags, activeTag, onTagClick, onPostClick, onNewPost, search }) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Hero */}
      <div style={{
        marginBottom: 48,
        animation: 'fadeUp 0.5s ease both'
      }}>
        <p style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: 'var(--ink)',
          maxWidth: 600
        }}>
          Stories worth<br />
          <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>reading slowly.</em>
        </p>
        <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 16, maxWidth: 400 }}>
          A place for long-form writing, personal essays, and ideas that take time.
        </p>
      </div>

      {/* Tag filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 40,
        animation: 'fadeUp 0.5s ease 0.1s both'
      }}>
        <button
          onClick={() => onTagClick(null)}
          style={tagStyle(!activeTag)}
        >All</button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            style={tagStyle(activeTag === tag)}
          >{tag}</button>
        ))}
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          color: 'var(--muted)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 8, color: 'var(--ink)' }}>
            {search ? `No results for "${search}"` : 'No posts yet'}
          </p>
          <p style={{ fontSize: 14, marginBottom: 24 }}>
            {search ? 'Try a different search term.' : 'Be the first to share a story.'}
          </p>
          {!search && (
            <button onClick={onNewPost} style={{
              background: 'var(--ink)', color: 'var(--paper)',
              border: 'none', borderRadius: 8,
              padding: '10px 24px', fontWeight: 600, cursor: 'pointer'
            }}>Write something</button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 28
        }}>
          {posts.map((post, i) => (
            <div key={post.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}>
              <PostCard post={post} onClick={() => onPostClick(post)} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

function tagStyle(active) {
  return {
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'var(--paper)' : 'var(--muted)',
    border: `1.5px solid ${active ? 'var(--ink)' : 'var(--border)'}`,
    borderRadius: 20,
    padding: '5px 14px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
}
