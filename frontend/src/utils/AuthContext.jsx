// import { createContext, useContext, useState } from "react";
// const AuthContext = createContext(null);
// export const AuthProvider = ({ children }) => {
//   //  DIRECT token read
//   const token = localStorage.getItem("token");
//   const [user, setUser] = useState(token ? { token } : null);
//   const signIn = (userData) => {
//     setUser(userData);
//   };
//   const signOut = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };
//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => useContext(AuthContext);

// AuthContext.js

import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (data) => {
    // data = full login response
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
