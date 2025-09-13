import { useState, createContext } from "react";

const AuthContext = createContext();
export { AuthContext };

function AuthProvider({ children }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function Login(email, password) {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      return data.token;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async function Register(email, password) {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      return data.token;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  function Logout() {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating,
        setIsAuthenticating,
        token,
        setToken,
        Login,
        Register,
        isAuthenticated,
        setIsAuthenticated,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
