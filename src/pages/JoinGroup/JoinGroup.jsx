import React, { useState } from 'react'
import styles from './JoinGroup.module.css'
import { auth, db } from '../../firebaseConfig/firebase'
import { addDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


function JoinGroup() {

  const [groupId, setGroupId] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {

      const collectionRef = collection(db, 'groupJoinRequests')

      const existingDocCheckQ = query(collectionRef, 
        where("requestGroupId", "==", groupId),
        where("requestUserId", "==", auth.currentUser.uid)
      )

      const snapshot = await getDocs(existingDocCheckQ)

      if (!snapshot.empty) {
        setMessage('이미 요청을 보냈습니다. 기다려주세요')
      } else {
        const docRef = await addDoc(collectionRef, {
          requestGroupId: groupId,
          requestUserId: auth.currentUser.uid,
          requestedAt: serverTimestamp(),
          requestUserNickname: auth.currentUser.displayName
        })
  
        setMessage("요청전송 완료")

      }
      
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupId">그룹 UID</label>
        <input type="text" id='groupId' value={groupId} onChange={e => setGroupId(e.target.value)} />

        <button type='submit'>요청보내기</button>
      </form>
    </div>
  )
}

export default JoinGroup