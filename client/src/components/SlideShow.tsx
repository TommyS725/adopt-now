"use client"

import { useEffect, useState,useRef } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const images = ['cat1.jpg','dog1.jpg',"cat2.jpg",'dog2.jpg']
const path = "SlideShow/"
const n = images.length




export function SlideShow(){
    

    return(
        <>      
        <Carousel 
        infiniteLoop={true} showThumbs={false} 
        autoPlay={true} interval={2000} 
        showArrows={false} showStatus={false}>
                    {images.map((image,index)=>
                            <img key = {index} className=" rounded-md drop-shadow-xl" src={path+image}/>
                    )}
        </Carousel>
        </>
        
    )
}
