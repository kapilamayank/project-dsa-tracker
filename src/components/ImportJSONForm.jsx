import React, { useState } from 'react'
import crudService from '../appwrite/crudService';
import { useDispatch, useSelector } from 'react-redux';
import { setProblems } from '../store/problemsSlice';

function ImportJSONForm() {
  const [jsonData, setJsonData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitState, setSubmitState] = useState('submit');
  const [errorMsg, setErrorMsg] = useState(false);
  const [problemsAdded, setProblemsAdded] = useState(0);
  const [errorLogs, setErrorLogs] = useState([]);
  
  const userData = useSelector( state => state.auth.userData );
  const userId = userData.$id;
  const dispatch = useDispatch();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsedData = JSON.parse(reader.result);
          setJsonData(parsedData); 
        } catch (error) {
          setErrorMsg(true);
          setTimeout(() => {
            setErrorMsg(false);
          }, 2000);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('submitting');
    
    for (let i = 0; i < jsonData.length;) {
        const {
            problemName,
            problemUrl,
            problemDifficulty,
            problemNotes,
            problemTags,
            revisionFlag
        } = jsonData[i];
        try {
            await crudService.createProblems({
                problemName,
                problemUrl,
                problemDifficulty,
                problemNotes,
                problemTags,
                revisionFlag
            }, userId);
            setProblemsAdded((prev) => prev+1);
            i += 1;
        } catch(error) {
            if (error.code === 429) {
                setErrorLogs( prev => [...prev, `Overload \n Sleeping for 10s`] );
                await sleep(10000);
            } else {
                setErrorLogs( prev => [...prev, `Could not add problem: ${i+1} \n ${error.message}`] );
                i += 1;
            }
        }
    }

    setSubmitState('submitted');
    setTimeout(() => {
        setSubmitState('submit')
    }, 3000);

    setErrorLogs([]);
    setProblemsAdded(0);

    const response = await crudService.getProblems(userId);

    const problemList = response?.documents || [];
    if (problemList.length === 0) setErrorMsg(true);
    else {
        const problemCount = problemList.length;
        dispatch(setProblems({ problemList, problemCount }));
    }
  }
    
  return (
    <div className='w-full text-white'>
        <button
            className='p-1 text-lg text-blue-700 bg-transparent border-0 outline-none mt-1 mb-1 hover:bg-gray-700 block'
            onClick={ () => { setShowForm( prev => !prev )} }> + Import as JSON</button>
        <form className={`flex flex-col gap-1 p-2 ${ (showForm) ? '': 'hidden' }`}>
            <label htmlFor="jsonFile">Upload JSON File</label>
            <input 
                type="file" 
                accept='.json' 
                onChange={handleFileChange}
                id='jsonFile'
                className=' w-full text-sm text-white bg-gray-700 border border-gray-600 rounded-md py-2 px-3 mb-4 cursor-pointer hover:bg-gray-600' />
            <button
                type='submit'
                className={`${submitState === 'submitting' ? 'cursor-not-allowed' : '' }` + ' rounded-md bg-green-600 text-lg p-1 mt-2 hover:bg-green-700'}
                onClick={handleSubmit}
                disabled={ submitState === 'submitting' }>
                    { (submitState !== 'submitting')? 'Submit' : 'Submitting...' }
            </button>
        </form>
        <div className={`${ submitState === 'submitting' && jsonData.length > 0 ? '' : 'hidden' } text-sm`}>
            Added: { problemsAdded + '/' + jsonData.length }
        </div>
        <div className={`${ submitState === 'submitting' ? '' : 'hidden' } text-sm`}>
            { errorLogs.map( (err, index) => (<div key={index} style={{whiteSpace: 'pre-line'}}>{err}</div>) ) }
        </div>
        <div className={`text-sm text-red-500 ${ (errorMsg === true) ? '' : 'hidden'}`}>*There was an error</div>
        <div className={`text-sm text-green-500 ${ (submitState === "submitted") ? '' : 'hidden'}`}> ✔ Submitted!</div>
    </div>
  )
}

export default ImportJSONForm