import './globals.css'
import { Inter } from 'next/font/google'
import {cn}from "@/lib/utils"
import { ToggleTheme } from '@/components/ui/theme-toogle'
import Providers from '@/components/Providers'

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
      <body className={cn("px-20  min-h-screen bg-zinc-300 dark:bg-zinc-900	",inter.className)}>
          <Providers>
            <div className='flex py-[2rem]'>
              <h1 className=' text-5xl font-bold grow'>Adopt Now!</h1>
              <ToggleTheme/>
            </div>
            {children}
          </Providers>
      </body>
    </html>
  )
}
