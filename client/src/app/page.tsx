import Image from 'next/image'
import { SlideShow } from '@/components/SlideShow'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full h-full">
      <div className="w-1/2 py-4">
        <SlideShow/>
      </div>
      <div>test content</div>
    </main>
  )
}
