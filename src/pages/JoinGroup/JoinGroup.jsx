import React, { useState } from 'react'
import styles from './JoinGroup.module.css'
import { auth, db } from '../../firebaseConfig/firebase'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


function JoinGroup() {

  const [groupId, setGroupId] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {

      const collectionRef = collection(db, 'groupJoinRequests')
      const docRef = await addDoc(collectionRef, {
        requestGroupId: groupId,
        requestUserId: auth.currentUser.uid,
        requestedAt: serverTimestamp()
      })

      setRequestSent(true)
      
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {requestSent && <p className={styles.alert}>request sent</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupId">그룹 UID</label>
        <input type="text" id='groupId' value={groupId} onChange={e => setGroupId(e.target.value)} />

        <button type='submit'>요청보내기</button>
      </form>
    </div>
  )
}

export default JoinGroup