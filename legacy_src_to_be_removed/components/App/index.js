import React from 'react'

import Loadable from 'react-loadable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route } from 'react-router-dom'

import Footer from '../Footer'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '../../pages/Home'),
  LoadingComponent: () => null
})

const App = () => (
  <MuiThemeProvider>
    <div className='App'>
      <div className='App-children'>
        <Route exact path='/' component={Home} />
      </div>
      <div className='App-footer'>
        <Footer />
      </div>
    </div>
  </MuiThemeProvider>
)

App.displayName = 'App'

export default App
