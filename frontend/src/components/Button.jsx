function Button(props){
    return(
        <button {...props} className="cursor-pointer bg-zinc-800 rounded-md p-2 text-white"> {props.children} </button>
    )
}   

export default Button;