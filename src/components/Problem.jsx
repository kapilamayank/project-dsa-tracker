import React, { useState } from 'react'
import crudService from '../appwrite/crudService';
import { useDispatch, useSelector } from 'react-redux';
import { setProblems } from '../store/problemsSlice';

function Problem({
    problemNo,
    problemName,
    problemDifficulty,
    problemUrl,
    problemTags,
    userId,
    problemId,
    problemNotes,
    revisionFlag=false
}) {
    const [revision, setRevision] = useState(revisionFlag);
    
    const [notes, setNotes] = useState(problemNotes);
    const [prevNotes, setPrevNotes] = useState(problemNotes);
    
    const [options, setOptions] = useState(false);
    const [editable, setEditable] = useState(false);

    const [error, setError] = useState(false);

    const userData = useSelector( state => state.auth.userData );
    const dispatch = useDispatch();

    //! optimize
    const handleRevisionButtonClick = async () => {
        let response = await crudService.updateProblem(problemId, {
            problemName,
            problemDifficulty,
            problemUrl,
            problemTags,
            problemNotes,
            revisionFlag: !revisionFlag
        });

        if (!response) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }

        response = await crudService.getProblems(userData.$id);
        if (!response) {
            setError(true);
            return;
        }

        const problemList = response?.documents || [];
        dispatch(setProblems({ problemList, problemCount: problemList.length }));

        setRevision((prev) => !prev);
    }

    const handleMoreOptionsButtonClick = () => {
        setOptions((prev) => !prev);
    }

    const handleEditNotesButtonClick = () => {
        setOptions(false);
        setEditable(true);
    }

    //! optimize
    const handleDeleteProblemButtonClick = async () => {
        let response = await crudService.deleteProblem(problemId);

        if (!response) setError(true);

        response = await crudService.getProblems(userData.$id);
        if (!response) setError(true);

        const problemList = response?.documents || [];
        dispatch(setProblems({ problemList, problemCount: problemList.length }));
    }

    //! optimize
    const handleDoneButtonClick = async () => {
        setEditable(false);

        let response = await crudService.updateProblem(problemId, {
            problemName, 
            problemDifficulty,
            problemUrl,
            problemTags,
            problemNotes: notes,
            revisionFlag
        });

        console.log(response);
        if (!response) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            setNotes(prevNotes);
            return;
        }

        response = await crudService.getProblems(userData.$id);
        if (!response) {
            setError(true);
            return;
        }

        const problemList = response?.documents || [];

        dispatch(setProblems({ problemList, problemCount: problemList.length }));
    }

    const difficultyColor = {
        'Easy': 'text-green-700',
        'Medium': 'text-yellow-500',
        'Hard': 'text-red-600'
    }

  return (
    <div className='w-[90%]'>
        <div className= { `flex min-h-[80px] flex-row flex-nowrap border-2 border-black shadow-md rounded-3xl text-white justify-evenly relative ${ (problemNo % 2 === 0 ) ? 'bg-gray-800': 'bg-gray-700'}` }>
            <div className='w-[5%] p-0.5'>
                &nbsp; { problemNo }
            </div>
            <div className='w-[25%] p-0.5 text-wrap'>
                <a 
                    href={ problemUrl }
                    target='_blank'
                    rel="noopener noreferrer"
                    className='hover:text-blue-700'>{ problemName }</a>
            </div>
            <div className='w-[10%] p-0.5'>
                <span className={`${difficultyColor[problemDifficulty]}`}>{ problemDifficulty }</span>
            </div>
            <div className='w-[10%] text-wrap'>
                 { problemTags.map((tag, index) => {
                    if (index === problemTags.length-1) return String(tag);
                    else return String(tag) + ', ';
                 }) }
            </div>
            <div className= { ` w-[30%] p-0.5 max-h-[175px] overflow-y-auto ${editable ? 'hidden' : ''}` }>
                { /* notes */ problemNotes } 
            </div>
            <div className= { `flex flex-col flex-nowrap gap-1 w-[30%] p-0.5 max-h-[175px] overflow-y-auto ${editable ? '' : 'hidden'}` }>
                <textarea
                    className="flex-grow w-full resize-none min-h-[100px] max-h-[175px] overflow-y-auto scrollbar-hide  hover:scrollbar-visible text-black outline-none rounded-lg"
                    value={notes}
                    onChange={ (e) => setNotes(e.target.value) } /> 
                <button 
                    className='bg-green-600 rounded-lg p-1 block flex-grow-0 hover:bg-green-700'
                    onClick={handleDoneButtonClick}>
                    Done
                </button>
            </div>
            <div className='w-[10%]'>
                <button
                    onClick={ handleRevisionButtonClick }
                    className='bg-none border-none text-3xl'>
                        { (revisionFlag) ? '⭐' : '☆' }
                </button>
            </div>
            <div className='w-[5%] p-0.5'>
                <button 
                    className='bg-none border-none text-xl w-[27.5px] h-[27.5x] rounded-full hover:bg-gray-700'
                    onClick={handleMoreOptionsButtonClick}>
                    ⫶
                </button>
                {
                    (options) ? 
                    ( <div className='text-md absolute top-[25px] right-[-25px] bg-gray-700 z-10'>
                        <ul>
                            <li>
                                <button className='p-1 hover:bg-gray-800 w-full'
                                        onClick= { handleEditNotesButtonClick }>
                                    <span className='text-nowrap'> ✏️ Edit Notes </span>
                                </button>
                            </li>
                            <li>
                                <button className='p-1 hover:bg-gray-800 w-full'
                                        onClick= { handleDeleteProblemButtonClick }>
                                    <span className='text-nowrap'> 🗑️ Delete Problem </span>
                                </button>
                            </li>
                        </ul>
                     </div> ) : ('') 
                }
            </div>
        </div>
        <div className={ `text-red-500 text-sm ${(error) ? '' : 'hidden'}` }>*Error Updating</div>
    </div>
  )
}

export default Problem