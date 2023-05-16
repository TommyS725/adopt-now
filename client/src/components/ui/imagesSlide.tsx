'use client'


import { Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination} from "swiper";
import { FC,useRef, useState } from "react";


interface imagesSlideProps{
    images: string[]
    divClass?: string
    imgClass?:string
    
}

export const ImagesSlide:FC<imagesSlideProps> = ({images,imgClass="",divClass=""})=>{
    const [errorSlides,setErrorSlides] = useState<string[]>([])
    const myRef = useRef<any>()
    const nextSlide = ()=>{
      myRef.current.swiper.slideNext(500)
    }
    const handleError=(image:string)=>{
      setErrorSlides(prev=>[...prev,image])
    }

    return (
        <>
        {images.length>0 && errorSlides.length<images.length?
          <div className={divClass} onClick={nextSlide}>
          <Swiper
            ref = {myRef}
            spaceBetween={0}
            pagination={{
                clickable: true,
            }}
            loop = {true}
            modules={[ Pagination]}
            className="mySwiper"
          >
              {images.filter((image)=>!errorSlides.includes(image)).map((image,index)=>{
                  return <SwiperSlide key = {index}>
                  <img src={image} className={`${imgClass} z--10`} onError={()=>handleError(image)} loading='lazy' />
                </SwiperSlide>
              })}
        </Swiper>
        </div>
        :null}
        </>
    );
}