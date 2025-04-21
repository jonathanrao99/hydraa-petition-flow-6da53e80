import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { COMMISSIONER_NAME } from "@/lib/constants";

// Mock user data - in a real app, this would be fetched from a database
const mockUsers: User[] = [
  {
    id: "1",
    employeeId: "EMP001",
    name: "Naresh",
    designation: "DCP",
    role: "Reception",
    email: "reception@hydraa.gov.in",
    phone: "9876543210",
    userId: "John/DCP"
  },
  {
    id: "2",
    employeeId: "EMP002",
    name: "Sujeeth",
    designation: "ACP",
    role: "EnquiryOfficer",
    email: "officer@hydraa.gov.in",
    phone: "9876543211",
    userId: "Jane/ACP"
  },
  {
    id: "3",
    employeeId: "EMP003",
    name: COMMISSIONER_NAME,
    designation: "DCP",
    role: "HOD",
    email: "commissioner@hydraa.gov.in",
    phone: "9876543212",
    userId: "Michael/DCP"
  },
  {
    id: "4",
    employeeId: "EMP004",
    name: "Venkatesh",
    designation: "Other",
    role: "Admin",
    email: "admin@hydraa.gov.in",
    phone: "9876543213",
    userId: "Admin/Other"
  }
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("hydraa_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      // Override the Reception user's name to keep it in sync
      if (parsedUser.role === "Reception") {
        parsedUser.name = "Naresh";
        localStorage.setItem("hydraa_user", JSON.stringify(parsedUser));
      } else if (parsedUser.role === "EnquiryOfficer") {
        parsedUser.name = "Sujeeth";
        localStorage.setItem("hydraa_user", JSON.stringify(parsedUser));
      } else if (parsedUser.role === "Admin") {
        parsedUser.name = "Venkatesh";
        localStorage.setItem("hydraa_user", JSON.stringify(parsedUser));
      }
      setCurrentUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll just check against our mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(user => user.email === email);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // In a real app, we would verify the password here
    // For demo purposes, any password will work
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Store user in localStorage for persistence
    localStorage.setItem("hydraa_user", JSON.stringify(user));
    
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("hydraa_user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
