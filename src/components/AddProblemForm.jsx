import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import crudService from '../appwrite/crudService';
import { setProblems } from '../store/problemsSlice';

function AddProblemForm() {
    const [problemName, setProblemName] = useState('');
    const [problemUrl, setProblemUrl] = useState('');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemTags, setProblemTags] = useState('');
    const [problemNotes, setProblemNotes] = useState('');
    const [revisionFlag, setRevisionFlag] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const userData = useSelector( state => state.auth.userData );

    const dispatch = useDispatch();

    const [submitState, setSubmitState] = useState('submit');


    const handleSubmitButtonClick = async (e) => {
        e.preventDefault();

        setSubmitState('submitting');

        const tagsArray = problemTags.split(',').map(tag => tag.trim());
        const userId = userData.$id;

        const newProblem = await crudService.createProblem({
            problemName,
            problemDifficulty,
            problemUrl,
            problemTags: tagsArray,
            userId,
            problemNotes,
            revisionFlag
        });

        if (newProblem) {
            const response = await crudService.getProblems(userId);

            const problemList = response?.documents || [];
            if (problemList.length === 0) setErrorMsg(true);
            else {
                const problemCount = problemList.length;
                dispatch(setProblems({ problemList, problemCount }));
            }

            setSubmitState('submitted');
            setTimeout(() => {
                setSubmitState('submit');
            }, 3000);

            setProblemName('');
            setProblemUrl('');
            setProblemTags('');
            setProblemNotes('');
            setRevisionFlag(false);
            setProblemDifficulty('');
        } else {
            setSubmitState('submit');
            setErrorMsg(true);
            setTimeout(() => {
                setErrorMsg(false);
            }, 3000);
        }
    }

  return (
    <div className='w-full text-white'>
        <button
            className='p-1 text-lg text-blue-700 bg-transparent border-0 outline-none mt-1 mb-1 hover:bg-gray-700 block'
            onClick={ () => { setShowForm( prev => !prev )} }> + Add Problem</button>
        <form className={`flex flex-col gap-1 p-2 ${ (showForm) ? '': 'hidden' }`}>
            <label 
                htmlFor="problemName"
                className='text-lg'>Problem Name</label>
            <input
                id='problemName' 
                type="text" 
                className='outline-none border-0 rounded-md bg-gray-700 text-white p-2 text-md'
                value={ problemName }
                onChange={ (e) => setProblemName(e.target.value) }/>
            <label 
                htmlFor="problemUrl"
                className='text-lg'>Problem URL</label>
            <input
                id='problemUrl' 
                type="text" 
                className='outline-none border-0 rounded-md bg-gray-700 text-white p-2 text-md'
                value={ problemUrl }
                onChange={ (e) => setProblemUrl(e.target.value) }/>
            <label 
                htmlFor="problemDifficulty"
                className='text-lg'>Problem Difficulty</label>
            <input
                id='problemDifficulty' 
                type="text" 
                className='outline-none border-0 rounded-md bg-gray-700 text-white p-2 text-md'
                value={ problemDifficulty }
                onChange={ (e) => setProblemDifficulty(e.target.value) }/>
            <label 
                htmlFor="problemTags"
                className='text-lg'>Problem Tags</label>
            <input
                id='problemTags' 
                type="text" 
                className='outline-none border-0 rounded-md bg-gray-700 text-white p-2 text-md'
                value={ problemTags }
                onChange={ (e) => setProblemTags(e.target.value) }/>
            <label 
                htmlFor="problemNotes"
                className='text-lg'>Notes</label>
            <textarea 
                name="problemNotes" 
                id="problemNotes"
                rows={6}
                className='outline-none border-1 border-gray-400 bg-gray-700 text-white p-2 text-md'
                value={ problemNotes }
                onChange={ (e) => setProblemNotes(e.target.value) } />
            <span>
                <label 
                    htmlFor="revisionFlag"
                    className='text-lg'>Revise Later</label>
                <input
                    id='revisionFlag' 
                    type="checkbox" 
                    className='outline-none border-0 ml-1 rounded-md bg-gray-700 text-white p-2 text-md'
                    onChange={ (e) => setRevisionFlag((prev) => !prev) }
                    checked={revisionFlag} />
            </span>
            <button
                type='submit'
                className='rounded-md bg-green-600 text-lg p-1 mt-2 hover:bg-green-700'
                onClick={ handleSubmitButtonClick }
                disabled={ submitState === 'submitting' }> { (submitState !== 'submitting')? 'Submit' : 'Submitting...' }</button>
        </form>
        <div className={`text-sm text-red-500 ${ (errorMsg === true) ? '' : 'hidden'}`}>*There was an error</div>
        <div className={`text-sm text-green-500 ${ (submitState === "submitted") ? '' : 'hidden'}`}> ✔ Submitted!</div>
    </div>
  )
} 

export default AddProblemForm