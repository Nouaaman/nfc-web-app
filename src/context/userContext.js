//user context with isAthenticated and user state
import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "erg#",
    role: "Employeur",
    lastLogin: "2024-07-02 09:30:22",
    recentActivity: [
      { action: "Connecté", timestamp: "2024-07-02 09:30:22" },
      { action: "Accédé au Projet X", timestamp: "2024-07-02 10:15:43" },
      { action: "Profil mis à jour", timestamp: "2024-07-01 14:22:10" },
    ],
  });
  return (
    <UserContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
