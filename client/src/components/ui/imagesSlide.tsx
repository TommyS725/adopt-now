'use client'


import { Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// import required modules
import { Pagination } from "swiper";
import { FC,useRef } from "react";

interface imagesSlideProps{
    images: string[]
    classNames?:string
}

export const ImagesSlide:FC<imagesSlideProps> = ({images,classNames=""})=>{

    const myRef = useRef<any>()
   

    return (
        <>
        <Swiper
        onClick={()=>myRef.current.swiper.slideNext(500)}
        ref = {myRef}
        spaceBetween={0}
        pagination={{
            clickable: true,
        }}
        loop = {true}
        modules={[ Pagination]}
        className="mySwiper"
      >
            {images.map((image,index)=>{
                return <SwiperSlide key = {index}>
                <img src={image} className={classNames} />
              </SwiperSlide>
            })}
          </Swiper>
        </>
    );
}