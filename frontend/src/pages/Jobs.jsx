import React, { useEffect } from "react";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/jobs/jobSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .jb-root {
    background: #080d1a;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .jb-orb-1 {
    position: fixed;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.09), transparent 70%);
    top: -200px; right: -150px;
    filter: blur(80px);
    pointer-events: none;
    animation: jbFloat 10s ease-in-out infinite;
  }
  .jb-orb-2 {
    position: fixed;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);
    bottom: -150px; left: -100px;
    filter: blur(80px);
    pointer-events: none;
    animation: jbFloat 13s ease-in-out infinite reverse;
  }
  .jb-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
    background-size: 58px 58px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 20%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes jbFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-30px); }
  }

  /* ── Inner container ── */
  .jb-inner {
    position: relative;
    z-index: 1;
    max-width: 1140px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── Back button ── */
  .jb-back {
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
  .jb-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.14);
    transform: translateX(-3px);
  }
  .jb-back svg { font-size: 0.8rem; }

  /* ── Page header ── */
  .jb-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.8rem;
    animation: jbFadeUp 0.5s ease both;
  }
  .jb-header-left {}
  .jb-tag {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #38bdf8;
    margin-bottom: 0.5rem;
    display: block;
  }
  .jb-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  /* Job count pill */
  .jb-count {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(56,189,248,0.08);
    border: 1px solid rgba(56,189,248,0.16);
    border-radius: 12px;
    padding: 8px 18px;
    font-size: 0.85rem;
    color: #7dd3fc;
    font-weight: 500;
    white-space: nowrap;
    align-self: flex-end;
  }
  .jb-count-num {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #38bdf8;
  }

  /* ── Divider ── */
  .jb-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), rgba(99,102,241,0.15), transparent);
    margin-bottom: 2.5rem;
    border-radius: 999px;
  }

  /* ── Grid ── */
  .jb-grid-jobs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.4rem;
    animation: jbFadeUp 0.55s 0.1s ease both;
  }

  /* ── Empty state ── */
  .jb-empty {
    text-align: center;
    padding: 5rem 2rem;
    animation: jbFadeUp 0.5s ease both;
  }
  .jb-empty-icon {
    font-size: 3rem;
    margin-bottom: 1.2rem;
    opacity: 0.4;
  }
  .jb-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 0.5rem;
  }
  .jb-empty p {
    color: #1e293b;
    font-size: 0.9rem;
  }

  /* ── Loading ── */
  .jb-loading {
    min-height: 100vh;
    background: #080d1a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.2rem;
    font-family: 'DM Sans', sans-serif;
  }
  .jb-spinner {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 2px solid rgba(56,189,248,0.12);
    border-top-color: #38bdf8;
    animation: jbSpin 0.8s linear infinite;
  }
  .jb-loading-text {
    font-size: 0.88rem;
    color: #334155;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  @keyframes jbSpin {
    to { transform: rotate(360deg); }
  }

  /* ── Skeleton cards ── */
  .jb-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.4rem;
  }
  .jb-skeleton-card {
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: 1.7rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .jb-skel {
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: jbShimmer 1.6s ease-in-out infinite;
  }
  .jb-skel-logo  { width: 44px; height: 44px; border-radius: 12px; }
  .jb-skel-title { height: 18px; width: 70%; }
  .jb-skel-meta  { height: 14px; width: 50%; }
  .jb-skel-sal   { height: 28px; width: 40%; border-radius: 8px; }
  .jb-skel-btn   { height: 40px; width: 100%; border-radius: 11px; margin-top: 8px; }
  @keyframes jbShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes jbFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .jb-inner { padding: 2rem 1rem 4rem; }
    .jb-header { flex-direction: column; align-items: flex-start; }
  }
`;

const SkeletonCard = () => (
  <div className="jb-skeleton-card">
    <div className="jb-skel jb-skel-logo" />
    <div className="jb-skel jb-skel-title" />
    <div className="jb-skel jb-skel-meta" />
    <div className="jb-skel jb-skel-sal" />
    <div className="jb-skel jb-skel-btn" />
  </div>
);

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="jb-root">
        <style>{styles}</style>
        <div className="jb-orb-1" />
        <div className="jb-orb-2" />
        <div className="jb-grid"  />
        <div className="jb-inner">
          <div className="jb-skeleton-grid">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jb-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="jb-orb-1" />
      <div className="jb-orb-2" />
      <div className="jb-grid"  />

      <div className="jb-inner">

        {/* ── Back button — functionality untouched ── */}
        <button onClick={() => navigate(-1)} className="jb-back">
          <FaArrowLeft />
          Back
        </button>

        {/* ── Header ── */}
        <div className="jb-header">
          <div className="jb-header-left">
            <span className="jb-tag">✦ Opportunities</span>
            <h2 className="jb-title">Available Jobs</h2>
          </div>
          {jobs?.length > 0 && (
            <div className="jb-count">
              <span className="jb-count-num">{jobs.length}</span>
              {jobs.length === 1 ? "position open" : "positions open"}
            </div>
          )}
        </div>

        <div className="jb-divider" />

        {/* ── Job grid or empty state ── */}
        {jobs?.length === 0 ? (
          <div className="jb-empty">
            <div className="jb-empty-icon">🔍</div>
            <h3>No jobs available</h3>
            <p>Check back soon — new roles are posted regularly</p>
          </div>
        ) : (
          <div className="jb-grid-jobs">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;