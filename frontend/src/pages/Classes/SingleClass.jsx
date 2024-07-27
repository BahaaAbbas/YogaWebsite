import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function SingleClass() {
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (currentUser?.email) {
      const fetchEnrolledClasses = async () => {
        try {
          const response = await axiosSecure.get(`/enrolled-classes/${currentUser.email}`);
          setEnrolledClasses(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching enrolled classes:', err);
          setError('Failed to fetch enrolled classes');
          setLoading(false);
        }
      };

      fetchEnrolledClasses();
    } else {
      setLoading(false);
      setError('User not logged in');
    }
  }, [axiosSecure, currentUser?.email]);

  console.log('Course Data:', course);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Course Details</h1>
      {/* <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-2xl font-semibold">{course.name}</h2>
        <p className="text-gray-700">{course.description}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Instructor: {course.instructor}</h3>
          <p className="text-gray-700">Duration: {course.duration}</p>
          <p className="text-gray-700">Price: ${course.price}</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">Enrolled Classes</h1>
      <div className="bg-white shadow-md rounded p-4">
        {enrolledClasses.length > 0 ? (
          enrolledClasses.map((enrolledClass, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold">{enrolledClass.classes.name}</h2>
              <p className="text-gray-700">{enrolledClass.classes.description}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Instructor: {enrolledClass.instructor.name}</h3>
                <p className="text-gray-700">Duration: {enrolledClass.classes.duration}</p>
                <p className="text-gray-700">Price: ${enrolledClass.classes.price}</p>
              </div>
              {role === 'student' && (
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Enroll Now
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No enrolled classes found.</p>
        )}
      </div> */}
    </div>
  );
}
