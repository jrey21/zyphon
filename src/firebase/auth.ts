import { supabase } from '../supabase/supabaseClient';

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
};

export const doSignInWithGoogle = async () => {
    // Supabase Google OAuth
    return supabase.auth.signInWithOAuth({ provider: 'google' });
};

export const doSignOut = async () => {
    return supabase.auth.signOut();
};