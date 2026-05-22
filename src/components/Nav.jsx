export default function Nav({ onHome, onWrite, view }) {
  return (
    <nav className="nav" style={navStyle}>
      <button onClick={onHome} style={logoStyle} aria-label="Home">
        BOLD<span style={{ color: '#FF4D4D' }}>.</span>
      </button>
      <div style={{ display: 'flex', gap: 12 }}>
        {view !== 'feed' && (
          <button className="btn-ghost" onClick={onHome}>Feed</button>
        )}
        {view !== 'editor' && (
          <button className="btn-solid" onClick={onWrite}>+ Write</button>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 20,
  borderBottom: '3px solid #000',
};

const logoStyle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 900,
  fontSize: 32,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  letterSpacing: '-0.02em',
};
