import Image from './component'

import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import mapProps from 'recompose/mapProps'
import compose from 'recompose/compose'

export default compose(
  withState('loaded', 'setLoaded', false),
  withState('hasScroll', 'setHasScroll', false),
  withHandlers({
    onChangeScroll: props => e => props.setHasScroll(!props.hasScroll)
  }),
  lifecycle({
    componentDidMount () {
      let img = new window.Image()
      img.onload = () => this.props.setLoaded(true)
      img.src = this.props.src
    }
  }),
  mapProps(ownerProps => ({
    ...ownerProps,
    src: ownerProps.loaded ? ownerProps.src : ownerProps.blur,
    style: ownerProps.loaded ? ownerProps.style : {...ownerProps.style, overflow: 'hidden'}
  }))
)(Image)
