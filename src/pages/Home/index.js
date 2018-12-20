import React from 'react'

import {useFirebaseRef} from '../../hooks/firebase'

import Grid from '../../components/Grid'

const Home = () => {
  const {loading, items = []} = useFirebaseRef('/entries')
  return (
    <div className="Home">
      {!loading ? <Grid items={items} /> : <h1>Loading database</h1>}
    </div>
  )
}

Home.displayName = 'Home'

export default Home
