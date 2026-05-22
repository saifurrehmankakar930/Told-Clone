import { useState } from 'react'

const COLORS = [
  '#2c3e50', '#8e44ad', '#27ae60', '#c0392b',
  '#2980b9', '#d35400', '#16a085', '#7f8c8d'
]

const SUGGESTED_TAGS = ['Writing', 'Travel', 'Technology', 'Philosophy', 'Science', 'Culture', 'Craft', 'Work', 'Creativity', 'Design', 'Food', 'Cities']

export default function Editor({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [author, setAuthor] = useState(post?.author || '')
  const [tags, setTags] = useState(post?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [coverColor, setCoverColor] = useState(post?.coverColor || COLORS[0])
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!excerpt.trim()) e.excerpt = 'Excerpt is required'
    if (!content.trim()) e.content = 'Content is required'
    if (!author.trim()) e.author = 'Author name is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const avatar = author.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    onSave({ title: title.trim(), excerpt: excerpt.trim(), content: content.trim(), author: author.trim(), avatar, tags, coverColor })
  }

  const addTag = (tag) => {
    const t = tag.trim()
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t])
    }
    setTagInput('')
  }

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag))

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px', animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 32,
            fontWeight: 900,
            color: 'var(--ink)'
          }}>{post ? 'Edit Post' : 'New Post'}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            {wordCount} words · {readTime} min read
          </p>
        </div>
        <button onClick={onCancel} style={{
          background: 'none', border: '1.5px solid var(--border)',
          borderRadius: 8, padding: '8px 16px',
          color: 'var(--muted)', fontSize: 14, cursor: 'pointer'
        }}>Cancel</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Title */}
        <Field label="Title" error={errors.title}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="An unforgettable headline…"
            style={inputStyle(errors.title)}
          />
        </Field>

        {/* Author */}
        <Field label="Author">
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Your name"
            style={inputStyle(errors.author)}
          />
        </Field>

        {/* Excerpt */}
        <Field label="Excerpt" error={errors.excerpt} hint="A compelling 1–2 sentence summary">
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="The hook that makes readers stay…"
            rows={3}
            style={{ ...inputStyle(errors.excerpt), resize: 'vertical' }}
          />
        </Field>

        {/* Cover color */}
        <Field label="Cover Color">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setCoverColor(c)}
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  background: c,
                  border: coverColor === c ? '3px solid var(--ink)' : '3px solid transparent',
                  outline: coverColor === c ? '2px solid var(--amber)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              />
            ))}
          </div>
        </Field>

        {/* Tags */}
        <Field label="Tags" hint="Up to 5 tags">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {tags.map(tag => (
              <span key={tag} style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                {tag}
                <button onClick={() => removeTag(tag)} style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  fontSize: 14, padding: 0, lineHeight: 1
                }}>×</button>
              </span>
            ))}
          </div>
          {tags.length < 5 && (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))}
                placeholder="Add tag…"
                style={{ ...inputStyle(), flex: 1 }}
              />
              <button onClick={() => addTag(tagInput)} style={{
                background: 'var(--cream)', border: '1.5px solid var(--border)',
                borderRadius: 8, padding: '10px 16px',
                color: 'var(--ink)', fontWeight: 600, fontSize: 13, cursor: 'pointer'
              }}>Add</button>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {SUGGESTED_TAGS.filter(t => !tags.includes(t)).slice(0, 8).map(t => (
              <button key={t} onClick={() => addTag(t)} style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 20, padding: '3px 10px',
                fontSize: 12, color: 'var(--muted)', cursor: 'pointer'
              }}>+ {t}</button>
            ))}
          </div>
        </Field>

        {/* Content */}
        <Field label="Content" error={errors.content} hint="Use **bold text** for section headings">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your story here…

Use **Heading** for section titles (wrapped in double asterisks).

Let your thoughts breathe. Take your time."
            rows={20}
            style={{ ...inputStyle(errors.content), resize: 'vertical', lineHeight: 1.7, fontSize: 16 }}
          />
        </Field>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 8 }}>
          <button onClick={onCancel} style={{
            background: 'none', border: '1.5px solid var(--border)',
            borderRadius: 10, padding: '12px 24px',
            color: 'var(--muted)', fontWeight: 600, fontSize: 15, cursor: 'pointer'
          }}>Cancel</button>
          <button onClick={handleSubmit} style={{
            background: 'var(--ink)', border: 'none',
            borderRadius: 10, padding: '12px 32px',
            color: 'var(--paper)', fontWeight: 700, fontSize: 15, cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#2f2010'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            {post ? 'Save Changes' : 'Publish Post'} →
          </button>
        </div>

      </div>
    </main>
  )
}

function Field({ label, children, error, hint }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        marginBottom: 8
      }}>{label}</label>
      {hint && <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, marginTop: -4 }}>{hint}</p>}
      {children}
      {error && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 6 }}>⚠ {error}</p>}
    </div>
  )
}

function inputStyle(error) {
  return {
    width: '100%',
    background: '#fff',
    border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`,
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 15,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--sans)'
  }
}
