import styles from './GroupDashboard.module.css'
import { Link } from 'react-router-dom'

function GroupDashboard() {
  return (
    <div className={styles.body}>
      <div className={styles.leftSidebar}>
        <div className={styles.leftTop}>
          <Link to='/createGroup' className='primaryButton'>+그룹만들기</Link>
        </div>
        <div className={styles.leftBottom}>
          <p>내 그룹</p>
        </div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.rightSidebar}></div>
    </div>
  )
}

export default GroupDashboard