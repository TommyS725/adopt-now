'use client'

import { useEffect, useState } from "react"
import { Button } from "./button"
import { ChevronUpIcon } from "lucide-react" 

export function ScrollTop(){
    if(typeof window == "undefined"){
        return null
    }

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
        window.addEventListener("scroll",scrollListener);
        return () =>
           window.removeEventListener("scroll", scrollListener);
    },[])

    const handleClick = () =>{
        window.scrollTo({
            top: 0,
            left: window.screenX,
            behavior: "smooth",
          })
    }

    return(
        <>
        {visible?
              <Button onClick={handleClick} variant="outline" className=' fixed bottom-6 left-4 w-12 h-12 rounded-full p-0 border-2 dark:border-4'>
                <ChevronUpIcon/>
              </Button>
              :null
            }  
        </>
    )
}