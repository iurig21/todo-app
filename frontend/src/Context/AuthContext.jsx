import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();
export { AuthContext };

function AuthProvider({ children }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [categorys, setCategorys] = useState([]);
  const [email,setEmail] = useState(localStorage.getItem("email"))

  useEffect(() => {
    async function FetchCategorys() {
      try {
7
        const response = await fetch(import.meta.env.VITE_API_URL + "/todos/categorys",{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })

        if(!response.ok){
            const ErrorData = await response.json();
            console.error(ErrorData.message)
        }

        const responseJSON = await response.json();

        setCategorys(responseJSON)

      } catch (err) {
        console.error("Error fetching categorys", err);
        setCategorys([]);
      }
    }
    FetchCategorys()
  }, [token]);

  async function Login(email, password) {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      localStorage.setItem("email",email);
      setEmail(email)

      const data = await response.json();
      return data.token;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async function Register(email, password) {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      localStorage.setItem("email",email);
      setEmail(email)

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
        categorys,
        setCategorys,
        email
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
