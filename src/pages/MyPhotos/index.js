import React from 'react'
import PropTypes from 'prop-types'

import Item from '../../components/Item'

const MyPhotos = ({router}) => {
  const {image, title = 'My Image'} = router.location.query
  return (
    <div className="MyPhotos">
      <>
        <Item hiddenShare item={{image, title}} />
      </>
    </div>
  )
}

MyPhotos.displayName = 'MyPhotos'
MyPhotos.propTypes = {
  router: PropTypes.object
}

export default MyPhotos
