import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Details from './Details'
import { API_URL } from '../config'

function Services() {
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchItem, setSearchItem] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [selectedItem, setSelectedItem] = useState("Choose Profession")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState({ status: false, message: "" })
  const [revealedContacts, setRevealedContacts] = useState({})

  const fetchingData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/karmikas`);
      const karmikasArray = response.data.data;
      setData(karmikasArray);
      setFilteredData(karmikasArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = data.filter(karmika =>
        karmika.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        karmika.workType.toLowerCase().includes(searchItem.toLowerCase())
      )

      if (filtered.length === 0) {
        setIsError({ status: true, message: "No Karmika Available" })
      } else {
        setIsError({ status: false, message: "" })
        setFilteredData(filtered)
      }
    }, 300) // 300ms delay

    return () => {
      clearTimeout(handler)
    }
  }, [searchItem, data])

  const handleDetailsShow = (index) => {
    setSelectedUser(filteredData[index])
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
  }

  const searchKarmika = (e) => {
    setSearchItem(e.target.value)
  }

  const handleSearchClick = async () => {
    if (selectedItem !== "Choose Profession") {
      setError("")

      if (selectedItem === "All Karmikas") {
        setFilteredData(data)
        setIsError({ status: false, message: "" })
      } else {
        const chosenItem = data.filter(karmika =>
          karmika.workType.toLowerCase().includes(selectedItem.toLowerCase())
        )
        if (chosenItem.length === 0) {
          setIsError({ status: true, message: "No Karmika Available for the selected profession" })
        } else {
          setIsError({ status: false, message: "" })
          setFilteredData(chosenItem)
        }
      }
    } else {
      setError("Please select a profession")
    }
  }

  const handleShowNumber = (index) => {
    setRevealedContacts(prevState => ({
      ...prevState,
      [index]: true
    }))
  }

  return (
    <>
      <div className='Total_Servies'>
        <div className='search_Option_Div'>
          <select onChange={(e) => setSelectedItem(e.target.value)}>
            <option>Choose Profession</option>
            <option>All Karmikas</option>
            <option>electrician</option>
            <option>cleaner</option>
            <option>constructor</option>
            <option>cook</option>
            <option>delivery</option>
            <option>doctor</option>
            <option>gardening</option>
            <option>painter</option>
            <option>plumber</option>
            <option>servant</option>
            <option>Carpenter</option>
            <option>Tech Service (mobile, laptop, T.V)</option>
          </select>
          <button onClick={handleSearchClick}>Search</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className='search_karmikas_Div'>
          <div className='Seach_div'>
            <input type='text' placeholder='Search karmika' onChange={searchKarmika} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='total_Karmikas'>
            {!isError.status ? (
              filteredData.map((karmika, index) => {
                const { name, contact, profileImage, workType, price } = karmika;
                return (
                  <div className='Karmika_Card' key={index}>
                    <img src={profileImage} alt='' />
                    <div className='Karmika_details'>
                      <h2>{name}</h2>
                      <p>{workType}</p>
                      <hr></hr>
                      <div className='Karmika_Price'>
                        <p>${price}</p>
                        <a href={`https://wa.me/${contact}`}  target="_blank"><i className="fa-brands fa-whatsapp"></i></a>
                      </div>
                      <div className='karmika_buttons'>
                        <a 
                          href={`tel:${contact}`} 
                          onClick={(e) => {
                            if (!revealedContacts[index]) {
                              e.preventDefault()
                              handleShowNumber(index)
                            }
                          }}
                          target='_blank'
                        >
                          <span><i className="fa-solid fa-phone"></i></span>
                          {revealedContacts[index] ? contact : "Show Number"}
                        </a>
                        <button className='karmika_details_button' onClick={() => handleDetailsShow(index)}>Details</button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : <h1 style={{ color: "red" }}>{isError.message}</h1>}
          </div>
        </div>
      </div>
      <div className='Details_Card'>
        {selectedUser && <Details selectedUser={selectedUser} onClose={handleCloseDetails} />}
      </div>
    </>
  )
}

export default Services
