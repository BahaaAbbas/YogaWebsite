import { ThemeProvider, THEME_ID, createTheme, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion';
import {FaBars} from 'react-icons/fa';
const navLinks = [
    { name: 'Home', route: '/' },
    { name: 'Instructors', route: '/instructors' },
    { name: 'Classes', route: '/Classes' },

];

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsmMobileMenuOpen] = useState(false);
    const [scrollPosition, setscrollPosition] = useState(0);
    const [isLogin, setisLogin] = useState(false);
    const [isFixed, setisFixed] = useState(false);
    const [isDarkMode, setisDarkMode] = useState(false);
    const [isHome, setisHome] = useState(false);
    const [navBg, setNavBg] = useState('bg-[#15151580]');
    //const [user, setUser] = useState(false);
    const user = true;

    const toggleMobileMenu = () => {
        setIsmMobileMenuOpen(!isMobileMenuOpen);
    }

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        }
        else {
            root.classList.remove(darkClass);

        }
    }, [isDarkMode]);

    useEffect(() => {

        setisHome(location.pathname === '/');
        setisLogin(location.pathname === '/login');
        setisFixed(location.pathname === '/register' || location.pathname === '/login');

    }, [location]);

    useEffect(() => {

        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black');

            }
            else {
                setNavBg('bg-white dark:bg-black dark:text-white text-black');

            }
        }
        else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'}
            'dark:text-white text-white' `);
        }

    }, [scrollPosition]);

    useEffect(() => {

        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setscrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);


    }, []);

    const handleLogout = () => {
        console.log('logout');
    }


    return (
        <motion.nav 
        initial = {{opacity : 0}}
        animate = {{opacity : 1}}
        transition={{duration:0.5}}
         className={`${isHome ? navBg : 'bg-white dark:bg-black backdrop:blur-2xl'} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10 `}>
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex items-center justify-between'>
                    {/* {logo} */}
                    <div onClick={()=> navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
                    <div>
                    <h1 className='text-2xl inline-flex gap-3 items-center font-bold'>YogoMaster <img src='/yoga-logo.png' className='w-8 h-8 ' alt='' /></h1>
                    <p className='font-bold text-[13px] tracking-[7px]'>Quick Explore</p>
                    </div>
                    </div>
                    {/* mobile menu icons */}
                    <div className='md:hidden flex items-center'>
                        <button type='button' className='text-gray-300 hover:text-white focus:outline-none '>
                            <FaBars className='h-6 w-6 hover:text-primary'/>
                        </button>
                    </div>
                    {/* Navigational Links  */}

                    <div className='hidden md:block text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {
                                    navLinks.map((Link) => (
                                        <li key={Link.route}>
                                            <NavLink  style={{whiteSpace : 'nowrap'}} to={Link.route} className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                            }>{Link.name}</NavLink>
                                        </li>


                                    ))
                                }
                                {/* based on user  */}
                                {
                                    user ? null : isLogin ? <li>
                                        <NavLink to='/register' className={({ isActive }) =>
                                            `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                        } >Register</NavLink>
                                    </li>
                                        :
                                        <li>
                                            <NavLink to='/login' className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                            } >Login</NavLink>
                                        </li>
                                }

                                {
                                    user && <li>
                                        <NavLink to={'/dashboard'} className={({ isActive }) =>
                                            `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                        }>Dashboard</NavLink>
                                    </li>
                                }
                                {
                                    user && <li>
                                        <img src={user?.photoURL || '../../src/assets/home/girl.jpg'} alt='' className='h-[40px] rounded-full w-[40]' />
                                    </li>
                                }
                                {
                                    user && <li >
                                        <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>
                                            Logout
                                        </NavLink>

                                    </li>
                                }


                                {/* color toggles  */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <Switch onChange={() => setisDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px]'>Light/Dark</h1>
                                        </div>

                                    </ThemeProvider>
                                </li>


                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </motion.nav>

    )
}
