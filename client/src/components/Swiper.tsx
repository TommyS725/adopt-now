'use client'


import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination,Autoplay } from "swiper";
const images = ['cat1.jpg','dog1.jpg',"cat2.jpg",'dog2.jpg']
const path = "SlideShow/"

export function HeaderSlide(){
    return (
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            loop = {true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            pagination={false}
            modules={[EffectCoverflow, Pagination,Autoplay]}
            className="mySwiper"
          >
            {images.map((image,index)=>{
                return <SwiperSlide key = {index}>
                <img src={path+image} />
              </SwiperSlide>
            })}
          </Swiper>
        </>
    );
}