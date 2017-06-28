import React from 'react'
import PropTypes from 'prop-types'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Download from 'material-ui/svg-icons/file/file-download'
import Send from 'material-ui/svg-icons/content/send'

const position = {horizontal: 'right', vertical: 'top'}
const CardItemMenu = ({i18n, className, image, onSave, onShare}) => {
  return (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={position}
      targetOrigin={position}
      className={className}
    >
      <MenuItem onClick={onSave} leftIcon={<Download />}>
        <a className='CardItemMenu-Link' href={image} download>{i18n.t('SAVE')}</a>
      </MenuItem>
      <MenuItem onClick={onShare} leftIcon={<Send />}>
        <a className='CardItemMenu-Link' href={`whatsapp://send?text=${image}`}>{i18n.t('SHARE')}</a>
      </MenuItem>
    </IconMenu>
  )
}

CardItemMenu.displayName = 'CardItemMenu'
CardItemMenu.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  i18n: PropTypes.shape({
    t: PropTypes.func
  }),
  onShare: PropTypes.func,
  onSave: PropTypes.func
}

export default CardItemMenu
