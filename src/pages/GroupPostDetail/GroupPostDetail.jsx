import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../../firebaseConfig/firebase'
import styles from './GroupPostDetail.module.css'

function GroupPostDetail() {

    const { groupId, postId } = useParams()
    const [postData, setPostData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {

            try {
                const docRef = doc(db, 'posts', postId)
                const postDoc = await getDoc(docRef)
                setPostData(postDoc.data())

            } catch (err) {
                console.log (err)
            }
        }
        fetchData()
    }, [postId])

    async function deletePost() {
        if (postData.authorId !== auth.currentUser.uid) return

        try {
            await deleteDoc(doc(db, 'posts', postId))
            navigate(`/group/${groupId}`)
            //나중에 댓글도 만들면 댓글 컬렉션에서 댓글도 삭제해야됨.
            
        } catch (err) {
            console.log(err)
        }
    }

    if (!postData) return <div>loading...</div>

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2>{postData.title}</h2>
                <p>작성자: {postData.nickname ?? '유저'}</p>
                <p>{postData.createdAt?.toDate().toLocaleString()}</p>
                <p>{postData.contents}</p>
                {postData.authorId === auth.currentUser.uid ? <button onClick={deletePost}>delete</button> : <div></div>}
                
            </div>
        </div>
    )
}

export default GroupPostDetail