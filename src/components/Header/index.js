import React from 'react'

import Dots from '../Icons/Dots'
import FavoriteBorder from '../Icons/FavoriteBorder'
import Brightness from '../Icons/Brightness'
import ContextualMenu from '../ContextualMenu'
import Link from 'react-router/lib/Link'

const Header = () => (
  <div className="Header">
    <h1 className="Header-logo">
      <Link className="Header-link" to="/" activeClassName="is-selected">
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
      <FavoriteBorder className="Header-favorites" onClick={() => {}} />
      <ContextualMenu cta={<Dots className="Header-dots" onClick={() => {}} />}>
        <ul className="Header-menu">
          <li className="Header-menuItem">Login</li>
          <li className="Header-menuItem">Login</li>
          <li className="Header-menuItem">Login</li>
          <li className="Header-menuItem">Login</li>
          <li className="Header-menuItem">Login</li>
        </ul>
      </ContextualMenu>
    </div>
  </div>
)

Header.displayName = 'Header'

export default Header
