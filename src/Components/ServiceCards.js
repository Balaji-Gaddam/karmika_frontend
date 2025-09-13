import React from 'react'
import electretion from "../Components/images/electric.jpg"
import cleaner from "../Components/images/cleaner.jpg"
import constructor from "../Components/images/constructor.jpg"
import cook from "../Components/images/cook.jpg"
import delivery from "../Components/images/delivery.jpg"
import doctor from "../Components/images/eldery_treatment_05.jpg"
import gardening from "../Components/images/gardening.jpg"
import painter from "../Components/images/painter.jpg"
import plumber from "../Components/images/plumber.jpg"
import servents from "../Components/images/servents.jpg"

const CardData=[
    {
        img:electretion,
        title:"Electretion",
        about:"A skilled professional who installs, maintains, and repairs electrical systems, ensuring safety and reliable power supply."
    },
    {
        img:cleaner,
        title:"Cleaner",
        about:"A dedicated worker who maintains cleanliness and hygiene in homes, offices, and public spaces, creating a healthy environment."
    },
    {
        img:constructor,
        title:"Constructor",
        about:"Builds and oversees construction projects, ensuring safety, strength, and quality."
    },
    {
        img:cook,
        title:"Cook",
        about:"Prepares delicious and hygienic meals with skill and creativity."
    },
    {
        img:delivery,
        title:"Delivery Person",
        about:"Ensures timely and safe delivery of goods to customers."
    },
    {
        img:doctor,
        title:"Doctor",
        about:"Provides medical care, diagnosis, and treatment to improve health and save lives."
    },
    {
        img:gardening,
        title:"Gardener",
        about:"Cultivates and maintains plants, lawns, and landscapes for beauty and greenery."
    },
    {
        img:painter,
        title:"Painter",
        about:"Enhances spaces with skilled painting and finishing for a fresh, appealing look."
    },
    {
        img:plumber,
        title:"Plumber",
        about:"Installs and repairs water, drainage, and piping systems efficiently."
    },
    {
        img:servents,
        title:"Servants",
        about:"Assist with household chores and daily needs, ensuring smooth home management."
    },
    {
        img:"https://img.freepik.com/free-vector/carpentry-round-concept_1284-38167.jpg?t=st=1711627394~exp=1711630994~hmac=441c321114d79abceb0588d13a862805da6be633ee628f015f89ad6cab5abeb7&w=740",
        title:"Carpenter",
        about:"Crafts, repairs, and installs wooden furniture and fittings with precision."
    },
    {
        img:"https://img.freepik.com/free-vector/product-teardown-concept-illustration_114360-1580.jpg?t=st=1711627504~exp=1711631104~hmac=d092fdb8eb0f6b58d770e55b659fd2e7ef6e99447a3f5c7ed33fbbcfaaad960f&w=740",
        title:"Tech Repair Specialist",
        about:"Fixes and maintains electronic gadgets and devices for smooth functioning."
    },
]


function ServiceCards() {
  return (
    <div className='Total_Services_Cards' >
        <h1>Services</h1>
        <div className='Total_cards'>
        {CardData.map((data,index)=>{
            const{img,title,about}=data;
            return(
                <div className="card" key={index}>
                    <img src={img} alt='eleimage' />
                    <div className="card__content">
                        <p className="card__title">{title}</p>
                        <p className="card__description">{about}</p>
                    </div>
                </div>
            );
        })}
        </div>
    </div>
  )
}

export default ServiceCards