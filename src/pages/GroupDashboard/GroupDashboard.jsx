import styles from './GroupDashboard.module.css'

function GroupDashboard() {
  return (
    <div className={styles.body}>
        <div className={styles.leftSidebar}>
            <button className='primaryButton'>+그룹만들기</button>
        </div>
        <div className={styles.main}></div>
        <div className={styles.rightSidebar}></div>
    </div>
  )
}

export default GroupDashboard