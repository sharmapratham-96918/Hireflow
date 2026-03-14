import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createJob, resetJobState } from "../features/jobs/jobSlice";
import { toast } from "react-toastify";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .cj-root {
    min-height: 100vh;
    background: #080d1a;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 3rem 1.5rem 5rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background ── */
  .cj-orb-1 {
    position: fixed;
    width: 580px; height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.11), transparent 70%);
    top: -180px; left: -140px;
    filter: blur(80px);
    pointer-events: none;
    animation: cjFloat 11s ease-in-out infinite;
  }
  .cj-orb-2 {
    position: fixed;
    width: 460px; height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.09), transparent 70%);
    bottom: -130px; right: -110px;
    filter: blur(80px);
    pointer-events: none;
    animation: cjFloat 9s ease-in-out infinite reverse;
  }
  .cj-orb-3 {
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16,185,129,0.07), transparent 70%);
    top: 55%; right: 25%;
    filter: blur(70px);
    pointer-events: none;
    animation: cjFloat 14s ease-in-out infinite;
    animation-delay: -6s;
  }
  .cj-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 20%, transparent 100%);
    pointer-events: none;
  }
  @keyframes cjFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-28px) scale(1.03); }
  }

  /* ── Card ── */
  .cj-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 680px;
    background: rgba(15, 23, 42, 0.82);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 26px;
    padding: 2.8rem 2.6rem;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(99,102,241,0.06),
      0 30px 80px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05);
    animation: cjSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both;
  }
  .cj-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.55), rgba(56,189,248,0.4), transparent);
    border-radius: 999px;
  }
  @keyframes cjSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }

  /* ── Back button ── */
  .cj-back {
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
  .cj-back:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.07);
    transform: translateX(-3px);
  }

  /* ── Header ── */
  .cj-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .cj-header-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(56,189,248,0.14));
    border: 1px solid rgba(99,102,241,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(99,102,241,0.12);
  }
  .cj-header-text {}
  .cj-header-tag {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #818cf8;
    display: block;
    margin-bottom: 3px;
  }
  .cj-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  /* ── Section dividers ── */
  .cj-section {
    margin: 1.6rem 0 0.9rem;
  }
  .cj-section-label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cj-section-label span {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #334155;
    white-space: nowrap;
  }
  .cj-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* ── Form ── */
  .cj-form { display: flex; flex-direction: column; gap: 0.9rem; }
  .cj-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }

  .cj-field { display: flex; flex-direction: column; gap: 5px; }
  .cj-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #475569;
    padding-left: 2px;
  }

  .cj-input-wrap { position: relative; }
  .cj-input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
    color: #1e293b;
    pointer-events: none;
    transition: color 0.2s;
  }
  .cj-input-wrap:focus-within .cj-input-icon { color: #818cf8; }

  .cj-input,
  .cj-textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 11px;
    color: #e2e8f0;
    font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .cj-input {
    padding: 11px 13px 11px 38px;
  }
  .cj-input::placeholder,
  .cj-textarea::placeholder { color: #1e293b; }

  .cj-input:focus,
  .cj-textarea:focus {
    border-color: rgba(99,102,241,0.45);
    background: rgba(99,102,241,0.05);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.09);
  }

  .cj-textarea {
    padding: 11px 14px;
    resize: vertical;
    min-height: 90px;
    line-height: 1.6;
  }

  /* Salary input — no icon shift needed */
  .cj-input.cj-salary { padding-left: 38px; }

  /* Requirements hint */
  .cj-hint {
    font-size: 0.72rem;
    color: #334155;
    padding-left: 2px;
    margin-top: -3px;
  }

  /* ── Submit ── */
  .cj-submit {
    margin-top: 0.8rem;
    width: 100%;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
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
    box-shadow: 0 4px 24px rgba(99,102,241,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .cj-submit:hover { opacity: 0.88; transform: translateY(-1px); }
  .cj-submit::after { content: '→'; transition: transform 0.2s; }
  .cj-submit:hover::after { transform: translateX(4px); }

  @media (max-width: 520px) {
    .cj-card { padding: 2rem 1.4rem; }
    .cj-row  { grid-template-columns: 1fr; }
  }
`;

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    title: "", company: "", location: "",
    salary: "", description: "", requirements: "",
  });

  const { title, company, location, salary, description, requirements } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob({
      ...formData,
      requirements: requirements.split(",").map((r) => r.trim()),
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      alert("✅ Job created successfully");
      navigate("/admin");
    }
    if (isError) {
      toast.error("❌ " + message);
    }
    dispatch(resetJobState());
  }, [isSuccess, isError, message, dispatch, navigate]);

  return (
    <div className="cj-root">
      <style>{styles}</style>

      {/* Background */}
      <div className="cj-orb-1" />
      <div className="cj-orb-2" />
      <div className="cj-orb-3" />
      <div className="cj-grid"  />

      <div className="cj-card">

        {/* ── Back ── */}
        <button onClick={() => navigate(-1)} className="cj-back">
          <FaArrowLeft />
          Back
        </button>

        {/* ── Header ── */}
        <div className="cj-header">
          <div className="cj-header-icon">📝</div>
          <div className="cj-header-text">
            <span className="cj-header-tag">✦ Admin · Jobs</span>
            <h2 className="cj-title">Create New Job</h2>
          </div>
        </div>

        {/* ── Form — all handlers untouched ── */}
        <form className="cj-form" onSubmit={handleSubmit}>

          {/* Basic Info */}
          <div className="cj-section">
            <div className="cj-section-label">
              <span>Basic Info</span>
              <div className="cj-section-line" />
            </div>
          </div>

          <div className="cj-field">
            <label className="cj-label">Job Title</label>
            <div className="cj-input-wrap">
              <input type="text" name="title" value={title} onChange={handleChange}
                placeholder="e.g. Senior React Developer" className="cj-input" required />
              <span className="cj-input-icon">💼</span>
            </div>
          </div>

          <div className="cj-row">
            <div className="cj-field">
              <label className="cj-label">Company</label>
              <div className="cj-input-wrap">
                <input type="text" name="company" value={company} onChange={handleChange}
                  placeholder="TechNova Inc." className="cj-input" required />
                <span className="cj-input-icon">🏢</span>
              </div>
            </div>

            <div className="cj-field">
              <label className="cj-label">Location</label>
              <div className="cj-input-wrap">
                <input type="text" name="location" value={location} onChange={handleChange}
                  placeholder="Indore, MP" className="cj-input" required />
                <span className="cj-input-icon">📍</span>
              </div>
            </div>
          </div>

          <div className="cj-field">
            <label className="cj-label">Salary (₹ / year)</label>
            <div className="cj-input-wrap">
              <input type="number" name="salary" value={salary} onChange={handleChange}
                placeholder="800000" className="cj-input cj-salary" required />
              <span className="cj-input-icon">₹</span>
            </div>
          </div>

          {/* Details */}
          <div className="cj-section">
            <div className="cj-section-label">
              <span>Details</span>
              <div className="cj-section-line" />
            </div>
          </div>

          <div className="cj-field">
            <label className="cj-label">Job Description</label>
            <textarea name="description" value={description} onChange={handleChange}
              placeholder="Describe the role, responsibilities, and what a great day looks like..."
              rows="4" className="cj-textarea" required />
          </div>

          <div className="cj-field">
            <label className="cj-label">Requirements</label>
            <textarea name="requirements" value={requirements} onChange={handleChange}
              placeholder="React, Node.js, MongoDB, REST APIs..."
              rows="3" className="cj-textarea" />
            <span className="cj-hint">Separate each skill with a comma</span>
          </div>

          <button type="submit" className="cj-submit">
            Publish Job
          </button>

        </form>
      </div>
    </div>
  );
};

export default Create;