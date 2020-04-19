import React, {useState, useEffect, useContext, useRef} from 'react'
import cx from 'classnames'

import Burguer from '../Icons/Burguer'
import GetApp from '../Icons/GetApp'
import ArrowBack from '../Icons/ArrowBack'
import FavoriteBorder from '../Icons/FavoriteBorder'
import ContextualMenu from '../ContextualMenu'
import Link from '@s-ui/react-router/lib/Link'
// import {useFirebaseAuth} from '../../hooks/firebase'
import {useSetupScrollRestoration} from '../../hooks/scroll'

import RouterSwitcher from '../RouterSwitcher'
import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import Context from '../../context'

const Header = () => {
  const setScrollTo = useSetupScrollRestoration()
  // const {currentUser} = useFirebaseAuth()
  const [favoriteAdded, setFavoriteAdded] = useState(false)
  const {router} = useContext(RRContext)
  const {i18n} = useContext(Context)
  const [isInstalled, setIsInstalled] = useState(false)
  const pwaInstallerRef = useRef()

  useEffect(() => {
    document.addEventListener('favorite', onAddFavorite)
    return () => document.removeEventListener('favorite', onAddFavorite)
  }, [])

  useEffect(() => {
    setIsInstalled(pwaInstallerRef.current?.getInstalledStatus())
  }, [setIsInstalled])

  function onAddFavorite() {
    setFavoriteAdded(true)
  }

  const installContainerClass = cx('Header-installContainer', {
    'is-installed': isInstalled
  })

  return (
    <>
      <div className="Header">
        <div className="Header-Content">
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
            <ArrowBack
              route="/meme"
              className="Header-ArrowBack"
              onClick={() => router.goBack()}
            />
            <ContextualMenu cta={<Burguer className="Header-burguer" />}>
              <ul className="Header-menu">
                {/* <li className="Header-menuItem">
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
                </li> */}
                <li
                  className="Header-menuItem"
                  onClick={() => {
                    const isDark =
                      document.documentElement.getAttribute('data-theme') ===
                      'dark'
                    document.documentElement.classList.add(
                      'color-theme-in-transition'
                    )
                    document.documentElement.setAttribute(
                      'data-theme',
                      isDark ? 'white' : 'dark'
                    )
                    document
                      .getElementById('themeColor')
                      .setAttribute('content', isDark ? '#fff' : '#000')
                    window.setTimeout(function() {
                      document.documentElement.classList.remove(
                        'color-theme-in-transition'
                      )
                    }, 1000)
                  }}
                >
                  {i18n.t('HEADER_SWITCH_THEME')}
                </li>
              </ul>
            </ContextualMenu>
          </RouterSwitcher>
          <h1 className="Header-logo">
            <Link
              className="Header-link"
              onClick={() => {
                document.dispatchEvent(
                  new window.CustomEvent('tracker:event', {
                    detail: {
                      category: 'Action',
                      action: 'goHome'
                    }
                  })
                )
                setScrollTo()
              }}
              to="/"
              activeClassName="is-selected"
            >
              NTGDT
            </Link>
          </h1>
          <div className="Header-actions">
            <div className={installContainerClass}>
              <pwa-install
                onClick={() => {
                  document.dispatchEvent(
                    new window.CustomEvent('tracker:event', {
                      detail: {
                        category: 'Action',
                        action: 'showInstall'
                      }
                    })
                  )
                }}
                ref={pwaInstallerRef}
                explainer={i18n.t('INSTALL_PWA_EXPLAINER')}
                featuresheader={i18n.t('INSTALL_PWA_FEATURE_HEADER')}
                descriptionheader={i18n.t('INSTALL_PWA_DESCRIPTION_HEADER')}
                installbuttontext={i18n.t('INSTALL_PWA_INSTALL_BUTTON')}
                cancelbuttontext={i18n.t('INSTALL_PWA_CANCEL_BUTTON')}
                iosinstallinfotext={i18n.t('INSTALL_PWA_IOS_INSTALL')}
              >
                <GetApp className="Header-install" />
              </pwa-install>
            </div>
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
        </div>{' '}
      </div>
      <div className="headerPadding" />
    </>
  )
}

Header.displayName = 'Header'

export default Header
