'use client'

import { ProvFilter } from "./ui/provFilter"
import { Provider } from "@/type/dbInterfaces"
import { FC, useState,Dispatch,SetStateAction, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DatePicker } from "./ui/datepicker"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import Query from "@/type/query"
import { useDebouncedValue } from "@mantine/hooks"

type FilterProps={
    providers:Provider[]
    querySetter: Dispatch<SetStateAction<Query|undefined>>
}

export const FilterBar:FC<FilterProps> = ({providers,querySetter})=>{
    const [search,setSearch] = useState<string>('')
    const [selectedProviders,setSelectedProviders] = useState<Provider[]>(providers)
    const [dateAfter, setDateAfter] = useState<Date|undefined>(undefined)
    const [clearing,setClearing] = useState<boolean>(false)
        
    const dateCheck = (selectedDate:Date)=>{
        let  today = new Date()
        return selectedDate<=today
    }

    const handleClear = ()=>{
        setClearing(true)
        setSearch("")
        setSelectedProviders(providers)
        setClearing(false)
        setDateAfter(undefined)
    }

    useEffect(()=>{
        if(clearing){
            return
        }
        const newQuery:Query ={
         keyword:search,
         providerIds:selectedProviders.map(entry=>entry.provider_id),
         dateAfter:dateAfter,
        }
        querySetter(newQuery)
        },[search,selectedProviders,dateAfter])

    return(<>
        <div className="my-6 w-10/12 px-2 border-black flex space-x-4  py-2 bg-zinc-800 bg-opacity-25 rounded-lg  justify-between  dark:shadow-[10px_10px_10px_0px_rgba(110,110,151,0.3)]">
            <Input onChange={(e)=>setSearch(e.currentTarget.value)} value={search} type="text" placeholder="Search here..." className="w-2/5 dark:hover:bg-slate-900 hover:bg-slate-100"  />
            <ProvFilter  selected={selectedProviders} className={"min-w-[20%] mt-0 cursor-pointer"}setter={setSelectedProviders} providers={providers}/>
            <DatePicker text='Date after' checking={dateCheck} selected={dateAfter} setter={setDateAfter} warningMessage={'No date date after today'}/>
            <Button variant={'outline'} className="px-2 rounded-xl" onClick={handleClear}><X/></Button>
        </div>
        {/* <h1>search:{search} provider:{providerId.join(', ')} {String(dateAfter)}</h1> */}
    </>)
}