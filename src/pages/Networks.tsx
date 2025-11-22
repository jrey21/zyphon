import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Networks.css';
import Footer from '../components/Footer';
import CryptoTicker from '../components/CryptoTicker';
import { useAuth } from '../contexts/authContext';
import logoImage from '../assets/img/logo.png';

interface DashboardProps {
    onLogout: () => void;
}

interface Member {
    id: number;
    name: string;
    email: string;
    dateRegistered: string;
    subscription: string;
    status: 'active' | 'inactive';
}

// Sample data - Replace with actual API data
const sampleMembers: Member[] = [
    // Active Members (20)
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        dateRegistered: '2024-01-15',
        subscription: 'Gold Plan - ₱15,000',
        status: 'active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        dateRegistered: '2024-02-20',
        subscription: 'Silver Plan - ₱8,000',
        status: 'active'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        dateRegistered: '2024-03-10',
        subscription: 'Platinum Plan - ₱30,000',
        status: 'active'
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        dateRegistered: '2024-01-28',
        subscription: 'Basic Plan - ₱3,000',
        status: 'active'
    },
    {
        id: 5,
        name: 'Christopher Lee',
        email: 'chris.lee@example.com',
        dateRegistered: '2024-04-12',
        subscription: 'Gold Plan - ₱18,000',
        status: 'active'
    },
    {
        id: 6,
        name: 'Amanda Garcia',
        email: 'amanda.g@example.com',
        dateRegistered: '2024-05-08',
        subscription: 'Platinum Plan - ₱28,000',
        status: 'active'
    },
    {
        id: 7,
        name: 'Daniel Martinez',
        email: 'daniel.m@example.com',
        dateRegistered: '2024-06-15',
        subscription: 'Silver Plan - ₱9,500',
        status: 'active'
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        dateRegistered: '2024-07-22',
        subscription: 'Gold Plan - ₱16,000',
        status: 'active'
    },
    {
        id: 9,
        name: 'James Taylor',
        email: 'james.t@example.com',
        dateRegistered: '2024-08-05',
        subscription: 'Basic Plan - ₱4,500',
        status: 'active'
    },
    {
        id: 10,
        name: 'Patricia Thomas',
        email: 'patricia.thomas@example.com',
        dateRegistered: '2024-09-14',
        subscription: 'Platinum Plan - ₱35,000',
        status: 'active'
    },
    {
        id: 11,
        name: 'Robert Jackson',
        email: 'robert.jackson@example.com',
        dateRegistered: '2024-10-01',
        subscription: 'Silver Plan - ₱7,500',
        status: 'active'
    },
    {
        id: 12,
        name: 'Jennifer White',
        email: 'jennifer.w@example.com',
        dateRegistered: '2024-10-18',
        subscription: 'Gold Plan - ₱20,000',
        status: 'active'
    },
    {
        id: 13,
        name: 'Michael Harris',
        email: 'michael.h@example.com',
        dateRegistered: '2024-11-02',
        subscription: 'Platinum Plan - ₱32,000',
        status: 'active'
    },
    {
        id: 14,
        name: 'Linda Martin',
        email: 'linda.martin@example.com',
        dateRegistered: '2024-02-28',
        subscription: 'Basic Plan - ₱3,800',
        status: 'active'
    },
    {
        id: 15,
        name: 'William Thompson',
        email: 'william.t@example.com',
        dateRegistered: '2024-03-25',
        subscription: 'Silver Plan - ₱8,800',
        status: 'active'
    },
    {
        id: 16,
        name: 'Barbara Moore',
        email: 'barbara.m@example.com',
        dateRegistered: '2024-04-30',
        subscription: 'Gold Plan - ₱17,500',
        status: 'active'
    },
    {
        id: 17,
        name: 'Richard Clark',
        email: 'richard.clark@example.com',
        dateRegistered: '2024-05-20',
        subscription: 'Platinum Plan - ₱29,000',
        status: 'active'
    },
    {
        id: 18,
        name: 'Susan Rodriguez',
        email: 'susan.r@example.com',
        dateRegistered: '2024-06-08',
        subscription: 'Basic Plan - ₱4,200',
        status: 'active'
    },
    {
        id: 19,
        name: 'Joseph Lewis',
        email: 'joseph.lewis@example.com',
        dateRegistered: '2024-07-11',
        subscription: 'Silver Plan - ₱9,000',
        status: 'active'
    },
    {
        id: 20,
        name: 'Karen Walker',
        email: 'karen.walker@example.com',
        dateRegistered: '2024-08-19',
        subscription: 'Gold Plan - ₱19,000',
        status: 'active'
    },
    // Inactive Members (20)
    {
        id: 21,
        name: 'Robert Brown',
        email: 'robert.b@example.com',
        dateRegistered: '2023-12-05',
        subscription: 'Gold Plan - ₱12,000',
        status: 'inactive'
    },
    {
        id: 22,
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        dateRegistered: '2023-11-15',
        subscription: 'Silver Plan - ₱7,000',
        status: 'inactive'
    },
    {
        id: 23,
        name: 'David Wilson',
        email: 'david.w@example.com',
        dateRegistered: '2023-10-22',
        subscription: 'Basic Plan - ₱2,500',
        status: 'inactive'
    },
    {
        id: 24,
        name: 'Nancy Hall',
        email: 'nancy.hall@example.com',
        dateRegistered: '2023-09-18',
        subscription: 'Gold Plan - ₱14,000',
        status: 'inactive'
    },
    {
        id: 25,
        name: 'Kevin Allen',
        email: 'kevin.allen@example.com',
        dateRegistered: '2023-08-25',
        subscription: 'Platinum Plan - ₱26,000',
        status: 'inactive'
    },
    {
        id: 26,
        name: 'Betty Young',
        email: 'betty.young@example.com',
        dateRegistered: '2023-07-30',
        subscription: 'Silver Plan - ₱6,500',
        status: 'inactive'
    },
    {
        id: 27,
        name: 'Jason King',
        email: 'jason.k@example.com',
        dateRegistered: '2023-06-14',
        subscription: 'Basic Plan - ₱3,200',
        status: 'inactive'
    },
    {
        id: 28,
        name: 'Helen Wright',
        email: 'helen.wright@example.com',
        dateRegistered: '2023-05-22',
        subscription: 'Gold Plan - ₱13,500',
        status: 'inactive'
    },
    {
        id: 29,
        name: 'Brian Lopez',
        email: 'brian.lopez@example.com',
        dateRegistered: '2023-04-10',
        subscription: 'Silver Plan - ₱8,200',
        status: 'inactive'
    },
    {
        id: 30,
        name: 'Dorothy Hill',
        email: 'dorothy.h@example.com',
        dateRegistered: '2023-03-05',
        subscription: 'Platinum Plan - ₱27,000',
        status: 'inactive'
    },
    {
        id: 31,
        name: 'Gary Scott',
        email: 'gary.scott@example.com',
        dateRegistered: '2023-02-18',
        subscription: 'Basic Plan - ₱2,800',
        status: 'inactive'
    },
    {
        id: 32,
        name: 'Sandra Green',
        email: 'sandra.g@example.com',
        dateRegistered: '2023-01-25',
        subscription: 'Gold Plan - ₱15,500',
        status: 'inactive'
    },
    {
        id: 33,
        name: 'Kenneth Adams',
        email: 'kenneth.adams@example.com',
        dateRegistered: '2022-12-12',
        subscription: 'Silver Plan - ₱7,800',
        status: 'inactive'
    },
    {
        id: 34,
        name: 'Ashley Baker',
        email: 'ashley.baker@example.com',
        dateRegistered: '2022-11-08',
        subscription: 'Platinum Plan - ₱31,000',
        status: 'inactive'
    },
    {
        id: 35,
        name: 'Steven Gonzalez',
        email: 'steven.g@example.com',
        dateRegistered: '2022-10-15',
        subscription: 'Basic Plan - ₱3,500',
        status: 'inactive'
    },
    {
        id: 36,
        name: 'Kimberly Nelson',
        email: 'kimberly.n@example.com',
        dateRegistered: '2022-09-20',
        subscription: 'Gold Plan - ₱16,500',
        status: 'inactive'
    },
    {
        id: 37,
        name: 'Edward Carter',
        email: 'edward.carter@example.com',
        dateRegistered: '2022-08-05',
        subscription: 'Silver Plan - ₱6,800',
        status: 'inactive'
    },
    {
        id: 38,
        name: 'Donna Mitchell',
        email: 'donna.m@example.com',
        dateRegistered: '2022-07-12',
        subscription: 'Platinum Plan - ₱28,500',
        status: 'inactive'
    },
    {
        id: 39,
        name: 'Ronald Perez',
        email: 'ronald.perez@example.com',
        dateRegistered: '2022-06-28',
        subscription: 'Basic Plan - ₱4,000',
        status: 'inactive'
    },
    {
        id: 40,
        name: 'Carol Roberts',
        email: 'carol.roberts@example.com',
        dateRegistered: '2022-05-14',
        subscription: 'Gold Plan - ₱14,800',
        status: 'inactive'
    }
];

