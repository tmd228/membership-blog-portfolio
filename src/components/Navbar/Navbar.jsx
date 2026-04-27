import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className={styles.navbar}>
        <h1>Logo</h1>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signIn'>Sign In</Link></li>
        </ul>
    </div>
  )
}

export default Navbar