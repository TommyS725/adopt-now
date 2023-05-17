'use client'

import { FilterBar } from "./FilterBar"
import { Provider } from "@/type/dbInterfaces"
import {FC,useEffect,useState, useRef} from "react"
import Query from "@/type/query"
import { useDebouncedValue } from "@mantine/hooks"
import { getQuriedPosts } from "./getQueriedPosts"
import { Post } from "@/type/dbInterfaces"
import { PreviewCard } from "./ui/preveiws"
import { LoadingAnimation } from "./ui/loadingAnimation"

type SectionProps={
    providers:Provider[]
}

const postsPerPage:number = 6


export const  MainSection:FC<SectionProps> = ({providers}) => {
    const [query,setQuery] = useState<Query|undefined>()
    const [debouncedQuery] = useDebouncedValue<Query|undefined>(query,200)
    const [posts,setPosts] = useState<Post[]>([])
    const [pageNumber,setPageNumber] = useState<number>(1)
    const [hasMore,setHasMore] = useState<boolean>(true)
    const [isLoading,setIsloading] = useState<boolean>(true)
    const [spinnerVisible,setSpinnerVisible] = useState<boolean>(false)
    const observerRef = useRef<IntersectionObserver|null>()
    const SpinnerRef = useRef<any>()

    useEffect(()=>{
        //if spinner is not rendered or loading
        if(!SpinnerRef.current ||isLoading ){
            return
        }
        //observe the new spinner
        observerRef.current = new IntersectionObserver((entries)=>{
            setSpinnerVisible(entries[0].isIntersecting)
        })
        observerRef.current.observe(SpinnerRef.current)
        //return observerRef.current.disconnect()
    },[isLoading,hasMore])

    //handle spinner
    useEffect(()=>{
        if(isLoading||!hasMore||!spinnerVisible) return
        setPageNumber(prev=>prev+1)
    },[spinnerVisible])

    // pagination
    useEffect(()=>{
        let isCanceled:boolean = false
        setIsloading(true)
        const setQueriedPost = async ():Promise<void>=>{
            const data = await getQuriedPosts(debouncedQuery,pageNumber,postsPerPage)
            if(!isCanceled||1==1){
                //console.log(data.length)
                setHasMore(data.length>0)
                setPosts(prev=>[...prev,...data])
            }
            setIsloading(false)
        }
        setQueriedPost()
        return ()=>{
            isCanceled = true
        }
    },[pageNumber])

    //filtering
    useEffect(()=>{
        setIsloading(true)
        setPageNumber(1)
        //console.log(debouncedQuery)
        setHasMore(true)
        let isCanceled:boolean = false
        const setQueriedPost = async ():Promise<void>=>{
            setPageNumber(1)
            const data = await getQuriedPosts(debouncedQuery,pageNumber,postsPerPage)
            if(!isCanceled){
                setHasMore(data.length>0)
                setPosts(data)
            }
            setIsloading(false)
        }
        setQueriedPost()
        return ()=>{
            isCanceled = true
        }
    },[debouncedQuery])
    
    return(<>
        <FilterBar providers={providers} querySetter={setQuery}/>
        {/* <h1>{JSON.stringify(debouncedQuery)}</h1> */}
        {/* {posts.map((entry,index)=>{
            return <div key={index} className=" truncate w-2/3">{entry.provider.provider_name} {entry.text} <span>{`${entry.date.toLocaleString()}`}</span></div>
        })} */}
        <div className="w-11/12 py-2 flex flex-wrap  justify-evenly gap-x-4 gap-y-10">
            { posts.length?posts.map((entry,index)=><PreviewCard post={entry} key={index}/>):null}
        </div>
    
        {/* <div>page {pageNumber}</div> */}
        {hasMore?
            <div ref={SpinnerRef}>
                <LoadingAnimation size={86}/>
            </div>
        :null}
        {!hasMore&&!isLoading?<h1>No more content</h1>:null}
   
    </>)
}