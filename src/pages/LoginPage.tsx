import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Key, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import api from '../lib/api';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// Simple card components
const MyCard = ({ children, className }: any) => (
  <div className={`glass border-white/5 rounded-3xl overflow-hidden ${className}`}>{children}</div>
);
const MyCardHeader = ({ children, className }: any) => (
  <div className={`p-6 bg-white/5 border-b border-white/5 ${className}`}>{children}</div>
);
const MyCardContent = ({ children, className }: any) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [toast, setToast] = useState('');

  const from = (location.state as any)?.from?.pathname || '/accounts/dashboard';
  const redirectMessage = (location.state as any)?.message;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('storage'));
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || '';
      
      if (msg.toLowerCase().includes('invalid')) {
        setEmailError('Account not found or Invalid credentials');
      } else {
        setError(msg || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setToast('Google login will be enabled soon');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="container px-4 py-12 md:py-20 flex items-center justify-center min-h-[80vh]">
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg font-medium"
        >
          {toast}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <MyCard className="text-center">
          <MyCardHeader>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
              <LogIn className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-white/40 text-sm">{redirectMessage || "Sign in to access your dashboard and builds."}</p>
          </MyCardHeader>
          
          <MyCardContent className="space-y-6 text-left">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/60 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    className={`bg-white/5 border-white/10 h-12 pl-11 rounded-xl focus:ring-blue-500/50 ${emailError ? 'border-red-500/50' : ''}`}
                  />
                </div>
                {emailError && (
                  <div className="mt-1 flex flex-col">
                    <span className="text-red-400 text-xs font-medium ml-1">
                      {emailError}
                    </span>
                    <Link to="/signup" className="text-blue-400 text-xs font-bold ml-1 hover:underline mt-0.5">
                      Sign up here
                    </Link>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/60 ml-1">Password</Label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-white/5 border-white/10 h-12 pl-11 pr-11 rounded-xl focus:ring-blue-500/50 ${passwordError ? 'border-red-500/50' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && (
                  <div className="mt-1">
                    <span className="text-red-400 text-xs font-medium ml-1">
                      {passwordError}
                    </span>
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <Link to="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm px-1 font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  <AlertCircle className="w-4 h-4 ml-2" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all active:scale-[0.98] mt-2 shadow-lg shadow-blue-600/20"
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0a0f] px-4 text-white/20 font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button"
              onClick={handleGoogleClick}
              className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-white/20 pt-2">
              Don't have an account? <Link to="/signup" className="text-blue-400 font-bold hover:underline">Create Account</Link>
            </p>
          </MyCardContent>
        </MyCard>
      </motion.div>
    </div>
  );
}
