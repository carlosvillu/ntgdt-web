import React from 'react'

const SvgComponent = props => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export default SvgComponent
