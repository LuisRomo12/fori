import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getStoredToken,
  getStoredUserEmail,
  storeSession,
  clearSession,
  loginUser,
  registerUser,
} from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al iniciar la app, verificar si ya existe una sesión activa persistida
  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const token = await getStoredToken();
        const email = await getStoredUserEmail();
        if (token) {
          setUserToken(token);
          setUserEmail(email);
        }
      } catch (e) {
        console.error('Error restaurando sesión inicial:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkActiveSession();
  }, []);

  // Función de Login
  const login = async (email, password) => {
    const result = await loginUser({ email, password });
    setUserToken(result.token);
    setUserEmail(result.email);
    return result;
  };

  // Función de Registro
  const register = async (userData) => {
    const result = await registerUser(userData);
    return result;
  };

  // Función de Logout
  const logout = async () => {
    await clearSession();
    setUserToken(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userEmail,
        isLoading,
        isAuthenticated: !!userToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
