import React, { useEffect, useMemo, useState } from 'react'

function ProblemStatistics({
    problemList
}) {
    /*
    const [easy, setEasy] = useState(0)
    const [medium, setMedium] = useState(0)
    const [hard, setHard] = useState(0)

    const [revision, setRevision] = useState(0)
    
    
    useEffect(() => {
        problemList.forEach((problem) => {
            if (problem.problemDifficulty === 'Easy') setEasy((prev) => prev+1)
            else if (problem.problemDifficulty === 'Medium') setMedium((prev) => prev+1)
            else setHard((prev) => prev+1)
            
            if (problem.revisionFlag == true) setRevision((prev) => prev+1)
        });
    }, [problemList]);
    */

    const statistics = useMemo(() => {
        const stats = {
            easy: 0, 
            medium: 0,
            hard: 0,
            revision: 0
        }

        problemList.forEach((problem) => {
            if (problem.problemDifficulty === 'Easy') stats.easy++;
            else if (problem.problemDifficulty === 'Medium') stats.medium++;
            else stats.hard++
            
            if (problem.revisionFlag == true) stats.revision++;
        });

        return stats;
    }, [problemList])
    
    /*
  return (
    <div className='p-1 text-white text-sm mt-1 mb-1'>
        <ul>
            <li>Easy: {easy}</li>
            <li>Medium: {medium}</li>
            <li>Hard: {hard}</li>
            <li>Total: {easy + medium + hard}</li>
            <li>Revision: {revision}</li>
        </ul>
    </div>
  );
  */

  return (
    <div className='p-1 text-white text-sm mt-1 mb-1'>
        <ul>
            <li>Easy: {statistics.easy}</li>
            <li>Medium: {statistics.medium}</li>
            <li>Hard: {statistics.hard}</li>
            <li>Total: {statistics.easy + statistics.medium + statistics.hard}</li>
            <li>Revision: {statistics.revision}</li>
        </ul>
    </div>
  );
}

export default ProblemStatistics