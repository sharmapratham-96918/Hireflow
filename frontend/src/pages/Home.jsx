import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUpload } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hp-root {
    background: #080d1a;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  /* ─── HERO ─── */
  .hp-hero {
    position: relative;
    min-height: 88vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 6rem 1.5rem 8rem;
  }

  .hp-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.22) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(99,102,241,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 10% 60%, rgba(14,165,233,0.12) 0%, transparent 60%),
      #080d1a;
    z-index: 0;
  }

  .hp-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }

  /* Floating orbs */
  .hp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    animation: orbFloat 8s ease-in-out infinite;
    z-index: 0;
  }
  .hp-orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #38bdf8, transparent 70%);
    top: -150px; left: -100px;
    animation-delay: 0s;
  }
  .hp-orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #6366f1, transparent 70%);
    bottom: -120px; right: -80px;
    animation-delay: -4s;
  }
  .hp-orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #0ea5e9, transparent 70%);
    top: 40%; right: 15%;
    animation-delay: -2s;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  .hp-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 780px;
    text-align: center;
  }

  .hp-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(56,189,248,0.1);
    border: 1px solid rgba(56,189,248,0.25);
    color: #7dd3fc;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 1.8rem;
    animation: fadeUp 0.6s ease both;
  }
  .hp-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 8px #38bdf8;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .hp-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 6vw, 4.8rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .hp-hero h1 .grad {
    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hp-hero p {
    font-size: 1.15rem;
    color: #94a3b8;
    margin-bottom: 2.5rem;
    font-weight: 300;
    line-height: 1.7;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  /* Search bar */
  .hp-search-wrap {
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .hp-search {
    display: flex;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    overflow: hidden;
    max-width: 580px;
    margin: 0 auto;
    box-shadow: 0 0 0 1px rgba(56,189,248,0.1), 0 20px 60px rgba(0,0,0,0.4);
    backdrop-filter: blur(12px);
    transition: box-shadow 0.3s, border-color 0.3s;
  }
  .hp-search:focus-within {
    border-color: rgba(56,189,248,0.4);
    box-shadow: 0 0 0 1px rgba(56,189,248,0.2), 0 0 30px rgba(56,189,248,0.12), 0 20px 60px rgba(0,0,0,0.4);
  }
  .hp-search input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e2e8f0;
    font-size: 0.97rem;
    padding: 16px 20px;
    font-family: 'DM Sans', sans-serif;
  }
  .hp-search input::placeholder { color: #475569; }
  .hp-search-btn {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    cursor: pointer;
    padding: 0 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s, transform 0.15s;
    letter-spacing: 0.02em;
  }
  .hp-search-btn:hover { opacity: 0.88; transform: scale(0.99); }

  /* Stats strip */
  .hp-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 3.5rem;
    animation: fadeUp 0.7s 0.4s ease both;
  }
  .hp-stat {
    text-align: center;
  }
  .hp-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hp-stat-label {
    font-size: 0.75rem;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }

  /* Scroll indicator */
  .hp-scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #334155;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    z-index: 1;
  }
  .hp-scroll-line {
    width: 1px; height: 36px;
    background: linear-gradient(to bottom, rgba(56,189,248,0.5), transparent);
    animation: scrollDrop 1.8s ease-in-out infinite;
  }
  @keyframes scrollDrop {
    0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
    50% { opacity: 1; }
    100% { opacity: 0; transform: scaleY(1); transform-origin: top; }
  }

  /* ─── RESUME UPLOAD ─── */
  .hp-resume-wrap {
    max-width: 860px;
    margin: -3rem auto 3rem;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
  }
  .hp-resume {
    background: rgba(15,23,42,0.85);
    border: 1px solid rgba(56,189,248,0.18);
    border-radius: 20px;
    padding: 2rem 2.5rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .hp-resume-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15));
    border: 1px solid rgba(56,189,248,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
    color: #38bdf8;
  }
  .hp-resume-text { flex: 1; min-width: 160px; }
  .hp-resume-text h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 4px;
  }
  .hp-resume-text p {
    font-size: 0.875rem;
    color: #64748b;
  }
  .hp-resume-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 220px;
  }
  .hp-file-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px dashed rgba(56,189,248,0.25);
    border-radius: 10px;
    padding: 10px 14px;
    color: #64748b;
    font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .hp-file-input:hover { border-color: rgba(56,189,248,0.5); }
  .hp-upload-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;
    cursor: pointer;
    padding: 10px 22px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(16,185,129,0.3);
  }
  .hp-upload-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ─── FEATURED JOBS ─── */
  .hp-jobs-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 1.5rem 5rem;
  }
  .hp-section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  .hp-section-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #38bdf8;
    margin-bottom: 0.8rem;
  }
  .hp-section-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }
  .hp-section-header p {
    color: #475569;
    font-size: 0.95rem;
    margin-top: 0.6rem;
  }

  .hp-jobs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .hp-job-card {
    background: rgba(15,23,42,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 1.8rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    cursor: default;
    backdrop-filter: blur(12px);
  }
  .hp-job-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(56,189,248,0.05) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .hp-job-card:hover {
    transform: translateY(-6px);
    border-color: rgba(56,189,248,0.25);
    box-shadow: 0 0 0 1px rgba(56,189,248,0.1), 0 20px 60px rgba(0,0,0,0.4);
  }
  .hp-job-card:hover::before { opacity: 1; }

  .hp-job-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .hp-job-logo {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15));
    border: 1px solid rgba(56,189,248,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 800;
    color: #7dd3fc;
    letter-spacing: -0.02em;
  }
  .hp-job-tag {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.2);
    padding: 3px 10px;
    border-radius: 999px;
  }

  .hp-job-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 6px;
    line-height: 1.3;
  }
  .hp-job-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;
    font-size: 0.85rem;
    margin-bottom: 1.2rem;
  }
  .hp-job-dot { color: #334155; }

  .hp-job-salary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #a78bfa;
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.15);
    padding: 4px 12px;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .hp-view-btn {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(56,189,248,0.25);
    border-radius: 10px;
    padding: 10px;
    color: #7dd3fc;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.02em;
  }
  .hp-view-btn:hover {
    background: rgba(56,189,248,0.12);
    border-color: rgba(56,189,248,0.5);
    color: #38bdf8;
  }
  .hp-view-btn::after { content: '→'; transition: transform 0.2s; }
  .hp-view-btn:hover::after { transform: translateX(4px); }

  /* ─── CTA ─── */
  .hp-cta {
    position: relative;
    overflow: hidden;
    padding: 6rem 1.5rem;
  }
  .hp-cta-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 50% 50%, rgba(56,189,248,0.08) 0%, transparent 70%),
      rgba(10,15,28,0.95);
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .hp-cta-inner {
    position: relative;
    z-index: 1;
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
  }
  .hp-cta-inner h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: #f1f5f9;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }
  .hp-cta-inner p {
    color: #475569;
    font-size: 1rem;
    margin-bottom: 2.5rem;
    line-height: 1.7;
  }
  .hp-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .hp-cta-primary {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 12px;
    padding: 14px 32px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(99,102,241,0.35);
    letter-spacing: 0.02em;
  }
  .hp-cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
  .hp-cta-secondary {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 32px;
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .hp-cta-secondary:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }

  /* ─── Animations ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── Responsive ─── */
  @media (max-width: 640px) {
    .hp-stats { gap: 1.8rem; }
    .hp-resume { flex-direction: column; }
    .hp-resume-actions { width: 100%; }
    .hp-job-card { padding: 1.4rem; }
  }
