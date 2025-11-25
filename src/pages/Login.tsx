import { useState, useEffect } from 'react';
import './Login.css';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

interface LoginProps {
    onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
    useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isTypingEmail, setIsTypingEmail] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('registered') === '1') {
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 6000);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                onLogin();
            } catch (error: any) {
                // Firebase error codes: https://firebase.google.com/docs/reference/js/auth.md#autherrorcodes
                if (error.code === 'auth/user-not-found') {
                    setError('Email does not exist.');
                } else if (error.code === 'auth/wrong-password') {
                    setError('Incorrect password, try again!');
                } else if (error.code === 'auth/invalid-credential') {
                    setError('Invalid credentials. Please try again.');
                } else {
                    setError(error.message || 'Failed to sign in. Please check your credentials.');
                }
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div className="login-container">
            {showBanner && (
                <div className="dashboard-banner-success">
                    <span>🎉 Congratulations! You have successfully created an account.</span>
                </div>
            )}
            <div className="login-branding">
                <div className="branding-badge">
                    <span className="badge-dot"></span>
                    Trusted by 10,000+ Investors
                </div>
                <h1>Zyphon Capital</h1>
                <p>Empowering your investment journey with intelligent portfolio management and real-time market insights</p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Smart Analytics</h3>
                        <p>Real-time insights</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Platform</h3>
                        <p>Bank-level security</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast Execution</h3>
                        <p>Lightning speed</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>AI-Powered</h3>
                        <p>Smart decisions</p>
                    </div>
                </div>

                <div className="branding-footer">
                    <div className="stat">
                        <span className="stat-value">₱2.5B+</span>
                        <span className="stat-label">Assets Under Management</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-value">99.9%</span>
                        <span className="stat-label">Uptime Guarantee</span>
                    </div>
                </div>
            </div>
            <div className="login-box">
                {(isTypingEmail || isTypingPassword) && (
                    <div className="hamster-container">
                        <div className={`hamster ${isTypingPassword ? 'covering-eyes' : ''}`}>
                            <div className="hamster-body">
                                <div className="hamster-ear left"></div>
                                <div className="hamster-ear right"></div>
                                <div className="hamster-face">
                                    <div className="hamster-eye left"></div>
                                    <div className="hamster-eye right"></div>
                                    <div className="hamster-nose"></div>
                                    <div className="hamster-mouth"></div>
                                </div>
                                <div className="hamster-hands">
                                    <div className="hamster-hand left"></div>
                                    <div className="hamster-hand right"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="welcome-header">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Sign in to continue to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsTypingEmail(true)}
                                onBlur={() => setIsTypingEmail(false)}
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => { setIsTypingPassword(true); setIsTypingEmail(false); }}
                                onBlur={() => setIsTypingPassword(false)}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button" disabled={isSigningIn}>
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
