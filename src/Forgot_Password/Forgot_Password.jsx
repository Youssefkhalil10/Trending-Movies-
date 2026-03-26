import React from 'react'
import { Link } from 'react-router-dom'

export default function Forgot_Password() {
    return (
        <>
        <h2 className='my-3'>Reset Password </h2>

        <form >
        <label htmlFor="email">Email</label>
        <input  type="email" className='form-control my-3' name='email' id='email' />

        <button className='btn btn-outline-info' type="submit">Reset Password</button>

        <div className="w-100  mt-3">
        <Link className='text-primary fw-bold text-decoration-underline' to={'/Login'}>Login</Link>
    </div>
    
        </form>
        <div className="text-center">
                Need An Account? <Link className='text-primary fw-bold text-decoration-underline' to={'/Register'}>Register</Link>
            </div>
        </>
    )
    
}
