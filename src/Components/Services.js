import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Details from './Details'
import { API_URL } from '../config'
import { fetchUser } from '../authSlice';  
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Services() {
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchItem, setSearchItem] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [selectedItem, setSelectedItem] = useState("Choose Profession")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState({ status: false, message: "" })
  const [revealedContacts, setRevealedContacts] = useState({})
  const [loading, setLoading] = useState(false) 
  const user = useSelector(state => state.auth.user);

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
    setLoading(true) // start loading
    const handler = setTimeout(() => {
      let filtered = data

      // Search filter
      if (searchItem.trim()) {
        filtered = filtered.filter(karmika => {
          const name = karmika.name ? karmika.name.toLowerCase() : ""
          const workType = karmika.workType ? karmika.workType.toLowerCase() : ""
          return (
            name.includes(searchItem.toLowerCase()) ||
            workType.includes(searchItem.toLowerCase())
          )
        })
      }

      // Dropdown filter
      if (selectedItem !== "Choose Profession" && selectedItem !== "All Karmikas") {
        filtered = filtered.filter(karmika => {
          const workType = karmika.workType ? karmika.workType.toLowerCase() : ""
          return workType.includes(selectedItem.toLowerCase())
        })
      }

      if (filtered.length === 0) {
        setIsError({ status: true, message: "No Karmika Available" })
      } else {
        setIsError({ status: false, message: "" })
      }

      setFilteredData(filtered)
      setLoading(false) // ✅ stop loading when done
    }, 500)

    return () => clearTimeout(handler)
  }, [searchItem, selectedItem, data])

  const handleDetailsShow = (index) => {
    setSelectedUser(filteredData[index])
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
  }

  const searchKarmika = (e) => {
    setSearchItem(e.target.value)
  }

  const handleSearchClick = () => {
    if (selectedItem === "Choose Profession") {
      setError("Please select a profession")
    } else {
      setError("")
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
      {user ? (
        <div className='Total_Servies'>
          <div className='search_Option_Div'>
            <select onChange={(e) => setSelectedItem(e.target.value)}>
              <option>Choose Profession</option>
              <option>All Karmikas</option>
              <option>Electretion</option>
              <option>Cleaner</option>
              <option>Constructor</option>
              <option>Cook</option>
              <option>Delivery Person</option>
              <option>Doctor</option>
              <option>Gardener</option>
              <option>Painter</option>
              <option>Plumber</option>
              <option>Servants</option>
              <option>Carpenter</option>
              <option>Tech Repair Specialist(mobile, laptop, T.V)</option>
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className='search_karmikas_Div'>
            <div className='Seach_div'>
              <input type='text' placeholder='Search karmika' onChange={searchKarmika} />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            {loading && <p style={{ color: "blue" }}>🔄 Searching...</p>}

            <div className='total_Karmikas'>
              {!loading && !isError.status ? (
                filteredData.map((karmika, index) => {
                  const { name, contact, profileImage, workType, price } = karmika;
                  return (
                    <div className='Karmika_Card' key={index}>
                      <img src={profileImage} alt='' />
                      <div className='Karmika_details'>
                        <h2>{name || "Unknown"}</h2>
                        <p>{workType || "Not Provided"}</p>
                        <hr />
                        <div className='Karmika_Price'>
                          <p>&#x20B9; {price || 0}</p>
                          <a href={`https://wa.me/${contact}`} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                        </div>
                        <div className='karmika_buttons'>
                          <a
                            href={`tel:${contact}`}
                            onClick={(e) => {
                              if (!revealedContacts[index]) {
                                e.preventDefault();
                                handleShowNumber(index);
                              }
                            }}
                            target='_blank'
                            rel="noreferrer"
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
              ) : !loading && <h1 style={{ color: "red" }}>{isError.message}</h1>}
            </div>
          </div>
        </div>
      ) : (
        <>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"90vh", flexDirection:"column", gap:"20px"}}>
            <h1 style={{fontSize:"50px", color:"red"}}>Please Login for services</h1>
            <button style={{backgroundColor:"red", color:"white",border:"none", textDecoration:"none", padding:"15px 35px", borderRadius:"5px"}}><Link className='link' to="/login" style={{textDecoration:"none", color:"white", fontSize:"25px"}}>login</Link></button>
        </div>
        </>
      )}

      <div className='Details_Card'>
        {selectedUser && <Details selectedUser={selectedUser} onClose={handleCloseDetails} />}
      </div>
    </>
  );
}

export default Services
