//rafce
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
  const[query, setQuery] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium '>No.1 job find Website </span>
         <h1 className=' text-5xl font-bold'>Search, Apply & <br/> Get your <span className='text-[#6A38C2]'>Dream Jobs</span> </h1>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nemo rem repellendus ut voluptas vitae.</p>
         <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
            type="text"
            placeholder='Find your dream job'
            className='outline-none border-none w-full'
            onChange={(e) => setQuery(e.target.value)}
             />
            <Button className='bg-[#6A38C2]  rounded-r-full ' onClick={searchJobHandler}>
                <Search  className='h-5 w-5'/> 
            </Button>
         </div>
         </div>
    </div>
  )
}

export default HeroSection