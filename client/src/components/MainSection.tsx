'use client'

import { FilterBar } from "./FilterBar"
import { Provider } from "@/type/dbInterfaces"
import {FC,useEffect,useState} from "react"
import Query from "@/type/query"
import { useDebouncedValue } from "@mantine/hooks"
import { getQuriedPosts } from "./getQueriedPosts"
import { Post } from "@/type/dbInterfaces"

type SectionProps={
    providers:Provider[]
}




export const  MainSection:FC<SectionProps> = ({providers}) => {
    const [query,setQuery] = useState<Query|undefined>()
    const [debouncedQuery] = useDebouncedValue<Query|undefined>(query,200)
    const [posts,setPosts] = useState<Post[]>([])
    const [pageNumber,setPageNumber] = useState<number>(1)

    const postsPerPage:number = 10

    useEffect(()=>{
        let isCanceled:boolean = false
        const setQueriedPost = async ():Promise<void>=>{
            const data = await getQuriedPosts(debouncedQuery,pageNumber,postsPerPage)
            if(!isCanceled){
                setPosts(prev=>[...prev,...data])
            }
        }
        setQueriedPost()
        return ()=>{
            isCanceled = true
        }
    },[pageNumber])

    useEffect(()=>{
        setPageNumber(1)
        console.log(debouncedQuery)
        //getQuriedPosts(debouncedQuery,pageNumber).then(data=>{setPosts(data)})
        let isCanceled:boolean = false
        const setQueriedPost = async ():Promise<void>=>{
            setPageNumber(1)
            const data = await getQuriedPosts(debouncedQuery,pageNumber,postsPerPage)
            if(!isCanceled){
                setPosts(data)
            }
        }
        setQueriedPost()
        return ()=>{
            isCanceled = true
        }
    },[debouncedQuery])
    
    return(<>
        <FilterBar providers={providers} querySetter={setQuery}/>
        {/* <h1>{JSON.stringify(debouncedQuery)}</h1> */}
        {posts.map((entry,index)=>{
            return <div key={index} className=" truncate w-2/3">{entry.provider.provider_name} {entry.text} <span>{`${entry.date.toLocaleString()}`}</span></div>
        })}
        <button onClick={()=>setPageNumber(prev=>{return prev+1})}>add page no.</button>
        <div>page {pageNumber}</div>
        
    </>)
}