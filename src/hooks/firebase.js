import {useState, useEffect} from 'react'
import {get, set} from 'idb-keyval'

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

const MAX_ITEMS = 100
const ITEMS_KEY = 'ITEMS_KEY'
const sortByDate = ({createdAt: a}, {createdAt: b}) => new Date(b) - new Date(a)
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v)
    return acc
  }, [])

export const useFirebaseRef = ref => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  useEffect(() => {
    get(ITEMS_KEY).then((items = []) => {
      const [lastItemSaved = {}] = items
      lastItemSaved.id && setLoading(false)
      setItems(items)

      firebase
        .database()
        .ref(ref)
        .orderByChild('createdAt')
        .startAt(lastItemSaved.createdAt)
        .limitToLast(MAX_ITEMS)
        .on('value', async snapshot => {
          const fbItems = Object.values(snapshot.val() || {}).sort(sortByDate)
          const nextItems = uniqueElementsBy(
            [...fbItems, ...items],
            (a, b) => a.id === b.id
          )
          set(ITEMS_KEY, nextItems)
          setLoading(false)
          setItems(nextItems)
        })
    })

    return () =>
      firebase
        .database()
        .ref(ref)
        .off()
  }, [])

  return {loading, items}
}