function Networks({ onLogout }: DashboardProps) {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('Networks');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { currentUser } = useAuth();

    // Pagination and search states for active table
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeCurrentPage, setActiveCurrentPage] = useState(1);
    const [activeItemsPerPage] = useState(5);
    const [activeSortField, setActiveSortField] = useState<'name' | 'email' | 'date' | 'subscription'>('date');
    const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc'>('desc');

    // Pagination and search states for inactive table
    const [inactiveSearchTerm, setInactiveSearchTerm] = useState('');
    const [inactiveCurrentPage, setInactiveCurrentPage] = useState(1);
    const [inactiveItemsPerPage] = useState(5);
    const [inactiveSortField, setInactiveSortField] = useState<'name' | 'email' | 'date' | 'subscription'>('date');
    const [inactiveSortDirection, setInactiveSortDirection] = useState<'asc' | 'desc'>('desc');

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
        console.log('Navigate to profile settings');
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        onLogout();
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    const activeMembers = sampleMembers.filter(member => member.status === 'active');
    const inactiveMembers = sampleMembers.filter(member => member.status === 'inactive');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Helper function to get plan type from subscription string
    const getPlanType = (subscription: string): 'basic' | 'silver' | 'gold' | 'platinum' => {
        const lowerSub = subscription.toLowerCase();
        if (lowerSub.includes('basic')) return 'basic';
        if (lowerSub.includes('silver')) return 'silver';
        if (lowerSub.includes('gold')) return 'gold';
        if (lowerSub.includes('platinum')) return 'platinum';
        return 'basic'; // default
    };

    // Sorting handler for active table
    const handleActiveSort = (field: 'name' | 'email' | 'date' | 'subscription') => {
        if (activeSortField === field) {
            setActiveSortDirection(activeSortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setActiveSortField(field);
            setActiveSortDirection('asc');
        }
    };

    // Sorting handler for inactive table
    const handleInactiveSort = (field: 'name' | 'email' | 'date' | 'subscription') => {
        if (inactiveSortField === field) {
            setInactiveSortDirection(inactiveSortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setInactiveSortField(field);
            setInactiveSortDirection('asc');
        }
    };

    // Sort function
    const sortMembers = (members: Member[], sortField: string, sortDirection: string) => {
        return [...members].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortField) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'email':
                    aValue = a.email.toLowerCase();
                    bValue = b.email.toLowerCase();
                    break;
                case 'date':
                    aValue = new Date(a.dateRegistered).getTime();
                    bValue = new Date(b.dateRegistered).getTime();
                    break;
                case 'subscription':
                    aValue = a.subscription.toLowerCase();
                    bValue = b.subscription.toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Filter active members based on search term
    const filteredActiveMembers = sortMembers(
        activeMembers.filter(member =>
            member.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            member.subscription.toLowerCase().includes(activeSearchTerm.toLowerCase())
        ),
        activeSortField,
        activeSortDirection
    );

    // Filter inactive members based on search term
    const filteredInactiveMembers = sortMembers(
        inactiveMembers.filter(member =>
            member.name.toLowerCase().includes(inactiveSearchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(inactiveSearchTerm.toLowerCase()) ||
            member.subscription.toLowerCase().includes(inactiveSearchTerm.toLowerCase())
        ),
        inactiveSortField,
        inactiveSortDirection
    );

    // Pagination calculations for active table
    const activeIndexOfLastItem = activeCurrentPage * activeItemsPerPage;
    const activeIndexOfFirstItem = activeIndexOfLastItem - activeItemsPerPage;
    const currentActiveMembers = filteredActiveMembers.slice(activeIndexOfFirstItem, activeIndexOfLastItem);
    const activeTotalPages = Math.ceil(filteredActiveMembers.length / activeItemsPerPage);

    // Pagination calculations for inactive table
    const inactiveIndexOfLastItem = inactiveCurrentPage * inactiveItemsPerPage;
    const inactiveIndexOfFirstItem = inactiveIndexOfLastItem - inactiveItemsPerPage;
    const currentInactiveMembers = filteredInactiveMembers.slice(inactiveIndexOfFirstItem, inactiveIndexOfLastItem);
    const inactiveTotalPages = Math.ceil(filteredInactiveMembers.length / inactiveItemsPerPage);

    // Pagination handlers for active table
    const handleActivePreviousPage = () => {
        setActiveCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleActiveNextPage = () => {
        setActiveCurrentPage(prev => Math.min(prev + 1, activeTotalPages));
    };

    // Pagination handlers for inactive table
    const handleInactivePreviousPage = () => {
        setInactiveCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleInactiveNextPage = () => {
        setInactiveCurrentPage(prev => Math.min(prev + 1, inactiveTotalPages));
    };

    // Reset to first page when search term changes
    const handleActiveSearch = (value: string) => {
        setActiveSearchTerm(value);
        setActiveCurrentPage(1);
    };

    const handleInactiveSearch = (value: string) => {
        setInactiveSearchTerm(value);
        setInactiveCurrentPage(1);
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
                <div className="networks-wrapper">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="page-header-content">
                            <h1 className="page-title">My Networks</h1>
                            <p className="page-subtitle">Manage and track your downline members</p>
                        </div>
                        <div className="network-stats-summary">
                            <div className="stat-summary-item">
                                <span className="stat-summary-value">{activeMembers.length}</span>
                                <span className="stat-summary-label">Active</span>
                            </div>
                            <div className="stat-divider-vertical"></div>
                            <div className="stat-summary-item">
                                <span className="stat-summary-value">{inactiveMembers.length}</span>
                                <span className="stat-summary-label">Inactive</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Downline Table */}
                    <div className="table-section">
                        <div className="table-header">
                            <h2 className="table-title">
                                <span className="status-badge active">●</span>
                                Active Downline
                            </h2>
                            <span className="table-count">{filteredActiveMembers.length} members</span>
                        </div>
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search by name, email, or subscription..."
                                    value={activeSearchTerm}
                                    onChange={(e) => handleActiveSearch(e.target.value)}
                                />
                                {activeSearchTerm && (
                                    <button
                                        className="search-clear"
                                        onClick={() => handleActiveSearch('')}
                                        title="Clear search"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="sort-dropdown-wrapper">
                                <label className="sort-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M7 12h10"></path>
                                        <path d="M10 18h4"></path>
                                    </svg>
                                    Sort by:
                                </label>
                                <select
                                    className="sort-select"
                                    value={`${activeSortField}-${activeSortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] = e.target.value.split('-') as ['name' | 'email' | 'date' | 'subscription', 'asc' | 'desc'];
                                        setActiveSortField(field);
                                        setActiveSortDirection(direction);
                                    }}
                                >
                                    <option value="date-desc">Date (Newest First)</option>
                                    <option value="date-asc">Date (Oldest First)</option>
                                    <option value="subscription-asc">Subscription (A-Z)</option>
                                    <option value="subscription-desc">Subscription (Z-A)</option>
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-container">
                            <div className="table-responsive">
                                <table className="members-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleActiveSort('name')} className="sortable">
                                                <div className="th-content">
                                                    <span>Member Name</span>
                                                    <span className="sort-icon">
                                                        {activeSortField === 'name' && (
                                                            activeSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th onClick={() => handleActiveSort('email')} className="sortable">
                                                <div className="th-content">
                                                    <span>Email</span>
                                                    <span className="sort-icon">
                                                        {activeSortField === 'email' && (
                                                            activeSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th onClick={() => handleActiveSort('date')} className="sortable">
                                                <div className="th-content">
                                                    <span>Date Registered</span>
                                                    <span className="sort-icon">
                                                        {activeSortField === 'date' && (
                                                            activeSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th onClick={() => handleActiveSort('subscription')} className="sortable">
                                                <div className="th-content">
                                                    <span>Subscription</span>
                                                    <span className="sort-icon">
                                                        {activeSortField === 'subscription' && (
                                                            activeSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentActiveMembers.length > 0 ? (
                                            currentActiveMembers.map((member) => (
                                                <tr key={member.id}>
                                                    <td>
                                                        <div className="member-name">
                                                            <div className="member-avatar">{member.name.charAt(0)}</div>
                                                            <span>{member.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>{member.email}</td>
                                                    <td>{formatDate(member.dateRegistered)}</td>
                                                    <td>
                                                        <span className={`subscription-badge plan-${getPlanType(member.subscription)}`}>
                                                            {member.subscription}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="empty-state">
                                                    <div className="empty-state-content">
                                                        <span className="empty-icon">🔍</span>
                                                        <p>{activeSearchTerm ? 'No members found matching your search' : 'No active members yet'}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {filteredActiveMembers.length > 0 && (
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Showing {activeIndexOfFirstItem + 1} to {Math.min(activeIndexOfLastItem, filteredActiveMembers.length)} of {filteredActiveMembers.length} members
                                </div>
                                <div className="pagination-controls">
                                    <button
                                        className="pagination-btn"
                                        onClick={handleActivePreviousPage}
                                        disabled={activeCurrentPage === 1}
                                        title="Previous page"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                        Previous
                                    </button>
                                    <span className="pagination-text">
                                        Page {activeCurrentPage} of {activeTotalPages}
                                    </span>
                                    <button
                                        className="pagination-btn"
                                        onClick={handleActiveNextPage}
                                        disabled={activeCurrentPage === activeTotalPages}
                                        title="Next page"
                                    >
                                        Next
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inactive Downline Table */}
                    <div className="table-section">
                        <div className="table-header">
                            <h2 className="table-title">
                                <span className="status-badge inactive">●</span>
                                Inactive Downline
                            </h2>
                            <span className="table-count">{filteredInactiveMembers.length} members</span>
                        </div>
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search by name, email, or subscription..."
                                    value={inactiveSearchTerm}
                                    onChange={(e) => handleInactiveSearch(e.target.value)}
                                />
                                {inactiveSearchTerm && (
                                    <button
                                        className="search-clear"
                                        onClick={() => handleInactiveSearch('')}
                                        title="Clear search"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="sort-dropdown-wrapper">
                                <label className="sort-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M7 12h10"></path>
                                        <path d="M10 18h4"></path>
                                    </svg>
                                    Sort by:
                                </label>
                                <select
                                    className="sort-select"
                                    value={`${inactiveSortField}-${inactiveSortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] = e.target.value.split('-') as ['name' | 'email' | 'date', 'asc' | 'desc'];
                                        setInactiveSortField(field);
                                        setInactiveSortDirection(direction);
                                    }}
                                >
                                    <option value="date-desc">Date (Newest First)</option>
                                    <option value="date-asc">Date (Oldest First)</option>
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-container">
                            <div className="table-responsive">
                                <table className="members-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleInactiveSort('name')} className="sortable">
                                                <div className="th-content">
                                                    <span>Member Name</span>
                                                    <span className="sort-icon">
                                                        {inactiveSortField === 'name' && (
                                                            inactiveSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th onClick={() => handleInactiveSort('email')} className="sortable">
                                                <div className="th-content">
                                                    <span>Email</span>
                                                    <span className="sort-icon">
                                                        {inactiveSortField === 'email' && (
                                                            inactiveSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th onClick={() => handleInactiveSort('date')} className="sortable">
                                                <div className="th-content">
                                                    <span>Date Registered</span>
                                                    <span className="sort-icon">
                                                        {inactiveSortField === 'date' && (
                                                            inactiveSortDirection === 'asc' ? '↑' : '↓'
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentInactiveMembers.length > 0 ? (
                                            currentInactiveMembers.map((member) => (
                                                <tr key={member.id}>
                                                    <td>
                                                        <div className="member-name">
                                                            <div className="member-avatar inactive-avatar">{member.name.charAt(0)}</div>
                                                            <span>{member.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>{member.email}</td>
                                                    <td>{formatDate(member.dateRegistered)}</td>
                                                    <td>
                                                        <button className="ping-btn" title="Send message to member">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                            </svg>
                                                            Ping
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="empty-state">
                                                    <div className="empty-state-content">
                                                        <span className="empty-icon">🔍</span>
                                                        <p>{inactiveSearchTerm ? 'No members found matching your search' : 'No inactive members'}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {filteredInactiveMembers.length > 0 && (
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Showing {inactiveIndexOfFirstItem + 1} to {Math.min(inactiveIndexOfLastItem, filteredInactiveMembers.length)} of {filteredInactiveMembers.length} members
                                </div>
                                <div className="pagination-controls">
                                    <button
                                        className="pagination-btn"
                                        onClick={handleInactivePreviousPage}
                                        disabled={inactiveCurrentPage === 1}
                                        title="Previous page"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                        Previous
                                    </button>
                                    <span className="pagination-text">
                                        Page {inactiveCurrentPage} of {inactiveTotalPages}
                                    </span>
                                    <button
                                        className="pagination-btn"
                                        onClick={handleInactiveNextPage}
                                        disabled={inactiveCurrentPage === inactiveTotalPages}
                                        title="Next page"
                                    >
                                        Next
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
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

export default Networks;
