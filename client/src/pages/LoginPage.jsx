import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { loginSchema } from '../validations/authSchemas';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      toast.success('Welcome back!');
      navigate('/me');
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#7c3aed] flex items-center justify-center shadow-lg">
            <FiLogIn className="text-white text-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-[#7c3aed]/10 px-6 py-8 sm:px-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1">
            Welcome back
          </h1>
          <p className="text-[#6b7280] text-sm text-center mb-7">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] text-base pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="rayan@example.com"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-[#1a1a2e] text-sm placeholder-[#9ca3af] outline-none transition-all
                    ${errors.email
                      ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300'
                      : 'border-[#ede9fe] bg-[#faf8ff] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1a1a2e] mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] text-base pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border text-[#1a1a2e] text-sm placeholder-[#9ca3af] outline-none transition-all
                    ${errors.password
                      ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300'
                      : 'border-[#ede9fe] bg-[#faf8ff] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20'
                    }`}
                />
                <button
                  id="toggle-password"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#7c3aed] transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              id="login-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-60 disabled:cursor-not-allowed
                text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-[#7c3aed]/30
                focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 active:scale-[0.98] mt-1 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#6b7280] mt-6">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-[#7c3aed] font-semibold hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
