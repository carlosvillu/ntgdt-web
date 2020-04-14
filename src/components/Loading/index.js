import React, {useState, useEffect} from 'react'

import Settings from '../Icons/Settings'

const Loading = () => {
  const {showSpinner, setShowSpinner} = useState(false)
  useEffect(() => {
    setTimeout(() => setShowSpinner(true), 145)
  })

  return <div className="Loading">{showSpinner && <Settings />}</div>
}

export default Loading
