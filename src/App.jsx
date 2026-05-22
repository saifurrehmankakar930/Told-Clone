import { useState } from 'react';
import Nav from './components/Nav.jsx';
import PostCard from './components/PostCard.jsx';
import Editor from './components/Editor.jsx';
import PostView from './components/PostView.jsx';
import { ACCENT_COLORS, SEED_POSTS } from './data.js';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [view, setView] = useState('feed'); // 'feed' | 'editor' | 'post'
  const [selectedId, setSelectedId] = useState(null);

  const goFeed = () => { setView('feed'); setSelectedId(null); };
  const goEditor = () => setView('editor');
  const openPost = (id) => { setSelectedId(id); setView('post'); };

  const publish = ({ title, tag, body }) => {
    const nextIndex = posts.length % ACCENT_COLORS.length;
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      tag: tag.trim() || 'general',
      body: body.trim(),
      date: new Date().toISOString().slice(0, 10),
      accentIndex: nextIndex,
    };
    setPosts([newPost, ...posts]);
    goFeed();
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    goFeed();
  };

  const selectedPost = posts.find((p) => p.id === selectedId);

  return (
    <div className="app">
      <Nav onHome={goFeed} onWrite={goEditor} view={view} />

      <main className="main">
        {view === 'feed' && (
          <FeedView posts={posts} onOpen={openPost} onWrite={goEditor} />
        )}
        {view === 'editor' && (
          <Editor onPublish={publish} onCancel={goFeed} />
        )}
        {view === 'post' && selectedPost && (
          <PostView post={selectedPost} onBack={goFeed} onDelete={deletePost} />
        )}
        {view === 'post' && !selectedPost && (
          <div className="empty">
            <p>Post not found.</p>
            <button className="btn-solid" onClick={goFeed}>← Back to feed</button>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>BOLD © {new Date().getFullYear()}</span>
        <span>Built loud. Built fast.</span>
      </footer>
    </div>
  );
}

function FeedView({ posts, onOpen, onWrite }) {
  if (posts.length === 0) {
    return (
      <div className="empty">
        <h2 className="empty-title">Nothing here yet.</h2>
        <p className="empty-sub">The page is blank. The cursor is blinking. Go.</p>
        <button className="btn-solid btn-lg" onClick={onWrite}>Write the first post →</button>
      </div>
    );
  }
  return (
    <>
      <header className="feed-head">
        <h1 className="feed-title">The Feed.</h1>
        <p className="feed-sub">{posts.length} {posts.length === 1 ? 'post' : 'posts'} published. No fluff.</p>
      </header>
      <section className="grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onOpen={() => onOpen(p.id)} />
        ))}
      </section>
    </>
  );
}
