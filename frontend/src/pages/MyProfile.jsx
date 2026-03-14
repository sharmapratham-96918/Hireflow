import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .mp-root {
    min-height: 100vh;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 3rem 1.5rem 5rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .mp-orb-1 {
    position: fixed;
    width: 580px; height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%);
    top: -180px; right: -130px;
    filter: blur(80px);
    pointer-events: none;
    animation: mpFloat 11s ease-in-out infinite;
  }
  .mp-orb-2 {
    position: fixed;
    width: 460px; height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.09), transparent 70%);
    bottom: -130px; left: -100px;
    filter: blur(80px);
    pointer-events: none;
    animation: mpFloat 9s ease-in-out infinite reverse;
  }
  .mp-orb-3 {
    position: fixed;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,132,252,0.07), transparent 70%);
    top: 45%; left: 55%;
    filter: blur(70px);
    pointer-events: none;
    animation: mpFloat 13s ease-in-out infinite;
    animation-delay: -6s;
  }
  .mp-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 75% 65% at 50% 20%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes mpFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-26px); }
  }

  /* ── Card ── */
  .mp-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 740px;
    background: rgba(15, 23, 42, 0.82);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 26px;
    padding: 2.8rem 2.6rem;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(56,189,248,0.05),
      0 30px 80px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05);
    animation: mpSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
  .mp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.45), rgba(99,102,241,0.35), transparent);
    border-radius: 999px;
  }
  @keyframes mpSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Back ── */
  .mp-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 9px;
    padding: 7px 14px;
    color: #475569;
    font-size: 0.83rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: color 0.2s, background 0.2s, transform 0.15s;
  }
  .mp-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    transform: translateX(-3px);
  }

  /* ── Profile header ── */
  .mp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.2rem;
    padding-bottom: 1.8rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 2rem;
  }
  .mp-header-left {
    display: flex;
    align-items: center;
    gap: 1.1rem;
  }

  /* Avatar circle */
  .mp-avatar {
    width: 60px; height: 60px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(56,189,248,0.18), rgba(99,102,241,0.18));
    border: 1px solid rgba(56,189,248,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: #7dd3fc;
    flex-shrink: 0;
    box-shadow: 0 0 24px rgba(56,189,248,0.12);
  }

  .mp-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .mp-role {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #38bdf8;
    background: rgba(56,189,248,0.08);
    border: 1px solid rgba(56,189,248,0.18);
    padding: 3px 10px;
    border-radius: 999px;
  }

  /* Header action buttons */
  .mp-header-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .mp-btn-update {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 10px;
    padding: 9px 20px;
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 18px rgba(99,102,241,0.28);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .mp-btn-update:hover { opacity: 0.88; transform: translateY(-1px); }

  .mp-btn-apps {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.22);
    border-radius: 10px;
    padding: 9px 20px;
    color: #c4b5fd;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .mp-btn-apps:hover {
    background: rgba(167,139,250,0.18);
    border-color: rgba(167,139,250,0.4);
    color: #ddd6fe;
    transform: translateY(-1px);
  }
  .mp-btn-apps::after { content: '→'; transition: transform 0.2s; }
  .mp-btn-apps:hover::after { transform: translateX(3px); }

  /* ── Info sections ── */
  .mp-section {
    margin-bottom: 1.8rem;
    animation: mpFadeUp 0.5s ease both;
  }
  .mp-section-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.8rem;
  }
  .mp-section-label span {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #334155;
    white-space: nowrap;
  }
  .mp-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* Info row (email, education) */
  .mp-info-box {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 0.9rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mp-info-icon {
    font-size: 1rem;
    flex-shrink: 0;
    opacity: 0.6;
  }

  /* Skills */
  .mp-skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .mp-skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #7dd3fc;
    background: rgba(56,189,248,0.08);
    border: 1px solid rgba(56,189,248,0.18);
    padding: 5px 13px;
    border-radius: 8px;
    letter-spacing: 0.01em;
    transition: background 0.2s, border-color 0.2s;
  }
  .mp-skill-tag:hover {
    background: rgba(56,189,248,0.14);
    border-color: rgba(56,189,248,0.32);
  }
  .mp-skill-tag::before { content: '⚡'; font-size: 0.7rem; }

  /* Certifications */
  .mp-certs-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .mp-cert-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 0.875rem;
    color: #94a3b8;
    transition: background 0.2s, border-color 0.2s;
  }
  .mp-cert-item:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
  }
  .mp-cert-icon {
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  /* ── Resume bar ── */
  .mp-resume-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    background: rgba(16,185,129,0.06);
    border: 1px solid rgba(16,185,129,0.16);
    border-radius: 14px;
    padding: 1.1rem 1.4rem;
    margin-top: 2rem;
  }
  .mp-resume-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mp-resume-icon-wrap {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .mp-resume-text strong {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 2px;
  }
  .mp-resume-text span {
    font-size: 0.75rem;
    color: #475569;
  }
  .mp-resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(16,185,129,0.12);
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 9px;
    padding: 8px 18px;
    color: #34d399;
    font-size: 0.83rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .mp-resume-btn:hover {
    background: rgba(16,185,129,0.2);
    border-color: rgba(16,185,129,0.42);
    transform: translateY(-1px);
  }
  .mp-resume-btn::after { content: '↗'; font-size: 0.85rem; }

  @keyframes mpFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 560px) {
    .mp-card          { padding: 2rem 1.4rem; }
    .mp-header        { flex-direction: column; align-items: flex-start; }
    .mp-header-actions { width: 100%; }
    .mp-btn-update, .mp-btn-apps { flex: 1; justify-content: center; text-align: center; }
  }
