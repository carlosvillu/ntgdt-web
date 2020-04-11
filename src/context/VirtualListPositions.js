import React, {useState, createContext} from 'react'
import PropTypes from 'prop-types'

const Context = createContext({})

export const VirtualListPositionsProvider = ({children}) => {
  const [positions, setPositions] = useState({master: 0})

  const setMaster = index =>
    setPositions(positions => ({...positions, master: index}))

  const setItem = (id, index) =>
    setPositions(positions => ({...positions, [id]: index}))

  return (
    <Context.Provider value={{positions, setMaster, setItem}}>
      {children}
    </Context.Provider>
  )
}

VirtualListPositionsProvider.propTypes = {
  children: PropTypes.node
}

export default Context
