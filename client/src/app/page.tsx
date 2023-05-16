import axios from 'axios'
import { ScrollTop } from '@/components/ui/BackToTop'
import {HeaderSlide} from '@/components/Swiper'
import { MainSection } from '@/components/MainSection'
import { Provider } from "@/type/dbInterfaces"
import { prisma } from '@/components/db'


export default async function Home() {

  const handleConnect = async ()=>{
    if(process.env.SERVER_URL==null) return
    try {
      //try to upate data when connected
      let res = await axios.get(`${process.env.SERVER_URL}`)
      if (res.status ==200){
        console.log("Connected to backend server")
        // not await since scarping a long process
        axios.post(`${process.env.SERVER_URL}/update`)
      }
      return 
    } catch (error) {
      console.log("Connection error to backend server")
    }
  }
  let providers:Provider[] = []
  try {
    await handleConnect()
    providers = await prisma.provider.findMany()
  } catch (error) {
    console.log(error)
  }
  

  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center  w-full h-full px-2 py-4 ">
        <div className=" py-4 w-full">
          <HeaderSlide/>
        </div>
        <h1 className='py-4'>Save lifessssss!</h1>
        <MainSection providers={providers}/>
      <ScrollTop/>
      </main>
    </>
  )
}
