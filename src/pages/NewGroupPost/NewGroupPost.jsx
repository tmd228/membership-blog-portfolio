import React, { useState } from 'react'
import styles from './NewGroupPost.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig/firebase'

function NewGroupPost() {

    const { groupId } = useParams()
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')

    const navigate = useNavigate()

    async function handleNewPost(e) {
        e.preventDefault()

        if (!auth.currentUser) {
            console.log('로그인 안됨')
            return
        }
        try {
            const collectionRef = collection(db, "posts")
            const postRef = await addDoc(collectionRef, {
                groupId,
                authorId: auth.currentUser.uid,
                title,
                contents,
                createdAt: serverTimestamp()
            })
            navigate(`/group/${groupId}`, { replace: true })

        } catch (err) {
            console.log(err)
        }

    }

    return (<div>
        <div>{groupId}</div>
        <form onSubmit={handleNewPost}>
            <label htmlFor="title">title</label>
            <input type="text" id='title' value={title} onChange={e => setTitle(e.target.value)} />
            <label htmlFor="contents">contents</label>
            <textarea id="contents" value={contents} onChange={e => setContents(e.target.value)}></textarea>
            <button type='submit'>Post</button>
        </form>
    </div>
    )
}

export default NewGroupPost