`;

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value.trim().toLowerCase();
    if (!keyword) return;
    navigate(`/job?keyword=${keyword}`);
    e.target.reset();
  };

  const jobs = [
    { title: "MERN Stack Developer", company: "TechNova", location: "Indore", salary: "₹ 8,00,000 / year", tag: "Full-Time", abbr: "TN" },
    { title: "Backend Developer",    company: "TechCorp",  location: "Pune",   salary: "₹ 7,00,000 / year", tag: "Full-Time", abbr: "TC" },
    { title: "React Developer",      company: "StartupX",  location: "Delhi",  salary: "₹ 6,00,000 / year", tag: "Remote",    abbr: "SX" },
  ];

  return (
    <div className="hp-root">
      <style>{styles}</style>

      {/* ── HERO ── */}
      <div className="hp-hero">
        <div className="hp-hero-bg" />
        <div className="hp-hero-grid" />
        <div className="hp-orb hp-orb-1" />
        <div className="hp-orb hp-orb-2" />
        <div className="hp-orb hp-orb-3" />

        <div className="hp-hero-inner">
          <div className="hp-badge">
            <span className="hp-badge-dot" />
            10,000+ new jobs this week
          </div>

          <h1>
            Find Your <span className="grad">Dream Job</span><br />Before Someone Else Does
          </h1>

          <p>
            Explore thousands of curated opportunities from top companies.<br />
            Your next big move starts with one search.
          </p>

          {/* ── SEARCH BAR — no functionality change ── */}
          <div className="hp-search-wrap">
            <form onSubmit={handleSearch} className="hp-search">
              <input
                type="text"
                name="keyword"
                placeholder="Search jobs (Developer, React, Node...)"
              />
              <button type="submit" className="hp-search-btn">
                <FaSearch />
                Search
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="hp-stats">
            {[["50K+","Active Jobs"],["8K+","Companies"],["2M+","Candidates"],].map(([n,l]) => (
              <div className="hp-stat" key={l}>
                <div className="hp-stat-num">{n}</div>
                <div className="hp-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hp-scroll">
          <span>Scroll</span>
          <div className="hp-scroll-line" />
        </div>
      </div>

      {/* ── RESUME UPLOAD — candidate only, functionality unchanged ── */}
      {user?.role === "candidate" && (
        <div className="hp-resume-wrap">
          <div className="hp-resume">
            <div className="hp-resume-icon"><FaUpload /></div>
            <div className="hp-resume-text">
              <h2>Upload Your Resume</h2>
              <p>Upload your resume so employers can find you faster</p>
            </div>
            <div className="hp-resume-actions">
              <input type="file" className="hp-file-input" />
              <button className="hp-upload-btn">
                <FaUpload />
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FEATURED JOBS ── */}
      <div className="hp-jobs-section">
        <div className="hp-section-header">
          <span className="hp-section-tag">✦ Handpicked For You</span>
          <h2>Featured Jobs</h2>
          <p>Top-tier roles from companies that are actively hiring</p>
        </div>

        <div className="hp-jobs-grid">
          {jobs.map(({ title, company, location, salary, tag, abbr }) => (
            <div className="hp-job-card" key={title}>
              <div className="hp-job-card-top">
                <div className="hp-job-logo">{abbr}</div>
                <span className="hp-job-tag">{tag}</span>
              </div>
              <h3>{title}</h3>
              <div className="hp-job-meta">
                {company}
                <span className="hp-job-dot">•</span>
                {location}
              </div>
              <div className="hp-job-salary">{salary}</div>
              <button onClick={() => navigate("/job")} className="hp-view-btn">
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="hp-cta">
        <div className="hp-cta-bg" />
        <div className="hp-cta-inner">
          <h2>Start Your Career Journey Today</h2>
          <p>
            Thousands of companies are actively hiring right now.<br />
            Don't let the perfect opportunity pass you by.
          </p>
          <div className="hp-cta-btns">
            <button onClick={() => navigate("/job")} className="hp-cta-primary">
              Browse All Jobs
            </button>
            <button className="hp-cta-secondary">
              Learn How It Works
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;