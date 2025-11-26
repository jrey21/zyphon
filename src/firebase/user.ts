import { supabase } from '../supabase/supabaseClient';

export async function getUserProfileByUid(uid: string) {
    if (!uid) return null;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', uid)
        .single();
    if (error || !data) return null;
    return data;
}

export async function updateUserDisplayName(uid: string, displayName: string) {
    if (!uid) return false;
    const { error } = await supabase
        .from('users')
        .update({ name: displayName })
        .eq('uid', uid);
    return !error;
}

export async function saveUserRegistration({ uid, name, email, phone, invitedByUid }: {
    uid: string;
    name: string;
    email: string;
    phone: string;
    invitedByUid?: string;
}) {
    const userData = {
        uid,
        name,
        email,
        phone,
        invitedByUid,
        created_at: new Date().toISOString()
    };
    const { error } = await supabase
        .from('users')
        .insert([userData]);
    return !error;
}
