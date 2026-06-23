import type { AuthProvider } from '@refinedev/core';
import { supabaseClient } from '../utility/supabaseClient';

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error };
    }

    if (data?.user) {
      return { success: true, redirectTo: '/' };
    }

    return {
      success: false,
      error: { message: 'Login failed', name: 'Invalid email or password' },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      return { success: false, error };
    }
    return { success: true, redirectTo: '/login' };
  },
  onError: async (error) => {
    if (error?.code === 'PGRST301' || error?.code === 401) {
      return { logout: true };
    }
    return { error };
  },
  check: async () => {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
      return {
        authenticated: false,
        error: { message: 'Check failed', name: 'Session not found' },
        redirectTo: '/login',
      };
    }
    return { authenticated: true };
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    if (!data.user) return null;
    return { ...data.user, name: data.user.email };
  },
};
