import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { FC } from "react"
  import Link from "next/link"

  interface LinkConfirmProps {
    href?:string,
    btnText?:String,
    btnClassName?:string,
    btnVarients?:"outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined
  }
  
  export const LinkConfirm:FC<LinkConfirmProps> = ({href="",
                                                    btnText="Go",
                                                    btnClassName="",
                                                    btnVarients="outline"})=> {

    const handleConfirm=()=>{
        window.open(href,'_blank')
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={btnVarients} className={btnClassName}>{btnText}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leaving our page</AlertDialogTitle>
            <AlertDialogDescription>
                    <p>You are about to open:</p>
                    <p><a href={href} className="text-sky-300 break-all dark:text-blue-600">{href}</a></p>
                    <p>Are you sure?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}><Link href={href}></Link>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  