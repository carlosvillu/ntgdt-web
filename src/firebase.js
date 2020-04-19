import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const configPRO = {
  apiKey: 'AIzaSyCeUsBwp1gzKDwQqorrri7nRlqr_QXtg1g',
  authDomain: 'no-tengo-ganas-de-trabajar.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar',
  storageBucket: 'no-tengo-ganas-de-trabajar.appspot.com',
  messagingSenderId: '1069878588859'
}

const configDEV = {
  apiKey: 'AIzaSyABQ1Mkhh37tNfG61eAl46lR0SvdAvZKN0',
  authDomain: 'no-tengo-ganas-de-trabajar-dev.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar-dev.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar-dev',
  storageBucket: 'no-tengo-ganas-de-trabajar-dev.appspot.com',
  messagingSenderId: '554532477116'
}

firebase.initializeApp(
  process.env.STAGE === 'production' ? configPRO : configDEV
)

export default firebase
