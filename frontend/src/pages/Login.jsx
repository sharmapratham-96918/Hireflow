import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/auth/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .lg-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 2rem 1.5rem;
  }

  /* ── Background effects ── */
  .lg-bg-orb-1 {
    position: absolute;
    width: 550px; height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.13), transparent 70%);
    top: -180px; left: -150px;
    filter: blur(60px);
    animation: lgFloat 9s ease-in-out infinite;
  }
  .lg-bg-orb-2 {
    position: absolute;
    width: 450px; height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%);
    bottom: -140px; right: -120px;
    filter: blur(60px);
    animation: lgFloat 11s ease-in-out infinite reverse;
  }
  .lg-bg-orb-3 {
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,132,252,0.1), transparent 70%);
    top: 55%; left: 60%;
    filter: blur(60px);
    animation: lgFloat 7s ease-in-out infinite;
    animation-delay: -3s;
  }
  .lg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px);
    background-size: 55px 55px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
  }

  @keyframes lgFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-28px) scale(1.04); }
  }

  /* ── Card ── */
  .lg-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 2.8rem 2.4rem;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(56,189,248,0.06),
      0 30px 80px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.06);
    animation: lgSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes lgSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  /* ── Card top accent line ── */
  .lg-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(99,102,241,0.5), transparent);
    border-radius: 999px;
  }

  /* ── Header ── */
  .lg-icon-wrap {
    width: 52px; height: 52px;
    border-radius: 15px;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15));
    border: 1px solid rgba(56,189,248,0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 0 20px rgba(56,189,248,0.12);
  }
  .lg-icon {
    font-size: 1.5rem;
  }

  .lg-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.85rem;
    font-weight: 800;
    text-align: center;
    letter-spacing: -0.025em;
    color: #f1f5f9;
    margin-bottom: 6px;
  }
  .lg-subtitle {
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
    margin-bottom: 2rem;
    font-weight: 400;
  }

  /* ── Error ── */
  .lg-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.22);
    color: #fca5a5;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.83rem;
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lg-error::before {
    content: '⚠';
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  /* ── Form ── */
  .lg-form { display: flex; flex-direction: column; gap: 1rem; }

  .lg-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lg-label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #475569;
    padding-left: 2px;
  }

  .lg-input-wrap {
    position: relative;
  }
  .lg-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.95rem;
    color: #334155;
    pointer-events: none;
    transition: color 0.2s;
  }
  .lg-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 11px;
    padding: 12px 14px 12px 40px;
    color: #e2e8f0;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .lg-input::placeholder { color: #334155; }
  .lg-input:focus {
    border-color: rgba(56,189,248,0.4);
    background: rgba(56,189,248,0.04);
    box-shadow: 0 0 0 3px rgba(56,189,248,0.08);
  }
  .lg-input:focus + .lg-input-icon,
  .lg-input-wrap:focus-within .lg-input-icon {
    color: #38bdf8;
  }

  /* ── Submit button ── */
  .lg-submit {
    margin-top: 0.5rem;
    width: 100%;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 11px;
    padding: 13px;
    color: white;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(99,102,241,0.3);
    position: relative;
    overflow: hidden;
  }
  .lg-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .lg-submit:hover { opacity: 0.88; transform: translateY(-1px); }
  .lg-submit:hover::after { opacity: 1; }
  .lg-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* Loading shimmer */
  .lg-loading-dots::after {
    content: '...';
    animation: lgDots 1.2s steps(4, end) infinite;
  }
  @keyframes lgDots {
    0%  { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
  }

  /* ── Divider ── */
  .lg-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.4rem 0 1.2rem;
  }
  .lg-divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }
  .lg-divider-text {
    font-size: 0.75rem;
    color: #334155;
    letter-spacing: 0.06em;
  }

  /* ── Footer link ── */
  .lg-footer {
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
  }
  .lg-footer a {
    color: #7dd3fc;
    font-weight: 600;
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }
  .lg-footer a::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 1px;
    background: #38bdf8;
    transform: scaleX(0);
    transition: transform 0.2s;
    transform-origin: left;
  }
  .lg-footer a:hover { color: #38bdf8; }
  .lg-footer a:hover::after { transform: scaleX(1); }
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { email, password } = formData

  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess || user) navigate("/")
  }, [user, isSuccess, navigate])

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    toast.success("User Logedin")
  }

  return (
    <div className="lg-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="lg-bg-orb-1" />
      <div className="lg-bg-orb-2" />
      <div className="lg-bg-orb-3" />
      <div className="lg-grid"    />

      {/* Card */}
      <div className="lg-card">

        {/* Icon */}
        <div className="lg-icon-wrap">
          <span className="lg-icon">⚡</span>
        </div>

        <h2 className="lg-title">Welcome back</h2>
        <p className="lg-subtitle">Sign in to continue to HireFlow</p>

        {/* Error */}
        {isError && (
          <div className="lg-error">{message}</div>
        )}

        {/* Form — all handlers untouched */}
        <form onSubmit={onSubmit} className="lg-form">

          <div className="lg-field">
            <label className="lg-label">Email</label>
            <div className="lg-input-wrap">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={onChange}
                className="lg-input"
                required
              />
              <span className="lg-input-icon">✉</span>
            </div>
          </div>

          <div className="lg-field">
            <label className="lg-label">Password</label>
            <div className="lg-input-wrap">
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={onChange}
                className="lg-input"
                required
              />
              <span className="lg-input-icon">🔒</span>
            </div>
          </div>

          <button
            type="submit"
            className="lg-submit"
            disabled={isLoading}
          >
            {isLoading
              ? <span>Signing in<span className="lg-loading-dots" /></span>
              : "Sign In →"
            }
          </button>

        </form>

        <div className="lg-divider">
          <div className="lg-divider-line" />
          <span className="lg-divider-text">NEW HERE?</span>
          <div className="lg-divider-line" />
        </div>

        <p className="lg-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login