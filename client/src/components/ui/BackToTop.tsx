'use client'

import { useEffect, useState,FC} from "react"
import { Button } from "./button"
import { ChevronUpIcon } from "lucide-react" 
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export const ScrollTop:FC = () =>{

    const [visible,setVisisble] = useState<boolean>(false)

    const scrollListener = ()=>{
        if(window.scrollY === 0){
            setVisisble(false)
        }
        else if(!visible&&window.scrollY>0){
            setVisisble(true)
        }
        return
    }

    useEffect(()=>{
        window?.addEventListener("scroll",scrollListener);
        return () =>
           window?.removeEventListener("scroll", scrollListener);
    },[])

    const handleClick = () =>{
        window.scrollTo({
            top: 0,
            left: window.screenX,
            behavior: "smooth",
          })
    }

    if(typeof window == "undefined"){
        return null
    }

    return(
        <>
        {visible?
            <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Button onClick={handleClick} variant="outline" className='z-20 fixed bottom-6 left-4 w-12 h-12 rounded-full p-0 border-2 dark:border-4'>
                    <ChevronUpIcon/>
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>Back to top</p>
                </TooltipContent>
            </Tooltip>
            </TooltipProvider>
              :null
            }  
        </>
    )
}