import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import { MdDeleteSweep } from 'react-icons/md';
import {FiDollarSign} from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function SelectedClass() {

    const {currentUser} = useUser();
    const [Loading , setLoading] = useState();
    const [clasess , setClasess] = useState([]);
    const [paginatedData , setPaginatedData] = useState([]);
    const [page , setPage] = useState(1);
    const itemPerPage = 5;
    const totalpage = Math.ceil(clasess.length / itemPerPage);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    
    // useEffect(()=> {
    //     axiosSecure.get(`/cart/${currentUser?.email}`)
    //     .then((res)=> {
    //         setClasess(res.data);
    //        // setLoading(false);
    //     })
    //     .catch((err)=> {
    //        // setLoading(false);
    //         console.log(err);
    //     })

    // },[]);

    const totalPrice = clasess.reduce((acc,item)=> acc * parseInt(item.price), 0);
    const totalTax = totalpage * 0.01;
    const price = totalPrice * totalTax;
    
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart/${id}`)
                .then((res) => {
                    if(result.data.deletedCount > 0 ) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                    const newClasses = clasess.filter((item) => item._id !== id);
                    setClasess(newClasses);
                   
                })
                .catch((err)=> {
                    console.log(err);
                })
              
            }
          });
        }


        const handlePayBtn = (id) => {
            console.log(`PayBtn Pressed`);
         }
 

        
          


  return (
    <div>
        <div className='my-6 '>
            <h1 className='text-4xl text-center font-bold'>My <span className='text-secondary'>Selected</span> Class</h1>
        </div>

        <div className='h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h2 className='text-2xl font-semibold mb-4'>Shopping Cart: </h2>
                <div className='flex flex-col md:flex-row gap-4'>
                    {/* left */}
                    <div className='md:w-3/4 '>
                        <div className='bg-white rounded-lg shadow-md p-6 mb-4 '>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left font-semibold'>#</th>
                                        <th className='text-left font-semibold'>Product</th>
                                        <th className='text-left font-semibold'>Price</th>
                                        <th className='text-left font-semibold'>Date</th>
                                        <th className='text-left font-semibold'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        clasess.length  === 0 ? <td className='text-center text-2xl font-bold'>No Classes Found</td> 
                                        : 
                                        clasess.map((item , index) => {
                                            const letIdx = (page - 1) * itemPerPage + index + 1;
                                                return <tr key={item._id}>
                                                    <td className='py-4'>
                                                        {letIdx}
                                                    </td>
                                                    <td className='py-4'>
                                                        <div className='flex items-center'> 
                                                            <img src={item.image} alt='' className='h-16 w-16 mr-4'/>
                                                            <span className=''>{item.name}</span>
                                                        </div>

                                                    </td>

                                                    <td className='py-4'>
                                                        {item.price}
                                                    </td>

                                                    <td className='py-4'>
                                                        <p className='text-green-200 text-sm'>
                                                            {moment(item.submitted).format('MMM Do YYYY')}

                                                        </p>
                                                    </td>

                                                    <td className='py-4 flex pt-8 gap-2'>
                                                        <button onClick={()=> handleDelete(item._id)} className='px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'><MdDeleteSweep className=''/></button>
                                                        <button onClick={()=> handlePayBtn(item._id)} className='px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center'><FiDollarSign className='mr-2'/></button>

                                                    </td>

                                                    </tr>
                                        })
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>


                    {/* right  */}
                    <div className='md:w-1/5 fixed right-3'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h2 className='text-lg font-semibold mb-4'>Summary</h2>
                            <div className='flex justify-between mb-2'>
                                <span>Subtotal</span>
                                <span>$100</span>
                            </div>
                            
                            <div className='flex justify-between mb-2'> 
                                <span>Taxes</span>
                                <span>$5</span>
                            </div>  

                            <div className='flex justify-between mb-2'> 
                                <span>Extra Fees</span>
                                <span>$0</span>
                            </div>
                            <hr className='my-2'/>

                            <div className='flex justify-between mb-2'> 
                                <span className='font-semibold'>Total</span>
                                <span className='font-semibold'>$500</span>
                            </div>

                            <button onClick={() => navigate('/dashboard')} 
                            className='bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full'
                             >Checkout</button>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
  )
}
