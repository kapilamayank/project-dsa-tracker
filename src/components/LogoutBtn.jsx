import React from 'react'
import authService from '../appwrite/authService'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, setLoading } from '../store/authSlice';
import { setProblems } from '../store/problemsSlice';

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutBtnClick = async (e) => {
        await authService.logout();
        dispatch(logout());
        dispatch(setProblems({ problemList: [], problemCount: 0 }));
        navigate("/auth/login");
    }

    return (
    <div className='absolute top-2 right-5'>
        <button
            className='text-white text-lg p-2 bg-red-600 rounded-lg'
            onClick={ handleLogoutBtnClick }>
            Logout
        </button>
    </div>
  )
}

export default LogoutBtn