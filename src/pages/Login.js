import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';
const Login = () => {
        const [email,setEmail]=useState('');
        const [password,setPassword]=useState('');
        const [loggingIn,setLoggingIn]=useState(false);
        const auth=useAuth();

        console.log(auth);
        const handleSubmit=async(e)=>{
            e.preventDefault();
            if(!email || !password){
                toast.error("Please Enter Email and Password!!");
            }
            else if (!email.includes('@') || !email.includes('.com')) {
                toast.error("Please enter a correct email address");
            }
            else
            {
                setLoggingIn(true);
                const resp= await auth.login(email,password);
                if(resp.success){
                    toast.success('Successfully Logged In !!')
                }
                else{
                    console.log(resp.message);
                    toast.error(resp.message);
                }
            }
            setLoggingIn(false);
        }
        if(auth.user)
        {
          return(<Navigate to="/"/>)
        }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      </div>

      <div className={styles.field} >
        <button disabled={loggingIn}>{loggingIn?"LoggingIn...":"Log In"}</button>
      </div>
    </form>
  )
};

export default Login;