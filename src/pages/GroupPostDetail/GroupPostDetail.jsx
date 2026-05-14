import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig/firebase'
import styles from './GroupPostDetail.module.css'

function GroupPostDetail() {

    const { groupId, postId } = useParams()
    const [postData, setPostData] = useState('')

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, 'posts', postId)
            const postDoc = await getDoc(docRef)
            setPostData(postDoc.data())
        }
        try {
            fetchData()

        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2>{postData.title}</h2>
                <p>작성자: {postData.nickname ?? '유저'}</p>
                <p>{postData.createdAt?.toDate().toLocaleString()}</p>
                <p>{postData.contents}</p>

            </div>
        </div>
    )
}

export default GroupPostDetail