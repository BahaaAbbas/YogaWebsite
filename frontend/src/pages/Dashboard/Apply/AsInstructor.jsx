import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { FiUser , FiMail , FiBriefcase,FiSend } from 'react-icons/fi';
export default function AsInstructor() {

  const {currentUser} = useUser();
  const [submittedData,setSubmittedData] = useState({});
  const axiosFetch = useAxiosFetch();

  // useEffect(()=>{

  //   axiosFetch.get(`/applied-instructors/${currentUser?.email}`)
  //   .then((res)=> {

  //     setSubmittedData(res.data);


  //   }).catch((err)=> {
  //     console.log(err);

  //   })

  // },[]);

  const onsubmitfn = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;
    const data = {
      name,email,experience
    }
    console.log(data);

    // axiosFetch.post('/as-instructor' , data)
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err)=> {
    //   console.log(err);
    // })

  }

  return (
    <div className=''>
      <div className=''>
        {
                !submittedData?.name && (
                  <div className='flex justify-center items-center min-h-screen'>
                    <div className='md:w-1/2'>
                      <form className='' onSubmit={onsubmitfn}>
                        <div className='flex w-full'>
                          <div className='mb-4 w-1/2'>
                            <label htmlFor='name' className='text-gray-700'>Name</label>
                            <div className='flex items-center mt-1'>
                              <FiUser className='text-gray-500'/>
                              <input
                                type='text'
                                id='name'
                                defaultValue={currentUser?.name}
                                disabled
                                readOnly
                                name='name'
                                className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none'
                              />
                            </div>
                          </div>
                          <div className='mb-4 w-1/2'>
                            <label htmlFor='email' className='text-gray-700'>Email</label>
                            <div className='flex items-center mt-1'>
                              <FiMail className='text-gray-500'/>
                              <input
                                type='email'
                                id='email'
                                name='email'
                                className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='mb-4'>
                          <label htmlFor='experience' className='text-gray-700'>Experience</label>
                          <textarea
                            id='experience'
                            name='experience'
                            rows='4'
                            className='w-full border border-gray-300 focus:border-secondary outline-none p-2 mt-1'
                          ></textarea>
                        </div>
                        <div className='flex justify-center'>
                          <button type='submit' className='bg-secondary text-white py-2 px-4 rounded'>
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
        }
      </div>

    </div>
  )
}
