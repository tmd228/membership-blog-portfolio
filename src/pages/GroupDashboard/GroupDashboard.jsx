import styles from './GroupDashboard.module.css'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  Telescope as TelescopeIcon,
  Bookmark as BookmarkIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebase'
import { getUserGroups } from '../../services/groupServices'
function GroupDashboard() {

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
    <div className={styles.body}>
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
          {userGroups?.map((group) => {
            return <div key={group.groupId}>
              <p>{group.groupName}</p>
            </div>
          })}
        </div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.rightSidebar}></div>
    </div>
  )
}

export default GroupDashboard