import React, { useState } from 'react'
import {MdOutlineAlternateEmail , MdOutlineRemoveRedEye} from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';

export default function Login() {

    const [showPassword, setshowPassword] = useState(false);
    const location = useLocation();
    const {logIn ,  error , setError , loader , setLoader} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = e => {
        setError('');
        e.preventDefault();
        
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data);

        //console.log(formData);
        logIn(formData.email , formData.password)
        .then(()=> {
            alert('Login Successful');
            navigate(location.state?.from || '/dashboard');

        }).catch((error )=> {
            setError(error.code);
            setLoader(false);
        })
    
    }
    //const contextValue = {user , signUp , logIn , logOut , updateProfile , googleLogIn , error , setError }

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today</h1>
        <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore Our Great Website for mastering Yoga.</p>
        <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
            <form onSubmit={handleSubmit} className='space-y-4 '>
                <p className='text-center text-red-400 text-lg font-medium'> Sign In to your account</p>
                <div>
                     {/* Email */}
                    <label htmlFor="email" className='sr-only'>Email</label>
                    <div className='relative'>
                      <input type='email' name='name' placeholder='Enter Email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>  
                        <span className='absolute inset-y-0 end-0 grid place-content-center px-4'> <MdOutlineAlternateEmail className='h-4 w-4 text-gray-400 '/></span>
                    </div>
                    <br></br>

                    {/* Password */}
                    <label htmlFor="password" className='sr-only'>Password</label>
                    <div className='relative'>
                      <input type={showPassword? 'text' : 'password'} name='password' placeholder='Enter Password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>  
                        <span  onClick={()=> setshowPassword(!showPassword)} className='absolute inset-y-0 end-0 grid place-content-center px-4'> <MdOutlineRemoveRedEye className='h-4 w-4 text-gray-400 '/></span>
                    </div>


                </div>

                <button className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white ' type='submit'>Sign In</button>
                <p className='text-center text-sm text-gray-500'>No Account?  <Link  className='underline' to='/register' >Sign Up</Link> </p>
            </form>

            <GoogleLogin/>
        </div>
   
    </div>
  )
}
