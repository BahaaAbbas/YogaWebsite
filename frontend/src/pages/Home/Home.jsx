import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallary from './Gallary/Gallary'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import useAuth from '../../hooks/useAuth'


export default function Home() {

    const {user} = useAuth();
    console.log(user);
    
  return (
    <section>
        <HeroContainer/>
        <div className='max-w-screen-xl mx-auto'>
          <Gallary/>
          <PopularClasses/>
          <PopularTeacher/>
        </div>
    </section>
  )
}
