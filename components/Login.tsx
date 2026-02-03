
import React, { useState } from 'react';
import { Cpu, Mail, Lock, ArrowRight, Github } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200">
            <Cpu size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {isRegister ? 'Create an account' : 'Welcome back'}
          </h2>
          <p className="text-slate-500 mt-2">
            The intelligent way to learn technology.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isRegister && (
              <div className="text-right">
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              {isRegister ? 'Sign Up' : 'Sign In'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Or continue with</span></div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                <Github size={18} />
                <span className="text-sm font-semibold">GitHub</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-70" alt="" />
                <span className="text-sm font-semibold">Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            {isRegister ? 'Sign in' : 'Create one now'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
