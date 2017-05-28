/* eslint no-nested-ternary:0  operator-linebreak:0 */
import VirtualList from 'react-virtual-list'
import compose from 'recompose/compose'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'
import lifecycle from 'recompose/lifecycle'
import defaultProps from 'recompose/defaultProps'

import InfiniteList from './component'
import Loading from '../Loading'

import * as firebase from 'firebase/app'

const sortByDate = ({createdAt: a}, {createdAt: b}) =>
  a < b ? 1 :
  a > b ? -1 :
  0

export default compose(
  defaultProps({items: [], itemHeight: 440}),
  lifecycle({
    componentDidMount () {
      this.setState({loading: true})
      firebase.database().ref('/entries').on('value', snapshot => {
        console.log('Nuevas imagenes', Object.values(snapshot.val()).sort(sortByDate))
        this.setState({
          items: Object.values(snapshot.val())
                  .sort(sortByDate),
          loading: false
        })
      })
    },
    componentWillUnmount () {
      firebase.database().ref('/entries').off()
    }
  }),
  branch(
    ({loading}) => Boolean(loading),
    renderComponent(Loading)
  ),
  VirtualList()
)(InfiniteList)
