import React, { useEffect, useState } from 'react'
import styles from './GroupPage.module.css'
import { useParams, Navigate } from 'react-router-dom'
import { auth, db } from '../../firebaseConfig/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

function GroupPage() {

    //보안security 해야될것: firebaseRules로 membership확인 후 가입 되어있는 id만 데이터 보내주기

    const [isMember, setIsMember] = useState(null)
    const { groupId } = useParams()

    useEffect(() => {

        async function fetchMembership() {
            const membershipRef = collection(db, 'membership')
            const membershipQ = query(
                membershipRef,
                where('member', '==', auth.currentUser.uid),
                where('groupId', '==', groupId)
            )
            const membershipSnapshot = await getDocs(membershipQ)

            setIsMember(!membershipSnapshot.empty)
        }

        fetchMembership()


    }, [groupId])



    if (isMember === null) {
        return <h2>loading...</h2>
    }

    if (!isMember) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <h2>welcome</h2>
        </div>
    )
}

export default GroupPage