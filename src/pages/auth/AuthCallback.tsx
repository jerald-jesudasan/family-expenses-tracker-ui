import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import apiClient from '../../lib/apiClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      setError('No token found. Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
      return;
    }

    localStorage.setItem('auth_token', token);

    apiClient.get('/auth/me')
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        localStorage.removeItem('auth_token');
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-400 mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-white mb-2">{error}</h2>
          </>
        ) : (
          <>
            <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Completing sign in...</h2>
            <p className="text-primary-200">Please wait while we set up your account</p>
          </>
        )}
      </div>
    </div>
  );
}
