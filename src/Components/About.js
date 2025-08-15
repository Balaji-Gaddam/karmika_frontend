import React from 'react'
import homeImage from "../Components/images/4741.jpg";

function About() {
  return (
        <div className='SubTotal'>
            <div className='AboutCard'>
                {/* <div className='AboutCard_Background'></div> */}
                <div className='About_Image'>
                  <img src={homeImage} alt='aboutImage'/>
                </div>
            </div>
            <div className='AboutPera'>
                <h1 className='About_Heading'>About Us</h1>
                <p>Introducing WorkHub, the ultimate destination for seamless workforce management. It's a platform where workers can register themselves, showcasing their skills and availability, while users can effortlessly book them for various tasks.
                    Whether you're a business owner in need of skilled professionals or a freelancer seeking opportunities, WorkHub caters to your needs with its user-friendly interface and robust features.
                    Employers can easily search for and book workers based on location, skills, availability, and ratings, streamlining the hiring process. Workers can build their reputation through positive reviews, ensuring transparency and reliability.
                    Beyond just a booking platform, WorkHub fosters a vibrant community where users can engage in discussions, share insights, and network with others in their industry.
                    Experience the convenience and efficiency of WorkHub for all your workforce needs, revolutionizing the way workers and employers connect. Say goodbye to traditional hiring hassles and embrace the future of workforce management with WorkHub.
                </p>
            </div>
        </div>
  )
}

export default About