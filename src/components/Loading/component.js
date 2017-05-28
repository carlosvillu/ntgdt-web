import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = ({label, i18n}) => (
  <div className='Loading'>
    <h2 className='Loading-title'>{i18n.t(label)}</h2>
    <CircularProgress />
  </div>
)

Loading.displayName = 'Loading'
Loading.propTypes = {
  label: PropTypes.string,
  i18n: PropTypes.shape({
    t: PropTypes.func
  })
}
Loading.defaultProps = {
  label: 'DEFAULT_LOADING_MSG'
}

export default Loading
