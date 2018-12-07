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

const ITEMS_KEY = 'items'
const sortByDate = ({createdAt: a}, {createdAt: b}) =>
  a < b ? 1 :
  a > b ? -1 :
  0

export default compose(
  defaultProps({items: [], itemHeight: 440}),
  lifecycle({
    async componentDidMount () {
      // this.setState({loading: true})

      const prevItems = (await window.idb.get(ITEMS_KEY) || {})
      this.setState({items: Object.values(prevItems).sort(sortByDate)})

      firebase.database().ref('/entries').on('value', async snapshot => {
        console.log('Nuevas imagenes', Object.values(snapshot.val()).sort(sortByDate)) // eslint-disable-line
        const items = {...prevItems, ...snapshot.val()}
        await window.idb.set(ITEMS_KEY, items)
        this.setState({
          items: Object.values(items)
                  .sort(sortByDate)
          // loading: false
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
