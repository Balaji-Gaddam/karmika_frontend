import React, { useState } from 'react'
import { updateUser } from '../authSlice';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { updatePhoto } from '../authSlice';


function Update({updateClick,onClose}) {
    const user = useSelector(state=> state.auth.user)

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };


    const newObject={ contact: user.contact,email: user.email}
    if (user.name){
        newObject.name= user.name
    }
    else{
        newObject.Username= user.Username
    }

    if(user.price){
        newObject.price= user.price
    }
   


    console.log(newObject)
    const [updateDetails,setUpdateDetails]=useState(newObject)
    const dispatch = useDispatch()
    const handleChnage=(e)=>{
        const {name,value}=e.target;
        setUpdateDetails({
            ...updateDetails,
            [name]:value
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        await dispatch(updateUser({updateDetails}))


    }


console.log(updateDetails)
  return (
    <>
    {updateClick && <div className='Total_KarmikaForm'>
                    <div className='Form_Title'>
                        <i className="fa-solid fa-square-xmark" onClick={onClose} ></i>
                        <h1>Hello Karmika,</h1>
                    </div>
                    <div className='Karmika_Form'>
                        <form onSubmit={handleSubmit} >
                            {user.name ? (<input type='text' name='name' placeholder='Enter Name' value={updateDetails.name}  onChange={handleChnage} />):(<input type='text' name='Username' placeholder='Enter Name' value={updateDetails.Username}  onChange={handleChnage} />) }
                             <input type='email' name='email' placeholder='enter your email' value={updateDetails.email}  onChange={handleChnage}  />
                            <input type='text' name='contact' placeholder='Enter Contact Number' value={updateDetails.contact}  onChange={handleChnage}/>
                            {/* {user.image ? (<input className='spanInputFile' id='ProfileImageFile' type='file' name='image' value={updateDetails.image} onChange={handleChnage}  />):(<input className='spanInputFile' id='ProfileImageFile' type='file' name='profileImage' value={updateDetails.image} onChange={handleChnage}  />)}
                            <label htmlFor='ProfileImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Profile Image</label>
                            {user.price &&  <input type='text' placeholder='Enter your price per Day' name="price" value={updateDetails.price} onChange={handleChnage} />} */}
                            {user.address &&  <input type='text' name='address' placeholder='Enter your Address' value={updateDetails.address} onChange={handleChnage}  /> } 
                           
                            <input type='submit' style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }} />
                           
                        </form>
                    </div>
    </div>  }
    </>
  )
}

export default Update