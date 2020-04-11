import React, {useContext} from 'react'

import Grid from '../../components/Grid'
import VirtualListPositions from '../../context/VirtualListPositions'
import {useFirebaseRef} from '../../hooks/firebase'
import Loading from '../../components/Loading'

const Home = () => {
  const {positions, setMaster} = useContext(VirtualListPositions)
  const {loading, items} = useFirebaseRef('/entries')

  return (
    <div className="Home">
      {loading ? (
        <Loading />
      ) : (
        <Grid
          items={items}
          scrollToIndex={positions.master}
          onChangeIndex={setMaster}
        />
      )}
    </div>
  )
}

Home.displayName = 'Home'

export default Home
