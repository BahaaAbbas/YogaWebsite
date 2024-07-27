import React from 'react'
import lgImg from '../../../assets/dashboard/jaconda-14.png'

export default function InstructorCP() {

  return (
    <div>
        <div className='h-screen my-5'>
            <h1 className='text-2xl font-bold'>Instructor Dashboard</h1>
            <img src={lgImg} alt='' className='md:w-1/2'/>
        </div>
    </div>
  )
}
