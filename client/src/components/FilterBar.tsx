'use client'

import { ProvFilter } from "./ui/provFilter"
import { Provider } from "@/type/dbInterfaces"
import { FC, useState,Dispatch,SetStateAction, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DatePicker } from "./ui/datepicker"
import Query from "@/type/query"


type FilterProps={
    providers:Provider[]
    querySetter: Dispatch<SetStateAction<Query|undefined>>
}

export const FilterBar:FC<FilterProps> = ({providers,querySetter})=>{
    const [search,setSearch] = useState<string>('')
    const [providerId, setProviderId] = useState<string[]>(providers.map(entry=>entry.provider_id))
    const [dateAfter, setDateAfter] = useState<Date|undefined>(undefined)
        
    const dateCheck = (selectedDate:Date)=>{
        let  today = new Date()
        return selectedDate<=today
    }

    useEffect(()=>{
        const newQuery:Query ={
         keyword:search,
         providerIds:providerId,
         dateAfter:dateAfter,
        }
        querySetter(newQuery)
        },[search,providerId,dateAfter])

    return(<>
        <div className="w-10/12 px-2 border-black flex space-x-4  py-2 bg-zinc-800 bg-opacity-25 rounded-lg  justify-between">
            <Input onChange={(e)=>setSearch(e.currentTarget.value)} defaultValue={search} type="text" placeholder="Search here..." className="w-2/5" />
            <ProvFilter  providers={providers} className={"min-w-[20%] mt-0 cursor-pointer"} handler={setProviderId}/>
            <DatePicker text='Date after' checking={dateCheck} selected={dateAfter} setter={setDateAfter} warningMessage={'No date date after today'}/>
        </div>
        {/* <h1>search:{search} provider:{providerId.join(', ')} {String(dateAfter)}</h1> */}
    </>)
}