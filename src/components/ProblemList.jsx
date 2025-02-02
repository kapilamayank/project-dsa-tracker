import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Problem from './Problem';
import ProblemStatistics from './ProblemStatistics';
import { useEffect } from 'react';

function ProblemList({
  category,
  revision
}) {
  let { problemList, problemCount } = useSelector((state) => (state.problems));
  const [filteredProblems, setFilteredProblems] = useState(problemList);

  useEffect(() => {
    const updatedList = problemList.filter( (problem, index) => {
      if (category && revision)  return problem.problemTags.includes(category) && problem.revisionFlag;
      else if (category) return problem.problemTags.includes(category);
      else if (revision) return problem.revisionFlag;
      else return true;
    } );

    setFilteredProblems(updatedList)
  }, [problemList, category, revision]);
  
  if (filteredProblems.length === 0) return null;

  return (
    <div className='w-full pb-1'>
      <h2 className='text-3xl text-white p-3 text-center font-bold'>
        { (category) ?  `${category}`  : (revision) ? 'Revision Problems' : 'All Problems' }
      </h2>
      <div className="text-center"><ProblemStatistics problemList={filteredProblems}/></div>
      <div className='flex flex-col gap-2 w-full items-center'>
        { filteredProblems.map((problem, index) => (
            <Problem
              key={problem.problemUrl + problem.problemName} 
              problemName={problem.problemName}
              problemDifficulty={problem.problemDifficulty}
              problemNo={index+1}
              problemUrl={problem.problemUrl}
              problemNotes={problem.problemNotes}
              problemTags={problem.problemTags}
              problemId={problem.$id}
              revisionFlag={problem.revisionFlag} />
        ) ) }
      </div>
      
    </div>
  )
}

export default ProblemList