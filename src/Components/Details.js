import React from 'react'
import "../App.css"

function Details({selectedUser, onClose}) {
    const {name, email, price, profileImage, workType, address, contact,aadharImage} = selectedUser;



    return (
        <div className='Total_Details'>
            <div className='Image_Div'>
                <i className="fa-solid fa-xmark" onClick={onClose}></i>
            </div>
            <div className='Details_Div'>
                <div className='main_Details'>
                    <img src={aadharImage} alt=""/>
                    <h2>{name}</h2>
                    <p>{email}</p>
                </div>
                <div className='sub_MainDetails'>
                    <h1 style={{color:"white"}}>Details:</h1>
                    <p style={{fontSize:25}}>{contact}</p>
                    <p style={{color:"white"}}>{workType}</p>
                    <p style={{color:"white",fontSize:25}}>${price}</p>
                    <p>{address}</p>
                    <a href={aadharImage} download>show aadhar</a>
                </div>
            </div>
        </div>
    );
}

export default Details
