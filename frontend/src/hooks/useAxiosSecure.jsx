import React, { useContext } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../utilities/providers/AuthProvider';
import {useNavigate} from 'react-router-dom';

//const contextValue = {user , signUp , logIn , logOut , updateProfile , googleLogIn , error , setError }

export default function useAxiosSecure() {

  const {logOut} = useContext(AuthContext);
  const navigate = useNavigate();

      const axiosSecure = axios.create({
        baseURL : 'http://localhost:3000/',
       
      });

            //Interceptors
      useEffect(()=>{
        //request Interceptor
          const requestInterceptors = axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');

            if(token) {
              config.headers.Authorization = `Bearer ${token}`;

            }
              return config;
            }, function (error) {
              
              return Promise.reject(error);
            });

          // response interceptor
          const responseInterceptors = axiosSecure.interceptors.response.use(function (response) {

              return response;
            },async function (error) {
              if(error.response && (error.response.status === 401 || error.response.status === 403)){
                await logOut();
                navigate('/login');
                throw error;
              }
          
              return Promise.reject(error);
            });

            return () => {
              axiosSecure.interceptors.request.eject(requestInterceptors);
              axiosSecure.interceptors.response.eject(responseInterceptors);

              
            }

          
      },[logOut, navigate,axiosSecure]);

      return axiosSecure;

}


// export default function useAxiosFetch() {
//     const axiosInstace = axios.create({
//         baseURL : 'http://localhost:3000/',
       
        
//     });

//     //Interceptors
//     useEffect(()=>{
//       //request Interceptor
//         const requestInterceptors = axios.interceptors.request.use(function (config) {
           
//             return config;
//           }, function (error) {
            
//             return Promise.reject(error);
//           });

//          // response interceptor
//          const responseInterceptors = axios.interceptors.response.use(function (response) {

//             return response;
//           }, function (error) {
        
//             return Promise.reject(error);
//           });

//           return () => {
//             axiosInstace.interceptors.request.eject(requestInterceptors);
//             axiosInstace.interceptors.response.eject(responseInterceptors);

            
//           }

        
//     },[axiosInstace]);


//   return axiosInstace;
// }
