import React from 'react'
import ReactDOM from 'react-dom'

import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './routes'
import Context from './context'
import i18n from './literals'

import {register} from '@s-ui/bundler/registerServiceWorker'

import './styles/index.scss'

ReactDOM.render(
  <Context.Provider value={{i18n}}>
    <Router routes={routes} history={browserHistory} />
  </Context.Provider>,
  document.getElementById('⚛️')
)

document.addEventListener('tracker:event', evt => {
  const {category, action, label} = evt.detail
  window.ga('send', 'event', category, action, label)
})

register({
  first: () => window.alert('Content is cached for offline use.'),
  renovate: () => window.alert('New content is available; please refresh.')
})()
