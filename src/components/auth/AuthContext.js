import React, { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'))
    setUser(storedUser)
    setUserDetails(storedUserDetails)
  }, [])


  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('userDetails'))
  }

  const userIsAuthenticated = () => {
    let storedUser = localStorage.getItem('user')
    let storedUserDetails = localStorage.getItem('userDetails')
    if (!storedUser) {
      return false
    }
    storedUser = JSON.parse(storedUser)
    storedUserDetails = JSON.parse(storedUserDetails)
    if (Date.now() > storedUser.data.exp * 1000) {
      userLogout()
      return false
    }
    return true
  }

  const userIsAdmin = () => {
    let storedUserDetails = localStorage.getItem('userDetails')
    if (!storedUserDetails) {
      return false
    }
    storedUserDetails = JSON.parse(storedUserDetails)
    return storedUserDetails?.userType === 'ADMIN';

  }

  const userLogin = user => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const storeUserDetails = userDetails => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
    setUserDetails(userDetails)
  }

  const userLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userDetails')
    setUserDetails(null)
    setUser(null)
  }

  const contextValue = {
    user,
    userDetails,
    getUser,
    getUserDetails,
    userIsAuthenticated,
    userLogin,
    userLogout,
    storeUserDetails,
    userIsAdmin
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }