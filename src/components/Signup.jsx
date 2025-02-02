import React, { useState } from 'react'
import authService from '../appwrite/authService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignupButtonClick = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const session = await authService.createAccount({
                userEmail: email,
                userPassword: password,
                userName: name,
            });
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
    }
  return (
    <div className='text-white'>
        <form className='flex flex-col gap-2 p-2'>
            <label 
                htmlFor="name"
                className='text-lg'>Name</label>
            <input 
                id="Name" 
                type="text"
                className='outline-none border-0 rounded-md bg-gray-700 text-white text-md p-2'
                onChange={(e) => setName(e.target.value)} />
            <label 
                htmlFor="email"
                className='text-lg'>Email</label>
            <input 
                id="email" 
                type="email"
                className='outline-none border-0 rounded-md bg-gray-700 text-white text-md p-2'
                onChange={(e) => setEmail(e.target.value)} />
            <label 
                htmlFor="email"
                className='text-lg'>Password</label>
            <input 
                id="password" 
                type="password"
                className='outline-none border-0 rounded-md bg-gray-700 text-white text-md p-2'
                onChange={(e) => setPassword(e.target.value)} />
            <button 
                className='rounded-md bg-green-600 text-lg p-1 mt-2 hover:bg-green-700'
                type='submit'
                onClick={ handleSignupButtonClick }>Signup</button>
        </form>
        <div className={`text-sm text-red-500`}>{errorMsg}</div>
    </div>
  )
}

export default Signup