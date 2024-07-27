import React from 'react'
import useUser from '../hooks/useUser'
import { Navigate } from 'react-router-dom';

export default function DashboardNavigate() {

    const {currentUser , isLoading} = useUser();
   //const  role = currentUser?.role;
    //console.log(role);
    const  role = 'user';

   
    if(role === 'admin') return <Navigate to='/dashboard/admin-home' replace/>
    if(role === 'instructor') return <Navigate to='/dashboard/instructor-cp' replace/>
    if(role === 'user') return <Navigate to='/dashboard/student-cp' replace/>

}
