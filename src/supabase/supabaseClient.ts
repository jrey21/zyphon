import { createClient } from "@supabase/supabase-js";

// Load from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth signup
export async function registerWithEmail(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
}

// Save user profile after signup
export async function saveUserProfile(data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    invited_by?: string | null;
}) {
    return await supabase.from("users").insert({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: "member", // default
        invited_by: data.invited_by || null
    });
}

// Fetch user profile by ID
export async function getUserProfileById(id: string) {
    return supabase.from("users").select("*").eq("id", id).maybeSingle();
}
