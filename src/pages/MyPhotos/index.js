import React from 'react'
import PropTypes from 'prop-types'

import Item from '../../components/Item'

const MyPhotos = ({router}) => {
  const {image, title = 'My Image'} = router.location.query
  return (
    <div className="MyPhotos">
      <React.Fragment>
        <Item hiddenShare item={{image, title}} />
      </React.Fragment>
    </div>
  )
}

MyPhotos.displayName = 'MyPhotos'
MyPhotos.propTypes = {
  router: PropTypes.object
}

export default MyPhotos
