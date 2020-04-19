import React from 'react'

import {useFirebaseAuth} from '../../hooks/firebase'

const Login = () => {
  const {loginWithGoogle, currentUser} = useFirebaseAuth()

  if (currentUser) {
    window.location.href = '/'
  }

  return (
    <div className="Login">
      <div className="Login-google" onClick={loginWithGoogle} />
    </div>
  )
}

Login.displayName = 'Login'
export default Login
