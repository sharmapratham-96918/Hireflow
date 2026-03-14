import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob } from "../features/applications/applicationSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .jc-root {
    font-family: 'DM Sans', sans-serif;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.07);
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

  /* Hover glow — color switches based on status */
  .jc-root.jc-open:hover {
    transform: translateY(-6px);
    border-color: rgba(56,189,248,0.28);
    box-shadow:
      0 0 0 1px rgba(56,189,248,0.1),
      0 20px 60px rgba(0,0,0,0.45);
  }
  .jc-root.jc-closed:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.1);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }

  /* Subtle top shimmer line */
  .jc-root::before {
    content: '';
    position: absolute;
    top: 0; left: 12%; right: 12%;
    height: 1px;
    border-radius: 999px;
    transition: opacity 0.3s;
    opacity: 0;
  }
  .jc-root.jc-open::before {
    background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(99,102,241,0.4), transparent);
  }
  .jc-root.jc-closed::before {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  }
  .jc-root:hover::before { opacity: 1; }

  /* Hover bg tint */
  .jc-root::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(56,189,248,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .jc-root.jc-open:hover::after { opacity: 1; }

  /* ── Top row: logo + status badge ── */
  .jc-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.1rem;
  }

  .jc-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
  .jc-logo.jc-open-logo {
    background: linear-gradient(135deg, rgba(56,189,248,0.14), rgba(99,102,241,0.14));
    border: 1px solid rgba(56,189,248,0.2);
    color: #7dd3fc;
  }
  .jc-logo.jc-closed-logo {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: #475569;
  }

  .jc-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    position: relative;
    z-index: 1;
  }
  .jc-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .jc-badge.jc-badge-open {
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.22);
  }
  .jc-badge.jc-badge-open .jc-badge-dot {
    background: #34d399;
    box-shadow: 0 0 6px #34d399;
    animation: jcPulse 2s ease-in-out infinite;
  }
  .jc-badge.jc-badge-closed {
    color: #64748b;
    background: rgba(100,116,139,0.08);
    border: 1px solid rgba(100,116,139,0.15);
  }
  .jc-badge.jc-badge-closed .jc-badge-dot {
    background: #475569;
  }
  @keyframes jcPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── Title ── */
  .jc-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1f5f9;
    line-height: 1.3;
    margin-bottom: 6px;
    position: relative;
    z-index: 1;
  }
  .jc-root.jc-closed .jc-title { color: #64748b; }

  /* ── Meta: company • location ── */
  .jc-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.83rem;
    color: #64748b;
    margin-bottom: 1.1rem;
    position: relative;
    z-index: 1;
  }
  .jc-meta-dot { color: #1e293b; }

  /* ── Salary ── */
  .jc-salary {
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
    letter-spacing: 0.01em;
  }
  .jc-root.jc-closed .jc-salary {
    color: #475569;
    background: rgba(255,255,255,0.03);
    border-color: rgba(255,255,255,0.06);
  }

  /* ── Apply button ── */
  .jc-btn {
    width: 100%;
    border: none;
    border-radius: 11px;
    padding: 11px;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    position: relative;
    z-index: 1;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .jc-btn.jc-btn-open {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: white;
    box-shadow: 0 4px 20px rgba(99,102,241,0.28);
  }
  .jc-btn.jc-btn-open:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
  .jc-btn.jc-btn-open::after { content: '→'; transition: transform 0.2s; }
  .jc-btn.jc-btn-open:hover::after { transform: translateX(4px); }

  .jc-btn.jc-btn-closed {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    color: #334155;
    cursor: not-allowed;
  }
  .jc-btn.jc-btn-closed::after { content: '✕'; font-size: 0.8rem; }
`;

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

const handleApply = async () => {

  // check if user is logged in
  if (!user) {
    navigate("/register");
    toast.error("User NOt Registered")
    return;
  }

  try {
    await dispatch(applyToJob(job._id)).unwrap();
    toast.success("Application submitted successfully");
  } catch (error) {
    toast.error(error);
  }

};
  const isOpen    = job?.status === "open";
  const initials  = job?.company?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";

  return (
    <div className={`jc-root ${isOpen ? "jc-open" : "jc-closed"}`}>
      <style>{styles}</style>

      {/* ── Top: logo + badge ── */}
      <div className="jc-top">
        <div className={`jc-logo ${isOpen ? "jc-open-logo" : "jc-closed-logo"}`}>
          {initials}
        </div>

        <span className={`jc-badge ${isOpen ? "jc-badge-open" : "jc-badge-closed"}`}>
          <span className="jc-badge-dot" />
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* ── Title ── */}
      <h2 className="jc-title">{job?.title}</h2>

      {/* ── Company · Location ── */}
      <div className="jc-meta">
        {job?.company}
        <span className="jc-meta-dot">•</span>
        {job?.location}
      </div>

      {/* ── Salary ── */}
      <div className="jc-salary">
        ₹ {job?.salary?.toLocaleString()} / year
      </div>

      {/* ── Apply button — logic untouched ── */}
      <button
        disabled={!isOpen}
        onClick={handleApply}
        className={`jc-btn ${isOpen ? "jc-btn-open" : "jc-btn-closed"}`}
      >
        {isOpen ? "Apply Now" : "Applications Closed"}
      </button>

    </div>
  );
};

export default JobCard;


