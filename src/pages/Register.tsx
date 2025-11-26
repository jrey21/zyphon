import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../contexts/AuthProvider";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    // const { currentUser } = useAuth(); // Not used
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [refUid, setRefUid] = useState<string | null>(null);
    const [refOwner, setRefOwner] = useState("Unknown");
    const [error, setError] = useState("");
    const [showPassword] = useState(false); // setShowPassword not used
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get("ref");
        setRefUid(ref || null);

        if (ref) {
            supabase
                .from("users")
                .select("name")
                .eq("id", ref)
                .maybeSingle()
                .then(({ data }) => {
                    if (data?.name) setRefOwner(data.name);
                });
        }
    }, [location.search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.password) {
            setError("Please fill in all fields");
            return;
        }
        setError("");
        setIsRegistering(true);

        try {
            // Supabase signup
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
            });

            if (signUpError) {
                setError(signUpError.message);
                setIsRegistering(false);
                return;
            }

            if (data.user) {
                // Insert profile into users table
                const { error: profileError } = await supabase.from("users").insert({
                    id: data.user.id,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    role: "member",
                    invited_by: refUid,
                });

                if (profileError) {
                    setError(profileError.message);
                    setIsRegistering(false);
                    return;
                }

                // Redirect to login
                navigate("/login?registered=1");
            }
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                    <input
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={isRegistering}>
                        {isRegistering ? "Registering..." : "Register"}
                    </button>
                </form>
                <p>Invited by: {refOwner}</p>
            </div>
        </div>
    );
}

export default Register;
