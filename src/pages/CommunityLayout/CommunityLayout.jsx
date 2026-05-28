import styles from './CommunityLayout.module.css'
import { Outlet } from 'react-router-dom'
import CommunityLeftSidebar from '../../components/CommunityLeftSidebar/CommunityLeftSidebar'



function CommunityLayout() {
    return (
        <div className={styles.layout}>
            <aside className={styles.leftbar}>
                <CommunityLeftSidebar />
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default CommunityLayout