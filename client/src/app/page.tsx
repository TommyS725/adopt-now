import { SlideShow } from '@/components/SlideShow'
import axios from 'axios'
import { ScrollTop } from '@/components/ui/BackToTop'

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

  //await handleConnect()

  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center  w-full h-full px-2 py-4">
        <div className="w-1/2 py-4">
          <SlideShow/>
        </div>
        <h1>Save lifessssss!</h1>
      </main>
      <ScrollTop/>
    </>
  )
}
