import React from 'react'
import { Link } from 'react-router-dom'
import styles from './GroupPage.module.css'
import {
    Bookmark as BookmarkIcon,
    Eye as EyeIcon
} from 'lucide-react'

function PostsList({ postsData }) {
    return (<>
        <div className={`${styles.groupPostsList} ${styles.dashboardCards}`}>
            <p>게시글</p>
        {postsData.map(post => {
            return <Link to={`/group/${post.groupId}/post/${post.id}`} className={styles.postItem} key={post.id}>
                <div className={styles.userAndBookmark}>
                    <div className={styles.userListUser}>
                        <div className={styles.userProfilePicture}></div>
                        <p>{post.nickname}</p>
                        <p className={styles.postDate}>{post.createdAt.toDate().toLocaleString()}</p>
                    </div>
                    <BookmarkIcon />
                </div>
                <p>{post.title}</p>
                <div className={styles.languageAndViewCount}>
                    <p className={styles.badge}>뱃지</p>
                    <div className={styles.viewCount}>
                        <EyeIcon size={18} style={{ color: "grey" }} />
                        <p>12</p>
                    </div>
                </div>
            </Link>
        })
        }
        </div>
        </>
    )
}

export default PostsList