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
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/performance'

const configPRO = {
  apiKey: 'AIzaSyCeUsBwp1gzKDwQqorrri7nRlqr_QXtg1g',
  authDomain: 'no-tengo-ganas-de-trabajar.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar',
  storageBucket: 'no-tengo-ganas-de-trabajar.appspot.com',
  messagingSenderId: '1069878588859',
  appId: '1:1069878588859:web:cf2c3c6b73d88a32'
}

const configDEV = {
  apiKey: 'AIzaSyABQ1Mkhh37tNfG61eAl46lR0SvdAvZKN0',
  authDomain: 'no-tengo-ganas-de-trabajar-dev.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar-dev.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar-dev',
  storageBucket: 'no-tengo-ganas-de-trabajar-dev.appspot.com',
  messagingSenderId: '554532477116',
  appId: '1:554532477116:web:253f68c83b91f6ce'
}

firebase.initializeApp(
  process.env.STAGE === 'production' ? configPRO : configDEV
)
const perf = firebase.performance()

window.firebase = firebase
window.perfFB = perf

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

const traceRender = perf.trace('render')
perfume.start('render')
traceRender.start()
ReactDOM.render(
  <Context.Provider value={{i18n}}>
    <Router routes={routes} history={browserHistory} />
  </Context.Provider>,
  document.getElementById('⚛️')
)
traceRender.stop()
perfume.sendTiming('render', perfume.end('render'))

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
