import { ACCENT_COLORS } from '../data.js';

export default function PostCard({ post, onOpen }) {
  const color = ACCENT_COLORS[post.accentIndex % ACCENT_COLORS.length];
  const excerpt = post.body.length > 120 ? post.body.slice(0, 120).trimEnd() + '…' : post.body;

  return (
    <article className="card" style={{ borderLeftColor: color }} onClick={onOpen}>
      <div className="card-meta">
        <span className="tag-pill" style={{ background: color, color: '#000' }}>{post.tag}</span>
        <span className="date">{post.date}</span>
      </div>
      <h2 className="card-title">{post.title}</h2>
      <p className="card-excerpt">{excerpt}</p>
      <div className="card-foot">
        <span className="read-link" style={{ borderBottomColor: color }}>Read →</span>
      </div>
    </article>
  );
}
