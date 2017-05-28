/* eslint operator-linebreak:0 no-nested-ternary:0 */
import Image from './component'

import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'
import mapProps from 'recompose/mapProps'
import compose from 'recompose/compose'

export default compose(
  withState('loaded', 'setLoaded', false),
  lifecycle({
    componentDidMount () {
      let img = new window.Image()
      img.onload = () => this.props.setLoaded(true)
      img.src = this.props.src
    }
  }),
  mapProps(ownerProps => ({
    ...ownerProps,
    src: ownerProps.loaded ? ownerProps.src :
         ownerProps.blur !== undefined ? ownerProps.blur :
         ownerProps.src
  }))
)(Image)
