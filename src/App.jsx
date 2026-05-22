import { useState } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import PostDetail from './components/PostDetail.jsx'
import Editor from './components/Editor.jsx'
import { initialPosts } from './data.js'

export default function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [view, setView] = useState('home') // 'home' | 'post' | 'editor'
  const [activePost, setActivePost] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState(null)

  const allTags = [...new Set(posts.flatMap(p => p.tags))]

  const filteredPosts = posts.filter(p => {
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchTag = !activeTag || p.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  const openPost = (post) => { setActivePost(post); setView('post'); window.scrollTo(0, 0) }
  const openEditor = (post = null) => { setEditingPost(post); setView('editor'); window.scrollTo(0, 0) }
  const goHome = () => { setView('home'); setActivePost(null); setEditingPost(null) }

  const savePost = (postData) => {
    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...postData, updatedAt: new Date().toISOString() } : p))
      setActivePost({ ...editingPost, ...postData })
      setView('post')
    } else {
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0,
        readTime: Math.ceil(postData.content.split(' ').length / 200)
      }
      setPosts(prev => [newPost, ...prev])
      setActivePost(newPost)
      setView('post')
    }
    window.scrollTo(0, 0)
  }

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id))
    goHome()
  }

  const likePost = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
    if (activePost?.id === id) setActivePost(prev => ({ ...prev, likes: prev.likes + 1 }))
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        view={view}
        onHome={goHome}
        onNewPost={() => openEditor()}
        search={search}
        onSearch={setSearch}
      />
      {view === 'home' && (
        <Home
          posts={filteredPosts}
          allTags={allTags}
          activeTag={activeTag}
          onTagClick={t => setActiveTag(activeTag === t ? null : t)}
          onPostClick={openPost}
          onNewPost={() => openEditor()}
          search={search}
        />
      )}
      {view === 'post' && activePost && (
        <PostDetail
          post={activePost}
          onBack={goHome}
          onEdit={() => openEditor(activePost)}
          onDelete={() => deletePost(activePost.id)}
          onLike={() => likePost(activePost.id)}
          onTagClick={(t) => { setActiveTag(t); goHome() }}
        />
      )}
      {view === 'editor' && (
        <Editor
          post={editingPost}
          onSave={savePost}
          onCancel={editingPost ? () => { setView('post'); setEditingPost(null) } : goHome}
        />
      )}
    </div>
  )
}
