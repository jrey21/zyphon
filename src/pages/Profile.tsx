import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebase';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import logoImage from '../assets/img/logo.png';

interface ProfileProps {
    onLogout: () => void;
}

function Profile({ onLogout }: ProfileProps) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [selectedTab, setSelectedTab] = useState('profile');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [activeSection, setActiveSection] = useState<'info' | 'security'>('info');

    // Profile Info States
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [email] = useState(currentUser?.email || '');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Password Change States
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password strength calculation
    const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; label: string; color: string } => {
        if (!password) return { strength: 'weak', label: '', color: '' };

        let score = 0;

        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        // Character variety checks
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
    };

    const passwordStrength = getPasswordStrength(newPassword);

    const getUserName = () => {
        let name = '';
        if (currentUser?.displayName) {
            name = currentUser.displayName;
        } else if (currentUser?.email) {
            name = currentUser.email.split('@')[0];
        } else {
            name = 'User';
        }
        return name.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogoutClick = () => {
        setShowDropdown(false);
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        onLogout();
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        setIsUpdatingProfile(true);
        setProfileMessage(null);

        try {
            await updateProfile(currentUser, {
                displayName: displayName || null,
            });
            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setProfileMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !currentUser.email) return;

        setPasswordMessage(null);

        // Validation
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
            return;
        }

        setIsChangingPassword(true);

        try {
            // Re-authenticate user before changing password
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);

            // Change password
            await updatePassword(currentUser, newPassword);

            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            if (error.code === 'auth/wrong-password') {
                setPasswordMessage({ type: 'error', text: 'Current password is incorrect.' });
            } else if (error.code === 'auth/weak-password') {
                setPasswordMessage({ type: 'error', text: 'Password is too weak.' });
            } else {
                setPasswordMessage({ type: 'error', text: error.message || 'Failed to change password.' });
            }
        } finally {
            setIsChangingPassword(false);
        }
    };

    return (
        <div className="profile-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src={logoImage} alt="Zyphon Capital" />
                    </div>
                    <nav className="nav">
                        <a
                            href="/dashboard"
                            className={selectedTab === 'dashboard' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedTab('dashboard');
                                navigate('/dashboard');
                            }}
                        >
                            Dashboard
                        </a>
                        <a
                            href="/networks"
                            className={selectedTab === 'networks' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedTab('networks');
                                navigate('/networks');
                            }}
                        >
                            Networks
                        </a>
                    </nav>
                    <div className="user-section">
                        <span className="user-name">{getUserName()}</span>
                        <div className="dropdown-container">
                            <button className="dropdown-button" onClick={toggleDropdown} title="User menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            {showDropdown && (
                                <>
                                    <div className="dropdown-backdrop" onClick={() => setShowDropdown(false)}></div>
                                    <div className="dropdown-menu">
                                        <button className="dropdown-item" onClick={() => {
                                            setShowDropdown(false);
                                            navigate('/profile');
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            <span>Profile Settings</span>
                                        </button>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item logout-item" onClick={handleLogoutClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                <polyline points="16 17 21 12 16 7"></polyline>
                                                <line x1="21" y1="12" x2="9" y2="12"></line>
                                            </svg>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay" onClick={handleCancelLogout}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Confirm Logout</h3>
                        <p className="modal-message">Are you sure you want to logout from your account?</p>
                        <div className="modal-actions">
                            <button className="modal-btn modal-btn-cancel" onClick={handleCancelLogout}>
                                Cancel
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={handleConfirmLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="main-content">
                <div className="profile-wrapper">
                    <div className="profile-header">
                        <div className="profile-header-content">
                            <div className="profile-avatar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div>
                                <h1 className="profile-title">Profile Settings</h1>
                                <p className="profile-subtitle">Manage your account information and security</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-tabs">
                            <button
                                className={`profile-tab ${activeSection === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveSection('info')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Personal Information</span>
                            </button>
                            <button
                                className={`profile-tab ${activeSection === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveSection('security')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <span>Security</span>
                            </button>
                        </div>

                        <div className="profile-sections">
                            {activeSection === 'info' && (
                                <div className="profile-section">
                                    <h2 className="section-title">Personal Information</h2>
                                    <p className="section-description">Update your personal details and profile information</p>

                                    {profileMessage && (
                                        <div className={`message ${profileMessage.type}`}>
                                            {profileMessage.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleUpdateProfile} className="profile-form">
                                        <div className="form-group">
                                            <label htmlFor="displayName">Display Name</label>
                                            <input
                                                id="displayName"
                                                type="text"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                placeholder="Enter your display name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                disabled
                                                className="disabled-input"
                                            />
                                            <p className="field-hint">Email cannot be changed</p>
                                        </div>

                                        <div className="form-group">
                                            <label>Account Created</label>
                                            <input
                                                type="text"
                                                value={currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
                                                disabled
                                                className="disabled-input"
                                            />
                                        </div>

                                        <div className="form-actions">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isUpdatingProfile}
                                            >
                                                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeSection === 'security' && (
                                <div className="profile-section">
                                    <h2 className="section-title">Change Password</h2>
                                    <p className="section-description">Update your password to keep your account secure</p>

                                    {passwordMessage && (
                                        <div className={`message ${passwordMessage.type}`}>
                                            {passwordMessage.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleChangePassword} className="profile-form">
                                        <div className="form-group">
                                            <label htmlFor="currentPassword">Current Password</label>
                                            <div className="input-wrapper">
                                                <input
                                                    id="currentPassword"
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    placeholder="Enter current password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showCurrentPassword ? (
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

                                        <div className="form-group">
                                            <label htmlFor="newPassword">New Password</label>
                                            <div className="input-wrapper">
                                                <input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password"
                                                    disabled={!currentPassword}
                                                    className={!currentPassword ? 'disabled-input' : ''}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showNewPassword ? (
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
                                            {newPassword && (
                                                <div className="password-strength-container">
                                                    <div className="password-strength-bar">
                                                        <div
                                                            className={`password-strength-fill strength-${passwordStrength.strength}`}
                                                            style={{ width: passwordStrength.strength === 'weak' ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%' }}
                                                        ></div>
                                                    </div>
                                                    <p className={`password-strength-label strength-${passwordStrength.strength}`}>
                                                        {passwordStrength.label}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="field-hint">Must be at least 6 characters</p>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm New Password</label>
                                            <div className="input-wrapper">
                                                <input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm new password"
                                                    disabled={!currentPassword}
                                                    className={!currentPassword ? 'disabled-input' : ''}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showConfirmPassword ? (
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
                                            {confirmPassword && (
                                                <div className="password-match-indicator">
                                                    {newPassword === confirmPassword ? (
                                                        <p className="password-match-label match-success">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                            Passwords match
                                                        </p>
                                                    ) : (
                                                        <p className="password-match-label match-error">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                                            </svg>
                                                            Passwords do not match
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-actions">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isChangingPassword}
                                            >
                                                {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                <a
                    href="/dashboard"
                    className="mobile-nav-item"
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab('dashboard');
                        navigate('/dashboard');
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Dashboard</span>
                </a>
                <a
                    href="/networks"
                    className="mobile-nav-item"
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab('networks');
                        navigate('/networks');
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Networks</span>
                </a>
                <button
                    className="mobile-nav-item active"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Profile</span>
                </button>
                <button
                    className="mobile-nav-item"
                    onClick={handleLogoutClick}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Logout</span>
                </button>
            </nav>

            <Footer />
        </div>
    );
}

export default Profile;
