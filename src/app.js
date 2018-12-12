import React from 'react'
import ReactDOM from 'react-dom'

import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './routes'

import {register} from '@s-ui/bundler/registerServiceWorker'

import(/* webpackChunkName: 'index.scss' */ './styles/index.scss')

ReactDOM.render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('⚛️')
)

register({
  first: () => window.alert('Content is cached for offline use.'),
  renovate: () => window.alert('New content is available; please refresh.')
})()
