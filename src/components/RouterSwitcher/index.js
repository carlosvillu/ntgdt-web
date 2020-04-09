import React from 'react'
import PropTypes from 'prop-types'

const RouterSwitcher = ({children}) => {
  if (React.Children.count(children) === 1) {
    return children
  }

  const childrens = React.Children.toArray(children)
  const match = childrens.find(children => {
    if (!children.props.route) {
      return children
    }
    return children.props.route === window.location.pathname
  })

  return match
}

RouterSwitcher.displayName = 'RouterSwitcher'
RouterSwitcher.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}
export default RouterSwitcher
