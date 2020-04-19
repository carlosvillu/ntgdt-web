import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

const ContextualMenu = ({cta, children}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef()
  const nextCTA = React.cloneElement(cta, {
    onClick: () => setOpen(open => !open)
  })

  const onClose = e => {
    let isTouch
    const el = containerRef.current

    if (e.type === 'touchend') isTouch = true
    if (e.type === 'click' && isTouch) return
    if (el && !el.contains(e.target)) setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    document.addEventListener('touchend', onClose, true)
    document.addEventListener('click', onClose, true)

    return () => {
      document.removeEventListener('touchend', onClose, true)
      document.removeEventListener('click', onClose, true)
    }
  }, [open])

  if (!open) {
    return <div className="ContextualMenu-container">{nextCTA}</div>
  }

  return (
    <div
      ref={containerRef}
      className="ContextualMenu-container"
      onClick={() => setOpen(open => !open)}
    >
      <div className="ContextualMenu-content">{children}</div>
    </div>
  )
}

ContextualMenu.displayName = 'ContextualMenu'
ContextualMenu.propTypes = {
  children: PropTypes.element,
  cta: PropTypes.element
}

export default ContextualMenu
