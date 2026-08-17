import { useState } from 'react'
import { supabase } from "../supabase";
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); setLoading(false); return }

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', data.user.id).single()

    if (profile?.role !== 'admin') {
      alert('Access denied')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-700" />
          <div className="relative bg-pastel-card backdrop-blur-xl border border-pastel-border rounded-2xl p-8 space-y-7 shadow-lg">

            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-primary/10 border border-pastel-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-pastel-primary animate-pulse" />
                <span className="text-pastel-text text-xs font-bold">Admin Portal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-pastel-text">Welcome Back</h1>
              <p className="text-pastel-muted text-sm">Sign in to manage your portfolio</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-pastel-text font-bold uppercase tracking-wider">Email</label>
                <div className="flex items-center bg-white/50 border border-pastel-border rounded-xl overflow-hidden focus-within:border-pastel-primary/60 transition-colors">
                  <Mail className="w-4 h-4 text-pastel-muted ml-4 shrink-0" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-3 text-pastel-text placeholder-pastel-muted/50 text-sm outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-pastel-text font-bold uppercase tracking-wider">Password</label>
                <div className="flex items-center bg-white/50 border border-pastel-border rounded-xl overflow-hidden focus-within:border-pastel-primary/60 transition-colors">
                  <Lock className="w-4 h-4 text-pastel-muted ml-4 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent px-3 py-3 text-pastel-text placeholder-pastel-muted/50 text-sm outline-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="mr-4 shrink-0 text-pastel-muted hover:text-pastel-text transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="relative group/btn w-full mt-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-xl opacity-75 blur group-hover/btn:opacity-100 transition duration-300" />
                <div className="relative h-11 bg-white/80 rounded-xl border border-pastel-border flex items-center justify-center gap-2 overflow-hidden shadow-sm">
                  <div className="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-pastel-primary/10 to-pastel-tertiary/10" />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-pastel-primary/20 border-t-pastel-primary rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="relative text-sm font-bold text-pastel-text">Sign In</span>
                      <LogIn className="relative w-4 h-4 text-pastel-text group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}