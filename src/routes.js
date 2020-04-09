import React from 'react'
import Router from '@s-ui/react-router/lib/Router'
import Route from '@s-ui/react-router/lib/Route'

import Root from './components/Root'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Preview from './pages/Preview'
import Shared from './pages/Shared'
import Login from './pages/Login'
import Logout from './pages/Logout'

import MyPhotos from './pages/MyPhotos'

export default (
  <Router>
    <Route component={Root}>
      <Route path="/" component={Home} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/preview" component={Preview} />
      <Route path="/shared-target" component={Shared} />
      <Route path="/myPhoto" component={MyPhotos} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </Route>
  </Router>
)
