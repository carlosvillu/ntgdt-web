import React from 'react'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'

import Root from './components/Root'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Preview from './pages/Preview'

export default (
  <Router>
    <Route component={Root}>
      <Route path="/" component={Home} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/preview" component={Preview} />
    </Route>
  </Router>
)
