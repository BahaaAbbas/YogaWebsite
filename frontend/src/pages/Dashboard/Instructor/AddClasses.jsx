import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';

export default function () {

   const axiosSecure = useAxiosSecure();
   const {currentUser}= useUser();
   const [image,setImage ] = useState(null);
   
    const handleImageChange = (e) => {

    }
    const HandleSubmitForm = (e) => {
        e.preventDefault();
        console.log('Form');
    }

  return (
    <div className=''>
        <div className=''>
            <h1 className='text-center text-3xl font-bold'>Add Your  Course</h1>
        </div>

        <form onSubmit={HandleSubmitForm}  className='mx-auto bg-white p-6 rounded shadow'> 

            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Course|Name</label>
                    <input type='text' required placeholder='Your Course Name' name='name' id='name' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'></input>

                </div>

                <div className='mb-6'>
                    <label htmlFor='image' className='block text-gray-700 font-bold mb-2'>Course Thumbnail</label>
                    <input type='file' required name='image' id='image' 
                    className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500  focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4'
                    onChange={handleImageChange}/>


                </div>

            </div>

            <div>
                <h1 className='text-[12px] my-2 ml-2 text-secondary'>You Can not change your name or email</h1>
                <div className='grid grid-cols-2  gap-1 '>
                    <div className=' mb-6'>
                        <label htmlFor='instructorName' className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                        <input className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                            type='text'
                            value={currentUser?.name}
                            readOnly
                            disabled
                            placeholder='Instuctor Name'
                            name='instructorName'
                        />
                    </div>

                    <div className=' mb-6'>
                        <label htmlFor='instuctorEmail' className='block text-gray-700 font-bold mb-2'>Instructor Email</label>
                        <input className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                            type='text'
                            value={currentUser?.email}
                            readOnly
                            disabled
                            placeholder='Instuctor email'
                            name='instuctorEmail'
                        />
                    </div>

                </div>

                <div className='grid grid-cols-2  gap-3 '>
                    <div className=' mb-6'>
                        <label htmlFor='instructorName' className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                        <input className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                            type='text'
                            value={currentUser?.name}
                            readOnly
                            disabled
                            placeholder='Instuctor Name'
                            name='instructorName'
                        />
                    </div>

                    <div className=' mb-6'>
                        <label htmlFor='instuctorEmail' className='block text-gray-700 font-bold mb-2'>Instructor Email</label>
                        <input className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                            type='text'
                            value={currentUser?.email}
                            readOnly
                            disabled
                            placeholder='Instuctor email'
                            name='instuctorEmail'
                        />
                    </div>

                </div>
            </div>


            <div className='grid grid-cols-1 w-full gap-3 items-center'>
                <div className='mb-6'>
                <label htmlFor='instructorName' className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                        <input className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                            type='text'
                            value={currentUser?.name}
                            readOnly
                            disabled
                            placeholder='Instuctor Name'
                            name='instructorName'
                        />

                </div>

                <div className='mb-6'>
                    <label htmlFor='instructorName' className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                    <textarea 
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        value={currentUser?.name}
                       
                        placeholder='Instructor Name'
                        name='instructorName'
                        rows='4'
                    />
                </div>

                <div className='mb-6'>
                   <button className='bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded'>Add</button>
                </div>



            </div>

        </form>
    </div>
  )
}
