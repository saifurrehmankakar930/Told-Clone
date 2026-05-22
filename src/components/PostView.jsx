import { ACCENT_COLORS } from '../data.js';

export default function PostView({ post, onBack, onDelete }) {
  const color = ACCENT_COLORS[post.accentIndex % ACCENT_COLORS.length];

  return (
    <article className="post-view">
      <span className="back-link" onClick={onBack}>← Back</span>
      <div className="accent-bar" style={{ background: color }} />
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <span className="tag-pill" style={{ background: color, color: '#000' }}>{post.tag}</span>
        <span className="date">{post.date}</span>
      </div>
      <div className="post-body">{post.body}</div>
      <div className="post-actions">
        <button
          className="btn-danger"
          onClick={() => {
            if (confirm('Delete this post? This cannot be undone.')) onDelete(post.id);
          }}
        >
          Delete post
        </button>
      </div>
    </article>
  );
}
