import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllTransactions.css';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/authContext';
import logoImage from '../assets/img/logo.png';

interface AllTransactionsProps {
    onLogout: () => void;
}

function AllTransactions({ onLogout }: AllTransactionsProps) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [selectedTab, setSelectedTab] = useState('transactions');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [activeSection, setActiveSection] = useState<'deposit' | 'withdrawal'>('deposit');

    // Pagination states
    const [approvedPage, setApprovedPage] = useState(1);
    const [declinedPage, setDeclinedPage] = useState(1);
    const [withdrawalPage, setWithdrawalPage] = useState(1);
    const itemsPerPage = 10;

    // Minimize states
    const [isApprovedMinimized, setIsApprovedMinimized] = useState(false);
    const [isDeclinedMinimized, setIsDeclinedMinimized] = useState(false);
    const [isWithdrawalMinimized, setIsWithdrawalMinimized] = useState(false);

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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0
        }).format(value);
    };

    // Mock data for Approved Fund (Deposit History)
    const approvedFunds = [
        { id: 1, fullname: 'Juan Dela Cruz', requestFund: 10000, date: 'Nov 20, 2025', status: 'Approved' },
        { id: 2, fullname: 'Maria Santos', requestFund: 15000, date: 'Nov 18, 2025', status: 'Approved' },
        { id: 3, fullname: 'Pedro Reyes', requestFund: 8000, date: 'Nov 15, 2025', status: 'Approved' },
        { id: 4, fullname: 'Ana Garcia', requestFund: 12000, date: 'Nov 10, 2025', status: 'Approved' },
        { id: 5, fullname: 'Jose Mendoza', requestFund: 20000, date: 'Nov 8, 2025', status: 'Approved' },
        { id: 6, fullname: 'Ricardo Santos', requestFund: 9000, date: 'Nov 5, 2025', status: 'Approved' },
        { id: 7, fullname: 'Elena Rodriguez', requestFund: 11000, date: 'Nov 3, 2025', status: 'Approved' },
        { id: 8, fullname: 'Miguel Torres', requestFund: 13000, date: 'Nov 1, 2025', status: 'Approved' },
        { id: 9, fullname: 'Sofia Gonzalez', requestFund: 16000, date: 'Oct 28, 2025', status: 'Approved' },
        { id: 10, fullname: 'Diego Martinez', requestFund: 14000, date: 'Oct 25, 2025', status: 'Approved' },
        { id: 11, fullname: 'Carmen Lopez', requestFund: 7500, date: 'Oct 22, 2025', status: 'Approved' },
        { id: 12, fullname: 'Luis Hernandez', requestFund: 18000, date: 'Oct 20, 2025', status: 'Approved' },
    ];

    // Mock data for Declined Fund (Deposit History)
    const declinedFunds = [
        { id: 1, name: 'Carlos Ramirez', requestFund: 5000, dateDeclined: 'Nov 19, 2025', reason: 'Insufficient documentation' },
        { id: 2, name: 'Lisa Fernandez', requestFund: 7500, dateDeclined: 'Nov 16, 2025', reason: 'Invalid payment proof' },
        { id: 3, name: 'Roberto Cruz', requestFund: 10000, dateDeclined: 'Nov 12, 2025', reason: 'Account verification failed' },
        { id: 4, name: 'Angela Morales', requestFund: 6000, dateDeclined: 'Nov 9, 2025', reason: 'Duplicate request' },
        { id: 5, name: 'Fernando Silva', requestFund: 8500, dateDeclined: 'Nov 6, 2025', reason: 'Incomplete information' },
        { id: 6, name: 'Patricia Ramos', requestFund: 9500, dateDeclined: 'Nov 2, 2025', reason: 'Account mismatch' },
        { id: 7, name: 'Gabriel Reyes', requestFund: 5500, dateDeclined: 'Oct 30, 2025', reason: 'Expired documents' },
        { id: 8, name: 'Isabella Cruz', requestFund: 7000, dateDeclined: 'Oct 27, 2025', reason: 'Unverified source' },
        { id: 9, name: 'Antonio Diaz', requestFund: 11000, dateDeclined: 'Oct 24, 2025', reason: 'Policy violation' },
        { id: 10, name: 'Valentina Santos', requestFund: 6500, dateDeclined: 'Oct 21, 2025', reason: 'Pending review' },
        { id: 11, name: 'Mateo Garcia', requestFund: 8000, dateDeclined: 'Oct 18, 2025', reason: 'Insufficient documentation' },
    ];

    // Mock data for Withdrawal History
    const withdrawalHistory = [
        { id: 1, mop: 'GCash', fullnameReceiver: 'Juan Dela Cruz', phoneReceiver: '09171234567', withdrawAmount: 5000, deducted: 250, dateRequest: 'Nov 20, 2025', status: 'Completed' },
        { id: 2, mop: 'Bank Transfer', fullnameReceiver: 'Maria Santos', phoneReceiver: '09181234567', withdrawAmount: 10000, deducted: 500, dateRequest: 'Nov 18, 2025', status: 'Completed' },
        { id: 3, mop: 'PayMaya', fullnameReceiver: 'Pedro Reyes', phoneReceiver: '09191234567', withdrawAmount: 3000, deducted: 150, dateRequest: 'Nov 22, 2025', status: 'Processing' },
        { id: 4, mop: 'GCash', fullnameReceiver: 'Ana Garcia', phoneReceiver: '09201234567', withdrawAmount: 7500, deducted: 375, dateRequest: 'Nov 15, 2025', status: 'Completed' },
        { id: 5, mop: 'Bank Transfer', fullnameReceiver: 'Jose Mendoza', phoneReceiver: '09211234567', withdrawAmount: 15000, deducted: 750, dateRequest: 'Nov 10, 2025', status: 'Completed' },
        { id: 6, mop: 'GCash', fullnameReceiver: 'Ricardo Santos', phoneReceiver: '09221234567', withdrawAmount: 4500, deducted: 225, dateRequest: 'Nov 8, 2025', status: 'Completed' },
        { id: 7, mop: 'PayMaya', fullnameReceiver: 'Elena Rodriguez', phoneReceiver: '09231234567', withdrawAmount: 6000, deducted: 300, dateRequest: 'Nov 5, 2025', status: 'Completed' },
        { id: 8, mop: 'Bank Transfer', fullnameReceiver: 'Miguel Torres', phoneReceiver: '09241234567', withdrawAmount: 8000, deducted: 400, dateRequest: 'Nov 2, 2025', status: 'Completed' },
        { id: 9, mop: 'GCash', fullnameReceiver: 'Sofia Gonzalez', phoneReceiver: '09251234567', withdrawAmount: 5500, deducted: 275, dateRequest: 'Oct 30, 2025', status: 'Completed' },
        { id: 10, mop: 'PayMaya', fullnameReceiver: 'Diego Martinez', phoneReceiver: '09261234567', withdrawAmount: 9000, deducted: 450, dateRequest: 'Oct 27, 2025', status: 'Completed' },
        { id: 11, mop: 'Bank Transfer', fullnameReceiver: 'Carmen Lopez', phoneReceiver: '09271234567', withdrawAmount: 12000, deducted: 600, dateRequest: 'Oct 25, 2025', status: 'Completed' },
        { id: 12, mop: 'GCash', fullnameReceiver: 'Luis Hernandez', phoneReceiver: '09281234567', withdrawAmount: 4000, deducted: 200, dateRequest: 'Oct 22, 2025', status: 'Processing' },
    ];

    // Pagination logic
    const paginateData = <T,>(data: T[], page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const getTotalPages = (dataLength: number) => Math.ceil(dataLength / itemsPerPage);

    const paginatedApprovedFunds = paginateData(approvedFunds, approvedPage);
    const paginatedDeclinedFunds = paginateData(declinedFunds, declinedPage);
    const paginatedWithdrawalHistory = paginateData(withdrawalHistory, withdrawalPage);

    return (
        <div className="all-transactions-container">
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

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="all-transactions-page">
                        <div className="page-header">
                            <div className="page-header-left">
                                <button className="back-btn" onClick={() => navigate('/transactions')}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h1 className="page-title">Transaction History</h1>
                            </div>
                        </div>

                        {/* Section Tabs */}
                        <div className="section-tabs">
                            <button
                                className={`section-tab ${activeSection === 'deposit' ? 'active' : ''}`}
                                onClick={() => setActiveSection('deposit')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                                <span>Deposit History</span>
                            </button>
                            <button
                                className={`section-tab ${activeSection === 'withdrawal' ? 'active' : ''}`}
                                onClick={() => setActiveSection('withdrawal')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                                <span>Withdrawal History</span>
                            </button>
                        </div>

                        {/* Deposit History Section */}
                        {activeSection === 'deposit' && (
                            <div className="history-section">
                                {/* Approved Fund Table */}
                                <div className="table-section">
                                    <div className="table-header">
                                        <h3 className="table-title">Approved Fund</h3>
                                        <button
                                            className="minimize-btn"
                                            onClick={() => setIsApprovedMinimized(!isApprovedMinimized)}
                                            title={isApprovedMinimized ? "Expand" : "Minimize"}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ transform: isApprovedMinimized ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                                            >
                                                <polyline points="18 15 12 9 6 15"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                    {!isApprovedMinimized && (
                                        <>
                                            <div className="transactions-table-wrapper">
                                                <table className="transactions-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Fullname</th>
                                                            <th>Request Fund</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedApprovedFunds.map((fund) => (
                                                            <tr key={fund.id}>
                                                                <td className="fullname-col">{fund.fullname}</td>
                                                                <td className="amount-col deposit">
                                                                    {formatCurrency(fund.requestFund)}
                                                                </td>
                                                                <td className="date-col">{fund.date}</td>
                                                                <td>
                                                                    <span className="status-badge status-approved">
                                                                        {fund.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="pagination">
                                                <button
                                                    className="pagination-btn"
                                                    onClick={() => setApprovedPage(prev => Math.max(1, prev - 1))}
                                                    disabled={approvedPage === 1}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="15 18 9 12 15 6"></polyline>
                                                    </svg>
                                                    Previous
                                                </button>
                                                <span className="pagination-info">
                                                    Page {approvedPage} of {getTotalPages(approvedFunds.length)}
                                                </span>
                                                <button
                                                    className="pagination-btn"
                                                    onClick={() => setApprovedPage(prev => Math.min(getTotalPages(approvedFunds.length), prev + 1))}
                                                    disabled={approvedPage === getTotalPages(approvedFunds.length)}
                                                >
                                                    Next
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Declined Fund Table */}
                                <div className="table-section">
                                    <h3 className="table-title">Declined Fund</h3>
                                    <div className="transactions-table-wrapper">
                                        <table className="transactions-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Request Fund</th>
                                                    <th>Date Declined</th>
                                                    <th>Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedDeclinedFunds.map((fund) => (
                                                    <tr key={fund.id}>
                                                        <td className="fullname-col">{fund.name}</td>
                                                        <td className="amount-col">
                                                            {formatCurrency(fund.requestFund)}
                                                        </td>
                                                        <td className="date-col">{fund.dateDeclined}</td>
                                                        <td className="reason-col">{fund.reason}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pagination">
                                        <button
                                            className="pagination-btn"
                                            onClick={() => setDeclinedPage(prev => Math.max(1, prev - 1))}
                                            disabled={declinedPage === 1}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6"></polyline>
                                            </svg>
                                            Previous
                                        </button>
                                        <span className="pagination-info">
                                            Page {declinedPage} of {getTotalPages(declinedFunds.length)}
                                        </span>
                                        <button
                                            className="pagination-btn"
                                            onClick={() => setDeclinedPage(prev => Math.min(getTotalPages(declinedFunds.length), prev + 1))}
                                            disabled={declinedPage === getTotalPages(declinedFunds.length)}
                                        >
                                            Next
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Withdrawal History Section */}
                        {activeSection === 'withdrawal' && (
                            <div className="history-section">
                                <div className="table-section">
                                    <div className="table-header">
                                        <h3 className="table-title">Withdrawal Requests</h3>
                                        <button
                                            className="minimize-btn"
                                            onClick={() => setIsWithdrawalMinimized(!isWithdrawalMinimized)}
                                            title={isWithdrawalMinimized ? "Expand" : "Minimize"}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{ transform: isWithdrawalMinimized ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                                            >
                                                <polyline points="18 15 12 9 6 15"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                    {!isWithdrawalMinimized && (
                                        <>
                                            <div className="transactions-table-wrapper">
                                                <table className="transactions-table withdrawal-table">
                                                    <thead>
                                                        <tr>
                                                            <th>MOP</th>
                                                            <th>Fullname Receiver</th>
                                                            <th>Phone No. Receiver</th>
                                                            <th>Withdraw Amount</th>
                                                            <th>Deducted 5%</th>
                                                            <th>Date Request</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedWithdrawalHistory.map((withdrawal) => (
                                                            <tr key={withdrawal.id}>
                                                                <td className="mop-col">{withdrawal.mop}</td>
                                                                <td className="fullname-col">{withdrawal.fullnameReceiver}</td>
                                                                <td className="phone-col">{withdrawal.phoneReceiver}</td>
                                                                <td className="amount-col withdrawal">
                                                                    {formatCurrency(withdrawal.withdrawAmount)}
                                                                </td>
                                                                <td className="deducted-col">
                                                                    {formatCurrency(withdrawal.deducted)}
                                                                </td>
                                                                <td className="date-col">{withdrawal.dateRequest}</td>
                                                                <td>
                                                                    <span className={`status-badge status-${withdrawal.status.toLowerCase()}`}>
                                                                        {withdrawal.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="pagination">
                                                <button
                                                    className="pagination-btn"
                                                    onClick={() => setWithdrawalPage(prev => Math.max(1, prev - 1))}
                                                    disabled={withdrawalPage === 1}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="15 18 9 12 15 6"></polyline>
                                                    </svg>
                                                    Previous
                                                </button>
                                                <span className="pagination-info">
                                                    Page {withdrawalPage} of {getTotalPages(withdrawalHistory.length)}
                                                </span>
                                                <button
                                                    className="pagination-btn"
                                                    onClick={() => setWithdrawalPage(prev => Math.min(getTotalPages(withdrawalHistory.length), prev + 1))}
                                                    disabled={withdrawalPage === getTotalPages(withdrawalHistory.length)}
                                                >
                                                    Next
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
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
                    href="/transactions"
                    className="mobile-nav-item active"
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab('transactions');
                        navigate('/transactions');
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>Transactions</span>
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
            </nav>

            <Footer />
        </div>
    );
}

export default AllTransactions;
