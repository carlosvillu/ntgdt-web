import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route } from 'react-router-dom'

import Home from '../../pages/Home'
import Footer from '../Footer'

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
