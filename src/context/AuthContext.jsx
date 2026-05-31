import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (credentials) => {
    const { data } = await loginUser(credentials);
    saveSession(data.data);
    return data.data;
  };

  const register = async (payload) => {
    const { data } = await registerUser(payload);
    saveSession(data.data);
    return data.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const cached = localStorage.getItem("user");
      if (cached) setUser(JSON.parse(cached));

      if (token) {
        try {
          const { data } = await getMe();
          const merged = { ...JSON.parse(cached || "{}"), ...data.data, token };
          setUser(merged);
          localStorage.setItem("user", JSON.stringify(merged));
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
