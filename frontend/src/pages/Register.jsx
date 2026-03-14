import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registeUser } from "../features/auth/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { FaUpload } from "react-icons/fa"
import { toast } from "react-toastify"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .rg-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 3rem 1.5rem;
  }

  /* ── Background ── */
  .rg-orb-1 {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16,185,129,0.11), transparent 70%);
    top: -200px; right: -160px;
    filter: blur(70px);
    animation: rgFloat 10s ease-in-out infinite;
  }
  .rg-orb-2 {
    position: absolute;
    width: 450px; height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%);
    bottom: -150px; left: -120px;
    filter: blur(70px);
    animation: rgFloat 8s ease-in-out infinite reverse;
  }
  .rg-orb-3 {
    position: absolute;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%);
    top: 50%; left: 55%;
    filter: blur(60px);
    animation: rgFloat 12s ease-in-out infinite;
    animation-delay: -5s;
  }
  .rg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px);
    background-size: 55px 55px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%);
  }
  @keyframes rgFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-25px) scale(1.04); }
  }

  /* ── Card ── */
  .rg-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
    background: rgba(15, 23, 42, 0.82);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 26px;
    padding: 2.8rem 2.6rem;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(16,185,129,0.06),
      0 30px 80px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(255,255,255,0.05);
    animation: rgSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
  .rg-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(16,185,129,0.5), rgba(56,189,248,0.4), transparent);
    border-radius: 999px;
  }
  @keyframes rgSlideUp {
    from { opacity: 0; transform: translateY(36px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Header ── */
  .rg-icon-wrap {
    width: 52px; height: 52px;
    border-radius: 15px;
    background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(56,189,248,0.12));
    border: 1px solid rgba(16,185,129,0.25);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.4rem;
    box-shadow: 0 0 22px rgba(16,185,129,0.12);
    font-size: 1.4rem;
  }
  .rg-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    text-align: center;
    letter-spacing: -0.025em;
    color: #f1f5f9;
    margin-bottom: 5px;
  }
  .rg-subtitle {
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
    margin-bottom: 2rem;
  }

  /* ── Section labels ── */
  .rg-section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1.4rem 0 0.9rem;
  }
  .rg-section-label span {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #334155;
    white-space: nowrap;
  }
  .rg-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* ── Error ── */
  .rg-error {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    color: #fca5a5;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.83rem;
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .rg-error::before { content: '⚠'; flex-shrink: 0; }

  /* ── Form layout ── */
  .rg-form { display: flex; flex-direction: column; gap: 0.85rem; }
  .rg-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }

  /* ── Fields ── */
  .rg-field { display: flex; flex-direction: column; gap: 5px; }
  .rg-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #475569;
    padding-left: 2px;
  }
  .rg-input-wrap { position: relative; }
  .rg-input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 0.88rem;
    color: #334155;
    pointer-events: none;
    transition: color 0.2s;
  }
  .rg-input-wrap:focus-within .rg-input-icon { color: #10b981; }

  .rg-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 11px;
    padding: 11px 13px 11px 38px;
    color: #e2e8f0;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .rg-input::placeholder { color: #334155; }
  .rg-input:focus {
    border-color: rgba(16,185,129,0.4);
    background: rgba(16,185,129,0.04);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.08);
  }

  /* ── Resume upload ── */
  .rg-upload-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px dashed rgba(16,185,129,0.22);
    border-radius: 11px;
    padding: 11px 14px;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .rg-upload-wrap:hover {
    border-color: rgba(16,185,129,0.45);
    background: rgba(16,185,129,0.04);
  }
  .rg-upload-icon {
    color: #10b981;
    font-size: 0.95rem;
    flex-shrink: 0;
  }
  .rg-file-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #64748b;
    font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }
  .rg-file-input::file-selector-button {
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 7px;
    padding: 4px 12px;
    color: #34d399;
    font-size: 0.78rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
    transition: background 0.2s;
  }
  .rg-file-input::file-selector-button:hover {
    background: rgba(16,185,129,0.2);
  }

  /* ── Submit ── */
  .rg-submit {
    margin-top: 0.6rem;
    width: 100%;
    background: linear-gradient(135deg, #10b981, #0ea5e9);
    border: none;
    border-radius: 12px;
    padding: 13px;
    color: white;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(16,185,129,0.28);
    position: relative;
    overflow: hidden;
  }
  .rg-submit:hover { opacity: 0.88; transform: translateY(-1px); }
  .rg-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .rg-loading-dots::after {
    content: '';
    animation: rgDots 1.2s steps(4, end) infinite;
  }
  @keyframes rgDots {
    0%  { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
  }

  /* ── Footer ── */
  .rg-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 1.4rem 0 1.2rem;
  }
  .rg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.05); }
  .rg-divider-text { font-size: 0.73rem; color: #334155; letter-spacing: 0.06em; }

  .rg-footer { text-align: center; font-size: 0.85rem; color: #475569; }
  .rg-footer a {
    color: #34d399;
    font-weight: 600;
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }
  .rg-footer a::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 1px;
    background: #10b981;
    transform: scaleX(0);
    transition: transform 0.2s;
    transform-origin: left;
  }
  .rg-footer a:hover { color: #10b981; }
  .rg-footer a:hover::after { transform: scaleX(1); }

  @media (max-width: 480px) {
    .rg-card  { padding: 2rem 1.4rem; }
    .rg-row   { grid-template-columns: 1fr; }
  }
`

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "",
    skills: "", education: "", certifications: "", resume: null
  })

  const { name, email, password, skills, education, certifications } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess || user) navigate("/")
  }, [user, isSuccess, navigate])

  const onChange = (e) => {
    const { name, value, files } = e.target
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registeUser({ name, email, password, skills, education, certifications }))
    toast.success("Regestered Successfully")
  }

  return (
    <div className="rg-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="rg-orb-1" />
      <div className="rg-orb-2" />
      <div className="rg-orb-3" />
      <div className="rg-grid"  />

      {/* Card */}
      <div className="rg-card">

        <div className="rg-icon-wrap">🚀</div>
        <h2 className="rg-title">Create Account</h2>
        <p className="rg-subtitle">Join HireFlow and find your next opportunity</p>

        {isError && <div className="rg-error">{message}</div>}

        <form onSubmit={onSubmit} className="rg-form">

          {/* ── Basic Info ── */}
          <div className="rg-section-label">
            <span>Basic Info</span>
            <div className="rg-section-line" />
          </div>

          <div className="rg-field">
            <label className="rg-label">Full Name</label>
            <div className="rg-input-wrap">
              <input type="text" name="name" placeholder="John Doe"
                value={name} onChange={onChange} className="rg-input" required />
              <span className="rg-input-icon">👤</span>
            </div>
          </div>

          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">Email</label>
              <div className="rg-input-wrap">
                <input type="email" name="email" placeholder="you@example.com"
                  value={email} onChange={onChange} className="rg-input" required />
                <span className="rg-input-icon">✉</span>
              </div>
            </div>

            <div className="rg-field">
              <label className="rg-label">Password</label>
              <div className="rg-input-wrap">
                <input type="password" name="password" placeholder="••••••••"
                  value={password} onChange={onChange} className="rg-input" required />
                <span className="rg-input-icon">🔒</span>
              </div>
            </div>
          </div>

          {/* ── Profile ── */}
          <div className="rg-section-label">
            <span>Profile</span>
            <div className="rg-section-line" />
          </div>

          <div className="rg-field">
            <label className="rg-label">Skills</label>
            <div className="rg-input-wrap">
              <input type="text" name="skills" placeholder="React, Node.js, MongoDB..."
                value={skills} onChange={onChange} className="rg-input" />
              <span className="rg-input-icon">⚡</span>
            </div>
          </div>

          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">Education</label>
              <div className="rg-input-wrap">
                <input type="text" name="education" placeholder="B.Tech CS"
                  value={education} onChange={onChange} className="rg-input" />
                <span className="rg-input-icon">🎓</span>
              </div>
            </div>

            <div className="rg-field">
              <label className="rg-label">Certifications</label>
              <div className="rg-input-wrap">
                <input type="text" name="certifications" placeholder="Optional"
                  value={certifications} onChange={onChange} className="rg-input" />
                <span className="rg-input-icon">🏆</span>
              </div>
            </div>
          </div>

          {/* ── Resume ── */}
          <div className="rg-section-label">
            <span>Resume</span>
            <div className="rg-section-line" />
          </div>

          <div className="rg-upload-wrap">
            <FaUpload className="rg-upload-icon" />
            <input type="file" name="resume" onChange={onChange} className="rg-file-input" />
          </div>

          {/* ── Submit ── */}
          <button type="submit" className="rg-submit" disabled={isLoading}>
            {isLoading
              ? <span>Creating account<span className="rg-loading-dots" /></span>
              : "Create Account →"
            }
          </button>

        </form>

        <div className="rg-divider">
          <div className="rg-divider-line" />
          <span className="rg-divider-text">EXISTING USER?</span>
          <div className="rg-divider-line" />
        </div>

        <p className="rg-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in instead</Link>
        </p>

      </div>
    </div>
  )
}

export default Register