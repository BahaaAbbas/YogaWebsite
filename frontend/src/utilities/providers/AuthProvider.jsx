import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import {getAuth ,updateProfile,signOut, createUserWithEmailAndPassword ,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    
    const [ user,setUser]=  useState(null);
    const [loader , setLoader]= useState(true);
    const [error , setError]= useState('');

    const auth = getAuth(app);

    //signup new USER 
    const signUp = async (email , password) => {

      try {

        setLoader(true);
        return await createUserWithEmailAndPassword(auth,email,password);
        
      } catch (error) {
        setError(error.code);
        throw error;
      }
    }

     //login  USER
     const logIn = async (email , password) => {

      try {

        setLoader(true);
        return await  signInWithEmailAndPassword(auth , email,password);
        
      } catch (error) {
        setError(error.code);
        throw error;
      }
    }

     //logOut  USER
     const logOut = async (email , password) => {

      try {

        setLoader(false);
        return await  signOut(auth);
        
      } catch (error) {
        setError(error.code);
        throw error;
      }
    }

    //update user profile
    const updateUserProfile = async (name , photo) => {

      try {

        setLoader(false);
        return await  updateProfile(auth.currentUser,
          {displayName:name , photoURL:photo}

        );
        setUser(auth.currentUser);
        
      } catch (error) {
        setError(error.code);
        throw error;
      }
    }

    //using google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogIn = async (email , password) => {

      try {
          setLoader(true);
        return await signInWithPopup(auth,googleProvider);
        
      } catch (error) {
        setError(error.code);
        throw error;
      }
    }

    //Observer fn for USERS
    useEffect(()=> {
      const unSubscribe = onAuthStateChanged(auth,(user) => {
        setUser(user);
        if(user) {
          axios.post('http://localhost:3000/api/set-token', {email:user.email , name : user.displayName})
          .then((data) => {
            if(data.data.tken) {
              localStorage.setItem('token',data.data.token);
              setLoader(false);
            }
          });
        }
        else {
          localStorage.removeItem('token');
          setLoader(false);
        }

      });

      return () => unSubscribe();


    },[]);


    const contextValue = { user ,setLoader , loader , signUp , logIn , logOut , updateProfile , googleLogIn , error , setError }
    
    return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}
