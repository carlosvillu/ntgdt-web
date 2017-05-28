import React from 'react'

import InfiniteList from '../../components/InfiniteList'
import AppBar from 'material-ui/AppBar'

const Home = ({i18n}) => (
  <div className='Home'>
    <AppBar showMenuIconButton={false} title={i18n.t('HOME_TITLE')} />
    <InfiniteList />
  </div>
)

Home.displayName = 'Home'

export default Home
