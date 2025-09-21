import React, { createContext, useContext, useState, ReactNode } from "react";

// User interface for type checking
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: { day: string; month: string; year: string };
  gender: string;
  bloodGroup?: string;
  state: string;
  district: string;
  areaType: "urban" | "rural";
  ulb?: string;
  block?: string;
  panchayat?: string;
  village?: string;
  pincode: string;
  youthType: string;
  sportsTalent?: string;
  kheloIndiaParticipant: boolean;
  profileImage?: string;
  username?: string;
  areOfInterest?: string;
  educationQualification?: string;
  languages?: string[];
  professionalSummary?: string;
}

// Type for the UserContext
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // State for user data
  const [user, setUser] = useState<User | null>(null);

  // isLoggedIn is derived from whether user is null
  const isLoggedIn = user !== null;

  // Login function to set the user data and isLoggedIn to true
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function to clear the user data and set isLoggedIn to false
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
