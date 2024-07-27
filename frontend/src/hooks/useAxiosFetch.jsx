import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export default function useAxiosFetch() {
    const axiosInstace = axios.create({
        baseURL : 'http://localhost:3000/',
       
        
    });

    //Interceptors
    useEffect(()=>{
      //request Interceptor
        const requestInterceptors = axios.interceptors.request.use(function (config) {
           
            return config;
          }, function (error) {
            
            return Promise.reject(error);
          });

         // response interceptor
         const responseInterceptors = axios.interceptors.response.use(function (response) {

            return response;
          }, function (error) {
        
            return Promise.reject(error);
          });

          return () => {
            axiosInstace.interceptors.request.eject(requestInterceptors);
            axiosInstace.interceptors.response.eject(responseInterceptors);

            
          }

        
    },[axiosInstace]);


  return axiosInstace;
}
