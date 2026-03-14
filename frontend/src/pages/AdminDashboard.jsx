import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../features/admin/adminSlice";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ad-root {
    display: flex;
    min-height: 100vh;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background orbs ── */
  .ad-orb-1 {
    position: fixed;
    width: 550px; height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%);
    top: -180px; right: -120px;
    filter: blur(80px);
    pointer-events: none;
    animation: adFloat 11s ease-in-out infinite;
  }
  .ad-orb-2 {
    position: fixed;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);
    bottom: -120px; left: 220px;
    filter: blur(80px);
    pointer-events: none;
    animation: adFloat 9s ease-in-out infinite reverse;
  }
  @keyframes adFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-28px); }
  }

  /* ─────────────────────────────────────────
     SIDEBAR
  ───────────────────────────────────────── */
  .ad-sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: 240px;
    background: rgba(10,16,30,0.92);
    border-right: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 2rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    z-index: 50;
    box-shadow: 4px 0 40px rgba(0,0,0,0.3);
  }

  /* Sidebar logo */
  .ad-sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2.5rem;
    padding-bottom: 1.8rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ad-sidebar-logo-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2));
    border: 1px solid rgba(56,189,248,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    box-shadow: 0 0 16px rgba(56,189,248,0.1);
  }
  .ad-sidebar-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ad-sidebar-logo-badge {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7dd3fc;
    background: rgba(56,189,248,0.1);
    border: 1px solid rgba(56,189,248,0.2);
    padding: 2px 7px;
    border-radius: 999px;
    margin-left: auto;
  }

  /* Sidebar section labels */
  .ad-nav-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #1e293b;
    padding: 0 8px;
    margin-bottom: 0.5rem;
  }

  /* Sidebar links */
  .ad-nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    color: #475569;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2px;
    transition: background 0.2s, color 0.2s;
    position: relative;
  }
  .ad-nav-link:hover {
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
  }
  .ad-nav-link.ad-nav-active {
    background: rgba(56,189,248,0.1);
    color: #7dd3fc;
    border: 1px solid rgba(56,189,248,0.14);
  }
  .ad-nav-link.ad-nav-active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 2px;
    border-radius: 999px;
    background: #38bdf8;
  }
  .ad-nav-icon {
    font-size: 0.85rem;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }

  .ad-nav-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 1rem 0;
  }

  /* ─────────────────────────────────────────
     MAIN CONTENT
  ───────────────────────────────────────── */
  .ad-main {
    margin-left: 240px;
    flex: 1;
    padding: 2.5rem 2.5rem 4rem;
    position: relative;
    z-index: 1;
  }

  /* ── Top bar ── */
  .ad-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.5rem;
    animation: adFadeUp 0.5s ease both;
  }
  .ad-topbar-left {}
  .ad-page-tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #38bdf8;
    display: block;
    margin-bottom: 5px;
  }
  .ad-page-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
  }

  .ad-create-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 11px;
    padding: 10px 22px;
    color: white;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(99,102,241,0.28);
    letter-spacing: 0.02em;
  }
  .ad-create-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── Divider ── */
  .ad-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), rgba(99,102,241,0.12), transparent);
    margin-bottom: 2.2rem;
    border-radius: 999px;
  }

  /* ── Stat cards ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2.2rem;
    animation: adFadeUp 0.55s 0.08s ease both;
  }

  .ad-stat-card {
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 1.4rem 1.5rem;
    backdrop-filter: blur(14px);
    position: relative;
    overflow: hidden;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  }
  .ad-stat-card:hover {
    transform: translateY(-4px);
    border-color: rgba(56,189,248,0.2);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }
  .ad-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 15%; right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .ad-stat-card:hover::before { opacity: 1; }

  .ad-stat-icon {
    font-size: 1.3rem;
    margin-bottom: 0.9rem;
    display: block;
  }
  .ad-stat-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 6px;
  }
  .ad-stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #f1f5f9, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  /* Accent variants */
  .ad-stat-card.ad-accent-blue  { border-color: rgba(56,189,248,0.12); }
  .ad-stat-card.ad-accent-violet { border-color: rgba(99,102,241,0.12); }
  .ad-stat-card.ad-accent-green  { border-color: rgba(52,211,153,0.12); }
  .ad-stat-card.ad-accent-amber  { border-color: rgba(251,191,36,0.12); }

  .ad-accent-blue  .ad-stat-value { background: linear-gradient(135deg,#38bdf8,#7dd3fc); -webkit-background-clip:text; background-clip:text; }
  .ad-accent-violet .ad-stat-value { background: linear-gradient(135deg,#818cf8,#a78bfa); -webkit-background-clip:text; background-clip:text; }
  .ad-accent-green  .ad-stat-value { background: linear-gradient(135deg,#34d399,#6ee7b7); -webkit-background-clip:text; background-clip:text; }
  .ad-accent-amber  .ad-stat-value { background: linear-gradient(135deg,#fbbf24,#fcd34d); -webkit-background-clip:text; background-clip:text; }

  /* ── Table section ── */
  .ad-table-section {
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(14px);
    animation: adFadeUp 0.55s 0.15s ease both;
  }

  .ad-table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.8rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ad-table-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.01em;
  }
  .ad-table-count {
    font-size: 0.75rem;
    color: #475569;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    padding: 3px 10px;
    border-radius: 999px;
  }

  table.ad-table {
    width: 100%;
    border-collapse: collapse;
  }
  .ad-table thead tr {
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ad-table th {
    padding: 11px 1.8rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #334155;
    text-align: left;
  }
  .ad-table td {
    padding: 14px 1.8rem;
    font-size: 0.875rem;
    color: #94a3b8;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s;
  }
  .ad-table tbody tr {
    transition: background 0.2s;
  }
  .ad-table tbody tr:hover {
    background: rgba(255,255,255,0.025);
  }
  .ad-table tbody tr:hover td { color: #cbd5e1; }
  .ad-table tbody tr:last-child td { border-bottom: none; }

  .ad-job-title-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ad-job-initial {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.12));
    border: 1px solid rgba(56,189,248,0.14);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.68rem;
    font-weight: 800;
    color: #7dd3fc;
    flex-shrink: 0;
  }

  .ad-app-count {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #a78bfa;
  }

  .ad-view-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #7dd3fc;
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 600;
    padding: 5px 14px;
    border-radius: 8px;
    border: 1px solid rgba(56,189,248,0.18);
    background: rgba(56,189,248,0.06);
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    letter-spacing: 0.02em;
  }
  .ad-view-link:hover {
    background: rgba(56,189,248,0.14);
    border-color: rgba(56,189,248,0.38);
    color: #38bdf8;
  }
  .ad-view-link::after { content: '→'; transition: transform 0.2s; }
  .ad-view-link:hover::after { transform: translateX(3px); }

  /* ── Loading ── */
  .ad-loading {
    min-height: 100vh;
    background: #080d1a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    font-family: 'DM Sans', sans-serif;
  }
  .ad-spinner {
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 2px solid rgba(56,189,248,0.1);
    border-top-color: #38bdf8;
    animation: adSpin 0.8s linear infinite;
  }
  .ad-loading-text {
    font-size: 0.82rem;
    color: #334155;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  @keyframes adSpin { to { transform: rotate(360deg); } }

  @keyframes adFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .ad-sidebar { display: none; }
    .ad-main    { margin-left: 0; padding: 1.5rem 1rem 3rem; }
  }
`;

const STAT_ACCENTS = ["ad-accent-blue", "ad-accent-violet", "ad-accent-green", "ad-accent-amber"];
const STAT_ICONS   = ["💼", "📋", "✅", "⏳"];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="ad-loading">
        <style>{styles}</style>
        <div className="ad-spinner" />
        <span className="ad-loading-text">Loading Dashboard</span>
      </div>
    );
  }

  const allStats = [
    { label: "Total Jobs",         value: dashboard?.totalJobs,         icon: "💼" },
    { label: "Total Applications", value: dashboard?.totalApplications, icon: "📋" },
    ...(dashboard?.applicationsByStatus?.map((s, i) => ({
      label: s._id,
      value: s.count,
      icon: STAT_ICONS[i + 2] || "📌",
    })) || []),
  ];

  return (
    <div className="ad-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="ad-orb-1" />
      <div className="ad-orb-2" />

      {/* ── Sidebar ── */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo">
          <div className="ad-sidebar-logo-icon">⚡</div>
          <span className="ad-sidebar-logo-text">HireFlow</span>
          <span className="ad-sidebar-logo-badge">Admin</span>
        </div>

        <span className="ad-nav-label">Navigation</span>

        <Link to="/admin" className="ad-nav-link ad-nav-active">
          <span className="ad-nav-icon">▦</span>
          Dashboard
        </Link>

        <Link to="/create-job" className="ad-nav-link">
          <span className="ad-nav-icon">＋</span>
          Create Job
        </Link>

        <Link to="/manage-jobs" className="ad-nav-link">
          <span className="ad-nav-icon">≡</span>
          Manage Jobs
        </Link>

        <div className="ad-nav-divider" />

        <Link to="/" className="ad-nav-link">
          <FaArrowLeft style={{ fontSize: "0.75rem" }} />
          Back to Site
        </Link>
      </aside>

      {/* ── Main ── */}
      <main className="ad-main">

        {/* Top bar */}
        <div className="ad-topbar">
          <div className="ad-topbar-left">
            <span className="ad-page-tag">✦ Admin Panel</span>
            <h1 className="ad-page-title">Dashboard Overview</h1>
          </div>
          <Link to="/create-job" className="ad-create-btn">
            + Create Job
          </Link>
        </div>

        <div className="ad-divider" />

        {/* Stat cards */}
        <div className="ad-stats">
          {allStats.map((s, i) => (
            <div
              key={s.label}
              className={`ad-stat-card ${STAT_ACCENTS[i % STAT_ACCENTS.length]}`}
            >
              <span className="ad-stat-icon">{s.icon}</span>
              <div className="ad-stat-label">{s.label}</div>
              <div className="ad-stat-value">{s.value ?? "—"}</div>
            </div>
          ))}
        </div>

        {/* Applications per job table */}
        <div className="ad-table-section">
          <div className="ad-table-header">
            <span className="ad-table-title">Applications Per Job</span>
            <span className="ad-table-count">
              {dashboard?.applicationsPerJob?.length ?? 0} roles
            </span>
          </div>

          <table className="ad-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Applications</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboard?.applicationsPerJob?.map((job) => {
                const initials = job.jobTitle
                  ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "JB";
                return (
                  <tr key={job._id}>
                    <td>
                      <div className="ad-job-title-cell">
                        <div className="ad-job-initial">{initials}</div>
                        {job.jobTitle}
                      </div>
                    </td>
                    <td>
                      <span className="ad-app-count">
                        {job.totalApplications}
                      </span>
                    </td>
                    <td>
                      <Link to={`/applicant/${job._id}`} className="ad-view-link">
                        View Applicants
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;