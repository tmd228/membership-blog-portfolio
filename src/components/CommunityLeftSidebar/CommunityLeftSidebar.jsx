import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { getUserGroups } from '../../services/groupServices'
import { auth } from '../../firebaseConfig/firebase'
import { Link } from 'react-router-dom'
import styles from './CommunityLeftSidebar.module.css'
import {
  Home as HomeIcon,
  Telescope as TelescopeIcon,
  Bookmark as BookmarkIcon
} from 'lucide-react'

function CommunityLeftSidebar() {

 const [userGroups, setUserGroups] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUserGroups([])
        return
      }

      try {
        const groups = await getUserGroups(currentUser.uid)
        setUserGroups(groups)
      } catch (err) {
        console.log(err)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.leftSidebar}>
        <div className={styles.leftTop}>
          <Link to='/createGroup' className='primaryButton'>+그룹만들기</Link>
          <ul>
            <li className={styles.subMenu}><a href=""><HomeIcon size={22} />home</a></li>
            <li className={styles.subMenu}><a href=""><TelescopeIcon size={22} />explore</a></li>
            <li className={styles.subMenu}><a href=""><BookmarkIcon size={22} />saved</a></li>
          </ul>
        </div>
        <div className={styles.leftBottom}>
          <p className={styles.subTitle}>내 그룹</p>
          <ul>
          {userGroups?.map((group) => {
            return <Link to={`/community/dashboard/${group.groupId}`} className={styles.groupButton} key={group.groupId}>
                <div className={styles.img}></div>
              <div>{group.groupName}</div>
            </Link>
          })}

          </ul>
        </div>
      </div>
  )
}

export default CommunityLeftSidebar