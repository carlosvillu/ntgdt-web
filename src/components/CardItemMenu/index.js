import PropTypes from 'prop-types'
import CardItemMenu from './component'

import getContext from 'recompose/getContext'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'

export default compose(
  getContext({i18n: PropTypes.object}),
  withHandlers({
    onShare: (props) => () => {},
    onSave: (props) => () => {}
  })
)(CardItemMenu)
