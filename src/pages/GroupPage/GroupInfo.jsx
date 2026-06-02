import React from 'react'
import styles from './GroupPage.module.css'
import { User as UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function GroupInfo( {groupData, groupId} ) {
  return (
    <div className={`${styles.groupInfo} ${styles.dashboardCards}`}>
                    <div className={styles.groupImage}></div>
                    <div className={styles.groupDetail}>
                        <div className={styles.titleAndBadge}>
                            <h2>{groupData?.groupName}</h2>
                            <p className={styles.badge}>공개그룹</p>
                        </div>
                        <p className={styles.groupDescription}>{groupData?.description}</p>
                        <div className={styles.infoBadges}>
                            <p className={styles.infoBadge}><UserIcon size={12} />멤버 {groupData.memberCount}명</p>
                        </div>
                    </div>
                    <div className={styles.groupButtons}>
                        <p className='secondaryButton'>버튼이번</p>
                        <Link to={`/group/${groupId}/newPost`} className='primaryButton'>버튼일번</Link>
                    </div>
                </div>
  )
}

export default GroupInfo