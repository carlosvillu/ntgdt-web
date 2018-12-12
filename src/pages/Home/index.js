import React from 'react'

import {useFirebaseRef} from '../../hooks/firebase'

const GridPromise = import(/* webpackChunkName: 'Grid' */ '../../components/Grid')
const Grid = React.lazy(() => GridPromise)

const Home = () => {
  const {loading, items = {}} = useFirebaseRef('/entries')
  return (
    <React.Suspense fallback={<p>Loading suspense GRID</p>}>
      <div className="Home">
        {!loading ? <Grid items={items} /> : <h1>Loading database</h1>}
      </div>
      <React.Suspense fallback={null}>
        <div hidden>
          <Grid items={items} />
        </div>
      </React.Suspense>
    </React.Suspense>
  )
}

Home.displayName = 'Home'

export default Home
