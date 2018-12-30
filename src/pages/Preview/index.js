import React from 'react'
import PropTypes from 'prop-types'

import {useItemFirebase} from '../../hooks/firebase'
import Item from '../../components/Item'

const Preview = ({router}) => {
  const {loading, item} = useItemFirebase(router.params.id)
  return (
    <div className="Preview">{!loading && item && <Item item={item} />}</div>
  )
}

Preview.displayName = 'Preview'
Preview.propTypes = {
  router: PropTypes.object
}

export default Preview
