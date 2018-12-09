import React from 'react'
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader'

const Header = React.lazy(() => import('../Header'))
const Sections = React.lazy(() => import('../Sections'))

const Root = ({children}) => (
  <React.Suspense fallback={<p>Loading</p>}>
    <div className="Root">
      <Header />
      <Sections />
      <div className="Root-page">{children}</div>
    </div>
  </React.Suspense>
)

Root.displayName = 'Root'
Root.propTypes = {
  children: PropTypes.element
}

export default hot(module)(Root)
