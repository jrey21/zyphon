
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { getUserProfileByUid, saveUserRegistration } from '../firebase/user';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
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
    const { currentUser } = useAuth();

    useEffect(() => {
        // Parse ?ref=uid from query string
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        setRefUid(ref || undefined);
        if (ref) {
            getUserProfileByUid(ref).then((profile) => {
                if (profile) {
                    setRefOwner(profile.displayName || profile.name || profile.email || ref);
                } else {
                    setRefOwner(ref);
                }
            });
        } else {
            setRefOwner('Unknown');
        }
    }, [location.search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Create user in Firebase Auth
            const userCredential = await doCreateUserWithEmailAndPassword(form.email, form.password);
            const { user } = userCredential;
            // Save user info to Firestore
            await saveUserRegistration({
                uid: user.uid,
                name: form.name,
                email: form.email,
                phone: form.phone,
                invitedByUid: refUid
            });
            // Redirect to login with banner
            navigate('/dashboard');
        } catch (err: any) {
            alert('Registration failed. ' + (err?.message || 'Please try again.'));
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Invited By</label>
                    <input type="text" value={refOwner} readOnly />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
}

export default Register;
