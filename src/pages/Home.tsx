import { useState } from 'react';
import './Home.css';
import Footer from '../components/Footer';
import CryptoTicker from '../components/CryptoTicker';

interface HomeProps {
    onLogout: () => void;
}

function Home({ onLogout }: HomeProps) {
    const [selectedTab, setSelectedTab] = useState('dashboard');

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1 className="logo">Zyphon Capital</h1>
                    <nav className="nav">
                        <a
                            href="/dashboard"
                            className={selectedTab === 'dashboard' ? 'active' : ''}
                            onClick={() => setSelectedTab('dashboard')}
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className={selectedTab === 'portfolio' ? 'active' : ''}
                            onClick={() => setSelectedTab('portfolio')}
                        >
                            Portfolio
                        </a>
                        <a
                            href="#"
                            className={selectedTab === 'markets' ? 'active' : ''}
                            onClick={() => setSelectedTab('markets')}
                        >
                            Markets
                        </a>
                        <a
                            href="#"
                            className={selectedTab === 'analytics' ? 'active' : ''}
                            onClick={() => setSelectedTab('analytics')}
                        >
                            Analytics
                        </a>
                    </nav>
                    <button className="logout-button" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <CryptoTicker />

            <main className="main-content">
                <div className="welcome-section">
                    <h2>Welcome to Zyphon Capital</h2>
                    <p>Your comprehensive investment management platform</p>
                </div>

                {/* Account Overview Section */}
                <div className="cards-grid">
                    <div className="card">
                        <div className="card-header">
                            <h3>Pending Withdrawal</h3>
                            <span className="card-icon">⏳</span>
                        </div>
                        <div className="card-value">$8,500</div>
                        <div className="card-change">Processing</div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Total Subscription</h3>
                            <span className="card-icon">📊</span>
                        </div>
                        <div className="card-value">$45,000</div>
                        <div className="card-change positive">+5.2% this month</div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Total Withdrawal</h3>
                            <span className="card-icon">💸</span>
                        </div>
                        <div className="card-value">$12,300</div>
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
                            <div className="card-value">$125,000</div>
                            <div className="card-change positive">+15.3% growth</div>
                        </div>

                        <div className="card network-card">
                            <div className="card-header">
                                <h3>Total Commission</h3>
                                <span className="card-icon">💰</span>
                            </div>
                            <div className="card-value">$6,750</div>
                            <div className="card-change positive">+$850 this week</div>
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

                {/* Actions Section */}
                <div className="content-section">
                    <h3>Quick Actions</h3>
                    <div className="actions-grid">
                        <button className="action-btn">
                            <span className="action-icon">💳</span>
                            <span className="action-title">Request Payout</span>
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
                        <button className="action-btn">
                            <span className="action-icon">🎓</span>
                            <span className="action-title">Tutorials</span>
                        </button>
                    </div>
                </div>

                {/* Investment Plans Section */}
                <div className="content-section">
                    <h3>Investment Plans</h3>
                    <div className="plans-grid">
                        <div className="plan-card">
                            <div className="plan-badge">STARTER</div>
                            <div className="plan-title">Basic Plan</div>
                            <div className="plan-amount">$1,000 - $5,000</div>
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
                            <div className="plan-amount">$5,000 - $10,000</div>
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
                            <div className="plan-amount">$10,000 - $25,000</div>
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
                            <div className="plan-amount">$25,000+</div>
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
            </main>
            <Footer />
        </div>
    );
}

export default Home;
