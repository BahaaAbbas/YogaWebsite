import React, { useContext, useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utilities/providers/AuthProvider';  // Correct context import
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUser from '../../hooks/useUser';
import {toast} from 'react-toastify';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const {currentUser} = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;
  const [enrolledClasses , setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();


  const {user} = useContext(AuthContext);
  //console.log(user);
  
  const handleHoveredCard = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch.get('/classes')
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

 const handleSelect = (id) => {
    console.log(id);
    axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
    .then((res) => {
        setEnrolledClasses(res.data);
    }).catch((err) => {
      console.log(err);
    })

    if(!currentUser) {
      alert('Please Login First');
      return navigate('/login');
    }

    axiosSecure.get(`/cart-item/${id}??email=${currentUser?.email}`)
    .then((res)=> {
      if(res.data.classId === id) {
        return alert('Already Selected');

      }
      else if (enrolledClasses.find(item => item.classes._id) === id) {

        return alert('Already Enrolled');
      }
      else {
        const data = {
          classId: id,
          userMail: currentUser?.email,
          date: new Date(),
        }

        axiosSecure.post('/add-to-cart', data)
        .then((res)=> {
          alert('Successfuly added to the cart!');
          console.log(res.data);
        })

      }
    })
  }

  return (
    <div>
      <div className='mt-20 pt-3'>
        <h1 className='text-4xl font-bold text-center text-primary text-secondary'>Classes</h1>
      </div>

      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 h-[400px]
             mx-auto ${cls.availableSeats < 1 ? 'bg-red-300 ' : 'bg-white'} dark:bg-slate-600
            rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHoveredCard(index)}
            onMouseLeave={() => handleHoveredCard(null)}
          >
            <div className='relative h-48'>
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''}`} />
              <img src={cls.image} alt='' className='object-cover w-full h-full' />
              <Transition
                show={hoveredCard === index}
                enter='transition-opacity duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button onClick={() => handleSelect(cls._id)} title={role == 'admin' || role == 'instructor' ? 'Instructor/Admin Can not be able to select' ? cls.availableSeats < 1 : 'No Seat Available ' : ' You can select Classes' } 
                  className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'
                  disabled = {role === 'admin' || role === 'instructor' || cls.availableSeats < 1}
                  >Add to Cart</button>
                </div>
              </Transition>
              <div> 
              {/* {detail} */}
                <div className='px-6 py-2'> 
                  <h3 className= 'font-semibold mb-1'>{cls.name}</h3>
                  <p className='text-gray-500 text-xs'>Instructor:{cls.instructorName}</p>
                  <div className='flex items-center justify-between mt-4'>
                    <span className='text-gray-600 text-xs'>Available Seats: {cls.availableSeats}</span>
                    <span className='text-gray-500 font-semibold'>${cls.price}</span>

                  </div>
                  <Link to={`/class/${cls._id}`}>
    <button className='px-4 py-2 mt-4 w-full mb-2 mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>View</button>
  </Link>

                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
