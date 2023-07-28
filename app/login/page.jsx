'use client'
import { signIn } from "next-auth/react"

function Login() {
    return (
        <div>
            <button onClick={() => signIn()}>Sign in</button>
        </div>  
    )
}

export default Login