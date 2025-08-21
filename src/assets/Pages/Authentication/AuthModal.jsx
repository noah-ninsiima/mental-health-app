

import { useState, useEffect } from "react";
import RoleDropdown from "./RoleDropdown"; 
import { Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";

function AuthModal({ isOpen, onClose, defaultTab = "login" }) {
  const [isLogin, setIsLogin] = useState(defaultTab === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    setIsLogin(defaultTab === "login");
  }, [defaultTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-sm bg-white shadow-xl rounded-xl p-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {isLogin ? (
          <>
          <h1 className="text-xl font-bold text-center ">MindRafiki</h1>
             
            <h2 className="text-xl font-bold text-center mb-1 text-gray-900">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 text-center mb-4">
              Continue your wellness journey
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-9 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-semibold py-2 rounded-md text-sm mt-1 transition hover:bg-teal-600"
              >
                Sign In
              </button>
            </form>
            <p className="text-xs text-center mt-3 text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-teal-600 font-semibold hover:underline"
              >
                Create account
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center mb-1 text-gray-900">
              Join MindRafiki
            </h2>
            <p className="text-xs text-gray-500 text-center mb-4">
              Start your mental wellness journey
            </p>
            <form className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-9 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-300 rounded-md pl-9 pr-9 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <RoleDropdown signupForm={signupForm} setSignupForm={setSignupForm} />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-semibold py-2 rounded-md text-sm mt-1 transition hover:bg-teal-600"
              >
                Create Account
              </button>
            </form>
            <p className="text-xs text-center mt-3 text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-teal-600 font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;