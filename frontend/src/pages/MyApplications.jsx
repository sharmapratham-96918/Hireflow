import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../features/applications/applicationSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ma-root {
    min-height: 100vh;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    padding: 3rem 1.5rem 5rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .ma-orb-1 {
    position: fixed;
    width: 580px; height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.09), transparent 70%);
    top: -180px; right: -130px;
    filter: blur(80px);
    pointer-events: none;
    animation: maFloat 11s ease-in-out infinite;
  }
  .ma-orb-2 {
    position: fixed;
    width: 460px; height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%);
    bottom: -130px; left: -100px;
    filter: blur(80px);
    pointer-events: none;
    animation: maFloat 9s ease-in-out infinite reverse;
  }
  .ma-orb-3 {
    position: fixed;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%);
    top: 50%; left: 30%;
    filter: blur(70px);
    pointer-events: none;
    animation: maFloat 14s ease-in-out infinite;
    animation-delay: -5s;
  }
  .ma-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes maFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-28px); }
  }

  /* ── Inner ── */
  .ma-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Back ── */
  .ma-back {
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
  .ma-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.14);
    transform: translateX(-3px);
  }

  /* ── Page header ── */
  .ma-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.8rem;
    animation: maFadeUp 0.5s ease both;
  }
  .ma-tag {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #38bdf8;
    display: block;
    margin-bottom: 5px;
  }
  .ma-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }
  .ma-count {
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
  .ma-count-num {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #38bdf8;
  }

  /* ── Stats strip ── */
  .ma-stats-strip {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.2rem;
    animation: maFadeUp 0.5s 0.06s ease both;
  }
  .ma-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(15,23,42,0.75);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 8px 16px;
    backdrop-filter: blur(10px);
  }
  .ma-stat-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ma-stat-dot.shortlisted { background: #34d399; box-shadow: 0 0 6px #34d399; }
  .ma-stat-dot.pending     {
    background: #fbbf24;
    animation: maPulse 2s ease-in-out infinite;
  }
  .ma-stat-dot.rejected    { background: #f87171; }
  @keyframes maPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }
  .ma-stat-label { font-size: 0.78rem; color: #475569; text-transform: capitalize; }
  .ma-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #94a3b8;
  }

  /* ── Divider ── */
  .ma-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), rgba(99,102,241,0.12), transparent);
    margin-bottom: 2rem;
    border-radius: 999px;
  }

  /* ── Table card ── */
  .ma-card {
    background: rgba(15,23,42,0.78);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 22px;
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    animation: maFadeUp 0.55s 0.1s ease both;
    position: relative;
  }
  .ma-card::before {
    content: '';
    position: absolute;
    top: 0; left: 8%; right: 8%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), rgba(167,139,250,0.3), transparent);
    border-radius: 999px;
  }

  /* ── Table ── */
  .ma-table-wrap { overflow-x: auto; }
  table.ma-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
  }
  .ma-table thead tr {
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .ma-table th {
    padding: 11px 1.4rem;
    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #334155;
    text-align: left;
    white-space: nowrap;
  }
  .ma-table td {
    padding: 14px 1.4rem;
    font-size: 0.875rem;
    color: #94a3b8;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s;
    white-space: nowrap;
  }
  .ma-table tbody tr { transition: background 0.2s; }
  .ma-table tbody tr:hover { background: rgba(255,255,255,0.022); }
  .ma-table tbody tr:hover td { color: #cbd5e1; }
  .ma-table tbody tr:last-child td { border-bottom: none; }

  /* Job title cell */
  .ma-job-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ma-job-initial {
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
  .ma-job-title {
    font-weight: 600;
    color: #e2e8f0;
    font-size: 0.875rem;
  }

  /* Salary */
  .ma-salary {
    font-size: 0.83rem;
    font-weight: 600;
    color: #a78bfa;
  }

  /* Date */
  .ma-date {
    font-size: 0.8rem;
    color: #334155;
    font-family: 'DM Sans', sans-serif;
  }

  /* Status badge */
  .ma-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .ma-status-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .ma-status.ma-shortlisted {
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.22);
  }
  .ma-status.ma-shortlisted .ma-status-dot { background: #34d399; box-shadow: 0 0 5px #34d399; }

  .ma-status.ma-rejected {
    color: #f87171;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
  }
  .ma-status.ma-rejected .ma-status-dot { background: #f87171; }

  .ma-status.ma-pending {
    color: #fbbf24;
    background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.18);
  }
  .ma-status.ma-pending .ma-status-dot {
    background: #fbbf24;
    animation: maPulse 2s ease-in-out infinite;
  }

  /* ── Loading skeletons ── */
  .ma-skeleton-rows { padding: 0.5rem 0; }
  .ma-skel-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 14px 1.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ma-skel {
    border-radius: 7px;
    background: linear-gradient(90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.07) 50%,
      rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: maShimmer 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes maShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Empty state ── */
  .ma-empty {
    text-align: center;
    padding: 5rem 2rem;
    animation: maFadeUp 0.5s ease both;
  }
  .ma-empty-icon { font-size: 3rem; margin-bottom: 1.2rem; opacity: 0.35; }
  .ma-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 0.5rem;
  }
  .ma-empty p { color: #1e293b; font-size: 0.9rem; }

  @keyframes maFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .ma-root  { padding: 2rem 1rem 4rem; }
    .ma-header { flex-direction: column; align-items: flex-start; }
  }
`;

const getStatusClass = (status) => {
  if (status === "shortlisted") return "ma-shortlisted";
  if (status === "rejected")    return "ma-rejected";
  return "ma-pending";
};

const SkeletonRows = () => (
  <div className="ma-skeleton-rows">
    {[...Array(5)].map((_, i) => (
      <div className="ma-skel-row" key={i}>
        <div className="ma-skel" style={{ width: 32, height: 32, borderRadius: 9 }} />
        <div className="ma-skel" style={{ width: "20%", height: 14 }} />
        <div className="ma-skel" style={{ width: "14%", height: 14 }} />
        <div className="ma-skel" style={{ width: "12%", height: 14 }} />
        <div className="ma-skel" style={{ width: "10%", height: 14 }} />
        <div className="ma-skel" style={{ width: 72, height: 24, borderRadius: 999 }} />
        <div className="ma-skel" style={{ width: "10%", height: 14 }} />
      </div>
    ))}
  </div>
);

const MyApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, isLoading } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const shortlistedCount = applications?.filter(a => a.status === "shortlisted").length ?? 0;
  const pendingCount     = applications?.filter(a => a.status === "pending").length     ?? 0;
  const rejectedCount    = applications?.filter(a => a.status === "rejected").length    ?? 0;

  return (
    <div className="ma-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="ma-orb-1"   />
      <div className="ma-orb-2"   />
      <div className="ma-orb-3"   />
      <div className="ma-bg-grid" />

      <div className="ma-inner">

        {/* ── Back — functionality untouched ── */}
        <button onClick={() => navigate(-1)} className="ma-back">
          <FaArrowLeft />
          Back
        </button>

        {/* ── Header ── */}
        <div className="ma-header">
          <div>
            <span className="ma-tag">✦ Candidate Portal</span>
            <h2 className="ma-title">My Applications</h2>
          </div>
          {applications?.length > 0 && (
            <div className="ma-count">
              <span className="ma-count-num">{applications.length}</span>
              {applications.length === 1 ? "application" : "applications"}
            </div>
          )}
        </div>

        {/* ── Stats strip ── */}
        {!isLoading && applications?.length > 0 && (
          <div className="ma-stats-strip">
            {[
              { label: "Shortlisted", count: shortlistedCount, cls: "shortlisted" },
              { label: "Pending",     count: pendingCount,     cls: "pending"     },
              { label: "Rejected",    count: rejectedCount,    cls: "rejected"    },
            ].map(({ label, count, cls }) => (
              <div className="ma-stat-chip" key={label}>
                <span className={`ma-stat-dot ${cls}`} />
                <span className="ma-stat-label">{label}</span>
                <span className="ma-stat-num">{count}</span>
              </div>
            ))}
          </div>
        )}

        <div className="ma-divider" />

        {/* ── Empty ── */}
        {!isLoading && applications?.length === 0 && (
          <div className="ma-empty">
            <div className="ma-empty-icon">📭</div>
            <h3>No applications yet</h3>
            <p>Start applying to jobs and track your progress here</p>
          </div>
        )}

        {/* ── Table ── */}
        {(isLoading || applications?.length > 0) && (
          <div className="ma-card">
            {isLoading ? (
              <SkeletonRows />
            ) : (
              <div className="ma-table-wrap">
                <table className="ma-table">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Status</th>
                      <th>Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => {
                      const initials = app.job?.title
                        ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "JB";
                      return (
                        <tr key={app._id}>

                          <td>
                            <div className="ma-job-cell">
                              <div className="ma-job-initial">{initials}</div>
                              <span className="ma-job-title">{app.job?.title}</span>
                            </div>
                          </td>

                          <td>{app.job?.company}</td>

                          <td>{app.job?.location}</td>

                          <td>
                            <span className="ma-salary">
                              ₹{app.job?.salary?.toLocaleString()}
                            </span>
                          </td>

                          <td>
                            <span className={`ma-status ${getStatusClass(app.status)}`}>
                              <span className="ma-status-dot" />
                              {app.status}
                            </span>
                          </td>

                          <td>
                            <span className="ma-date">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;