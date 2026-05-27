import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConfig/firebase'
import styles from './Home.module.css'
import { db } from '../../firebaseConfig/firebase'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { getUserGroups } from '../../services/groupServices'

function Home() {

  const [user, setUser] = useState('')
  const [groupNames, setGroupNames] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {

        try {
          const groups = await getUserGroups(currentUser.uid)
          setGroupNames(groups)
        } catch (err) {
          console.log(err)
        }
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (<div>
    {user && <div>
      <div className={styles.buttons}>
        <Link className='primaryButton' to='/joinGroup'>Join Group</Link>
        <Link className='primaryButton' to='/createGroup'>Create Group</Link>
        <Link className='primaryButton' to='/test'>test</Link>
      </div>
      <p>내 그룹들</p>
      <ul>
        {groupNames.length > 0 ? (
          groupNames.map((group, index) => (
            <li key={index}><Link to={`group/${group.groupId}`}>{group.groupName}</Link></li>
          ))
        ) : (
          <p>그룹이 없습니다.</p>
        )}
      </ul>
    </div>
    }

  </div>
  )
}

export default Home