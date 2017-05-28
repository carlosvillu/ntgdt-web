import PropTypes from 'prop-types'
import getContext from 'recompose/getContext'
import compose from 'recompose/compose'

import Loading from './component'

export default compose(
  getContext({ i18n: PropTypes.object }),
)(Loading)
