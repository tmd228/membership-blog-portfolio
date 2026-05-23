import React, { useEffect, useState } from 'react'
import styles from './GroupPage.module.css'
import { useParams, Navigate } from 'react-router-dom'
import { auth, db } from '../../firebaseConfig/firebase'
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function GroupPage() {

    //보안security 해야될것: firebaseRules로 membership확인 후 가입 되어있는 id만 데이터 보내주기

    const [isMember, setIsMember] = useState(null)
    const [posts, setPosts] = useState([])
    const { groupId } = useParams()
    const [memberList, setMemberList] = useState([])

    useEffect(() => {

        async function fetchMembership() {
            try {
                const membershipRef = collection(db, 'membership')
                const membershipQ = query(
                    membershipRef,
                    where('member', '==', auth.currentUser.uid),
                    where('groupId', '==', groupId)
                )
                const membershipSnapshot = await getDocs(membershipQ)

                setIsMember(!membershipSnapshot.empty)

            } catch (err) {
                console.log(err)
            }
        }

        async function fetchJoinRequest() {

            try {
                const groupRef = doc(db, 'groups', groupId)
                const snapshot = await getDoc(groupRef)
                const groupData = snapshot.data()

                if (groupData.ownerId === auth.currentUser.uid) {

                    const requestRef = collection(db, 'joinRequests')
                    const requestQ = query(
                        requestRef,
                        where('requestGroupId', '==', groupId)
                    )
                    const requestSnapshot = await getDocs(requestQ)
                    console.log(requestSnapshot.docs)
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchMembership()
        fetchJoinRequest()


    }, [groupId])

    useEffect(() => {

        async function fetchPosts() {

            if (!isMember) return

            try {
                const collectionRef = collection(db, "posts")
                const postsQ = query(
                    collectionRef,
                    where('groupId', '==', groupId)
                )

                const snapshot = await getDocs(postsQ)
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))

            } catch (err) {

                console.log(err)
            }
        }

        async function fetchMembers() {
            try {
                const membersCollectionRef = collection(db, 'membership')
                const membersQ = query(membersCollectionRef, where('groupId', '==', groupId))
                const membersSnapshot = await getDocs(membersQ)
                setMemberList(membersSnapshot.docs.map((doc) => {
                    return doc.data()
                }))

            } catch (err) {

            }
        }

        fetchPosts()
        fetchMembers()

    }, [isMember, groupId])


    if (isMember === null) {
        return <h2>loading...</h2>
    }

    if (!isMember) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <Link className='primaryButton' to={`/group/${groupId}/newPost`}>new Post</Link>
            <div className={styles.membersList}>
                <h2>회원 리스트</h2>
                {memberList.map((member) => (
                    <div key={member.id}>
                        {member.memberNickname ??'사용자'}
                    </div>
                ))}
            </div>
            <div className={styles.postsList}>
                <h2>게시글</h2>
                {posts.length > 0 ? posts.map((post) => {
                    return <Link key={post.id} to={`/group/${groupId}/post/${post.id}`}>
                        <p>{post.title}</p>
                        <p>{post.nickname ?? '사용자'}</p>
                    </Link>
                })
                    : <p>게시물이 없습니다</p>}
            </div>
        </div>
    )
}

export default GroupPage