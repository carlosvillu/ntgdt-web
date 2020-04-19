import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import ScrollRestoration from '../ScrollRestoration'

const Root = ({children}) => {
  return (
    <div className="Root">
      <ScrollRestoration>
        <Header />
        <div className="Root-page">{children}</div>
      </ScrollRestoration>
    </div>
  )
}

Root.displayName = 'Root'
Root.propTypes = {
  children: PropTypes.element
}

export default Root
