'use client'

import {FC, useEffect, useRef, useState} from 'react'
import { Post } from '@/type/dbInterfaces'
import parse,{HTMLReactParserOptions, Element} from 'html-react-parser';
import { LinkConfirm } from './link-confirm';
import { ImagesSlide } from './imagesSlide';

interface previewProps{
    post:Post
}

const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs&&domNode.attribs.href) {
        const url = new URL(domNode.attribs.href)
        const content = url.hostname.replace("www.","")
        console.log(content,url)
        return <LinkConfirm href={url.href} btnVarients={"link"} btnText={content} btnClassName='mx-2 my-1 bg-violet-400 rounded-lg hover:bg-opacity-60'/>
      }
    }
  };


export const PreviewCard:FC<previewProps> =  ({post}) =>{


    const  changed = post.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')
    // console.log(changed)


    return <>
    <div className='w-1/4 hover:w-1/3 m-2 '>
    <div className='   rounded-xl ' >
        {/* <div className='bg-blue-100 rounded-t-xl'>from...</div> */}
        <LinkConfirm btnText={post.provider.provider_name} btnVarients='link'
                     href={`https://www.facebook.com/${post.provider_id}`}    btnClassName='bg-accent hover:bg-blur rounded-b-none px-0 mx-0 w-full h-1/6' />
        {post.images.length?<div className=' bg-zinc-950 bg-opacity-30'><ImagesSlide images={post.images} classNames='w-1/2 m-auto py-1'/></div>:null}
        <p className='bg-zinc-200 text-zinc-800 line-clamp-[12] p-4  hover:line-clamp-none hover:overflow-auto hover:max-h-96 '>{parse(changed,options)}</p>
        
      
    </div>
    </div>
    
    
    </>
}
