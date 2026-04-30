import React, { useState } from 'react'
import styles from './CreateGroup.module.css'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebaseConfig/firebase'
import { auth } from '../../firebaseConfig/firebase'
import { useNavigate } from 'react-router-dom'

function CreateGroup() {

    const [groupName, setGroupName] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    //groupName, ownerId, createdAt, description, isPrivate
    async function handleCreateGroup(e) {
        e.preventDefault()
        try {
            const docRef = collection(db, 'groups')
            const docData = await addDoc(docRef, {
                groupName,
                description,
                createdAt: serverTimestamp(),
                ownerId: auth.currentUser.uid,
                isPrivate: true
            })

            const membershipRef = collection(db, 'membership')
            const membershipData = await addDoc(membershipRef, {
                groupId: docData.id,
                member: auth.currentUser.uid
            })

            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleCreateGroup}>
                <label htmlFor="groupName">그룹이름</label>
                <input type="text" id='groupName' value={groupName} onChange={(e) => setGroupName(e.target.value)} required />

                <label htmlFor="description">설명</label>
                <textarea
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type='submit'>그룹만들기</button>
            </form>
        </div>
    )
}

export default CreateGroup