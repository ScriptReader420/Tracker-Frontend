import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  register: (
    email: string,
    password: string,
    username?: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const register = async (
    email: string,
    password: string,
    username?: string,
  ) => {
    // Implement registration logic here, e.g., call to backend API
    console.log(
      "from auth context Registering user with email:",
      email,
      "username:",
      username,
    );
    const response = await fetch("http://localhost:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
  };

  const value: AuthContextType = {
    user,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
