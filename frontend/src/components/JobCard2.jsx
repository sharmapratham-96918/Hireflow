import React from "react";
import { useDispatch } from "react-redux";
import { updateJobStatus } from "../features/jobs/jobSlice";
import { toast } from "react-toastify";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .jc2-root {
    font-family: 'DM Sans', sans-serif;
    background: rgba(15, 23, 42, 0.78);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 22px;
    padding: 1.7rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                border-color 0.3s,
                box-shadow 0.3s;
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .jc2-root:hover {
    transform: translateY(-5px);
    border-color: rgba(99,102,241,0.28);
    box-shadow:
      0 0 0 1px rgba(99,102,241,0.1),
      0 20px 56px rgba(0,0,0,0.45);
  }

  /* Top shimmer on hover */
  .jc2-root::before {
    content: '';
    position: absolute;
    top: 0; left: 12%; right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.55), rgba(56,189,248,0.35), transparent);
    border-radius: 999px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .jc2-root:hover::before { opacity: 1; }

  /* Subtle bg tint on hover */
  .jc2-root::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .jc2-root:hover::after { opacity: 1; }

  /* ── Top row ── */
  .jc2-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.1rem;
    position: relative;
    z-index: 1;
  }

  .jc2-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.16), rgba(56,189,248,0.12));
    border: 1px solid rgba(99,102,241,0.22);
    color: #a5b4fc;
  }

  /* Live status indicator pill */
  .jc2-live-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
  }
  .jc2-live-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .jc2-live-badge.jc2-open {
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.22);
  }
  .jc2-live-badge.jc2-open .jc2-live-dot {
    background: #34d399;
    box-shadow: 0 0 6px #34d399;
    animation: jc2Pulse 2s ease-in-out infinite;
  }
  .jc2-live-badge.jc2-closed {
    color: #64748b;
    background: rgba(100,116,139,0.07);
    border: 1px solid rgba(100,116,139,0.14);
  }
  .jc2-live-badge.jc2-closed .jc2-live-dot { background: #475569; }
  @keyframes jc2Pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.78); }
  }

  /* ── Title ── */
  .jc2-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1f5f9;
    line-height: 1.3;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }

  /* ── Meta ── */
  .jc2-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.83rem;
    color: #64748b;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }
  .jc2-meta-dot { color: #1e293b; }

  /* ── Salary ── */
  .jc2-salary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #a78bfa;
    background: rgba(167,139,250,0.1);
    border: 1px solid rgba(167,139,250,0.15);
    padding: 5px 12px;
    border-radius: 8px;
    margin-bottom: 1.4rem;
    position: relative;
    z-index: 1;
  }

  /* ── Status control ── */
  .jc2-control {
    position: relative;
    z-index: 1;
    margin-top: auto;
  }
  .jc2-control-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
  }
  .jc2-control-label span {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #334155;
  }
  .jc2-control-hint {
    font-size: 0.68rem;
    color: #1e293b;
  }

  .jc2-select-wrap {
    position: relative;
  }
  .jc2-select-wrap::after {
    content: '⌄';
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-52%);
    color: #475569;
    font-size: 1rem;
    pointer-events: none;
    transition: color 0.2s;
  }
  .jc2-select-wrap:focus-within::after { color: #818cf8; }

  .jc2-select {
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 11px;
    padding: 10px 36px 10px 14px;
    color: #cbd5e1;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .jc2-select:focus {
    border-color: rgba(99,102,241,0.45);
    background: rgba(99,102,241,0.05);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.09);
  }
  .jc2-select option {
    background: #0f172a;
    color: #e2e8f0;
  }
`;

const JobCard2 = ({ job }) => {
  const dispatch = useDispatch();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await dispatch(updateJobStatus({ jobId: job._id, status: newStatus })).unwrap();
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error || "Failed to update job status");
    }
  };

  const isOpen   = job?.status === "open";
  const initials = job?.company?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";

  return (
    <div className="jc2-root">
      <style>{styles}</style>

      {/* ── Top: logo + live badge ── */}
      <div className="jc2-top">
        <div className="jc2-logo">{initials}</div>
        <span className={`jc2-live-badge ${isOpen ? "jc2-open" : "jc2-closed"}`}>
          <span className="jc2-live-dot" />
          {isOpen ? "Live" : "Closed"}
        </span>
      </div>

      {/* ── Title ── */}
      <h2 className="jc2-title">{job?.title}</h2>

      {/* ── Company · Location ── */}
      <div className="jc2-meta">
        {job?.company}
        <span className="jc2-meta-dot">•</span>
        {job?.location}
      </div>

      {/* ── Salary ── */}
      <div className="jc2-salary">
        ₹ {job?.salary?.toLocaleString()} / year
      </div>

      {/* ── Status dropdown — handler untouched ── */}
      <div className="jc2-control">
        <div className="jc2-control-label">
          <span>Job Status</span>
          <span className="jc2-control-hint">Changes go live instantly</span>
        </div>
        <div className="jc2-select-wrap">
          <select
            value={job?.status}
            onChange={handleStatusChange}
            className="jc2-select"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default JobCard2;