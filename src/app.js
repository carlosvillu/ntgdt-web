import React from 'react'
import ReactDOM from 'react-dom'

import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './routes'
import Context from './context'
import i18n from './literals'

import Perfume from 'perfume.js'

import {register} from '@s-ui/bundler/registerServiceWorker'

import './styles/index.scss'

const perfume = new Perfume({
  // Metrics
  firstContentfulPaint: true,
  firstPaint: true,
  firstInputDelay: true,
  // Analytics
  googleAnalytics: {
    enable: true,
    timingVar: 'performance'
  }
})

/**
 *
 *
 * */
const render = () => {
  perfume.start('render')
  ReactDOM.render(
    <Context.Provider value={{i18n}}>
      <Router routes={routes} history={browserHistory} />
    </Context.Provider>,
    document.getElementById('⚛️')
  )
  perfume.sendTiming('render', perfume.end('render'))
}
render()

window.firebase.auth().onAuthStateChanged(render)

document.addEventListener('tracker:event', evt => {
  const {category, action, label} = evt.detail
  window.ga('send', 'event', category, action, label)
})

register({
  first: () => window.alert('Content is cached for offline use.'),
  renovate: () => {
    window.alert('New content is available; please refresh.')
    window.location.href = '/'
  }
})()
