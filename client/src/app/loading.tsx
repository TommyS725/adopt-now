import { ScrollTop } from '@/components/ui/BackToTop'
import {HeaderSlide} from '@/components/Swiper'
import { MainSection } from "@/components/MainSection"


export default async function Home() {
  
    
    return (
      <>
      <main className="flex min-h-screen flex-col items-center  w-full h-full px-2 py-4 ">
        <div className=" py-4 w-full">
          <HeaderSlide/>
        </div>
        <h1 className='py-4'>Save lifessssss!</h1>
        <MainSection providers={[]}/>
      <ScrollTop/>
      </main>
      </>
    )
  }
  