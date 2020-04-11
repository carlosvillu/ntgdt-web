import React, {useContext} from 'react'
import Context from '../../context'

import Grid from '../../components/Grid'
import VirtualListPositions from '../../context/VirtualListPositions'
import {useFirebaseRef} from '../../hooks/firebase'

const Home = () => {
  const {i18n} = useContext(Context)
  const {positions, setMaster} = useContext(VirtualListPositions)
  const {loading, items} = useFirebaseRef('/entries')

  if (loading) return <h1>{i18n.t('HOME_LOADING')}</h1>
  debugger

  return (
    <div className="Home">
      <Grid
        items={items}
        scrollToIndex={positions.master}
        onChangeIndex={setMaster}
      />
    </div>
  )
}

Home.displayName = 'Home'

export default Home
