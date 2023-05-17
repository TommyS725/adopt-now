import { FC } from "react";

interface loadingProps{
    size:number
}

export const LoadingAnimation:FC<loadingProps> = ({size})=>{


    return( <>
        <svg className=" invisible dark:visible absolute animate-spin" fill="none" height={size} viewBox="0 0 48 48" width={size} xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="white"  strokeLinejoin="round" strokeWidth="4"/></svg>
        <svg className="visible dark:invisible animate-spin" fill="none" height={size} viewBox="0 0 48 48" width={size} xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="gray"  strokeLinejoin="round" strokeWidth="4"/></svg>
        </>)
}