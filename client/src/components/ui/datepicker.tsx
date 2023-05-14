"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps{
    text?:String
    warningMessage?:String
    selected:Date|undefined
    setter: React.Dispatch<React.SetStateAction<Date|undefined>>
    checking?:Function
}

export const DatePicker:React.FC<DatePickerProps>= ({text='',warningMessage="",setter,checking=(a=null)=>true,selected}) => {
  const [warning,setWarning] = React.useState<boolean>(false)
  const [date, setDate] = React.useState<Date>()

  React.useEffect(()=>{
    setWarning(false)
    if(!date){
        setter(undefined)
        return
    }
    if(!checking(date)){
        setWarning(true)
        setter(undefined)
    }
    else{
        setter(date)
    }
  },[date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {warning?<span className="text-red-700 text-opacity-80">{warningMessage}</span>:selected ? format(selected, "PPP") : <span>{text}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
