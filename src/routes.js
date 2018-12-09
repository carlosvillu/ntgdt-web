import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'

import Root from './components/Root'
import Home from './pages/Home'

export default (
  <Router>
    <Route component={Root}>
      <Route path="/" component={Home} />
    </Route>
  </Router>
)
