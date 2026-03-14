import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .nb-root {
    position: sticky;
    top: 0;
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
  }

  .nb-bar {
    background: rgba(8, 13, 26, 0.75);
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
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
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

  /* ── Nav links ── */
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

  /* Divider */
  .nb-divider {
    width: 1px;
    height: 22px;
    background: rgba(255,255,255,0.08);
    margin: 0 0.4rem;
  }

  /* ── User avatar icon ── */
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

  @media (max-width: 580px) {
    .nb-bar { padding: 0 1rem; }
    .nb-username { display: none; }
    .nb-link { padding: 6px 10px; }
  }
`;

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleUserPortal = () => {
    if (user?.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/my-profile");
    }
  };

  return (
    <nav className="nb-root">
      <style>{styles}</style>

      <div className="nb-bar">

        {/* ── Logo ── */}
        <Link to="/" className="nb-logo">
          <span className="nb-logo-dot" />
          HireFlow
        </Link>

        {/* ── Right side ── */}
        <div className="nb-links">

          <Link to="/job" className="nb-link">
            Jobs
          </Link>

          {user ? (
            <>
              <div className="nb-divider" />

              {/* User Icon — functionality unchanged */}
              <div
                className="nb-avatar"
                onClick={handleUserPortal}
                title="Go to portal"
              >
                <FaUserCircle />
              </div>

              <span className="nb-username">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="nb-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="nb-divider" />

              <Link to="/login" className="nb-login">
                Login
              </Link>

              <Link to="/register" className="nb-register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}