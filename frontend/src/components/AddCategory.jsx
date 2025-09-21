import { useContext, useState } from "react"
import {useForm} from "react-hook-form"
import { AuthContext } from "../Context/AuthContext"

function AddCategory(){

    const {register,handleSubmit,formState: {errors}} = useForm()
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [success,setSuccess] = useState(false);

    const {categorys,setCategorys,token} = useContext(AuthContext)

    async function onSubmit(data){
        try{
            setIsLoading(true)
            setError(null)
            setSuccess(false)

            const category = data.category
            const response = await fetch(import.meta.env.VITE_API_URL + "/todos/categorys",{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({category: category})
            })

            if(!response.ok){
                const ErrorData = await response.json();
                return setError(ErrorData.message ?? "Failed to add category")
            }

            const newCategory = await response.json()

            console.log(newCategory)

            setCategorys([...categorys,newCategory])
            setSuccess(true)
        }catch(err){
            console.error("Error adding category", err)
            setError(err.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-5">
            <input {...register("category", {required: true})} type="text" placeholder="Write a new category" className="w-full p-4 rounded-md bg-white" />
            {errors?.category?.type === "required" && (
                <p className="text-red-600"> You must fill the input </p>
            )}
            {error && (
                <p className="text-red-600"> {error} </p>
            )}
            <button onClick={() => handleSubmit(onSubmit)()} className="cursor-pointer w-full bg-zinc-800 p-4 rounded-xl text-white"> {isLoading ? "Adding..." : "Add"} </button>
            {success && (
                <p className="text-green-600"> Category added succesfully </p>
            )}
        </div>
    )
}   

export default AddCategory