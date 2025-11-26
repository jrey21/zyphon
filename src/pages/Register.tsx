

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerWithEmail, saveUserProfile, getUserProfileById } from '../supabase/supabaseClient';
import './Register.css';

function Register() {
    const location = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [refOwner, setRefOwner] = useState('');
    const [refUid, setRefUid] = useState<string | undefined>(undefined);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<{ strength: 'weak' | 'medium' | 'strong' | ''; label: string; color: string }>({ strength: '', label: '', color: '' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        setRefUid(ref || undefined);
        if (ref) {
            getUserProfileById(ref).then((result) => {
                const profile = result.data;
                if (profile) {
                    setRefOwner(profile.name || profile.email || ref);
                } else {
                    setRefOwner(ref);
                }
            });
        } else {
            setRefOwner('Unknown');
        }
    }, [location.search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'name') {
            // Capitalize first letter of each word
            newValue = value.replace(/\b\w/g, c => c.toUpperCase());
        }
        if (name === 'password') {
            setPasswordStrength(getPasswordStrength(value));
        }
        setForm({ ...form, [name]: newValue });
    };

    // Password strength calculation (copied from Profile.tsx)
    function getPasswordStrength(password: string): { strength: 'weak' | 'medium' | 'strong' | ''; label: string; color: string } {
        if (!password) return { strength: '', label: '', color: '' };
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++; // lowercase
        if (/[A-Z]/.test(password)) score++; // uppercase
        if (/[0-9]/.test(password)) score++; // numbers
        if (/[^a-zA-Z0-9]/.test(password)) score++; // special characters
        if (score <= 2) {
            return { strength: 'weak', label: 'Weak Password', color: '#ef4444' };
        } else if (score <= 4) {
            return { strength: 'medium', label: 'Medium Password', color: '#f59e0b' };
        } else {
            return { strength: 'strong', label: 'Strong Password', color: '#10b981' };
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        setIsRegistering(true);
        try {
            const response = await registerWithEmail(form.email, form.password);
            if (response.error) {
                if (response.error.message && response.error.message.toLowerCase().includes('already registered')) {
                    setError('This email is already registered. Try logging in instead.');
                } else {
                    setError('Registration failed. ' + response.error.message);
                }
                setIsRegistering(false);
                return;
            }
            const user = response.data?.user;
            if (!user || !user.id) {
                setError('Registration failed. No user returned.');
                setIsRegistering(false);
                return;
            }
            await saveUserProfile({
                id: user.id,
                name: form.name,
                email: form.email,
                phone: form.phone,
                invited_by: refUid || null
            });
            navigate('/login?registered=1');
        } catch (err: any) {
            setError('Registration failed. ' + (err?.message || 'Please try again.'));
            setIsRegistering(false);
        }
    };

    return (
        <div className="login-container">
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
                <div className="welcome-header">
                    <h2>Create Account</h2>
                    <p className="subtitle">Register to start your investment journey</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                // Removed isTypingEmail handlers
                                placeholder="Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                // Removed isTypingEmail handlers
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`input-wrapper password-${passwordStrength.strength}`}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                // Removed isTypingPassword handlers
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
                        {form.password && passwordStrength.label && (
                            <div className="password-strength-message" style={{ color: passwordStrength.color }}>
                                {passwordStrength.label}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="invitedBy" className="input-label">Invited by</label>
                        <div className="input-wrapper">
                            <input
                                id="invitedBy"
                                name="invitedBy"
                                type="text"
                                value={refOwner && refOwner !== 'Unknown' ? refOwner : 'Owner name not available'}
                                readOnly
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-button" disabled={isRegistering}>
                        {isRegistering ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
