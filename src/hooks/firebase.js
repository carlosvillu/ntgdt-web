import {useState, useEffect} from 'react'

import * as firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCeUsBwp1gzKDwQqorrri7nRlqr_QXtg1g',
  authDomain: 'no-tengo-ganas-de-trabajar.firebaseapp.com',
  databaseURL: 'https://no-tengo-ganas-de-trabajar.firebaseio.com',
  projectId: 'no-tengo-ganas-de-trabajar',
  storageBucket: 'no-tengo-ganas-de-trabajar.appspot.com',
  messagingSenderId: '1069878588859'
}
firebase.initializeApp(config)

export const useFirebaseRef = ref => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  useEffect(() => {
    firebase
      .database()
      .ref(ref)
      .orderByChild('createdAt')
      .limitToFirst(100)
      .on('value', async snapshot => {
        setLoading(false)
        setItems(snapshot.val())
      })

    return () =>
      firebase
        .database()
        .ref(ref)
        .off()
  }, [])

  return {loading, items}
}