import axios from 'axios';
import React, { useState } from 'react'
import Login from '../Login/Login';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Firebase';

export default function LogIn(props) {

  const [errorList, setErrorList] = useState([])
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  let navigate= useNavigate();

  const [user, setUser] = useState({
    email:'',
    password: ''
  })

  function getUser(e){
    let myUser= {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitLogIn(e){
    e.preventDefault();
    setIsLoading(true);
    
    let validationResult = ValidateLogInForm(user);
    
    if(validationResult.error){
      setIsLoading(false);
      ///list all errors
      setErrorList(validationResult.error.details)
      console.log(validationResult)

    }
    try{
      const loggedInUser = await login(user.email, user.password);
      localStorage.setItem('userToken',loggedInUser.accessToken)
      props.getUserData();
      navigate('/home');
    }
    catch(err){
      setError(err)
    }
  }

  function ValidateLogInForm(user){ 
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password:Joi.string()

    });
    return schema.validate(user, {abortEarly:false});
  }

  return (
    <>
      <h2 className='my-3'>LogIn Now </h2>

      {errorList.map((error, index)=>{

        if(index === 4){

        return  <div key={index} className='alert alert-danger'>Password Invalid</div>
        }
        else
          return <div key={index} className='alert alert-danger'>{error.message}</div>
      }
        
        )}

      {error? <div className='alert alert-danger'>{error}</div>:''}

      <form className='py-4' onSubmit={submitLogIn}>
      
      <label htmlFor="email">Email</label>
      <input onChange={getUser} type="email" className='form-control my-3' name='email' id='email' />
      
      <label htmlFor="password">password</label>
      <input onChange={getUser} type="password" className='form-control my-3' name='password' id='password' />
      
      <button type='submit' className='btn btn-outline-info'>
        {IsLoading?<i className=' fas fa-spinner fa-spin '></i>:'LogIn'}
      </button>
      <div className="w-100  mt-3">
        Forgot Password? <Link className='text-primary fw-bold text-decoration-underline' to={'/forgetpassword'}>Forgot Password</Link>
      </div>
      </form>
      <div className=" w-100">
        Need An Account? <Link className='text-primary fw-bold text-decoration-underline' to={'/Register'}>Register</Link>
      </div>
    </>
  )
}


// try {
//   const loggedInUser = await login(user.email, user.password);
//   localStorage.setItem("userToken", loggedInUser.accessToken); // ✅ حفظ الـ Token
//   navigate("/home"); // ✅ تحويل المستخدم إلى الصفحة الرئيسية
// } catch (err) {
//   setError(err);
// }