import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute( { user, loading } ) {

    if (loading) return <p>...Loading</p>

  if(!user) {
    return <Navigate to='/signIn' replace />
  }

  return <Outlet />
}

export default ProtectedRoute