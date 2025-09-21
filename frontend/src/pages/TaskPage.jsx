import { useNavigate, useSearchParams } from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import Title from "../components/Title";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function TaskPage(){

      const [searchParams] = useSearchParams();
      const title = searchParams.get("title");
      const description = searchParams.get("description");
      const categoryId = searchParams.get("category");
      const navigate = useNavigate();

      const {categorys} = useContext(AuthContext)

      const category = categoryId !== "null" ? categorys.find((category) => category.id === Number(categoryId)) : "Non-existant"
    
    return(
       <div className="h-screen w-screen bg-zinc-800 flex justify-center p-6">
        <div className="w-[500px] space-y-6">
            <div className="flex justify-center relative">
                <button className="text-white absolute left-0 top-0 bottom-0 cursor-pointer" onClick={() => navigate(-1)}> <ChevronLeft/></button>
                <Title>Task details</Title>
            </div>
            <div className="bg-zinc-700 p-4 rounded-md space-y-2">
                <h2 className="text-white text-xl font-bold"> {title}</h2>
                <p className="text-white">{description}</p>
                <p className="text-white"> <span className="font-bold"> Category: </span> {category.nome} </p>
            </div>
        </div>
    </div>
    )
}

export default TaskPage;