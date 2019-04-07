import React from 'react'
import PropTypes from 'prop-types'

const UploadPhoto = ({router}) => {
  return (
    <div className="UploadPhoto">
      <code>
        <pre>{JSON.stringify(router.location.query, null, 2)}</pre>
      </code>
    </div>
  )
}

UploadPhoto.displayName = 'UploadPhoto'

UploadPhoto.propTypes = {
  router: PropTypes.object
}

export default UploadPhoto
