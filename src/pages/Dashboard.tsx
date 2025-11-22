import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Footer from '../components/Footer';
import CryptoTicker from '../components/CryptoTicker';
import { useAuth } from '../contexts/authContext';
import logoImage from '../assets/img/logo.png';

interface DashboardProps {
    onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('dashboard');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { currentUser } = useAuth();

    // Get user display name or email
    const getUserName = () => {
        let name = '';
        if (currentUser?.displayName) {
            name = currentUser.displayName;
        } else if (currentUser?.email) {
            name = currentUser.email.split('@')[0];
        } else {
            name = 'User';
        }

        // Capitalize first letter of each word
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

    const handleProfileClick = () => {
        setShowDropdown(false);
        // Add profile navigation logic here
        console.log('Navigate to profile settings');
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        onLogout();
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="home-container">
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
                            className={selectedTab === 'Networks' ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedTab('Networks');
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
                                        <button className="dropdown-item" onClick={handleProfileClick}>
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

            <CryptoTicker />

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="main-column">
                        <div className="welcome-section">
                            <div className="welcome-content">
                                <div className="welcome-text">
                                    <span className="welcome-badge">Investment Dashboard</span>
                                    <h2 className="welcome-title">Welcome to Zyphon Capital</h2>
                                    <p className="welcome-subtitle">Your comprehensive investment management platform</p>
                                    <p className="welcome-description">Empowering your financial future with cutting-edge investment strategies and real-time market insights</p>
                                </div>
                                <div className="welcome-stats">
                                    <div className="welcome-stat">
                                        <div className="stat-value">₱45K</div>
                                        <div className="stat-label">Networks Value</div>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="welcome-stat">
                                        <div className="stat-value">+12.5%</div>
                                        <div className="stat-label">Growth Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Section - Mobile */}
                        <div className="content-section quick-actions-mobile">
                            <h3>Quick Actions</h3>
                            <div className="actions-grid-mobile">
                                <button className="action-btn-mobile">
                                    <span className="action-icon">💳</span>
                                    <span className="action-label">Withdraw / Deposit</span>
                                </button>
                                <button className="action-btn-mobile">
                                    <span className="action-icon">💵</span>
                                    <span className="action-label">Passive Income</span>
                                </button>
                                <button className="action-btn-mobile">
                                    <span className="action-icon">🏆</span>
                                    <span className="action-label">Commission</span>
                                </button>
                                <button className="action-btn-mobile">
                                    <span className="action-icon">📄</span>
                                    <span className="action-label">Statements</span>
                                </button>
                            </div>
                        </div>

                        {/* Account Overview Section */}
                        <div className="cards-grid">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Pending Withdrawal</h3>
                                    <span className="card-icon">⏳</span>
                                </div>
                                <div className="card-value">₱8,500</div>
                                <div className="card-change">Processing</div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3>Total Subscription</h3>
                                    <span className="card-icon">📊</span>
                                </div>
                                <div className="card-value">₱45,000</div>
                                <div className="card-change positive">+5.2% this month</div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3>Total Withdrawal</h3>
                                    <span className="card-icon">💸</span>
                                </div>
                                <div className="card-value">₱12,300</div>
                                <div className="card-change">Completed</div>
                            </div>
                        </div>

                        {/* Network Statistics Section */}
                        <div className="content-section">
                            <h3>Network Statistics</h3>
                            <div className="cards-grid">
                                <div className="card network-card">
                                    <div className="card-header">
                                        <h3>Total Network Subscription</h3>
                                        <span className="card-icon">🌐</span>
                                    </div>
                                    <div className="card-value">₱125,000</div>
                                    <div className="card-change positive">+15.3% growth</div>
                                </div>

                                <div className="card network-card">
                                    <div className="card-header">
                                        <h3>Total Commission</h3>
                                        <span className="card-icon">💰</span>
                                    </div>
                                    <div className="card-value">₱6,750</div>
                                    <div className="card-change positive">+₱850 this week</div>
                                </div>

                                <div className="card network-card">
                                    <div className="card-header">
                                        <h3>Active Team</h3>
                                        <span className="card-icon">👥</span>
                                    </div>
                                    <div className="card-value">42</div>
                                    <div className="card-change positive">8 new members</div>
                                </div>

                                <div className="card network-card">
                                    <div className="card-header">
                                        <h3>Inactive Team</h3>
                                        <span className="card-icon">😴</span>
                                    </div>
                                    <div className="card-value">18</div>
                                    <div className="card-change">Engage them</div>
                                </div>
                            </div>
                        </div>

                        {/* Investment Plans Section */}
                        <div className="content-section">
                            <h3>Investment Plans</h3>
                            <div className="plans-grid">
                                <div className="plan-card">
                                    <div className="plan-badge">STARTER</div>
                                    <div className="plan-title">Basic Plan</div>
                                    <div className="plan-amount">₱1,000 - ₱5,000</div>
                                    <div className="plan-return">8% Monthly ROI</div>
                                    <ul className="plan-features">
                                        <li>✓ Daily returns</li>
                                        <li>✓ Basic support</li>
                                        <li>✓ Withdrawal anytime</li>
                                    </ul>
                                    <button className="plan-btn">Subscribe</button>
                                </div>

                                <div className="plan-card featured">
                                    <div className="plan-badge">POPULAR</div>
                                    <div className="plan-title">Silver Plan</div>
                                    <div className="plan-amount">₱5,000 - ₱10,000</div>
                                    <div className="plan-return">12% Monthly ROI</div>
                                    <ul className="plan-features">
                                        <li>✓ Daily returns</li>
                                        <li>✓ Priority support</li>
                                        <li>✓ Network bonuses</li>
                                        <li>✓ Instant withdrawal</li>
                                    </ul>
                                    <button className="plan-btn">Subscribe</button>
                                </div>

                                <div className="plan-card">
                                    <div className="plan-badge">PREMIUM</div>
                                    <div className="plan-title">Gold Plan</div>
                                    <div className="plan-amount">₱10,000 - ₱25,000</div>
                                    <div className="plan-return">15% Monthly ROI</div>
                                    <ul className="plan-features">
                                        <li>✓ Daily returns</li>
                                        <li>✓ VIP support</li>
                                        <li>✓ Enhanced bonuses</li>
                                        <li>✓ Free withdrawals</li>
                                    </ul>
                                    <button className="plan-btn">Subscribe</button>
                                </div>

                                <div className="plan-card elite">
                                    <div className="plan-badge">ELITE</div>
                                    <div className="plan-title">Platinum Plan</div>
                                    <div className="plan-amount">₱25,000+</div>
                                    <div className="plan-return">20% Monthly ROI</div>
                                    <ul className="plan-features">
                                        <li>✓ Premium returns</li>
                                        <li>✓ Dedicated manager</li>
                                        <li>✓ Maximum bonuses</li>
                                        <li>✓ Priority processing</li>
                                        <li>✓ Exclusive insights</li>
                                    </ul>
                                    <button className="plan-btn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <aside className="sidebar-column">
                        {/* Quick Actions Section */}
                        <div className="content-section sidebar-section">
                            <h3>Quick Actions</h3>
                            <div className="actions-grid-sidebar">
                                <button className="action-btn">
                                    <span className="action-icon">💳</span>
                                    <span className="action-title">Withdraw / Deposit</span>
                                </button>
                                <button className="action-btn">
                                    <span className="action-icon">💵</span>
                                    <span className="action-title">Passive Income</span>
                                </button>
                                <button className="action-btn">
                                    <span className="action-icon">🏆</span>
                                    <span className="action-title">Commission</span>
                                </button>
                                <button className="action-btn">
                                    <span className="action-icon">📄</span>
                                    <span className="action-title">Statements</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                <a
                    href="/dashboard"
                    className={`mobile-nav-item ${selectedTab === 'dashboard' ? 'active' : ''}`}
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
                    className={`mobile-nav-item ${selectedTab === 'Networks' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab('Networks');
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
                    className="mobile-nav-item"
                    onClick={handleProfileClick}
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

export default Dashboard;