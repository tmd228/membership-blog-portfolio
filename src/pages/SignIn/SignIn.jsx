import React from 'react'
import styles from './SignIn.module.css'
import { Link } from 'react-router-dom'

function SignIn() {

    function handleSignIn(e) {
        e.preventDefault()
    }


    return (
        <div>
            <form onsubmit={handleSignIn}>
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" required />

                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">로그인</button>
            </form>
            <Link to='/signUp'>회원가입</Link>
        </div>
    )
}

export default SignIn