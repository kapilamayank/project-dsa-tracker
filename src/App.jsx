import Problem from "./components/Problem"
import ProblemList from "./components/ProblemList"
import Sidebar from "./components/Sidebar"
import './App.css';
import CategoryList from "./components/CategoryList";
import RevisionList from "./components/RevisionList";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/authService";
import { login, logout, setLoading } from "./store/authSlice";
import LogoutBtn from "./components/LogoutBtn";
import AddProblemForm from "./components/AddProblemForm";
import crudService from "./appwrite/crudService";
import { setProblems } from "./store/problemsSlice";
import ImportJSONForm from "./components/ImportJSONForm";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector( state => state.auth.authStatus );
  const loading = useSelector( state => state.auth.loading );
  
  useEffect(() => {
    ( async () => {  
      const userData = await authService.getCurrentUser();

        // console.log(userData);
        
        if (userData) {
          dispatch(login(userData));

          const response = await crudService.getProblems(userData.$id);
          // console.log(userData.$id);
          if (!response) {
            console.log("error");
            return;
          }
          const problemList = response.documents || [];
          // console.log(problemList);
          
          dispatch(setProblems({ problemList, problemCount: problemList.length }));
        }
        else dispatch(logout());

        dispatch(setLoading(false));
    })();
  }, [authStatus]);

  //! add more reducers to problemSlice for better state management..... (optimization)
  return (
    <div className="h-screen max-h-screen">
      <div className='grid grid-cols-5 grid-rows-1 h-full w-full'>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4 pt-3 overflow-y-auto'>
          { (loading) ? null : <div className="w-[80%] justify-self-center border-2 border-black rounded-lg mt-2 mb-2">
            <AddProblemForm />
            <ImportJSONForm />
          </div> }
          <Outlet />
        </div>
      </div>

      { (authStatus) ? (<LogoutBtn />) : null }
    </div>
  )
}

export default App
