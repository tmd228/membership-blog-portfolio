import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConfig/firebase'
import styles from './Home.module.css'

function Home() {

  const [user, setUser] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (<div>
    {user && <div className={styles.buttons}>
      <Link className='primaryButton' to='/joinGroup'>Join Group</Link>
      <Link className='primaryButton' to='/createGroup'>Create Group</Link>
      <Link className='primaryButton' to='/test'>test</Link>
    </div>}
    
  </div>
  )
}

export default Home