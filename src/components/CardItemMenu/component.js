import React from 'react'
import PropTypes from 'prop-types'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Download from 'material-ui/svg-icons/file/file-download'
import Send from 'material-ui/svg-icons/content/send'

const position = {horizontal: 'right', vertical: 'top'}
const CardItemMenu = ({i18n, className, onSave, onShare}) => {
  return (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={position}
      targetOrigin={position}
      className={className}
    >
      <MenuItem primaryText={i18n.t('SAVE')} onClick={onSave} leftIcon={<Download />} />
      <MenuItem primaryText={i18n.t('SHARE')} onClick={onShare} leftIcon={<Send />} />
    </IconMenu>
  )
}

CardItemMenu.displayName = 'CardItemMenu'
CardItemMenu.propTypes = {
  className: PropTypes.string,
  i18n: PropTypes.shape({
    t: PropTypes.func
  }),
  onShare: PropTypes.func,
  onSave: PropTypes.func
}

export default CardItemMenu
