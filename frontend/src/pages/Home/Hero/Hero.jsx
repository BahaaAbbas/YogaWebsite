import React from 'react'

import bgImg from '../../../assets/home/banner-1.jpg'
export default function Hero() {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage:`url(${bgImg})`}}>
        <div className='min-h-screen items-center flex justify-start pl-11 text-white bg-black bg-opacity-60'>
            <div>
                <div className='space-y-4'>
                    <p className='md:text-4xl text-2xl'>We Provide</p>
                    <h1 className='md:text-7xl text-4xl font-bold'>Best Yoga Course Online</h1>
                    <div className='md:w-1/2'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolores temporibus reprehenderit sed quos ab ullam sint animi repudiandae sit cumque nam, natus debitis quo obcaecati veniam. Accusantium, odio nihil.
                        </p>
                    </div>
                    <div className='flex flex-wrap items-center gap-5'>
                        <button className='px-7 py-3 rounded-lg bg-secondary font-bold'>Join Today</button>
                        <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold'>View Courses</button>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
