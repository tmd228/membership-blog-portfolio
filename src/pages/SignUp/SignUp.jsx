import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css'
import { auth, db } from '../../firebaseConfig/firebase';
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

function SignUp() {

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // 사용자 가입시 Auth에 사용자 닉네임까지 추가로 넣기
            // 네비게이션바에 유저 닉네임 띄우는용도 (firestore에서 이름 읽어오는 비용 절감 목적)
            await updateProfile(userCredential.user, {
                displayName: nickname,
            });

            const userRef = doc(db, 'users', userCredential.user.uid)
            const userData = await setDoc(userRef, {
                email,
                createdAt: serverTimestamp(),
                uid: userCredential.user.uid,
                nickname
            })

            navigate('/')
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <form onSubmit={handleSignUp}>
                <label htmlFor="nickname">닉네임</label>
                <input
                    type='text'
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    onChange={(e) => { setNickname(e.target.value) }}
                    required />

                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />

                <button type="submit">회원가입</button>
            </form>
            <Link to='/signIn'>로그인</Link>
        </div>
    )
}

export default SignUp