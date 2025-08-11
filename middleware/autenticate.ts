import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../lib/supabase';
export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const token = typeof(req?.headers?.authToken?.toString()) === 'string' ? req.headers.authToken.toString() : null;
    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return null;
    }
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return null;
    }
    return user;
}
