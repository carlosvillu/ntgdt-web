import React from 'react'
import PropTypes from 'prop-types'

const Shared = ({router}) => {
  return (
    <div className="Shared">
      <code>
        <pre>{JSON.stringify(router.location.query, null, 2)}</pre>
      </code>
    </div>
  )
}

Shared.displayName = 'Shared'
Shared.propTypes = {
  router: PropTypes.object
}

export default Shared
