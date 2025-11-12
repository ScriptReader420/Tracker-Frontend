import { Loader2, LogIn, User } from "lucide-react";
import React, { useState } from "react";

const API_URL = "http://localhost:8000/api/users/login/"; // Suggested change for local development

interface AuthResponse {
  access: string;
  refresh: string;
  user_id: number;
}

interface LoginState {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    email: "",
    password: "",
    error: null,
    isLoading: false,
  });

  const { email, password, error, isLoading } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ ...state, isLoading: true, error: null });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // or email
          password,
        }),
      });
      console.log("Login response status:", response);
      if (!response.ok) {
        // Handle non-200 responses (e.g., 401 Unauthorized)

        const errorData = await response.json();
        const errorMessage =
          errorData.detail || "Invalid credentials or connection error.";
        throw new Error(errorMessage);
      }

      const data: AuthResponse = await response.json();

      console.log("Login Successful! Received tokens:", data);

      setState({
        ...state,
        error: `Success! User ID ${data.user_id} logged in.`,
      });
    } catch (err: any) {
      console.error("Login Error:", err.message);
      setState({
        ...state,
        error: err.message || "An unexpected error occurred during login.",
      });
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-indigo-600">
          <User size={48} className="text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w-sm mx-auto">
          Using Django's Token Authentication
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username/Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                />
              </div>
            </div>

            {/* Error/Message Display */}
            {error && (
              <div
                className={`p-3 rounded-md ${error.startsWith("Success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
