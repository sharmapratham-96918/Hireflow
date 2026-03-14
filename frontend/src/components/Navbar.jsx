import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .nb-root {
    position: sticky;
    top: 0;
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
  }

  .nb-bar {
    background: rgba(8, 13, 26, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0 2.5rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.35);
    transition: background 0.3s;
  }

  /* ── Logo ── */
  .nb-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-decoration: none;
    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .nb-logo-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 10px #38bdf8, 0 0 20px rgba(56,189,248,0.4);
    animation: nbPulse 2.5s ease-in-out infinite;
    flex-shrink: 0;
    align-self: center;
    margin-bottom: 2px;
  }

  @keyframes nbPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── Desktop Nav links ── */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nb-link {
    color: #64748b;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 8px;
    letter-spacing: 0.01em;
    transition: color 0.2s, background 0.2s;
    position: relative;
  }
  .nb-link:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.05);
  }

  .nb-divider {
    width: 1px;
    height: 22px;
    background: rgba(255,255,255,0.08);
    margin: 0 0.4rem;
  }

  /* ── Avatar ── */
  .nb-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.12));
    border: 1px solid rgba(56,189,248,0.22);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
    color: #7dd3fc;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .nb-avatar:hover {
    background: rgba(56,189,248,0.2);
    border-color: rgba(56,189,248,0.5);
    transform: scale(1.05);
    box-shadow: 0 0 14px rgba(56,189,248,0.25);
  }

  /* ── Username chip ── */
  .nb-username {
    font-size: 0.82rem;
    font-weight: 500;
    color: #94a3b8;
    padding: 4px 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 999px;
    white-space: nowrap;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Logout button ── */
  .nb-logout {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.22);
    color: #f87171;
    padding: 6px 16px;
    border-radius: 9px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .nb-logout:hover {
    background: rgba(239,68,68,0.2);
    border-color: rgba(239,68,68,0.45);
    color: #fca5a5;
    transform: translateY(-1px);
  }

  /* ── Login link ── */
  .nb-login {
    color: #64748b;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .nb-login:hover {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.05);
  }

  /* ── Register button ── */
  .nb-register {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 10px;
    padding: 8px 20px;
    color: white;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 18px rgba(99,102,241,0.3);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .nb-register:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
  .nb-register::after {
    content: '→';
    font-size: 0.9rem;
    transition: transform 0.2s;
  }
  .nb-register:hover::after {
    transform: translateX(3px);
  }

  /* ════════════════════════════════
     HAMBURGER BUTTON
  ════════════════════════════════ */
  .nb-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .nb-hamburger:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.14);
  }

  .nb-hamburger-line {
    display: block;
    width: 20px;
    height: 2px;
    background: #94a3b8;
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s, width 0.3s;
    transform-origin: center;
  }

  /* Animated X state */
  .nb-hamburger.open .nb-hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nb-hamburger.open .nb-hamburger-line:nth-child(2) {
    opacity: 0;
    width: 0;
  }
  .nb-hamburger.open .nb-hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ════════════════════════════════
     MOBILE DRAWER
  ════════════════════════════════ */
  .nb-drawer {
    display: none;
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    background: rgba(8, 13, 26, 0.97);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    padding: 1.25rem 1.5rem 1.75rem;
    flex-direction: column;
    gap: 0.5rem;
    transform: translateY(-8px);
    opacity: 0;
    transition: transform 0.28s cubic-bezier(.4,0,.2,1), opacity 0.25s ease;
    pointer-events: none;
  }

  .nb-drawer.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  /* Mobile drawer nav links */
  .nb-drawer-link {
    color: #64748b;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 12px 16px;
    border-radius: 10px;
    letter-spacing: 0.01em;
    transition: color 0.2s, background 0.2s;
    display: block;
  }
  .nb-drawer-link:hover, .nb-drawer-link:active {
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.06);
  }

  .nb-drawer-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 0.5rem 0;
  }

  /* Mobile user row */
  .nb-drawer-user-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: rgba(56,189,248,0.05);
    border: 1px solid rgba(56,189,248,0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 0.25rem;
  }
  .nb-drawer-user-row:hover {
    background: rgba(56,189,248,0.1);
  }
  .nb-drawer-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15));
    border: 1px solid rgba(56,189,248,0.25);
    color: #7dd3fc;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .nb-drawer-username {
    font-size: 0.9rem;
    font-weight: 500;
    color: #cbd5e1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nb-drawer-portal-hint {
    font-size: 0.75rem;
    color: #38bdf8;
    margin-top: 1px;
  }

  .nb-drawer-logout {
    width: 100%;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    letter-spacing: 0.02em;
    text-align: center;
  }
  .nb-drawer-logout:hover {
    background: rgba(239,68,68,0.15);
    border-color: rgba(239,68,68,0.4);
    color: #fca5a5;
  }

  /* Mobile auth buttons */
  .nb-drawer-auth {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }
  .nb-drawer-login {
    display: block;
    text-align: center;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    transition: color 0.2s, background 0.2s;
  }
  .nb-drawer-login:hover {
    color: #e2e8f0;
    background: rgba(255,255,255,0.06);
  }
  .nb-drawer-register {
    display: block;
    text-align: center;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border: none;
    border-radius: 10px;
    padding: 13px 20px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    transition: opacity 0.2s;
    box-shadow: 0 4px 18px rgba(99,102,241,0.3);
    letter-spacing: 0.02em;
  }
  .nb-drawer-register:hover {
    opacity: 0.88;
  }

  /* ════════════════════════════════
     RESPONSIVE BREAKPOINTS
  ════════════════════════════════ */
  @media (max-width: 640px) {
    .nb-bar {
      padding: 0 1rem;
    }
    /* Hide desktop nav on mobile */
    .nb-links {
      display: none;
    }
    /* Show hamburger */
    .nb-hamburger {
      display: flex;
    }
    /* Enable drawer rendering */
    .nb-drawer {
      display: flex;
    }
  }

  /* Tablet: tight spacing, hide username chip */
  @media (max-width: 768px) and (min-width: 641px) {
    .nb-bar { padding: 0 1.25rem; }
    .nb-username { display: none; }
    .nb-link { padding: 6px 10px; }
    .nb-register { padding: 8px 14px; }
  }
