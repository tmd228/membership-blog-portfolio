import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConfig/firebase'
import styles from './Home.module.css'
import { db } from '../../firebaseConfig/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

function Home() {

  const [user, setUser] = useState('')
  const [groups, setGroups] = useState('')
  const [groupNames, setGroupNames] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      
      if (currentUser) {

        try {
          const membershipCollection = collection(db, 'membership')
          const q = query(membershipCollection, where('member', '==', currentUser.uid))
          const querySnapshot = await getDocs(q)
          console.log(querySnapshot)
          const userGroups = querySnapshot.docs.map(doc => doc.data())
          setGroups(userGroups)
          console.log(userGroups)

          // groups.map(group => )
        }catch (err) { 
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
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <li key={index}>{group.groupId}</li>
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