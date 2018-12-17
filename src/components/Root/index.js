import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Sections from '../Sections'

const Root = ({children}) => (
  <div className="Root">
    <Header />
    <Sections />
    <div className="Root-page">{children}</div>
  </div>
)

Root.displayName = 'Root'
Root.propTypes = {
  children: PropTypes.element
}

export default Root
