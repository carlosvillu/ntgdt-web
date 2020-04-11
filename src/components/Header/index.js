import React, {useState, useEffect, useContext} from 'react'

import Burguer from '../Icons/Burguer'
import ArrowBack from '../Icons/ArrowBack'
import FavoriteBorder from '../Icons/FavoriteBorder'
import Brightness from '../Icons/Brightness'
import ContextualMenu from '../ContextualMenu'
import Link from '@s-ui/react-router/lib/Link'
import {useFirebaseAuth} from '../../hooks/firebase'

import RouterSwitcher from '../RouterSwitcher'
import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import VirtualListPositions from '../../context/VirtualListPositions'

const Header = () => {
  const {currentUser} = useFirebaseAuth()
  const [favoriteAdded, setFavoriteAdded] = useState(false)
  const {router} = useContext(RRContext)
  const {setMaster} = useContext(VirtualListPositions)

  useEffect(() => {
    document.addEventListener('favorite', onAddFavorite)
    return () => document.removeEventListener('favorite', onAddFavorite)
  }, [])

  function onAddFavorite() {
    setFavoriteAdded(true)
  }

  return (
    <div className="Header">
      <RouterSwitcher>
        <ArrowBack
          route="/favorites"
          className="Header-ArrowBack"
          onClick={() => router.goBack()}
        />
        <ArrowBack
          route="/preview"
          className="Header-ArrowBack"
          onClick={() => router.goBack()}
        />
        <ContextualMenu cta={<Burguer className="Header-burguer" />}>
          <ul className="Header-menu">
            <li className="Header-menuItem">
              {currentUser ? (
                <Link to="/logout" className="Header-menuLink">
                  <p className="Header-logoutLink">
                    <img
                      src={currentUser?.photoURL}
                      className="Header-menuPhoto"
                    />
                    <span>Logout</span>
                  </p>
                </Link>
              ) : (
                <Link to="/login" className="Header-menuLink">
                  <p>Login</p>
                </Link>
              )}
            </li>
          </ul>
        </ContextualMenu>
      </RouterSwitcher>
      <h1 className="Header-logo">
        <Link
          className="Header-link"
          onClick={() => setMaster(0)}
          to="/"
          activeClassName="is-selected"
        >
          NTGDT
        </Link>
      </h1>
      <div className="Header-actions">
        <Brightness
          className="Header-action"
          onClick={() => {
            const isDark =
              document.documentElement.getAttribute('data-theme') === 'dark'
            document.documentElement.classList.add('color-theme-in-transition')
            document.documentElement.setAttribute(
              'data-theme',
              isDark ? 'white' : 'dark'
            )
            window.setTimeout(function() {
              document.documentElement.classList.remove(
                'color-theme-in-transition'
              )
            }, 1000)
          }}
        />
        <div className="Header-favorites-button">
          {favoriteAdded && (
            <FavoriteBorder
              className="Header-favorites-animated"
              onAnimationEnd={() => setFavoriteAdded(false)}
            />
          )}
          <Link
            className="Header-favorites"
            to="/favorites"
            activeClassName="active"
          >
            <FavoriteBorder />
          </Link>
        </div>
      </div>
    </div>
  )
}

Header.displayName = 'Header'

export default Header