`;

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  const handleLogout = async () => {
    setMenuOpen(false);
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleUserPortal = () => {
    setMenuOpen(false);
    if (user?.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/my-profile");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  // Close drawer on route change / outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav className="nb-root">
      <style>{styles}</style>

      {/* ── Main bar ── */}
      <div className="nb-bar">

        {/* Logo */}
        <Link to="/" className="nb-logo" onClick={closeMenu}>
          <span className="nb-logo-dot" />
          HireFlow
        </Link>

        {/* ── Desktop right side ── */}
        <div className="nb-links">
          <Link to="/job" className="nb-link">Jobs</Link>

          {user ? (
            <>
              <div className="nb-divider" />
              <div className="nb-avatar" onClick={handleUserPortal} title="Go to portal">
                <FaUserCircle />
              </div>
              <span className="nb-username">{user?.name}</span>
              <button onClick={handleLogout} className="nb-logout">Logout</button>
            </>
          ) : (
            <>
              <div className="nb-divider" />
              <Link to="/login" className="nb-login">Login</Link>
              <Link to="/register" className="nb-register">Register</Link>
            </>
          )}
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className={`nb-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="nb-hamburger-line" />
          <span className="nb-hamburger-line" />
          <span className="nb-hamburger-line" />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        ref={drawerRef}
        className={`nb-drawer ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <Link to="/job" className="nb-drawer-link" onClick={closeMenu}>
          💼 Jobs
        </Link>

        <div className="nb-drawer-divider" />

        {user ? (
          <>
            {/* User row → portal */}
            <div className="nb-drawer-user-row" onClick={handleUserPortal}>
              <div className="nb-drawer-avatar"><FaUserCircle /></div>
              <div>
                <div className="nb-drawer-username">{user?.name}</div>
                <div className="nb-drawer-portal-hint">
                  {user?.user?.role === "admin" ? "Admin Portal →" : "My Profile →"}
                </div>
              </div>
            </div>

            <button className="nb-drawer-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="nb-drawer-auth">
            <Link to="/login" className="nb-drawer-login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nb-drawer-register" onClick={closeMenu}>
              Get Started →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}