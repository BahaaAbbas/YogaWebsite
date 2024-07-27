import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi';
import {BsFillPostcardFill} from 'react-icons/bs';
import {TbBrandAppleArcade} from 'react-icons/tb';
import { FaHome, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { duration } from '@mui/material';
import { IoIosTrendingUp , IoIosBrowsers, IoMdDoneAll  } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { MdExplore, MdPayments, MdPendingActions } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";


import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';



const adminNavItems = [
    {to: '/dashboard/admin-home' , icon : <BiHomeAlt className='text-2xl' /> , label : 'Dashboard Home'},
    {to: '/dashboard/manage-users' , icon : <FaUsers className='text-2xl' /> , label : 'Manage Users'},
    {to: '/dashboard/manage-classes' , icon : <BsFillPostcardFill className='text-2xl' /> , label : 'Manage Class'},
    {to: '/dashboard/manage-applications' , icon : <TbBrandAppleArcade className='text-2xl' /> , label : 'Applications'},
];

const instructorsNavItems = [
    {to: '/dashboard/instructor-cp' , icon : <FaHome className='text-2xl' /> , label : 'Home'},
    {to: '/dashboard/add-class' , icon : <MdExplore  className='text-2xl' /> , label : 'Add A Class'},
    {to: '/dashboard/my-classes' , icon : <IoSchoolSharp  className='text-2xl' /> , label : 'My Classes'},
    {to: '/dashboard/my-pending' , icon : <MdPendingActions className='text-2xl' /> , label : 'Pending Courses'},
    {to: '/dashboard/my-approved' , icon : <IoMdDoneAll className='text-2xl' /> , label : 'Approved Classes'},

];

const studenNavItems = [
    {to: '/dashboard/student-cp' , icon : <BiHomeAlt className='text-2xl' /> , label : 'Dashboard'},
    {to: '/dashboard/enrolled-class' , icon : <SiGoogleclassroom   className='text-2xl' /> , label : 'My Enroll'},
    {to: '/dashboard/my-selected' , icon : <BiSelectMultiple  className='text-2xl' /> , label : 'My Selected'},
    {to: '/dashboard/my-payments' , icon : <MdPayments className='text-2xl' /> , label : 'Payment History'},
    {to: '/dashboard/apply-instructor' , icon : <SiInstructure className='text-2xl' /> , label : 'Apply for Instructor'},

];


const lastMenuItems = [
    {to: '/' , icon : <BiHomeAlt className='text-2xl' /> , label : 'Main Home'},
    {to: '/trending' , icon : <IoIosTrendingUp className='text-2xl' /> , label : 'Trending'},
    {to: '/browse' , icon : <IoIosBrowsers className='text-2xl' /> , label : 'Following'},
   
];



//    const contextValue = { user ,setLoader , loader , signUp , logIn , logOut , updateProfile , googleLogIn , error , setError }

export default function DashboardLayout() {
    const [open , setOpen ]= useState(true);
    const {loader , logOut} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate();
    
    //const  role = currentUser?.role;
    //console.log(role);

   const  role = 'admin';

    // if(loader) {
    //     return <div> Loading...</div>
    // }

    const handleLogOut = () => {
      
       
       
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout me!"
          }).then((result) => {
            if (result.isConfirmed) {
                 logOut().then(
                    Swal.fire({
                        title: "Logged Out!",
                        text: "Your have been logged out",
                        icon: "success"
                      }),

                      

                 ).catch((err)=> {
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    //   })
                    throw err;
                 })
             
            }
            navigate('/');
          });
    }


  return (
    <div className='flex '>
        <div className={`${open? 'w-72 overflow-y-auto' : 'w-[90px] overflow-auto'} bg-purple-300 h-screen p-5 md:block hidden pt-8 relative duration-300 `}>
            <div className='flex gap-x-4 items-center'>
                <img onClick={() => setOpen(!open)} src='/yoga-logo.png' alt='' className={`cursor-pointer h-[40px] duration-500 ${open && 'rotate-[360deg]'}`}/>
                
                <Link to='/'>
                <h1 onClick={()=> setOpen(!open)} className={`text-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && 'scale-0' }`}>Yoga Master</h1>
                </Link>
            </div>

            {/* navlinks */}
            {/* admin roles */}
            {
                role === 'admin' && <ul className='pt-6'>
                    <p className={`ml-3 uppercase text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'admin' && adminNavItems.map((menuIte , index) => (
                            <li className='mb-2' key={index}>
                                <NavLink to={menuIte.to}
                                className={({isActive}) => 
                                    `flex ${isActive? 'bg-red-500 text-white': 'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4

                                        
                                    `
                                }>
                                    {menuIte.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>

                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }

            {/* instructor roles */}

            {
                role === 'instructor' && <ul className='pt-6'>
                    <p className={`ml-3 uppercase text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'instructor' && instructorsNavItems.map((menuIte , index) => (
                            <li className='mb-2' key={index}>
                                <NavLink to={menuIte.to}
                                className={({isActive}) => 
                                    `flex ${isActive? 'bg-red-500 text-white': 'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4

                                        
                                    `
                                }>
                                    {menuIte.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>

                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }


             {/* students roles  */}
             {
                role === 'user' && <ul className='pt-6'>
                    <p className={`ml-3 uppercase text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'user' && studenNavItems.map((menuIte , index) => (
                            <li className='mb-2' key={index}>
                                <NavLink to={menuIte.to}
                                className={({isActive}) => 
                                    `flex ${isActive? 'bg-red-500 text-white': 'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4

                                        
                                    `
                                }>
                                    {menuIte.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>

                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }


            <ul className='pt-6'>
            
                <p className={`ml-3 text-gray-500 ${!open && 'hidden'} uppercase`}><small>Useful Links</small></p>

                {
                 
                    
                 lastMenuItems.map((menuIte , index) => (
                            <li className='mb-2' key={index}>
                                <NavLink to={menuIte.to}
                                className={({isActive}) => 
                                    `flex ${isActive? 'bg-red-500 text-white': 'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4

                                        
                                    `
                                }>
                                    {menuIte.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>

                                </NavLink>
                            </li>
                        ))
                    
                
                }

                <li>
                <button 
               
                        onClick={() => handleLogOut()}
                                className={
                                    `
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4

                                        flex 
                                    `
                                }>

                                <BiLogInCircle className='text-2xl'/>
                                <span className={`${!open && 'hidden'} origin-left duration-200`}>
                                    Logout
                                </span>
                                  

                                </button>
                </li>

            </ul>


        </div>
        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll/>
            <Outlet/>

        </div>

    </div>
  )
}