`;

const MyProfile = () => {
  const navigate = useNavigate();
  const { user }  = useSelector((state) => state.auth);

  const initials = user?.user?.name
    ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";

  return (
    <div className="mp-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="mp-orb-1"   />
      <div className="mp-orb-2"   />
      <div className="mp-orb-3"   />
      <div className="mp-bg-grid" />

      <div className="mp-card">

        {/* ── Back — functionality untouched ── */}
        <button onClick={() => navigate(-1)} className="mp-back">
          <FaArrowLeft />
          Back
        </button>

        {/* ── Profile header ── */}
        <div className="mp-header">
          <div className="mp-header-left">
            <div className="mp-avatar">{initials}</div>
            <div>
              <div className="mp-name">{user?.user?.name}</div>
              <span className="mp-role">{user?.user?.role}</span>
            </div>
          </div>
          <div className="mp-header-actions">
            <button className="mp-btn-update">Update Profile</button>
            <Link to={`/my-applications/${user._id}`} className="mp-btn-apps">
              My Applications
            </Link>
          </div>
        </div>

        {/* ── Email ── */}
        <div className="mp-section">
          <div className="mp-section-label">
            <span>Email</span>
            <div className="mp-section-line" />
          </div>
          <div className="mp-info-box">
            <span className="mp-info-icon">✉</span>
            {user?.user?.email}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="mp-section">
          <div className="mp-section-label">
            <span>Education</span>
            <div className="mp-section-line" />
          </div>
          <div className="mp-info-box">
            <span className="mp-info-icon">🎓</span>
            {user?.user?.education}
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mp-section">
          <div className="mp-section-label">
            <span>Skills</span>
            <div className="mp-section-line" />
          </div>
          <div className="mp-skills-wrap">
            {user?.user?.skills?.map((skill, index) => (
              <span key={index} className="mp-skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* ── Certifications ── */}
        <div className="mp-section">
          <div className="mp-section-label">
            <span>Certifications</span>
            <div className="mp-section-line" />
          </div>
          <div className="mp-certs-list">
            {user?.user?.certifications?.map((cert, index) => (
              <div key={index} className="mp-cert-item">
                <span className="mp-cert-icon">🏆</span>
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* ── Resume — href untouched ── */}
        <div className="mp-resume-bar">
          <div className="mp-resume-left">
            <div className="mp-resume-icon-wrap">📄</div>
            <div className="mp-resume-text">
              <strong>Resume</strong>
              <span>Click to open in new tab</span>
            </div>
          </div>
          <a
            href={`http://localhost:5000/${user?.user?.resume}`}
            target="_blank"
            rel="noreferrer"
            className="mp-resume-btn"
          >
            View Resume
          </a>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;