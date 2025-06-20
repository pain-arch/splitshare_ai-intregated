import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center space-y-4'>
      <h2 className='text-9xl font-bold gradient-title'>404</h2>
      <p className='text-2xl font-semibold mb-4'>Page Not Found</p>
      <Button className='mt-4 bg-green-600 hover:bg-white text-white hover:text-green-600 transition-colors hover:border-green-600 border-2'>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}