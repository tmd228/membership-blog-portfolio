import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebase'

function Navbar() {

  const [user, setUser] = useState('')

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(currentUser)
    })

    return () => unsubscribe()
  }, [])

  async function handleSignOut () {
    try {
      await signOut(auth)
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.navbar}>
        <h1>Logo</h1>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li>
            {user ? (
                // If user is signed in, show user icon or profile link
                <button onClick={handleSignOut}>로그아웃</button>
            ) : (
                // If user is not signed in, show Sign In button
                <Link to="/signIn">Sign In</Link>
            )}
            </li>
        </ul>
    </div>
  )
}

export default Navbar