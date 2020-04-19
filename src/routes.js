import React from 'react'
import Router from '@s-ui/react-router/lib/Router'
import Route from '@s-ui/react-router/lib/Route'

import Root from './components/Root'

const getHomeMasonry = (_, cb) => {
  return import(
    /* webpackChunkName: "HomeMasonry" */ './pages/HomeMasonry'
  ).then(module => {
    cb(null, module.default)
  })
}
const getMeme = (_, cb) =>
  import(/* webpackChunkName: "Meme" */ './pages/Meme').then(module =>
    cb(null, module.default)
  )
const getFavorites = (_, cb) =>
  import(/* webpackChunkName: "Favorites" */ './pages/Favorites').then(module =>
    cb(null, module.default)
  )
const getLogin = (_, cb) =>
  import(/* webpackChunkName: "Login" */ './pages/Login').then(module =>
    cb(null, module.default)
  )
const getLogout = (_, cb) =>
  import(/* webpackChunkName: "Logout" */ './pages/Logout').then(module =>
    cb(null, module.default)
  )

export default (
  <Router>
    <Route component={Root}>
      <Route path="/" getComponent={getHomeMasonry} />
      <Route path="/meme" getComponent={getMeme} />
      <Route path="/favorites" getComponent={getFavorites} />
      <Route path="/login" getComponent={getLogin} />
      <Route path="/logout" getComponent={getLogout} />
    </Route>
  </Router>
)
