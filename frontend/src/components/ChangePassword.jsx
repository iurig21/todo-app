import { useContext, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const[error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [success,setSuccess] = useState(false)

  const {token,email} = useContext(AuthContext)

  const watchPassword = watch("newPassword");

  async function handlePasswordChange(data) {
    try{
        setError(null)
        setIsLoading(true)
        setSuccess(false)

        const response = await fetch(import.meta.env.VITE_API_URL + "/auth/password",{
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, currentPassword: data.currentPassword, newPassword: data.newPassword})
        })

        if(!response.ok){
            const ErrorData = await response.json();
            return setError(ErrorData.message ?? "Changing password failed")
        }

        setSuccess(true)

    }catch(err){
        console.error("Changing password failed:", err)
        setError(err.message ?? "Changing password failed")
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Insert your current password"
        type="password"
        {...register("currentPassword", { required: true })}
      />

      {errors?.currentPassword?.type === "required" && (
        <p className="text-red-600"> Current password is required </p>
      )}

      <Input
        placeholder="Insert your new password"
        type="password"
        {...register("newPassword", { required: true, minLength: 6 })}
      />

      {errors?.newPassword?.type === "required" && (
        <p className="text-red-600"> New password is required </p>
      )}
      {errors?.newPassword?.type === "minLength" && (
        <p className="text-red-600">
          {" "}
          New password requires 6 characters minimum{" "}
        </p>
      )}
      <Input
        placeholder="Confirm your new password"
        type="password"
        {...register("passwordConfirmation", {
          required: true,
          validate: (value) => {
            return value === watchPassword;
          },
        })}
      />
      {errors?.passwordConfirmation?.type === "required" && (
        <p className="text-red-600"> Password Confirmation is required </p>
      )}

      {errors?.passwordConfirmation?.type === "validate" && (
        <p className="text-red-600"> Passwords must match </p>
      )}

      {error && (
        <p className="text-red-600"> {error} </p>
      )}

      {success && (
        <p className="text-green-500"> Password changed succesfuly! </p>
      )}

      <button
        onClick={() => handleSubmit(handlePasswordChange)()}
        className="w-full p-4 rounded-md bg-zinc-800 text-white font-semibold cursor-pointer"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>



    </div>
  );
}

export default ChangePassword;
