import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-600 text-white text-sm px-4 py-2'>
      &copy;{(new Date).getFullYear()} The Fake Pokemon Company
    </footer>
  )
}