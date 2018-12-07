import PropTypes from 'prop-types'

import getContext from 'recompose/getContext'

import Home from './component'

export default getContext({
  i18n: PropTypes.object
})(Home)
