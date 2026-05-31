import React, { useEffect, useState } from 'react'
import styles from './GroupPage.module.css'
import { useParams, Navigate } from 'react-router-dom'
import { auth, db } from '../../firebaseConfig/firebase'
import { addDoc, collection, deleteDoc, doc, documentId, getDoc, getDocs, increment, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Users as UserIcon } from 'lucide-react';

function GroupPage() {

    //보안security 해야될것: firebaseRules로 membership확인 후 가입 되어있는 id만 데이터 보내주기

    const [isMember, setIsMember] = useState(null)
    const [posts, setPosts] = useState([])
    const { groupId } = useParams()
    const [memberList, setMemberList] = useState([])
    const [groupData, setGroupData] = useState(null)
    const [joinRequestList, setJoinRequestList] = useState([])
    const [user, setUser] = useState(null)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser)

        return () => { unsub() }
    }, [])

    useEffect(() => {
        async function fetchMembership() {
            try {

                if (!user) return

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

        fetchMembership()
    }, [groupId, user])

    useEffect(() => {

        async function fetchGroupData() {
            try {
                const groupRef = doc(db, 'groups', groupId)
                const snapshot = await getDoc(groupRef)
                const groupData = snapshot.data()
                setGroupData(groupData)

            } catch (err) {
                console.log(err)
            }
        }

        fetchGroupData()
    }, [groupId])

    useEffect(() => {

        if (!groupData?.ownerId) return
        if (groupData.ownerId !== user.uid) return

        async function fetchJoinRequest() {


            try {



                const requestRef = collection(db, 'groupJoinRequests')
                const requestQ = query(
                    requestRef,
                    where('requestGroupId', '==', groupId)
                )
                const requestSnapshot = await getDocs(requestQ)
                setJoinRequestList(requestSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })))
                console.log('가입요청데이터 불러옴')


            } catch (err) {
                console.log(err)
            }
        }

        fetchJoinRequest()


    }, [groupData, groupId])

    useEffect(() => {

        if (isMember === null) return
        if (!isMember) return

        async function fetchPosts() {

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
                setMemberList(membersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })))

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

    async function handleAcceptJoin(request) {

        if (groupData.ownerId !== auth.currentUser.uid) return

        try {
            const membershipRef = collection(db, 'membership')
            const membershipData = await addDoc(membershipRef, {
                groupId: groupId,
                member: request.requestUserId,
                memberNickname: request.requestUserNickname,
                joinedAt: serverTimestamp()
            })

            await updateDoc(doc(db, "groups", groupId), {
                memberCount: increment(1)
            })

            await deleteDoc(doc(db, 'groupJoinRequests', request.id))

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.groupContainer}>
            <div className={styles.mainContents}>
                <div className={styles.groupInfo}>
                    <div className={styles.groupImage}></div>
                    <div className={styles.groupDetail}>
                        <div className={styles.titleAndBadge}>
                            <h2>{groupData?.groupName}</h2>
                            <p className={styles.badge}>공개그룹</p>
                        </div>
                        <p className={styles.groupDescription}>{groupData?.description}</p>
                        <div className={styles.infoBadges}>
                            <p className={styles.infoBadge}><UserIcon size={12} />멤버 {groupData.memberCount}명</p>
                        </div>
                    </div>
                    <div className={styles.groupButtons}>
                        <p className='secondaryButton'>버튼이번</p>
                        <Link to={`/group/${groupId}/newPost`} className='primaryButton'>버튼일번</Link>
                    </div>
                </div>
                <div className={styles.membersAndPosts}>
                    {/* 멤버목록 */}
                    <div className={`${styles.groupMembersList} ${styles.dashboardCards}`}>
                        멤버목록
                        {memberList?.map((member) => (
                            <div key={member.id} className={styles.userListUser}>
                                <div className={styles.userProfilePicture}></div>
                                <p>{member.memberNickname ?? '사용자'}</p>
                            </div>
                        ))}
                    </div>
                    {/* /멤버목록 */}
                    <div className={styles.announcementAndPosts}>
                        <div className={`${styles.dashboardCards}`}>
                            공지사항
                        </div>
                        {/* 게시글목록 */}
                        <div className={`${styles.groupPostsList} ${styles.dashboardCards}`}>
                            게시글목록
                        </div>
                        {/* /게시글목록 */}

                    </div>

                </div>
            </div>
            <div className={styles.rightSidebar}>오른쪽</div>
        </div>
        // <div>
        //     <Link className='primaryButton' to={`/group/${groupId}/newPost`}>new Post</Link>
        //     <div className={styles.membersList}>
        //         <h2>회원 리스트, 회원수: {groupData?.memberCount}</h2>
        //         {memberList.map((member) => (
        //             <div key={member.id}>
        //                 {member.memberNickname ?? '사용자'}
        //             </div>
        //         ))}
        //     </div>
        //     <div>
        //         <h2>가입요청</h2>
        //         {joinRequestList.map(doc => {
        //             return <div className={styles.joinRequestCard} key={doc.requestUserId}>
        //                 <div className={styles.joinRequestTexts}>
        //                     <p>요청자: {doc.requestUserNickname}</p>
        //                     <p>요청날짜: {doc.requestedAt?.toDate().toLocaleDateString()}</p>
        //                 </div>
        //                 <div className={styles.joinRequestButtons}>
        //                     <button onClick={() => handleAcceptJoin(doc)} className={styles.accept}>수락하기</button>
        //                     <button className={styles.reject}>거절하기</button>
        //                 </div>
        //             </div>
        //         })}
        //     </div>
        //     <div className={styles.postsList}>
        //         <h2>게시글</h2>
        //         {posts.length > 0 ? posts.map((post) => {
        //             return <Link key={post.id} to={`/group/${groupId}/post/${post.id}`}>
        //                 <p>{post.title}</p>
        //                 <p>{post.nickname ?? '사용자'}</p>
        //             </Link>
        //         })
        //             : <p>게시물이 없습니다</p>}
        //     </div>
        // </div>
    )
}

export default GroupPage