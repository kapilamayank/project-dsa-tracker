import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AuthLayout({children}) {
    const navigate = useNavigate();
    const authStatus = useSelector( state => state.auth.authStatus );
    const loading = useSelector( state => state.auth.loading );
    
    useEffect( () => {
        if (!authStatus && !loading) navigate("/auth/login");
    }, [authStatus, loading])

  if (!loading) return (
    <>
        {children}
    </>
  )
  else return (<div className='text-lg text-white justify-self-center self-center'>Loading...</div>)
}

export default AuthLayout