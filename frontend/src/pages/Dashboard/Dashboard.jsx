import React from 'react'
import useUser from '../../hooks/useUser'
import DashboardNavigate from '../../routes/DashboardNavigate';

export default function Dashboard() {

  const {currentUser , isLoading} = useUser();
  //const role = currentUser?.role;
  const role = 'user';

  // if(isLoading){
  //   return <div>Loading ...</div>
  // }

  return (

    <DashboardNavigate/>

  )
}
