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
        title:"electretion",
        about:""
    },
    {
        img:cleaner,
        title:"cleaner",
        about:""
    },
    {
        img:constructor,
        title:"constructor",
        about:""
    },
    {
        img:cook,
        title:"cook",
        about:""
    },
    {
        img:delivery,
        title:"delivery",
        about:""
    },
    {
        img:doctor,
        title:"doctor",
        about:""
    },
    {
        img:gardening,
        title:"gardening",
        about:""
    },
    {
        img:painter,
        title:"painter",
        about:""
    },
    {
        img:plumber,
        title:"plumber",
        about:""
    },
    {
        img:servents,
        title:"servents",
        about:""
    },
    {
        img:"https://img.freepik.com/free-vector/carpentry-round-concept_1284-38167.jpg?t=st=1711627394~exp=1711630994~hmac=441c321114d79abceb0588d13a862805da6be633ee628f015f89ad6cab5abeb7&w=740",
        title:"Carpenter",
        about:""
    },
    {
        img:"https://img.freepik.com/free-vector/product-teardown-concept-illustration_114360-1580.jpg?t=st=1711627504~exp=1711631104~hmac=d092fdb8eb0f6b58d770e55b659fd2e7ef6e99447a3f5c7ed33fbbcfaaad960f&w=740",
        title:"Tech Repair",
        about:""
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
                        <p className="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>
            );
        })}
        </div>
    </div>
  )
}

export default ServiceCards