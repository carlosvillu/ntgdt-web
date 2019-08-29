import React, {useContext} from 'react'
import {useFirebaseRef} from '../../hooks/firebase'

import Context from '../../context'
import Grid from '../../components/Grid'

const Home = () => {
  const {i18n} = useContext(Context)
  const {loading, items = []} = useFirebaseRef('/entries')
  return (
    <div className="Home">
      {!loading ? <Grid items={items} /> : <h1>{i18n.t('HOME_LOADING')}</h1>}
    </div>
  )
}

Home.displayName = 'Home'

export default Home
