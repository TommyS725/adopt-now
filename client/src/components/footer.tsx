'use client'

import { LinkConfirm } from '@/components/ui/link-confirm'
import { FC } from 'react'

const github_link = 'https://github.com/TommyS725/adopt-now'

export const Footer:FC =()=>{

    return <>
        <hr/>
        <footer className='py-4  px-24 justify-start flex text-center'>
            <p>Build by TommyS725. The source code is also available on <LinkConfirm href={github_link} btnClassName='text-md px-1' btnVarients={'link'} btnText={'Github'}/></p>
        </footer>
    </>
}