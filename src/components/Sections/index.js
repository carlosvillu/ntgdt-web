import React, {useContext} from 'react'
import Link from 'react-router/lib/Link'

import Context from '../../context'

const Sections = () => {
  const {i18n} = useContext(Context)
  return (
    <ul className="Sections">
      <li className="Sections-section">
        <Link className="Sections-link" to="/" activeClassName="is-selected">
          <span className="Sections-literal">{i18n.t('SECTIONS_NEWS')}</span>
        </Link>
      </li>
      <li className="Sections-section">
        <Link
          className="Sections-link"
          to="/favorites"
          activeClassName="is-selected"
        >
          <span className="Sections-literal">
            {i18n.t('SECTIONS_FAVORITES')}
          </span>
        </Link>
      </li>
    </ul>
  )
}

Sections.displayName = 'Sections'

export default Sections
