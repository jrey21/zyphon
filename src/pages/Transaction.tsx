import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Transaction.css';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/authContext';
import logoImage from '../assets/img/logo.png';

interface TransactionProps {
    onLogout: () => void;
}

function Transaction({ onLogout }: TransactionProps) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [selectedTab, setSelectedTab] = useState('transactions');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [activeTransactionType, setActiveTransactionType] = useState<'withdraw' | 'deposit'>('withdraw');

    // Form States
    const [amount, setAmount] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [accountDetails, setAccountDetails] = useState('');
    const [fundseller, setFundseller] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [receipt, setReceipt] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

    // Available balance (mock data)
    const availableBalance = 24200;
    const pendingWithdrawal = 8500;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // Validation
        const amountNum = parseFloat(amount);
        if (!amount || isNaN(amountNum) || amountNum <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid amount.' });
            setIsSubmitting(false);
            return;
        }

        if (activeTransactionType === 'withdraw') {
            if (amountNum > availableBalance) {
                setMessage({ type: 'error', text: 'Insufficient balance.' });
                setIsSubmitting(false);
                return;
            }
            if (amountNum < 100) {
                setMessage({ type: 'error', text: 'Minimum withdrawal amount is ₱100.' });
                setIsSubmitting(false);
                return;
            }
        }

        if (activeTransactionType === 'deposit' && amountNum < 100) {
            setMessage({ type: 'error', text: 'Minimum deposit amount is ₱100.' });
            setIsSubmitting(false);
            return;
        }

        // Withdraw-specific validations
        if (activeTransactionType === 'withdraw') {
            if (!receiverName) {
                setMessage({ type: 'error', text: 'Please provide receiver\'s full name.' });
                setIsSubmitting(false);
                return;
            }

            if (!paymentMethod) {
                setMessage({ type: 'error', text: 'Please select a payment method.' });
                setIsSubmitting(false);
                return;
            }

            if (!accountDetails) {
                setMessage({ type: 'error', text: 'Please provide account details.' });
                setIsSubmitting(false);
                return;
            }
        }

        // Deposit-specific validations
        if (activeTransactionType === 'deposit') {
            if (!fundseller) {
                setMessage({ type: 'error', text: 'Please provide fundseller name.' });
                setIsSubmitting(false);
                return;
            }

            if (!referenceNumber) {
                setMessage({ type: 'error', text: 'Please provide reference number.' });
                setIsSubmitting(false);
                return;
            }

            if (!receipt) {
                setMessage({ type: 'error', text: 'Please upload payment receipt.' });
                setIsSubmitting(false);
                return;
            }
        }

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setMessage({
                type: 'success',
                text: `${activeTransactionType === 'withdraw' ? 'Withdrawal' : 'Deposit'} request submitted successfully! You will receive a confirmation shortly.`
            });
            setAmount('');
            setReceiverName('');
            setPaymentMethod('');
            setAccountDetails('');
            setFundseller('');
            setReferenceNumber('');
            setReceipt(null);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to process request. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0
        }).format(value);
    };

    // Transaction history (mock data)
    const transactionHistory = [
        { id: 1, type: 'Withdrawal', amount: 5000, status: 'Completed', date: 'Nov 20, 2025', method: 'GCash' },
        { id: 2, type: 'Deposit', amount: 10000, status: 'Completed', date: 'Nov 18, 2025', method: 'Bank Transfer' },
        { id: 3, type: 'Withdrawal', amount: 3000, status: 'Processing', date: 'Nov 22, 2025', method: 'PayMaya' },
        { id: 4, type: 'Deposit', amount: 15000, status: 'Completed', date: 'Nov 15, 2025', method: 'GCash' },
        { id: 5, type: 'Withdrawal', amount: 2500, status: 'Completed', date: 'Nov 10, 2025', method: 'Bank Transfer' }
    ];

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="transaction-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img src={logoImage} alt="Zyphon Capital" />
                    </div>
                    <nav className="nav">
                        {/* ...existing code... */}
                    </nav>
                    <div className="user-section">
                        {/* ...existing code... */}
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {/* ...existing code... */}

            <main className="main-content">
                <div className="transaction-wrapper">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="page-header-content mobile-header-group">
                            <button className="back-button" onClick={handleBack} title="Go back">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="mobile-header-titles">
                                <h1 className="page-title">Withdraw / Deposit</h1>
                                <p className="page-subtitle">Manage your funds with ease and security</p>
                            </div>
                        </div>
                    </div>

                    {/* Balance Cards */}
                    <div className="balance-cards">
                        <div className="balance-card">
                            <div className="balance-icon">💰</div>
                            <div className="balance-info">
                                <span className="balance-label">Available Balance</span>
                                <span className="balance-amount">{formatCurrency(availableBalance)}</span>
                            </div>
                        </div>
                        <div className="balance-card pending">
                            <div className="balance-icon">⏳</div>
                            <div className="balance-info">
                                <span className="balance-label">Pending Withdrawal</span>
                                <span className="balance-amount">{formatCurrency(pendingWithdrawal)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Form Section */}
                    <div className="transaction-content">
                        <div className="transaction-form-wrapper">
                            <div className="transaction-type-tabs">
                                <button
                                    className={`transaction-type-tab ${activeTransactionType === 'withdraw' ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTransactionType('withdraw');
                                        setMessage(null);
                                        setAmount('');
                                        setReceiverName('');
                                        setPaymentMethod('');
                                        setAccountDetails('');
                                        setFundseller('');
                                        setReferenceNumber('');
                                        setReceipt(null);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="17 11 12 6 7 11"></polyline>
                                        <polyline points="17 18 12 13 7 18"></polyline>
                                    </svg>
                                    <span>Withdraw</span>
                                </button>
                                <button
                                    className={`transaction-type-tab ${activeTransactionType === 'deposit' ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTransactionType('deposit');
                                        setMessage(null);
                                        setAmount('');
                                        setReceiverName('');
                                        setPaymentMethod('');
                                        setAccountDetails('');
                                        setFundseller('');
                                        setReferenceNumber('');
                                        setReceipt(null);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="7 13 12 18 17 13"></polyline>
                                        <polyline points="7 6 12 11 17 6"></polyline>
                                    </svg>
                                    <span>Deposit</span>
                                </button>
                            </div>

                            <div className="transaction-form-container">
                                <h2 className="form-title">
                                    {activeTransactionType === 'withdraw' ? 'Withdraw Funds' : 'Deposit Funds'}
                                </h2>
                                <p className="form-description">
                                    {activeTransactionType === 'withdraw'
                                        ? 'Request a withdrawal from your available balance'
                                        : 'Add funds to your investment account'}
                                </p>

                                {activeTransactionType === 'withdraw' && (
                                    <div className="message" style={{ backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' }}>
                                        ⏰ Withdrawals are only available on Mondays between 1:00 AM and 11:00 PM
                                    </div>
                                )}

                                {message && (
                                    <div className={`message ${message.type}`}>
                                        {message.text}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="transaction-form">
                                    {activeTransactionType === 'withdraw' ? (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="amount">
                                                    Amount (₱) <span className="required">*</span>
                                                </label>
                                                <div className="input-with-prefix">

                                                    <input
                                                        id="amount"
                                                        type="number"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                        required
                                                    />
                                                </div>
                                                <p className="field-hint">
                                                    Minimum: ₱100 | Available: {formatCurrency(availableBalance)}
                                                </p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="receiverName">
                                                    Receiver's Full Name <span className="required">*</span>
                                                </label>
                                                <input
                                                    id="receiverName"
                                                    type="text"
                                                    value={receiverName}
                                                    onChange={(e) => setReceiverName(e.target.value)}
                                                    placeholder="Enter receiver's full name"
                                                    required
                                                />
                                                <p className="field-hint">
                                                    Enter the full name of the account holder
                                                </p>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="paymentMethod">
                                                    Payment Method <span className="required">*</span>
                                                </label>
                                                <select
                                                    id="paymentMethod"
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select payment method</option>
                                                    <option value="gcash">GCash</option>
                                                    <option value="paymaya">PayMaya</option>
                                                    <option value="gotyme">GoTyme Bank</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="accountDetails">
                                                    Account Details <span className="required">*</span>
                                                </label>
                                                <input
                                                    id="accountDetails"
                                                    type="text"
                                                    value={accountDetails}
                                                    onChange={(e) => setAccountDetails(e.target.value)}
                                                    placeholder={
                                                        paymentMethod === 'gotyme' || paymentMethod === 'cimb'
                                                            ? 'Bank Account Number'
                                                            : 'Mobile Number / Account Number'
                                                    }
                                                    required
                                                />
                                                <p className="field-hint">
                                                    {paymentMethod === 'gotyme' || paymentMethod === 'cimb'
                                                        ? 'Enter your bank account number'
                                                        : 'Enter your mobile number or account number'}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Official Mode of Payment */}
                                            <div className="payment-info-section">
                                                <h3 className="payment-info-title">Official Mode of Payment</h3>

                                                <div>
                                                    <div className="payment-account">
                                                        <div className="payment-account-header">
                                                            <span className="payment-bank">GOTYME</span>
                                                        </div>
                                                        <div className="payment-account-name">Rosalie Latorre</div>
                                                        <button type="button" className="copy-btn" onClick={() => {
                                                            navigator.clipboard.writeText('013476321979');
                                                            setMessage({ type: 'success', text: 'Account number copied to clipboard!' });
                                                            setCopiedAccount('gotyme');
                                                            setTimeout(() => {
                                                                setMessage(null);
                                                                setCopiedAccount(null);
                                                            }, 2000);
                                                        }}>
                                                            {copiedAccount === 'gotyme' ? '✓ Copied' : '📋 Copy Account Number'}
                                                        </button>
                                                    </div>

                                                    <div className="payment-account">
                                                        <div className="payment-account-header">
                                                            <span className="payment-bank">CIMB Bank</span>
                                                        </div>
                                                        <div className="payment-account-name">Raymond Gavino Larona</div>
                                                        <button type="button" className="copy-btn" onClick={() => {
                                                            navigator.clipboard.writeText('2086 7105 2778 14');
                                                            setMessage({ type: 'success', text: 'Account number copied to clipboard!' });
                                                            setCopiedAccount('cimb');
                                                            setTimeout(() => {
                                                                setMessage(null);
                                                                setCopiedAccount(null);
                                                            }, 2000);
                                                        }}>
                                                            {copiedAccount === 'cimb' ? '✓ Copied' : '📋 Copy Account Number'}
                                                        </button>
                                                    </div>

                                                    <div className="payment-account">
                                                        <div className="payment-account-header">
                                                            <span className="payment-bank">GCASH</span>
                                                        </div>
                                                        <div className="payment-account-name">Joel Rugay</div>
                                                        <button type="button" className="copy-btn" onClick={() => {
                                                            navigator.clipboard.writeText('09308953447');
                                                            setMessage({ type: 'success', text: 'Account number copied to clipboard!' });
                                                            setCopiedAccount('gcash');
                                                            setTimeout(() => {
                                                                setMessage(null);
                                                                setCopiedAccount(null);
                                                            }, 2000);
                                                        }}>
                                                            {copiedAccount === 'gcash' ? '✓ Copied' : '📋 Copy Account Number'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Request Fund Section */}
                                            <div className="request-fund-section">
                                                <h3 className="request-fund-title">Request Fund</h3>

                                                <div className="form-group">
                                                    <label htmlFor="fundseller">Fundseller <span className="required">*</span></label>
                                                    <select
                                                        id="fundseller"
                                                        value={fundseller}
                                                        onChange={(e) => setFundseller(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select fundseller</option>
                                                        <option value="Rosalie Latorre">Rosalie Latorre</option>
                                                        <option value="Raymond Gavino Larona">Raymond Gavino Larona</option>
                                                        <option value="Joel Rugay">Joel Rugay</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="requestAmount">Request Amount <span className="required">*</span></label>
                                                    <div className="input-with-prefix">
                                                        <input
                                                            id="requestAmount"
                                                            type="number"
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            placeholder="0.00"
                                                            step="0.01"
                                                            min="0"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="referenceNumber">Reference Number <span className="required">*</span></label>
                                                    <input
                                                        id="referenceNumber"
                                                        type="text"
                                                        value={referenceNumber}
                                                        onChange={(e) => setReferenceNumber(e.target.value)}
                                                        placeholder="Enter reference number"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="receipt">Upload Receipt <span className="required">*</span></label>
                                                    <input
                                                        id="receipt"
                                                        type="file"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                                                        required
                                                    />
                                                    <p className="field-hint">Upload payment receipt (JPG, PNG, or PDF)</p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? 'Processing...'
                                                : activeTransactionType === 'withdraw'
                                                    ? 'Submit Withdrawal'
                                                    : 'Submit Request'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="transaction-history-wrapper">
                            <div className="history-header">
                                <h3 className="history-title">Recent Transactions</h3>
                                <a
                                    href="/all-transactions"
                                    className="show-all-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/all-transactions');
                                    }}
                                >
                                    Show All transactions
                                </a>
                            </div>
                            <div className="transaction-list">
                                {transactionHistory.map((transaction) => (
                                    <div key={transaction.id} className="transaction-item">
                                        <div className="transaction-item-icon">
                                            {transaction.type === 'Withdrawal' ? '↑' : '↓'}
                                        </div>
                                        <div className="transaction-item-details">
                                            <div className="transaction-item-type">{transaction.type}</div>
                                            <div className="transaction-item-date">{transaction.date}</div>
                                            <div className="transaction-item-method">{transaction.method}</div>
                                        </div>
                                        <div className="transaction-item-right">
                                            <div className={`transaction-item-amount ${transaction.type.toLowerCase()}`}>
                                                {transaction.type === 'Withdrawal' ? '-' : '+'}
                                                {formatCurrency(transaction.amount)}
                                            </div>
                                            <div className={`transaction-item-status status-${transaction.status.toLowerCase()}`}>
                                                {transaction.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

export default Transaction;
