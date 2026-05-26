import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConfig/firebase'
import styles from './Home.module.css'
import { db } from '../../firebaseConfig/firebase'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore'

function Home() {

  const [user, setUser] = useState('')
  const [groups, setGroups] = useState('')
  const [groupNames, setGroupNames] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {

        try {
          const membershipRef = collection(db, 'membership')
          const q = query(membershipRef, where('member', '==', currentUser.uid))
          const querySnapshot = await getDocs(q)
          const userGroups = querySnapshot.docs.map(doc => doc.data().groupId)
          setGroups(userGroups)

          if (userGroups.length === 0) {
            setGroupNames([])
            return
          }

          const groupCollectionRef = collection(db, 'groups')
          const groupsQuery = query(groupCollectionRef, where(documentId(), 'in', userGroups))
          const groupSnapshot = await getDocs(groupsQuery)
          setGroupNames(groupSnapshot.docs.map(doc => ({
            groupId: doc.id,
            ...doc.data()
          })))
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
        {groups.length > 0 ? (
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