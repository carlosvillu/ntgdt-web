import 'reset-css/reset.css'
import './app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import {AppContainer} from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from '@schibstedspain/ddd-react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {register} from '@schibstedspain/sui-bundler/registerServiceWorker'

import idb from 'idb-keyval'
import * as firebase from 'firebase/app'
import 'firebase/database'

import App from './components/App'
import i18n from './literals'

const config = {
  apiKey: 'AIzaSyCeUsBwp1gzKDwQqorrri7nRlqr_QXtg1g',
  authDomain: 'no-tengo-ganas-de-trabajar.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar',
  storageBucket: 'no-tengo-ganas-de-trabajar.appspot.com',
  messagingSenderId: '1069878588859'
}
firebase.initializeApp(config)

window.idb = idb

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider i18n={i18n}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
injectTapEventPlugin()
render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default
    render(NewApp)
  })
}

// unregister()

register({
  first: () => window.alert('Content is cached for offline use.'),
  renovate: () => window.alert('New content is available; please refresh.')
})()
