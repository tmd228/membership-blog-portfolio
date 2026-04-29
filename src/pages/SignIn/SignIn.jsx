import React, { useState } from 'react'
import styles from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig/firebase'

function SignIn() {

     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     const navigate = useNavigate()

    async function handleSignIn(e) {

       
        e.preventDefault()

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            navigate('/')

        }catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />

                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} required />

                <button type="submit">로그인</button>
            </form>
            <Link to='/signUp'>회원가입</Link>
        </div>
    )
}

export default SignIn