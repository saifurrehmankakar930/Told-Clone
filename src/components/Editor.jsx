import { useState } from 'react';

export default function Editor({ onPublish, onCancel }) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [body, setBody] = useState('');

  const canPublish = title.trim().length > 0 && body.trim().length > 0;

  const handlePublish = () => {
    if (!canPublish) return;
    onPublish({ title, tag, body });
  };

  return (
    <div className="editor">
      <div className="editor-head">
        <h1>New Post.</h1>
        <span className="count">{body.length} chars</span>
      </div>

      <input
        className="input-title"
        placeholder="Your headline. Make it loud."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
      />

      <div>
        <label className="field-label">Tag</label>
        <input
          className="input-tag"
          placeholder="design"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          maxLength={24}
        />
      </div>

      <div>
        <label className="field-label">Body</label>
        <textarea
          className="textarea-body"
          placeholder="Write something worth publishing…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className="editor-actions">
        <button className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button
          className="btn-solid"
          onClick={handlePublish}
          disabled={!canPublish}
          style={{ opacity: canPublish ? 1 : 0.4, cursor: canPublish ? 'pointer' : 'not-allowed' }}
        >
          Publish →
        </button>
      </div>
    </div>
  );
}
