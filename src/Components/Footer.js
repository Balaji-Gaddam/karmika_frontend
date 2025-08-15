import React from 'react'

function Footer() {
  return (
    <div className='Total_Nav'>
      <h1>Karmika Dalam &#169; 2024</h1>
        <div className='footer_info'>
          <div className='foot_Items'>
            <h2>Customers</h2>
            <p>Karmikas</p>
            <p>Users</p>
          </div>
          <div className='foot_Items'>
            <h2>Company</h2>
            <p>About us</p>
            <p>Contact Us</p>
          </div>
          <div className='foot_Items'>
            <h2>Further Info</h2>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className='foot_Items'>
            <h2>Follow us</h2>
            <div className='Foot_Icons'>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-square-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-telegram"></i>
            <i className="fa-brands fa-square-x-twitter"></i>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer