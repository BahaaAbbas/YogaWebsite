import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import PaymentHistory from "../pages/Dashboard/Student/Payment/PaymentHistory";
import AsInstructor from "../pages/Dashboard/Apply/AsInstructor";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import MyPending from "../pages/Dashboard/Instructor/MyPending";
import MyApproved from "../pages/Dashboard/Instructor/MyApproved";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        }, 
        {
            path : "instructors",
            element: <Instructors/>

        },
        {
            path : "classes",
            element: <Classes/>

        },
        {
          path : '/login',
          element: <Login/>
        },
        {
          path : '/register',
          element: <Register/>
        },
        {
          path : '/class/:id',
          element: <SingleClass/>,
          loader: ({params}) => fetch(`http://localhost:3000/class/${params.id}`)
        }



      ]
    },

    {
      path : '/dashboard',
      element:  <DashboardLayout/>,
      children: [
        {
        
            index : true,
            element: <Dashboard/>
          
        },

        //for student 
        {
        
          path : 'student-cp',
          element: <StudentCP/>
        
        },
        {
        
          path : 'enrolled-class',
          element: <EnrolledClasses/>
        
        },
        {
        
          path : 'my-selected',
          element: <SelectedClass/>
        
        },
        {
        
          path : 'my-payments',
          element: <PaymentHistory/>
        
        },
        {
        
          path : 'apply-instructor',
          element: <AsInstructor/>
        
        },

        //for instructor 
        {
        
          path : 'instructor-cp',
          element: <InstructorCP/>
        
        },
        {
        
          path : 'add-class',
          element: <AddClasses/>
        
        },
        {
        
          path : 'my-classes',
          element: <MyClasses/>
        
        },
        {
        
          path : 'my-pending',
          element: <MyPending/>
        
        },
        {
        
          path : 'my-approved',
          element: <MyApproved/>
        
        },

            //for Admin 
            {
        
              path : 'admin-home',
              element: <AdminHome/>
            
            },
            {
            
              path : 'manage-users',
              element: <ManageUsers/>
            
            },
            {
            
              path : 'manage-classes',
              element: <ManageClasses/>
            
            },
            {
            
              path : 'manage-applications',
              element: <ManageApplications/>
            
            },
            
        

        

      ]
    }
   
  ]);


