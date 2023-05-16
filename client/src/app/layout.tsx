import './globals.css'
import { Inter } from 'next/font/google'
import {cn}from "@/lib/utils"
import { ToggleTheme } from '@/components/ui/theme-toogle'
import Providers from '@/components/Providers'
import Link from 'next/link'
import { Footer } from '@/components/footer'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Adopt Now!',
  description: 'Find your pet here!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={cn("  min-h-screen 	",inter.className)}>
          <Providers>
            <div className='flex py-[1rem] bg-blue-700 dark:bg-blue-950 px-10 bg-opacity-40 dark:bg-opacity-20 sticky top-0 z-10 backdrop-blur-xl'>
              <Link href="/" className=' text-3xl  grow'>Adopt Now!</Link>
              <ToggleTheme/>
            </div>
            {children}
            <Footer/>
          </Providers>
      </body>
    </html>
  )
}
