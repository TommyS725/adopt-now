'use client'

import {FC} from 'react'
import { Post } from '@/type/dbInterfaces'
import parse,{HTMLReactParserOptions, Element} from 'html-react-parser';
import { LinkConfirm } from './link-confirm';
import { ImagesSlide } from './imagesSlide';
import { Button } from './button';

interface previewProps{
    post:Post
}

const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.attribs&&domNode.attribs.href) {
        const url = new URL(domNode.attribs.href)
        const content = url.hostname.replace("www.","")
        //console.log(content,url)
        return <LinkConfirm href={url.href} btnVarients={"link"} btnText={content} btnClassName='mx-2 my-1 bg-violet-400 rounded-lg hover:bg-opacity-60'/>
      }
    }
  };


export const PreviewCard:FC<previewProps> =  ({post}) =>{

    const  changed = post.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')
    // console.log(changed)


    return <>
    <div className='w-1/4 hover:w-1/3 '>
      <div className='bg-zinc-200 pb-4 rounded-xl  dark:shadow-[10px_10px_10px_5px_rgba(110,110,151,0.3)] hover:dark:shadow-[10px_10px_50px_5px_rgba(110,110,151,0.3)] ' >
          {/* <div className='bg-blue-100 rounded-t-xl'>from...</div> */}
          <LinkConfirm btnText={post.provider.provider_name} btnVarients='link'
                      href={`https://www.facebook.com/${post.provider_id}`}    btnClassName='bg-sky-900	dark:bg-secondary text-white	 hover:bg-blur rounded-b-none px-0 mx-0 w-full h-1/6' />
          <ImagesSlide images={post.images} divClass='bg-zinc-950  group' imgClass=' m-auto py-1 w-1/3 m-auto group-hover:w-1/2'/>
         
          <div className=' text-zinc-800 line-clamp-[8] p-4  hover:line-clamp-none hover:overflow-auto hover:max-h-72 '>
            {parse(changed,options)}
          </div>
          
      </div>
      <div className=' translate-y-[-30px] mx-6 grid  justify-items-end '>
            <LinkConfirm btnVarients={'secondary'} btnText={'Original Post'} btnClassName='bg-slate-700 text-white  dark:shadow-[10px_10px_10px_0px_rgba(110,110,151,0.3)]'
                  href={`https://www.facebook.com/${post.post_id}`}/>
            {/* <Button className=' dark:shadow-[10px_10px_10px_0px_rgba(110,110,151,0.3)]'>Get Details</Button> */}
        </div>
      {/* {post.images?<img src={post.images[0]}/>:null} */}
    
      </div>
   
    
    
    </>
}
