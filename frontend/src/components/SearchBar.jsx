import Input  from "./Input"

function SearchBar({OnSerchBarChange}){

    return (
        <div className="w-full">
            <Input placeholder="Search for a task" onChange={(event) => OnSerchBarChange(event.target.value)}/>
        </div>
    )
}

export default SearchBar