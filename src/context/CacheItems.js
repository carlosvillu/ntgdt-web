import React, {useState, createContext, useContext} from 'react'
import PropTypes from 'prop-types'

const Context = createContext({})

export const CacheItemsProvider = ({children}) => {
  const [cacheItems, setCacheItems] = useState([])
  const [nextItem, setNextItem] = useState({})
  const [cacheRandomItemsByMeme, setCacheRandomItemsByMeme] = useState({})

  return (
    <Context.Provider
      value={{
        nextItem,
        setNextItem,
        cacheItems,
        setCacheItems,
        cacheRandomItemsByMeme,
        setCacheRandomItemsByMeme
      }}
    >
      {children}
    </Context.Provider>
  )
}

CacheItemsProvider.propTypes = {
  children: PropTypes.node
}

export const useCacheItems = () => {
  const {
    nextItem,
    setNextItem,
    cacheItems,
    setCacheItems,
    cacheRandomItemsByMeme,
    setCacheRandomItemsByMeme
  } = useContext(Context)

  return {
    nextItem,
    setNextItem,
    cacheItems,
    setCacheItems,
    cacheRandomItemsByMeme,
    setCacheRandomItemsByMeme
  }
}
