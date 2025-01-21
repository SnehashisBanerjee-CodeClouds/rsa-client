import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-32 grid grid-row-2 gap-1 place-content-center text-center">
      <h2 className="text-3xl font-extrabold">Not Found</h2>
      <p className="text-xl">Could not find requested resource</p>
      <Link href="/" className="mt-4 custom_btn y_btn cursor-pointer">Return Home</Link>
    </div>
  )
}