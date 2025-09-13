import Input  from "./Input"

function SearchBar({OnSerchBarChange}){

    return (
        <div className="w-full">
            <Input placeholder="Pesquise uma tarefa" onChange={(event) => OnSerchBarChange(event.target.value)}/>
        </div>
    )
}

export default SearchBar