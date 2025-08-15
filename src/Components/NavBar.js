import React from 'react'
import "../App.css"
import {Link} from "react-router-dom"

import { useSelector } from 'react-redux'
import {logout} from '../authSlice'
import { useDispatch } from 'react-redux'




function NavBar() {

  const auth= useSelector(state=> state.auth.auth)

  const dispatch=useDispatch()

  const logoutHandler= async()=>{
    localStorage.removeItem("token")
    await  dispatch(logout())
  }
  return (
    <div className='TotalNav'>
        <div className='NavLogo'>
            <h1>Karmika Dalam</h1>
        </div>
        <div className='NavItems'>
            <Link to='/'>Home</Link>
            <Link to='/services'>Services</Link>
            <Link to='/account'>Account</Link>
            {/* <Link to='/signUp'>SignUp</Link> */}
            {auth ? <Link to="/" onClick={logoutHandler}>Logout</Link> : <Link to="/login">Login</Link>}
        </div>
    </div>
  )

}

export default NavBar