import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

const Root = ({children}) => {
  return (
    <div className="Root">
      <Header />
      <div className="Root-page">{children}</div>
    </div>
  )
}

Root.displayName = 'Root'
Root.propTypes = {
  children: PropTypes.element
}

export default Root
