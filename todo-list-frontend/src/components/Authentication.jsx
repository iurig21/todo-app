import { useState, useContext } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import validator from "validator";
import { AuthContext } from "../Context/AuthContext";

function Authentication({ closeModal }) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [error, setError] = useState(null);

  const {
    Login,
    Register,
    setToken,
    setIsAuthenticating,
    isAuthenticating,
    setIsAuthenticated,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function handleAuthentication(data) {
    try {
      setIsAuthenticating(true);
      setError(null);

      if (isRegistration) {
        const token = await Register(data.email, data.password);
        if (token) {
          setToken(token);
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          closeModal();
        } else {
          throw new Error("Registration failed. No token received.");
        }
      } else {
        const token = await Login(data.email, data.password);
        if (token) {
          setToken(token);
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          closeModal();
        } else {
          throw new Error("Login failed. No token received.");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  }

  const watchPassword = watch("password");

  return (
    <div className="space-y-5">
      <Input
        className="w-full h-14 text-lg bg-white/80 backdrop-blur-sm rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          validate: (value) => {
            return validator.isEmail(value);
          },
        })}
      />
      {errors?.email?.type === "required" && (
        <p className="text-red-600"> Email is required </p>
      )}
      {errors?.email?.type === "validate" && (
        <p className="text-red-600"> Invalid email </p>
      )}
      <Input
        className="w-full h-14 text-lg bg-white/80 backdrop-blur-md rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="password"
        placeholder="Password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors?.password?.type === "required" && (
        <p className="text-red-600"> Password is required </p>
      )}

      {errors?.password?.type === "minLength" && (
        <p className="text-red-600">
          {" "}
          Password must have 6 characters minimum{" "}
        </p>
      )}

      {isRegistration && (
        <div>
          <Input
            className="w-full h-14 text-lg bg-white/80 backdrop-blur-md rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password Confirmation"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => {
                return value === watchPassword;
              },
            })}
          />
          {errors?.passwordConfirmation?.type === "required" && (
            <p className="text-red-600"> Password confirmation is required </p>
          )}

          {errors?.passwordConfirmation?.type === "validate" && (
            <p className="text-red-600"> Password's doesn't match </p>
          )}
        </div>
      )}

      <div className="w-full space-y-6">
        {error && (
          <p className="text-red-600"> {error}</p>
        )}
        <button
          onClick={() => handleSubmit(handleAuthentication)()}
          className="w-full bg-zinc-800 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg"
        >
          {isAuthenticating
            ? "Authenticating..."
            : isRegistration
            ? "Register"
            : "Login"}
        </button>
        <hr />
        <h2 className="text-white font-medium text-xl">
          {!isRegistration ? "Don't have an account?" : "Have an account?"}
        </h2>
        <button
          className="w-full bg-zinc-800 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg"
          onClick={() => setIsRegistration(!isRegistration)}
        >
          {!isRegistration ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Authentication;
