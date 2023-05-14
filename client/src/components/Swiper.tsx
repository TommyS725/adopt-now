'use client'


import { Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination,Autoplay } from "swiper";
import { useState,useRef, useEffect,FC } from "react";
const images = ['cat1.jpg','dog1.jpg',"cat2.jpg",'dog2.jpg']

export const HeaderSlide:FC = ()=>{
    const [visible,setVisible] = useState<boolean>(false)
    const observerRef = useRef<IntersectionObserver|null>()
    const SwiperRef = useRef<any>()
    
    useEffect(()=>{
        observerRef.current = new IntersectionObserver((entries)=>{
            setVisible(entries[0].isIntersecting)
        })
        observerRef.current.observe(SwiperRef.current)
    },[])

    useEffect(()=>{
        //console.log(SwiperRef.current.swiper)
        if(!SwiperRef) return
        
        if(visible){
            SwiperRef.current.swiper.autoplay.resume()
        }
        else{
            SwiperRef.current.swiper.autoplay.pause()
        }
    },[visible])

    return (
        <>
          <Swiper
            ref = {SwiperRef}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            loop = {true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
            pagination={false}
            modules={[EffectCoverflow, Pagination,Autoplay]}
            className="mySwiper"
          >
            {images.map((image,index)=>{
                return <SwiperSlide key = {index}>
                <img src={`./SlideShow/${image}`} />
              </SwiperSlide>
            })}
          </Swiper>
        </>
    );
}