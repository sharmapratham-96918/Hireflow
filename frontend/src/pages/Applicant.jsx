import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicantsForJob,
  updateApplicationStatus
} from "../features/applications/applicationSlice";
import { toast } from "react-toastify";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ap-root {
    min-height: 100vh;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    padding: 3rem 1.5rem 5rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .ap-orb-1 {
    position: fixed;
    width: 580px; height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.09), transparent 70%);
    top: -180px; right: -130px;
    filter: blur(80px);
    pointer-events: none;
    animation: apFloat 11s ease-in-out infinite;
  }
  .ap-orb-2 {
    position: fixed;
    width: 440px; height: 440px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);
    bottom: -120px; left: -100px;
    filter: blur(80px);
    pointer-events: none;
    animation: apFloat 9s ease-in-out infinite reverse;
  }
  .ap-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes apFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-28px); }
  }

  /* ── Inner ── */
  .ap-inner {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
  }

  /* ── Back ── */
  .ap-back {
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
    text-decoration: none;
    margin-bottom: 2.2rem;
    display: inline-flex;
    transition: color 0.2s, background 0.2s, transform 0.15s;
  }
  .ap-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    transform: translateX(-3px);
  }

  /* ── Page header ── */
  .ap-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2.2rem;
    animation: apFadeUp 0.5s ease both;
  }
  .ap-header-left {}
  .ap-tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #38bdf8;
    display: block;
    margin-bottom: 5px;
  }
  .ap-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.3rem);
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .ap-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .ap-meta-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: #475569;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    padding: 4px 12px;
    border-radius: 999px;
  }
  .ap-meta-chip strong { color: #94a3b8; font-weight: 600; }

  /* Total applicants pill */
  .ap-count-pill {
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
    align-self: flex-end;
  }
  .ap-count-num {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    color: #38bdf8;
  }

  /* ── Divider ── */
  .ap-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), rgba(99,102,241,0.12), transparent);
    margin-bottom: 2rem;
    border-radius: 999px;
  }

  /* ── Table card ── */
  .ap-card {
    background: rgba(15,23,42,0.78);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 22px;
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    animation: apFadeUp 0.55s 0.1s ease both;
    position: relative;
  }
  .ap-card::before {
    content: '';
    position: absolute;
    top: 0; left: 8%; right: 8%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.4), rgba(99,102,241,0.3), transparent);
    border-radius: 999px;
  }

  .ap-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.3rem 1.8rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .ap-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.01em;
  }
  .ap-card-sub {
    font-size: 0.75rem;
    color: #334155;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 3px 10px;
    border-radius: 999px;
  }

  /* ── Table ── */
  table.ap-table {
    width: 100%;
    border-collapse: collapse;
  }
  .ap-table thead tr {
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .ap-table th {
    padding: 10px 1.6rem;
    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #334155;
    text-align: left;
  }
  .ap-table td {
    padding: 14px 1.6rem;
    font-size: 0.875rem;
    color: #94a3b8;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s;
  }
  .ap-table tbody tr {
    transition: background 0.2s;
  }
  .ap-table tbody tr:hover { background: rgba(255,255,255,0.022); }
  .ap-table tbody tr:hover td { color: #cbd5e1; }
  .ap-table tbody tr:last-child td { border-bottom: none; }

  /* ── Candidate cell ── */
  .ap-candidate {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ap-avatar {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(56,189,248,0.14), rgba(99,102,241,0.14));
    border: 1px solid rgba(56,189,248,0.16);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.72rem;
    font-weight: 800;
    color: #7dd3fc;
    flex-shrink: 0;
  }
  .ap-candidate-name {
    font-weight: 600;
    color: #e2e8f0;
    font-size: 0.875rem;
  }

  /* ── Email ── */
  .ap-email {
    font-size: 0.83rem;
    color: #475569;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Status badge ── */
  .ap-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .ap-status-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ap-status.ap-accepted {
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.22);
  }
  .ap-status.ap-accepted .ap-status-dot {
    background: #34d399;
    box-shadow: 0 0 5px #34d399;
  }
  .ap-status.ap-rejected {
    color: #f87171;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
  }
  .ap-status.ap-rejected .ap-status-dot { background: #f87171; }
  .ap-status.ap-pending {
    color: #fbbf24;
    background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.2);
  }
  .ap-status.ap-pending .ap-status-dot {
    background: #fbbf24;
    animation: apPulse 2s ease-in-out infinite;
  }
  .ap-status.ap-shortlisted {
    color: #818cf8;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.22);
  }
  .ap-status.ap-shortlisted .ap-status-dot { background: #818cf8; }
  @keyframes apPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── Action buttons ── */
  .ap-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

  .ap-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border: 1px solid transparent;
    transition: opacity 0.2s, transform 0.15s, background 0.2s, border-color 0.2s;
    letter-spacing: 0.02em;
  }
  .ap-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    transform: none !important;
  }
  .ap-btn-accept {
    background: rgba(52,211,153,0.1);
    border-color: rgba(52,211,153,0.22);
    color: #34d399;
  }
  .ap-btn-accept:not(:disabled):hover {
    background: rgba(52,211,153,0.18);
    border-color: rgba(52,211,153,0.42);
    transform: translateY(-1px);
  }
  .ap-btn-reject {
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.2);
    color: #f87171;
  }
  .ap-btn-reject:not(:disabled):hover {
    background: rgba(239,68,68,0.16);
    border-color: rgba(239,68,68,0.38);
    transform: translateY(-1px);
  }

  /* ── Empty state ── */
  .ap-empty {
    text-align: center;
    padding: 4rem 2rem;
  }
  .ap-empty-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.35; }
  .ap-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 5px;
  }
  .ap-empty p { font-size: 0.85rem; color: #1e293b; }

  /* ── Loading ── */
  .ap-loading {
    min-height: 100vh;
    background: #080d1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-family: 'DM Sans', sans-serif;
  }
  .ap-spinner {
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 2px solid rgba(56,189,248,0.1);
    border-top-color: #38bdf8;
    animation: apSpin 0.8s linear infinite;
  }
  .ap-loading-text { font-size: 0.8rem; color: #334155; letter-spacing: 0.08em; text-transform: uppercase; }
  @keyframes apSpin { to { transform: rotate(360deg); } }

  @keyframes apFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .ap-root  { padding: 2rem 1rem 4rem; }
    .ap-table th, .ap-table td { padding: 12px 1rem; }
    .ap-header { flex-direction: column; align-items: flex-start; }
  }
`;

const getStatusClass = (status) => {
  if (status === "accepted"   || status === "shortlisted") return "ap-accepted";
  if (status === "rejected")  return "ap-rejected";
  return "ap-pending";
};

const Applicant = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { applicants, isLoading } = useSelector((state) => state.applications);

  useEffect(() => {
    if (jobId) dispatch(getApplicantsForJob(jobId));
  }, [dispatch, jobId]);

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateApplicationStatus({ id, status })).unwrap();
      window.alert(`Application ${status}`);
      dispatch(getApplicantsForJob(jobId));
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="ap-loading">
        <style>{styles}</style>
        <div className="ap-spinner" />
        <span className="ap-loading-text">Loading applicants</span>
      </div>
    );
  }

  const count = Array.isArray(applicants) ? applicants.length : 0;

  return (
    <div className="ap-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="ap-orb-1" />
      <div className="ap-orb-2" />
      <div className="ap-grid"  />

      <div className="ap-inner">

        {/* ── Back — functionality untouched ── */}
        <Link to="/admin" className="ap-back">
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* ── Header ── */}
        <div className="ap-header">
          <div className="ap-header-left">
            <span className="ap-tag">✦ Admin · Applications</span>
            <h1 className="ap-title">Applicants for Job</h1>
            <div className="ap-meta">
              <span className="ap-meta-chip">
                Job ID: <strong>{jobId}</strong>
              </span>
            </div>
          </div>
          <div className="ap-count-pill">
            <span className="ap-count-num">{count}</span>
            {count === 1 ? "applicant" : "applicants"}
          </div>
        </div>

        <div className="ap-divider" />

        {/* ── Table card ── */}
        <div className="ap-card">
          <div className="ap-card-header">
            <span className="ap-card-title">All Applicants</span>
            <span className="ap-card-sub">{count} total</span>
          </div>

          <table className="ap-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(applicants) || applicants.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="ap-empty">
                      <div className="ap-empty-icon">👤</div>
                      <h3>No applicants yet</h3>
                      <p>Applications will appear here once candidates apply</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applicants.map((app) => {
                  const initials = app?.applicant?.name
                    ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";
                  const statusKey = app.status === "shortlisted" ? "ap-accepted"
                    : app.status === "rejected" ? "ap-rejected"
                    : app.status === "accepted"  ? "ap-accepted"
                    : "ap-pending";

                  return (
                    <tr key={app._id}>

                      {/* Candidate */}
                      <td>
                        <div className="ap-candidate">
                          <div className="ap-avatar">{initials}</div>
                          <span className="ap-candidate-name">{app?.applicant?.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td>
                        <span className="ap-email">{app?.applicant?.email}</span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`ap-status ${statusKey}`}>
                          <span className="ap-status-dot" />
                          {app.status}
                        </span>
                      </td>

                      {/* Actions — handlers untouched */}
                      <td>
                        <div className="ap-actions">
                          <button
                            disabled={app.status !== "pending"}
                            onClick={() => handleStatusChange(app._id, "shortlisted")}
                            className="ap-btn ap-btn-accept"
                          >
                            ✓ Accept
                          </button>
                          <button
                            disabled={app.status !== "pending"}
                            onClick={() => handleStatusChange(app._id, "rejected")}
                            className="ap-btn ap-btn-reject"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Applicant;