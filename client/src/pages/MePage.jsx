import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiCalendar, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function MePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success('You have been logged out.');
      navigate('/login');
    } catch {
      toast.error('Logout failed. Please try again.');
      setLoggingOut(false);
    }
  };

  const initials = user?.name
    ? user.name
        .trim()
        .split(' ')
        .map((n) => n[0]?.toUpperCase())
        .slice(0, 2)
        .join('')
    : '?';

  return (
    <div className="min-h-screen bg-[#f5f0ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl shadow-[#7c3aed]/10 px-6 py-8 sm:px-8">

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#7c3aed]/30">
              <span className="text-2xl font-bold text-white tracking-wide">{initials}</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1">
            My Profile
          </h1>
          <p className="text-[#6b7280] text-sm text-center mb-7">
            Your account information
          </p>

          <div className="space-y-4">

            <div className="bg-[#f5f0ff] rounded-2xl px-5 py-4 border border-[#ede9fe] flex items-center gap-4">
              <FiUser className="text-[#7c3aed] text-lg shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider mb-0.5">
                  Full Name
                </p>
                <p className="text-[#1a1a2e] font-medium text-base">
                  {user?.name ?? '—'}
                </p>
              </div>
            </div>

            <div className="bg-[#f5f0ff] rounded-2xl px-5 py-4 border border-[#ede9fe] flex items-center gap-4">
              <FiMail className="text-[#7c3aed] text-lg shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider mb-0.5">
                  Email Address
                </p>
                <p className="text-[#1a1a2e] font-medium text-base break-all">
                  {user?.email ?? '—'}
                </p>
              </div>
            </div>

            {user?.createdAt && (
              <div className="bg-[#f5f0ff] rounded-2xl px-5 py-4 border border-[#ede9fe] flex items-center gap-4">
                <FiCalendar className="text-[#7c3aed] text-lg shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-wider mb-0.5">
                    Member Since
                  </p>
                  <p className="text-[#1a1a2e] font-medium text-base">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            id="logout-btn"
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full mt-7 py-3 px-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-[#7c3aed]/30
              focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 active:scale-[0.98] cursor-pointer
              flex items-center justify-center gap-2"
          >
            {loggingOut ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging out…
              </>
            ) : (
              <>
                <FiLogOut className="text-base" />
                Log Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
