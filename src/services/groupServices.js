import {
    collection,
    documentId,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

export async function getUserGroups (uid) {
    const membershipRef = collection(db, 'membership')
    const q = query(membershipRef, where('member', '==', uid))
    const querySnapshot = await getDocs(q)
    const userGroups = querySnapshot.docs.map(doc => doc.data().groupId)
    
    if (userGroups.length === 0) {
        return []
    }
    
    const groupCollectionRef = collection(db, 'groups')
    const groupsQuery = query(groupCollectionRef, where(documentId(), 'in', userGroups))
    const groupSnapshot = await getDocs(groupsQuery)
    return groupSnapshot.docs.map(doc => ({
        groupId: doc.id,
        ...doc.data()
    }))

}
