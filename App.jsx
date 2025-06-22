import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful! Welcome to Asfoura');
      console.log('Login successful');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] p-4">
      <div className="bg-[#e4e7f4] rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo - Replace with your actual logo.png */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center">
            <span className="text-gray-500">logo.png</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Login to Asfoura</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30 transition"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30 transition"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition flex justify-center
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#4f46e5] hover:bg-[#7c3aed] hover:shadow-md'}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Dummy credentials for testing:</p>
          <p className="mt-1">test@asfoura.com | password123</p>
        </div>
      </div>
    </div>
  );
}

export default App;