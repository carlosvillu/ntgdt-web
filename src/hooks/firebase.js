import {useState, useEffect, useCallback} from 'react'
import {get, set} from 'idb-keyval'
/* global Event */

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

window.firebase = firebase

const NOT_FOUND = -1
const MAX_ITEMS = 100
const ITEMS_KEY = 'NTGDT_ITEMS_KEY'
const FAVORITES_ITEMS_KEY = 'NTGDT_FAVORITES_ITEMS_KEY'
const sortByDate = ({createdAt: a}, {createdAt: b}) => new Date(b) - new Date(a) // eslint-disable-line
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v)
    return acc
  }, [])
const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

export const useFavoritesFirebase = () => {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleFavoritesRemove = async () => {
      const favorites = await get(FAVORITES_ITEMS_KEY)
      setItems(favorites)
    }

    document.addEventListener('favorites:remove', handleFavoritesRemove)
    return () =>
      document.removeEventListener('favorites:remove', handleFavoritesRemove)
  }, [])

  useEffect(() => {
    get(FAVORITES_ITEMS_KEY).then((favorites = []) => {
      setItems(favorites)
      setLoading(false)
    })
  }, [])

  return {loading, items}
}

export const favoriteAddedEvent = new Event('favorite')

export const useItemFavoriteFirebase = item => {
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    get(FAVORITES_ITEMS_KEY).then((favorites = []) => {
      setIsFavorite(favorites.some(favorite => item.id === favorite.id))
    })
  }, [item.id])

  const callbackHandleClick = useCallback(async () => {
    const favorites = (await get(FAVORITES_ITEMS_KEY)) || []

    const indexFavorite = favorites.findIndex(
      favorite => favorite.id === item.id
    )

    if (indexFavorite === NOT_FOUND) {
      const nextFavorites = uniqueElementsBy(
        [item, ...(favorites || [])],
        (a, b) => a.id === b.id
      ).sort(sortByDate)
      set(FAVORITES_ITEMS_KEY, nextFavorites)
      setIsFavorite(true)
      document.dispatchEvent(favoriteAddedEvent)
      document.dispatchEvent(
        new window.CustomEvent('tracker:event', {
          detail: {
            category: 'Action',
            action: 'favorite',
            label: 'created'
          }
        })
      )
    } else {
      const nextFavorites = [
        ...favorites.slice(0, indexFavorite),
        ...favorites.slice(indexFavorite + 1)
      ]
      set(FAVORITES_ITEMS_KEY, nextFavorites)
      setIsFavorite(false)
      document.dispatchEvent(new window.Event('favorites:remove'))
      document.dispatchEvent(
        new window.CustomEvent('tracker:event', {
          detail: {
            category: 'Action',
            action: 'favorite',
            label: 'remove'
          }
        })
      )
    }
  }, [item])

  return {callbackHandleClick, isFavorite}
}

export const useItemFirebase = id => {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState()

  useEffect(() => {
    get(ITEMS_KEY).then((items = []) => {
      let item = items.find(i => i.id === id)
      if (item) {
        setLoading(false)
        setItem(item)
      } else {
        firebase
          .database()
          .ref('/entries/' + id)
          .once('value')
          .then(snapshot => {
            item = snapshot.val()
            item && setLoading(false)
            item && setItem(item)
          })
      }
    })
  }, [id])
  return {loading, item}
}

export const useRandomFirebaseRef = ref => {
  const [loading, setLoading] = useState(true)
  const [items = [], setItems] = useState()

  useEffect(() => {
    firebase
      .database()
      .ref(ref)
      .on('value', async snapshot => {
        const fbItems = Object.values(snapshot.val() || {})

        setLoading(false)
        setItems(fbItems)
      })

    return () =>
      firebase
        .database()
        .ref(ref)
        .off()
  }, [ref])

  return {loading, items: shuffle(items)}
}

export const useFirebaseRef = ref => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState()

  useEffect(() => {
    get(ITEMS_KEY).then((items = []) => {
      const [lastItemSaved = {}] = items
      // lastItemSaved.id && setLoading(false)
      // setItems(items)

      firebase
        .database()
        .ref(ref)
        .orderByChild('createdAt')
        // .startAt(lastItemSaved.createdAt)
        .limitToLast(MAX_ITEMS)
        .on('value', async snapshot => {
          const fbItems = Object.values(snapshot.val() || {}).sort(sortByDate)
          const nextItems = uniqueElementsBy(
            [...fbItems, ...items],
            (a, b) => a.id === b.id
          )
          // set(ITEMS_KEY, nextItems)
          setLoading(false)
          setItems(fbItems)
        })
    })

    return () =>
      firebase
        .database()
        .ref(ref)
        .off()
  }, [ref])

  return {loading, items}
}

export const useFirebaseAuth = () => {
  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      const user = await firebase.auth().signInWithPopup(provider)
      console.log(user) // eslint-disable-line
    } catch (e) {
      console.error(e) //eslint-disable-line
      debugger // eslint-disable-line
    }
  }

  const logout = async () => {
    firebase.auth().signOut()
  }

  const currentUser = firebase.auth().currentUser && {
    uid: firebase.auth().currentUser?.uid,
    photoURL: firebase.auth().currentUser?.photoURL
  }

  return {loginWithGoogle, logout, currentUser}
}
