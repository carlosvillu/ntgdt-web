import PropTypes from 'prop-types'

import {useFirebaseAuth} from '../../hooks/firebase'

const Logout = ({router}) => {
  const {logout, currentUser} = useFirebaseAuth()

  logout()

  if (!currentUser) {
    router.push('/')
  }

  return null
}

Logout.displayName = 'Logout'
Logout.propTypes = {
  router: PropTypes.object
}
export default Logout
