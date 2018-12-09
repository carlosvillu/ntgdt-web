import React from 'react'
import {hot} from 'react-hot-loader'

const Grid = React.lazy(() => import('../../components/Grid'))

const Home = () => (
  <div className="Home">
    <Grid />
  </div>
)

Home.displayName = 'Home'

export default hot(module)(Home)
