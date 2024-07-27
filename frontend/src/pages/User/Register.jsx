import React, { useContext } from 'react'
import { useForm} from "react-hook-form"
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin.jsx';
import { AuthContext } from '../../utilities/providers/AuthProvider.jsx';
import axios from 'axios';
//const contextValue = { user ,setLoader , loader , signUp , logIn , logOut , updateProfile , googleLogIn , error , setError }

export default function Register() {
  const navigate = useNavigate();
  const {signUp , updateProfile , setError}  = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setError('');
      const res = await signUp(data.email, data.password);
      const user = res.user;
  
      if (user) {
        await updateProfile(user, { displayName: data.name, photoURL: data.photoUrl });
  
        const userImp = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
          gender: data.gender,
          phone: data.phone,
          address: data.address,
        };
  
        if (user.email && user.displayName) {
          await axios.post('http://localhost:3000/new-user', userImp);
          navigate('/');
          setError('');
          return 'Registration Successful!';
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      throw err;
    }
  };
  const password = watch('password' , '');

  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Register</h2>
        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center gap-5'>
              <div className='mb-4'>
                  <label htmlFor='name' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlineUser  className='inline-block mr-2 mb-1 text-lg'/>
                    Name
                  </label>
                  <input type='text' placeholder='Enter Your Name' {...register("name", { required: true })}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>

              <div className='mb-4'>
                  <label htmlFor='email' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlineMail  className='inline-block mr-2 mb-1 text-lg'/>
                    Email
                  </label>
                  <input type='email' placeholder='Enter Your Email' {...register("email", { required: true })}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>
            </div>


            <div className='flex items-center gap-5'>
              <div className='mb-4'>
                  <label htmlFor='password' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlineLock  className='inline-block mr-2 mb-1 text-lg'/>
                    Password
                  </label>
                  <input type='password' placeholder='Enter Your Password' {...register("password", { required: true })}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>

              <div className='mb-4'>
                  <label htmlFor='confrimpassword' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlineLock  className='inline-block mr-2 mb-1 text-lg'/>
                    Confirm Password
                  </label>
                  <input type='password' placeholder='Enter  Password Again' {...register("confrimpassword", { required: true , validate:(value) => value === password || 'Password does not match' })}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>
            </div>


            <div className='flex items-center gap-5'>
              <div className='mb-4'>
                  <label htmlFor='phoneNumber' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg'/>
                    Phone
                  </label>
                  <input type='tel' placeholder='Enter Phone Number' {...register("phone", { required: true })}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>

              <div className='mb-4'>
                  <label htmlFor='photoUrl' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlinePicture  className='inline-block mr-2 mb-1 text-lg'/>
                    Photo URL
                  </label>
                  <input type='text' placeholder='YOUR PHOTO' {...register("photoUrl")}
                    className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                  />
              </div>
            </div>

            <div className=''>
            <div className='mb-4'>
                  <label htmlFor='gender' className='block text-gray-700 font-bold mb-2' >
                  <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
                    Gender
                  </label>
                  <select {...register("gender", {required:true})}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300'
                  
                  >
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
               
              </div>
            </div>

            <div className='mb-4'>
                  <label htmlFor='address' className='block text-gray-700 font-bold mb-2' >
                  <MdOutlineLocationOn 
                  className='inline-block mr-2 mb-1 text-lg'/>
                    Address
                  </label>
                  <textarea  {...register("address", {required:true})}
                  className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300'
                  rows='3'
                  placeholder='Enter Addres'
                  >

                  </textarea>
                 
              </div>

             <div className='text-center'>
              <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
             {
              errors && (<div className='text-red-500 text-sm w-full mt-1'> 
                <p>Password doesn't match!</p>
              </div>)
             }
             
              </div> 

        </form>

        <p className='text-center mt-4'>
          Already have an account? <Link to='/login' className='underline text-secondary ml-1'>Login</Link>
        </p>
        <GoogleLogin/>
      </div>
    </div>
  )
}
