import React from 'react'
import Link from 'react-router/lib/Link'

const Sections = () => (
  <ul className="Sections">
    <li className="Sections-section">
      <Link className="Sections-link" to="/" activeClassName="is-selected">
        <span className="Sections-literal">New</span>
      </Link>
    </li>
    <li className="Sections-section">
      <Link
        className="Sections-link"
        to="/favorites"
        activeClassName="is-selected"
      >
        <span className="Sections-literal">Favorites</span>
      </Link>
    </li>
  </ul>
)

Sections.displayName = 'Sections'

export default Sections
