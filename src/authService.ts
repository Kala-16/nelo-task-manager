import { useState } from 'react';

interface User {
  email: string;
  password: string;
}

const SESSION_KEY = "nelo_user";

export default {
  login(email: string, password: string) {
    // minimal validation; store session
    if (!email || !password) return false;
    const user = { email, loggedAt: new Date().toISOString() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return true;
  },
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },
  isAuthenticated() {
    return !!sessionStorage.getItem(SESSION_KEY);
  },
  getUser() {
    const v = sessionStorage.getItem(SESSION_KEY);
    return v ? JSON.parse(v) : null;
  }
};