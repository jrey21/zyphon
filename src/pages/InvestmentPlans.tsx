import React from 'react';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const InvestmentPlans: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src={logo} alt="Zyphon Capital" />
                    </div>
                    <nav className="nav">
                        <a
                            href="/dashboard"
                            className={window.location.pathname === '/dashboard' ? 'active' : ''}
                            onClick={e => {
                                e.preventDefault();
                                navigate('/dashboard');
                            }}
                        >
                            Dashboard
                        </a>
                        <a
                            href="/networks"
                            className={window.location.pathname === '/networks' ? 'active' : ''}
                            onClick={e => {
                                e.preventDefault();
                                navigate('/networks');
                            }}
                        >
                            Networks
                        </a>
                    </nav>
                </div>
            </header>
            <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
                padding: '32px 24px 0 24px', marginBottom: '16px',
                background: 'rgba(255,255,255,0.95)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
            }}>
                <button
                    className="back-btn-modern"
                    onClick={() => navigate('/dashboard')}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#fff', cursor: 'pointer', fontSize: '16px', boxShadow: '0 2px 12px rgba(99,102,241,0.18)', transition: 'background 0.3s', width: '32px', height: '32px', minWidth: 'unset', marginRight: '16px'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'}
                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <span style={{
                    fontWeight: 900, fontSize: '2rem', color: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)', letterSpacing: '0.5px',
                    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    flex: 1, textAlign: 'center'
                }}>
                    Investment Plans
                </span>
            </div>
            <div className="investment-plans-mobile-view">
                <div className="plans-grid">
                    {/* Basic Plan */}
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
                    {/* Silver Plan */}
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
                    {/* Gold Plan */}
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
                    {/* Platinum Plan */}
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
        </>
    );
};

export default InvestmentPlans;
