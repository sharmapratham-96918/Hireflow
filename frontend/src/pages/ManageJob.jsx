import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/jobs/jobSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import JobCard2 from "../components/JobCard2";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .mj-root {
    background: #080d1a;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .mj-orb-1 {
    position: fixed;
    width: 580px; height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%);
    top: -180px; left: -130px;
    filter: blur(80px);
    pointer-events: none;
    animation: mjFloat 11s ease-in-out infinite;
  }
  .mj-orb-2 {
    position: fixed;
    width: 460px; height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%);
    bottom: -140px; right: -110px;
    filter: blur(80px);
    pointer-events: none;
    animation: mjFloat 9s ease-in-out infinite reverse;
  }
  .mj-orb-3 {
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%);
    top: 50%; right: 20%;
    filter: blur(70px);
    pointer-events: none;
    animation: mjFloat 14s ease-in-out infinite;
    animation-delay: -5s;
  }
  .mj-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
    background-size: 58px 58px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes mjFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-28px); }
  }

  /* ── Inner container ── */
  .mj-inner {
    position: relative;
    z-index: 1;
    max-width: 1140px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── Back button ── */
  .mj-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 8px 16px;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-bottom: 2.5rem;
    transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .mj-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.14);
    transform: translateX(-3px);
  }

  /* ── Page header ── */
  .mj-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.8rem;
    animation: mjFadeUp 0.5s ease both;
  }
  .mj-tag {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #818cf8;
    display: block;
    margin-bottom: 5px;
  }
  .mj-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  /* Job count pill */
  .mj-count {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99,102,241,0.08);
    border: 1px solid rgba(99,102,241,0.18);
    border-radius: 12px;
    padding: 8px 18px;
    font-size: 0.85rem;
    color: #a5b4fc;
    font-weight: 500;
    white-space: nowrap;
    align-self: flex-end;
  }
  .mj-count-num {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #818cf8;
  }

  /* ── Stats strip ── */
  .mj-stats-strip {
    display: flex;
    gap: 1rem;
    margin-bottom: 2.2rem;
    flex-wrap: wrap;
    animation: mjFadeUp 0.5s 0.06s ease both;
  }
  .mj-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 9px 16px;
    backdrop-filter: blur(10px);
  }
  .mj-stat-chip-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .mj-stat-chip-dot.open  { background: #34d399; box-shadow: 0 0 6px #34d399; }
  .mj-stat-chip-dot.closed { background: #475569; }
  .mj-stat-chip-label { font-size: 0.78rem; color: #475569; }
  .mj-stat-chip-num {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #94a3b8;
  }

  /* ── Divider ── */
  .mj-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(99,102,241,0.22), rgba(56,189,248,0.12), transparent);
    margin-bottom: 2.5rem;
    border-radius: 999px;
  }

  /* ── Grid ── */
  .mj-grid-jobs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.4rem;
    animation: mjFadeUp 0.55s 0.1s ease both;
  }

  /* ── Empty state ── */
  .mj-empty {
    text-align: center;
    padding: 5rem 2rem;
    animation: mjFadeUp 0.5s ease both;
  }
  .mj-empty-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
    opacity: 0.35;
  }
  .mj-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 0.5rem;
  }
  .mj-empty p { color: #1e293b; font-size: 0.9rem; }

  /* ── Loading skeletons ── */
  .mj-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.4rem;
  }
  .mj-skeleton-card {
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: 1.7rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .mj-skel {
    border-radius: 8px;
    background: linear-gradient(90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.07) 50%,
      rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: mjShimmer 1.6s ease-in-out infinite;
  }
  .mj-skel-logo   { width: 44px; height: 44px; border-radius: 12px; }
  .mj-skel-title  { height: 18px; width: 65%; }
  .mj-skel-meta   { height: 14px; width: 48%; }
  .mj-skel-sal    { height: 28px; width: 42%; border-radius: 8px; }
  .mj-skel-select { height: 40px; width: 100%; border-radius: 11px; margin-top: 8px; }
  @keyframes mjShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes mjFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .mj-inner  { padding: 2rem 1rem 4rem; }
    .mj-header { flex-direction: column; align-items: flex-start; }
  }
`;

const SkeletonCard = () => (
  <div className="mj-skeleton-card">
    <div className="mj-skel mj-skel-logo"   />
    <div className="mj-skel mj-skel-title"  />
    <div className="mj-skel mj-skel-meta"   />
    <div className="mj-skel mj-skel-sal"    />
    <div className="mj-skel mj-skel-select" />
  </div>
);

const ManageJob = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="mj-root">
        <style>{styles}</style>
        <div className="mj-orb-1" />
        <div className="mj-orb-2" />
        <div className="mj-grid"  />
        <div className="mj-inner">
          <div className="mj-skeleton-grid">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  const openCount   = jobs?.filter(j => j.status === "open").length   ?? 0;
  const closedCount = jobs?.filter(j => j.status === "closed").length ?? 0;

  return (
    <div className="mj-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="mj-orb-1" />
      <div className="mj-orb-2" />
      <div className="mj-orb-3" />
      <div className="mj-grid"  />

      <div className="mj-inner">

        {/* ── Back — functionality untouched ── */}
        <button onClick={() => navigate(-1)} className="mj-back">
          <FaArrowLeft />
          Back
        </button>

        {/* ── Header ── */}
        <div className="mj-header">
          <div>
            <span className="mj-tag">✦ Admin · Jobs</span>
            <h2 className="mj-title">Manage Jobs</h2>
          </div>
          {jobs?.length > 0 && (
            <div className="mj-count">
              <span className="mj-count-num">{jobs.length}</span>
              {jobs.length === 1 ? "job listing" : "job listings"}
            </div>
          )}
        </div>

        {/* ── Stats strip ── */}
        {jobs?.length > 0 && (
          <div className="mj-stats-strip">
            <div className="mj-stat-chip">
              <span className="mj-stat-chip-dot open" />
              <span className="mj-stat-chip-label">Open</span>
              <span className="mj-stat-chip-num">{openCount}</span>
            </div>
            <div className="mj-stat-chip">
              <span className="mj-stat-chip-dot closed" />
              <span className="mj-stat-chip-label">Closed</span>
              <span className="mj-stat-chip-num">{closedCount}</span>
            </div>
          </div>
        )}

        <div className="mj-divider" />

        {/* ── Grid or empty ── */}
        {jobs?.length === 0 ? (
          <div className="mj-empty">
            <div className="mj-empty-icon">📋</div>
            <h3>No jobs found</h3>
            <p>Create your first job listing to get started</p>
          </div>
        ) : (
          <div className="mj-grid-jobs">
            {jobs.map((job) => (
              <JobCard2 key={job._id} job={job} isAdmin={true} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageJob;