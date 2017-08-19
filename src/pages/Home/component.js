import React from 'react'
import PropTypes from 'prop-types'

import InfiniteList from '../../components/InfiniteList'
import AppBar from 'material-ui/AppBar'
import Logo from '../../images/ntgdt-logo.png'

const Home = ({i18n}) => (
  <div className='Home'>
    <AppBar showMenuIconButton={false} title={<img src={Logo} />} />
    <InfiniteList />
  </div>
)

Home.displayName = 'Home'
Home.propTypes = {
  i18n: PropTypes.shape({
    t: PropTypes.func
  })
}

export default Home
