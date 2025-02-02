import React from 'react'
import ProblemList from './ProblemList'

function RevisionList() {
  return (
    <div className='w-full'>
        <ProblemList revision={true}/>
    </div>
  )
}

export default RevisionList