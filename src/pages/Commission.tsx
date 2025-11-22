import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Commission.css';
import Footer from '../components/Footer';
import CryptoTicker from '../components/CryptoTicker';
import { useAuth } from '../contexts/authContext';
import logoImage from '../assets/img/logo.png';

interface DashboardProps {
    onLogout: () => void;
}

interface ReferralData {
    id: number;
    name: string;
    contribution: number;
    level: number;
}

function Commission({ onLogout }: DashboardProps) {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('commission');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [accountDetails, setAccountDetails] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [directCurrentPage, setDirectCurrentPage] = useState(1);
    const [indirectCurrentPage, setIndirectCurrentPage] = useState(1);
    const { currentUser } = useAuth();

    // Sample data - replace with actual API calls
    const totalCommission = 6750;
    const activeTeam = 42;
    const inactiveTeam = 18;

    const directReferrals: ReferralData[] = [
        { id: 1, name: 'John Smith', contribution: 15000, level: 1 },
        { id: 2, name: 'Maria Garcia', contribution: 25000, level: 1 },
        { id: 3, name: 'Robert Chen', contribution: 10000, level: 1 },
        { id: 4, name: 'Sarah Johnson', contribution: 7500, level: 1 },
        { id: 5, name: 'Michael Brown', contribution: 5000, level: 1 },
    ];

    const indirectReferrals: ReferralData[] = [
        { id: 1, name: 'David Lee', contribution: 12000, level: 2 },
        { id: 2, name: 'Emma Wilson', contribution: 8500, level: 2 },
        { id: 3, name: 'James Taylor', contribution: 15000, level: 3 },
        { id: 4, name: 'Lisa Anderson', contribution: 6000, level: 2 },
        { id: 5, name: 'Kevin Martinez', contribution: 20000, level: 3 },
        { id: 6, name: 'Anna Thomas', contribution: 9500, level: 2 },
    ];

    // Pagination settings
    const itemsPerPage = 5;

    // Calculate pagination for direct referrals
    const directTotalPages = Math.ceil(directReferrals.length / itemsPerPage);
    const directStartIndex = (directCurrentPage - 1) * itemsPerPage;
    const directEndIndex = directStartIndex + itemsPerPage;
    const directPaginatedData = directReferrals.slice(directStartIndex, directEndIndex);

    // Calculate pagination for indirect referrals
    const indirectTotalPages = Math.ceil(indirectReferrals.length / itemsPerPage);
    const indirectStartIndex = (indirectCurrentPage - 1) * itemsPerPage;
    const indirectEndIndex = indirectStartIndex + itemsPerPage;
    const indirectPaginatedData = indirectReferrals.slice(indirectStartIndex, indirectEndIndex);

    // Pagination handlers
    const handleDirectPageChange = (page: number) => {
        setDirectCurrentPage(page);
    };

    const handleIndirectPageChange = (page: number) => {
        setIndirectCurrentPage(page);
    };

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

    const handleProfileClick = () => {
        setShowDropdown(false);
        navigate('/profile');
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        onLogout();
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleWithdrawSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!receiverName.trim()) {
            alert('Please enter receiver\'s full name');
            return;
        }

        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }

        if (!accountDetails.trim()) {
            alert('Please enter account details');
            return;
        }

        // Here you would normally send the withdrawal request to your backend
        console.log('Withdrawal request:', {
            amount: parseFloat(withdrawAmount),
            receiverName: receiverName,
            paymentMethod: paymentMethod,
            accountDetails: accountDetails
        });

        // Show success modal
        setShowSuccessModal(true);

        // Reset form
        setWithdrawAmount('');
        setReceiverName('');
        setPaymentMethod('');
        setAccountDetails('');
    };

    return (
        <div className="commission-container">
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

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">✓</div>
                        <h3 className="modal-title">Withdrawal Submitted!</h3>
                        <p className="modal-message">Your withdrawal request has been submitted successfully and is being processed.</p>
                        <div className="modal-actions">
                            <button className="modal-btn modal-btn-confirm" onClick={() => setShowSuccessModal(false)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <CryptoTicker />

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="main-column">
                        <div className="page-header">
                            <div className="page-header-top">
                                <button className="back-button" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h1 className="page-title">Commission Overview</h1>
                            </div>
                            <p className="page-subtitle">Track your earnings and team performance</p>
                        </div>

                        {/* Commission Stats */}
                        <div className="commission-stats">
                            <div className="stat-card">
                                <div className="stat-icon">💰</div>
                                <div className="stat-info">
                                    <div className="stat-label">Total Commission</div>
                                    <div className="stat-value">₱{totalCommission.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👥</div>
                                <div className="stat-info">
                                    <div className="stat-label">Active Team</div>
                                    <div className="stat-value">{activeTeam}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">😴</div>
                                <div className="stat-info">
                                    <div className="stat-label">Inactive Team</div>
                                    <div className="stat-value">{inactiveTeam}</div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Referral Table */}
                        <div className="content-section">
                            <h3>Direct Referrals</h3>
                            <div className="table-container">
                                <table className="referral-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Contribution</th>
                                            <th>Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {directPaginatedData.map((referral) => (
                                            <tr key={referral.id}>
                                                <td data-label="Name">
                                                    <div className="name-cell">{referral.name}</div>
                                                </td>
                                                <td data-label="Contribution">
                                                    <div className="contribution-cell">
                                                        ₱{referral.contribution.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td data-label="Level">
                                                    <div className="level-badge level-1">
                                                        Level {referral.level}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {directTotalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => handleDirectPageChange(directCurrentPage - 1)}
                                        disabled={directCurrentPage === 1}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <div className="pagination-info">
                                        Page {directCurrentPage} of {directTotalPages}
                                    </div>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => handleDirectPageChange(directCurrentPage + 1)}
                                        disabled={directCurrentPage === directTotalPages}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Indirect Referral Table */}
                        <div className="content-section">
                            <h3>Indirect Referrals</h3>
                            <div className="table-container">
                                <table className="referral-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Contribution</th>
                                            <th>Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {indirectPaginatedData.map((referral) => (
                                            <tr key={referral.id}>
                                                <td data-label="Name">
                                                    <div className="name-cell">{referral.name}</div>
                                                </td>
                                                <td data-label="Contribution">
                                                    <div className="contribution-cell">
                                                        ₱{referral.contribution.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td data-label="Level">
                                                    <div className={`level-badge level-${referral.level}`}>
                                                        Level {referral.level}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {indirectTotalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => handleIndirectPageChange(indirectCurrentPage - 1)}
                                        disabled={indirectCurrentPage === 1}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <div className="pagination-info">
                                        Page {indirectCurrentPage} of {indirectTotalPages}
                                    </div>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => handleIndirectPageChange(indirectCurrentPage + 1)}
                                        disabled={indirectCurrentPage === indirectTotalPages}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Withdrawal Form */}
                    <aside className="sidebar-column">
                        <div className="content-section">
                            <h3>Withdraw Commission</h3>
                            <form className="withdraw-form" onSubmit={handleWithdrawSubmit}>
                                <div className="form-group">
                                    <label htmlFor="amount">Amount (₱) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <div className="available-balance">
                                        Available: ₱{totalCommission.toLocaleString()}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="receiverName">Receiver's Full Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="receiverName"
                                        value={receiverName}
                                        onChange={(e) => setReceiverName(e.target.value)}
                                        placeholder="Enter receiver's full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="paymentMethod">Payment Method <span className="required">*</span></label>
                                    <select
                                        id="paymentMethod"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                    >
                                        <option value="">Select payment method</option>
                                        <option value="GCash">GCash</option>
                                        <option value="PayMaya">PayMaya</option>
                                        <option value="GoTyme Bank">GoTyme Bank</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="accountDetails">Account Details <span className="required">*</span></label>
                                    <textarea
                                        id="accountDetails"
                                        value={accountDetails}
                                        onChange={(e) => setAccountDetails(e.target.value)}
                                        placeholder="Enter your account number or mobile number"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <button type="submit" className="withdraw-btn">
                                    Submit Withdrawal
                                </button>
                            </form>
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

export default Commission;