import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { LogIn, Loader2, BookOpen } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError("Couldn't sign in — check your email and password and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .login-wrap {
          min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center;
          background:
            radial-gradient(circle at 18px 18px, rgba(143,169,138,0.16) 1px, transparent 1.4px) 0 0/24px 24px,
            #EAF1E4;
          font-family: 'IBM Plex Sans', sans-serif;
        }
        .login-card {
          width: 100%; max-width: 380px; background: #FAFDF6; border: 1px solid #86A481;
          border-radius: 16px; padding: 34px 32px; box-shadow: 0 1px 2px rgba(27,53,39,0.06), 0 16px 40px -18px rgba(27,53,39,0.35);
        }
        .login-mark {
          width: 44px; height: 44px; border-radius: 12px; margin: 0 auto 16px;
          background: linear-gradient(155deg, #1B3527, #2C5741); color: #FAFDF6;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px rgba(27,53,39,0.35);
        }
        .login-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 22px; text-align: center; color: #1B3527; margin-bottom: 4px; }
        .login-sub { text-align: center; font-size: 12.5px; color: #4C6656; margin-bottom: 24px; }
        .login-field { margin-bottom: 14px; }
        .login-field label { display:block; font-size: 11px; text-transform: uppercase; letter-spacing: .6px; color: #4C6656; margin-bottom: 6px; }
        .login-field input {
          width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #86A481; font-size: 14px;
          background: #fff; color: #1B3527; font-family: 'IBM Plex Sans', sans-serif;
        }
        .login-field input:focus { outline: none; border-color: #2F6B4F; box-shadow: 0 0 0 3px rgba(47,107,79,0.15); }
        .login-error { background: #F5E7E4; color: #9B3B34; font-size: 12.5px; padding: 9px 12px; border-radius: 8px; margin-bottom: 14px; }
        .login-btn {
          width: 100%; padding: 11px; border-radius: 9px; border: none; cursor: pointer;
          background: linear-gradient(155deg, #1B3527, #2C5741); color: #FAFDF6; font-size: 14px; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 3px 10px -3px rgba(27,53,39,0.5); transition: transform .12s;
        }
        .login-btn:hover { transform: translateY(-1px); }
        .login-btn:disabled { opacity: .7; cursor: default; transform: none; }
      `}</style>
      <form className="login-card" onSubmit={submit}>
        <div className="login-mark"><BookOpen size={20} /></div>
        <div className="login-title">My Ledger</div>
        <div className="login-sub">Sign in to your personal ledger</div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </div>
        <div className="login-field">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="login-btn" type="submit" disabled={busy}>
          {busy ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
