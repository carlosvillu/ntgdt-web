import React from 'react'

import {useFavoritesFirebase} from '../../hooks/firebase'

import Grid from '../../components/Grid'

const Favorites = () => {
  const {loading, items = []} = useFavoritesFirebase()
  return (
    <div className="Favorites">
      {!loading ? <Grid items={items} /> : <h1>Loading database</h1>}
    </div>
  )
}

Favorites.displayName = 'Favorites'

export default Favorites
