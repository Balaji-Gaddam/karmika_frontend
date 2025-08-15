import React, { useState } from 'react';
import NavBar from './NavBar';
import '../App.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Update from '../UserAuth/Update';


function Account() {
  const [updateClick,setUpdateClick]=useState(false)
  const [onClose,setOnclose] = useState(false)


  const user = useSelector(state => state.auth.user);
  console.log(user);


  const handleClickfunction=()=>{
    setUpdateClick(true)
    setOnclose(true)
  }

  return (
    <>
      {user ? (
        <div className='Total_Account_page'>
          <div className='Account_Top'>
            {/* Add content here if needed */}
          </div>
          <div className='Account_bottom'>
            <div className='Profile_Card'>
              <div className='Profile'>
                {user.image ? 
                  <img src={user.image} alt='User Profile' /> 
                : 
                  <img src={user.profileImage} alt='User Profile' />
                }
              </div>
              <div className='User_Details'>
                <p>{user.name || user.Username}</p>
                <p>{user.email}</p>
                {user.workType && <p>{user.workType}</p>}
                {user.price && <p>${user.price}</p>}
              </div>
              <div className='User_Details1'>
                {user.address && <p>{user.address}</p>}
                {user.contact && <h5>{user.contact}</h5>}
              </div>
              <button onClick={handleClickfunction}>Update Profile</button>
            </div>
          </div>
        </div>
      ) : (
        <div className='Total_Account_page'>
        <div className='Account_Top'>
          {/* Add content here if needed */}
        </div>
        <div className='Account_bottom'>
          <div className='Profile_Card'>
            <div className='Profile'>
              <img
                src='https://www.shareicon.net/data/128x128/2016/07/05/791214_man_512x512.png'
                alt='User Profile'
              />
            </div>
            <div className='User_Details'>
              <p>No Account details </p>
              <p>please Login</p>
            </div>
            <div className='User_Details1'>
            </div>
             <button><Link className='link' to="/login">login</Link></button>
          </div>
        </div>
      </div>
      )}
     {user && updateClick ? <Update updateClick={updateClick} onClose={()=>setUpdateClick(false)} setUpdateClick={setUpdateClick}/> : ""}
    </>
  );
}

export default Account;
