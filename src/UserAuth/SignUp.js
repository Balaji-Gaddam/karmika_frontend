import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
import SignUpform from './SignUpform'


function SignUp() {
    const[showUserForm , setShowUserForm] = useState(false)
    const[showKarmikaForm, setKarmikaForm] = useState(false)
    const [closeForm , setCloseForm]=useState(false)
    const [closeKarmika, setCloseKarmikaForm]=useState(false)

    const formUserShow=()=>{
        setShowUserForm(true)
        setKarmikaForm(false);
        setCloseForm(false);
    }
    const formKarmika=()=>{
        setKarmikaForm(true)
        setShowUserForm(false);
        setCloseKarmikaForm(false)
    }

    const closeUserform=()=>{
        setCloseForm(true)
        setCloseKarmikaForm(true)
    }
  return (
<>
    <div className='Total_SignUp'>
        <div className='signUp_Page'>
            <h1>SignUp</h1>
            <div className='SignUp_ButtonDiv'>
                <Link className='Link' onClick={formUserShow}>I Need Karmika</Link>
                <Link className='Link' onClick={formKarmika}>I Am Karmika</Link>
            </div>
            <p>already have an Account ? <Link to="/Login">login</Link></p>
        </div>
    </div>
    <div>
        {showUserForm && <SignUpform userType="user" onClose={closeUserform} closeForm={closeForm} />}
        {showKarmikaForm && <SignUpform userType="karmika" onClose={closeUserform} closeKarmika={closeKarmika} />}
    </div>
</>
  )
}

export default SignUp