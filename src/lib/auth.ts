const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const notifyAuthChange = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event('auth:updated'));
};

const safeJson = async (res: Response): Promise<any> => {
  const text = await res.text();
  if (!text || !text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { success: false, error: `Server error (${res.status})` };
  }
};

export const getAuthToken = () => {
  if (!isBrowser()) return null;
  return localStorage.getItem('authToken');
};

export const fetchMe = async () => {
  const token = getAuthToken();
  if (!token) return null;
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await safeJson(res);
  if (json.success) {
    localStorage.setItem('user', JSON.stringify(json.user));
    notifyAuthChange();
    return json.user;
  } else {
    logout();
  }
  return null;
};

export const loginWithEmail = async (email: string, password?: string) => {
  if (!password) throw new Error('Password is required');
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await safeJson(res);
  if (!json.success) {
    throw new Error(json.error || 'Login failed.');
  }
  
  if (isBrowser()) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('authToken', json.token);
    localStorage.setItem('user', JSON.stringify(json.user));
    notifyAuthChange();
  }
  return json.user;
};

export const signupWithEmail = async (name: string, email: string, password?: string, confirmPassword?: string) => {
  if (!password || password !== confirmPassword) throw new Error('Passwords do not match');
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, confirmPassword, name }),
  });
  const json = await safeJson(res);
  if (!json.success) throw new Error(json.error || 'Signup failed');
  return true;
};

export const logout = async () => {
  if (!isBrowser()) return;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  notifyAuthChange();
};

export const getStoredUser = () => {
  if (!isBrowser()) return null;
  try {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
  } catch {}
  return null;
};

export const getBuildHistory = () => {
  if (!isBrowser()) return [];
  const history = localStorage.getItem('buildHistory');
  return history ? JSON.parse(history) : [];
};

export const addBuildToHistory = (appName: string, appVersion = '1.0.0') => {
  const history = getBuildHistory();
  const user = getStoredUser();
  const plan = user?.plan || 'Free';
  let limit = 10;
  if (plan === 'Pro') limit = 15;
  else if (plan === 'Business') limit = 10;
  else if (plan === 'Enterprise') limit = 50;

  if (history.length >= limit) {
    throw new Error('History limit full. Please clean history to continue building.');
  }

  const newBuild = {
    id: Date.now().toString(),
    app_name: appName,
    app_version: appVersion,
    created_at: new Date().toISOString(),
    status: 'Building',
    progress: 0,
  };
  const nextHistory = [newBuild, ...history];
  localStorage.setItem('buildHistory', JSON.stringify(nextHistory));
  return newBuild;
};

export const clearBuildHistory = () => {
  if (!isBrowser()) return;
  localStorage.removeItem('buildHistory');
};

export const upgradeToPremium = async (plan: string = 'Pro'): Promise<any> => {
  const token = getAuthToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch('/api/auth/upgrade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ plan }),
  });
  const json = await safeJson(res);
  if (!json.success) throw new Error(json.error || 'Upgrade failed');
  await fetchMe();
  return json;
};
export const changePassword = async () => ({ success: false, error: 'Not implemented' });
export const requestPasswordReset = async () => ({ success: false, error: 'Not implemented' });
export const verifyPasswordResetOTP = async () => ({ success: false, error: 'Not implemented' });
export const verifySignupOTP = async () => ({ success: false, error: 'Not implemented' });
export const verifyOTP = async () => ({ success: false, error: 'Not implemented' });
export const loginWithGoogle = async () => null;
