import React, { useState } from 'react'
import axios from 'axios'
import "../App.css"
import { API_URL } from "../config";

function SignUpform({ userType, onClose, closeForm, closeKarmika }) {


    const [showPassword, setShowPassword] = useState(true)
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [userDetails, setUserDetails] = useState({
        Username: "",
        email: "",
        contact: "",
        image: null,
        password: "",
        confirmPassword: ""
    })
    const [karmikaDetails, setKarmikaDetails] = useState({
        name: "",
        price:"",
        email: "",
        contact: "",
        profileImage: null,
        workType: "",
        address: "",
        aadharImage: null,
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        Username: "",
        email: "",
        contact: "",
        image: "",
        password: "",
        confirmPassword: ""
    });

    const [karmikaErrors, setKarmikaErrors] = useState({
        name: "",
        price:"",
        email: "",
        contact: "",
        profileImage: "",
        workType: "",
        address: "",
        aadharImage: "",
        password: "",
        confirmPassword: ""
    });

    const showPasswords = () => {
        setShowPassword(!showPassword)
    }
    const showConfirmPasswords = () => {
        setHiddenPassword(!hiddenPassword)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setUserDetails({
            ...userDetails,
            image: e.target.files[0]
        })
    }

    const handleKarmikaChange = (e) => {
        const { name, value } = e.target;
        setKarmikaDetails({
            ...karmikaDetails,
            [name]: value
        });
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setKarmikaDetails(prevState => ({
            ...prevState,
            profileImage: file
        }));
    };

    const handleAadharImageChange = (e) => {
        const file = e.target.files[0];
        setKarmikaDetails(prevState => ({
            ...prevState,
            aadharImage: file
        }));
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (details, setErrors) => {
        const errors = {};

        if (!/^[a-zA-Z\s]+$/.test(details.Username)) {
            errors.Username = "Enter valid name";
        }

        if (!validateEmail(details.email)) {
            errors.email = "Enter valid  email ";
        }

        if (!/^\d{10}$/.test(details.contact)) {
            errors.contact = "Contact must be 10-digit number.";
        }

        if (details.password !== details.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (!details.image) {
            errors.image = "Please upload an image.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(userDetails, setErrors)) {
            const formData = new FormData();
            formData.append("Username", userDetails.Username);
            formData.append("email", userDetails.email);
            formData.append("contact", userDetails.contact);
            formData.append("image", userDetails.image);
            formData.append("password", userDetails.password);

            try {
                axios.post(`${API_URL}/api/signup`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setUserDetails({
                    Username: "",
                    email: "",
                    contact: "",
                    image: null,
                    password: "",
                    confirmPassword: ""
                });
                onClose()
                window.location.href = "/Login";
            } catch (error) {
                console.log(error)
            }
        }
    }

    const validateKarmikaForm = (details, setErrors) => {
        const errors = {};

        if (!/^[a-zA-Z\s]+$/.test(details.name)) {
            errors.name = "please enter a valid name";
        }

        if (!validateEmail(details.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!/^\d{10}$/.test(details.contact)) {
            errors.contact = "Contact must be 10-digit number.";
        }

        if (details.password !== details.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (!details.profileImage) {
            errors.profileImage = "upload a profile image.";
        }

        if (!details.aadharImage) {
            errors.aadharImage = "upload an Aadhar image.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleKarmikaSubmit = async (e) => {
        e.preventDefault();
        if (validateKarmikaForm(karmikaDetails, setKarmikaErrors)) {
            const formData = new FormData();
            formData.append('name', karmikaDetails.name);
            formData.append('email', karmikaDetails.email);
            formData.append('contact', karmikaDetails.contact);
            formData.append('workType', karmikaDetails.workType);
            formData.append("price",karmikaDetails.price);
            formData.append('address', karmikaDetails.address);
            formData.append('password', karmikaDetails.password);
            formData.append('profileImage', karmikaDetails.profileImage);
            formData.append('aadharImage', karmikaDetails.aadharImage);
            try {
                axios.post(`${API_URL}/api/karmika/signup`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setKarmikaDetails({
                    name: "",
                    email: "",
                    price:"",
                    contact: "",
                    profileImage: null,
                    workType: "",
                    address: "",
                    aadharImage: null,
                    password: "",
                    confirmPassword: ""
                });
               window.location.href = "/Login"
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            {userType === "user" && !closeForm &&
                <div className='Total_UserForm'>
                    <div className='Form_Title'>
                        <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                        <h1>Hello User,</h1>
                    </div>
                    <div className='User_Form'>
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='Username' value={userDetails.Username} placeholder='Enter Name' onChange={handleChange} />
                            {errors.Username && <p className="error">{errors.Username}</p>}
                            <input type='email' name='email' value={userDetails.email} placeholder='Enter email' onChange={handleChange} />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <input type='text' name='contact' value={userDetails.contact} placeholder='Enter Contact Number' onChange={handleChange} />
                            {errors.contact && <p className="error">{errors.contact}</p>}
                            <input className='spanInputFile' name='image' id='ImageFile' type='file' placeholder='choose your image' onChange={handleFileChange} />
                            {errors.image && <p className="error">{errors.image}</p>}
                            {userDetails.image && <p>Selected Image: {userDetails.image.name}</p>}
                            <label htmlFor='ImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Image</label>
                            <span className='spanInput'>
                                <input name="password" type={showPassword ? "password" : "text"} value={userDetails.password} placeholder='Enter Password' onChange={handleChange} />
                                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showPasswords}></i>
                            </span>
                            {errors.password && <p className="error">{errors.password}</p>}
                            <span className='spanInput'>
                                <input name="confirmPassword" type={hiddenPassword ? "password" : "text"} value={userDetails.confirmPassword} placeholder='Enter Password again' onChange={handleChange} />
                                <i className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showConfirmPasswords}></i>
                            </span>
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            <input type='submit' style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }} />
                        </form>
                    </div>
                </div>
            }
            {userType === "karmika" && !closeKarmika &&
                <div className='Total_KarmikaForm'>
                    <div className='Form_Title'>
                        <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                        <h1>Hello Karmika,</h1>
                    </div>
                    <div className='Karmika_Form'>
                        <form onSubmit={handleKarmikaSubmit}>
                            <input type='text' name='name' placeholder='Enter Name' onChange={handleKarmikaChange} value={karmikaDetails.name} />
                            {karmikaErrors.name && <p style={{color:"white"}} className="error">{karmikaErrors.name}</p>}
                            <input type='email' name='email' placeholder='enter your email' onChange={handleKarmikaChange} value={karmikaDetails.email} />
                            {karmikaErrors.email && <p style={{color:"white"}} className="error">{karmikaErrors.email}</p>}
                            <input type='text' name='contact' placeholder='Enter Contact Number' onChange={handleKarmikaChange} value={karmikaDetails.contact} />
                            {karmikaErrors.contact && <p style={{color:"white"}} className="error">{karmikaErrors.contact}</p>}
                            <input className='spanInputFile' id='ProfileImageFile' type='file' onChange={handleProfileImageChange} />
                            {karmikaErrors.profileImage && <p style={{color:"white"}} className="error">{karmikaErrors.profileImage}</p>}
                            {karmikaDetails.profileImage && <p style={{color:"white", fontSize:10,fontWeight:600}}>Selected Profile Image: {karmikaDetails.profileImage.name}</p>}
                            <label htmlFor='ProfileImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Profile Image</label>
                            <select className='select' name='workType' onChange={handleKarmikaChange} value={karmikaDetails.workType}>
                                <option>Select your type of Work</option>
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
                                <option>Tech Service (mobile, laptop, TV)</option>
                            </select>
                            <input type='text' placeholder='Enter your price per Day' name="price" value={karmikaDetails.price} onChange={handleKarmikaChange}/>
                            {karmikaErrors.workType && <p style={{color:"white"}} className="error">{karmikaErrors.workType}</p>}
                            <input type='text' name='address' placeholder='Enter your Address' onChange={handleKarmikaChange} value={karmikaDetails.address} />
                            {karmikaErrors.address && <p style={{color:"white"}} className="error">{karmikaErrors.address}</p>}
                            <input className='spanInputFile' id='AadharImageFile' type='file' onChange={handleAadharImageChange} />
                            {karmikaErrors.aadharImage && <p style={{color:"white"}} className="error">{karmikaErrors.aadharImage}</p>}
                            {karmikaDetails.aadharImage && <p style={{color:"white", fontSize:10,fontWeight:600}} >Selected Aadhar Image: {karmikaDetails.aadharImage.name}</p>}
                            <label htmlFor='AadharImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Aadhar Image</label>
                            <span className='spanInput'>
                                <input name="password" type={showPassword ? "password" : "text"} placeholder='Enter Password' onChange={handleKarmikaChange} value={karmikaDetails.password} />
                                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showPasswords}></i>
                            </span>
                            {karmikaErrors.password && <p style={{color:"white"}} className="error">{karmikaErrors.password}</p>}
                            <span className='spanInput'>
                                <input name="confirmPassword" type={hiddenPassword ? "password" : "text"} placeholder='Enter Password again' onChange={handleKarmikaChange} value={karmikaDetails.confirmPassword} />
                                <i className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showConfirmPasswords}></i>
                            </span>
                            {karmikaErrors.confirmPassword && <p style={{color:"white"}} className="error">{karmikaErrors.confirmPassword}</p>}
                            <input type='submit' style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }} />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
export default SignUpform




























/* import React, { useState } from 'react'
import axios from 'axios'
import "../App.css"

function SignUpform({ userType, onClose, closeForm, closeKarmika }) {
    const [showPassword, setShowPassword] = useState(true)
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [userDetails, setUserDetails] = useState({
        Username: "",
        email: "",
        contact: "",
        image: null,  // Changed from 'file' to 'image'
        password: "",
        confirmPassword: ""  // Added confirmPassword to the state
    })
    const [karmikaDetails, setKarmikaDetails] = useState({
        name: "",
        email:"",
        contact: "",
        profileImage: null, // State for profile image
        workType: "",
        address: "",
        aadharImage: null, // State for Aadhar image
        password: "",
        confirmPassword:''
    });
    
    const showPasswords = () => {
        setShowPassword(!showPassword)
    }
    const showConfirmPasswords = () => {
        setHiddenPassword(!hiddenPassword)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setUserDetails({
            ...userDetails,
            image: e.target.files[0]
        })
    }

    const handleKarmikaChange = (e) => {
        const { name, value } = e.target;
        setKarmikaDetails({
            ...karmikaDetails,
            [name]: value
        });
    };

    // const handleKarmikaFileChange = (e) => {
    //     setKarmikaDetails({
    //         ...karmikaDetails,
    //         [e.target.name]: e.target.files[0]
    //     });
    // };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setKarmikaDetails(prevState => ({
            ...prevState,
            profileImage: file
        }));
    };
    
    const handleAadharImageChange = (e) => {
        const file = e.target.files[0];
        setKarmikaDetails(prevState => ({
            ...prevState,
            aadharImage: file
        }));
    };
    
    const handleKarmikaSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', karmikaDetails.name);
            formData.append('email', karmikaDetails.email);
            formData.append('contact', karmikaDetails.contact);
            formData.append('workType', karmikaDetails.workType);
            formData.append('address', karmikaDetails.address);
            formData.append('password', karmikaDetails.password);
            formData.append('profileImage', karmikaDetails.profileImage);
            formData.append('aadharImage', karmikaDetails.aadharImage);
            await axios.post("http://localhost:5000/SignupKarmika", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setKarmikaDetails({
                name: "",
                email:"",
                contact: "",
                profileImage: null, // State for profile image
                workType: "",
                address: "",
                aadharImage: null, // State for Aadhar image
                password: "",
                confirmPassword:''
            });
        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()    
        if (userDetails.password !== userDetails.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append("Username", userDetails.Username);
        formData.append("email", userDetails.email);
        formData.append("contact", userDetails.contact);
        formData.append("image", userDetails.image);
        formData.append("password", userDetails.password);

        try {
            await axios.post("http://localhost:5000/SignupUser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUserDetails({
                Username: "",
                email: "",
                contact: "",
                image: null,
                password: "",
                confirmPassword: ""  // Reset confirmPassword as well
            });
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                userType === "user" && !closeForm &&
                <div className='Total_UserForm'>
                    <div className='Form_Title'>
                        <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                        <h1>Hello User,</h1>
                    </div>
                    <div className='User_Form'>
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='Username' value={userDetails.Username} placeholder='Enter Name' onChange={handleChange} />
                            <input type='email' name='email' value={userDetails.email} placeholder='Enter email' onChange={handleChange} />
                            <input type='text' name='contact' value={userDetails.contact} placeholder='Enter Contact Number' onChange={handleChange} />
                            <input className='spanInputFile' name='image' id='ImageFile' type='file' placeholder='choose your image' onChange={handleFileChange} />
                            <label htmlFor='ImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Image</label>
                            <span className='spanInput'>
                                <input name="password" type={showPassword ? "password" : "text"} value={userDetails.password} placeholder='Enter Password' onChange={handleChange} />
                                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showPasswords}></i>
                            </span>
                            <span className='spanInput'>
                                <input name="confirmPassword" type={hiddenPassword ? "password" : "text"} value={userDetails.confirmPassword} placeholder='Enter Password again' onChange={handleChange} />
                                <i className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showConfirmPasswords}></i>
                            </span>
                            <input type='submit' style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }} />
                        </form>
                    </div>
                </div>
            }
            {userType === "karmika" && !closeKarmika &&
                <div className='Total_KarmikaForm'>
                    <div className='Form_Title'>
                        <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                        <h1>Hello Karmika,</h1>
                    </div>
                    <div className='Karmika_Form'>
                        <form onSubmit={handleKarmikaSubmit}>
                            <input type='text' name='name' placeholder='Enter Name' onChange={handleKarmikaChange} value={karmikaDetails.name} />
                            <input type='email' name='email' placeholder='enter your email' onChange={handleKarmikaChange} value={karmikaDetails.email}/>
                            <input type='text' name='contact' placeholder='Enter Contact Number' onChange={handleKarmikaChange} value={karmikaDetails.contact} />
                            <input className='spanInputFile' id='ProfileImageFile' type='file' onChange={handleProfileImageChange} />
                            <label htmlFor='ProfileImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Profile Image</label>
                            <select className='select' name='workType' onChange={handleKarmikaChange} value={karmikaDetails.workType}>
                                <option>Select your type of Work</option>
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
                                <option>Tech Service (mobile, laptop, TV)</option>
                            </select>
                            <input type='text' name='address' placeholder='Enter your Address' onChange={handleKarmikaChange} value={karmikaDetails.address} />
                            <input className='spanInputFile' id='AadharImageFile' type='file' onChange={handleAadharImageChange} />
                            <label htmlFor='AadharImageFile'><i style={{ marginRight: 20 }} className="fa-solid fa-file-arrow-up"></i>Upload Aadhar Image</label>
                            <span className='spanInput'><input name="password" type={showPassword ? "password" : "text"} placeholder='Enter Password' onChange={handleKarmikaChange} value={karmikaDetails.password} /><i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showPasswords}></i></span>
                            <span className='spanInput'><input name="confirmPassword" type={hiddenPassword ? "password" : "text"} placeholder='Enter Password again' onChange={handleKarmikaChange} value={karmikaDetails.confirmPassword}  /><i className={hiddenPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={showConfirmPasswords}></i></span>
                            <input type='submit' style={{ backgroundColor: "#B71C1C", color: "#ffff", cursor: "pointer", fontSize: "25px" }} />
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
export default SignUpform
 */




































/* import React, { useState } from 'react'
import axios from  "axios"
import "../App.css"

function SignUpform({userType,onClose,closeForm,closeKarmika}) {
    const [showPassword, setShowPassword]=useState(true)
    const [hidenPassword, setHiddenPassword] = useState(true)
    const [userdetails, setUserDetails] = useState({
        Username:"",
        email:"",
        contact:"",
        file:null,
        password:"",
    })
    const [users,setUsers]=useState([])



    const showPasswords=()=>{
        setShowPassword(!showPassword)
    }
    const showConfirmPasswords=()=>{
        setHiddenPassword(!hidenPassword)
    }
    

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUserDetails({
            ...userdetails,
            [name]:value
        });
    };

    const HandleFileChange=(e)=>{
        setUserDetails({
            ...userdetails,
            image:e.target.files[0]
        })
    }

    const HandleSubmit=async(e)=>{
        e.preventDefault()
        const newUsers=[...users,userdetails]
        console.log(newUsers)
        setUsers(newUsers)
        try {
                await axios.post("http://localhost:5000/SignupUser",users);
                setUserDetails({
                    Username:"", 
                    email:"",
                    contact:"",
                    image:"",
                    password:"",
                })
            
        } catch (error) {
            console.log(error)
        }
    }
    console.log(users)

  return (
    <div>
        {
        userType=="user" && !closeForm &&
        <div className='Total_UserForm'>
            <div className='Form_Title'>
                <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                <h1>Hello User ,</h1>  
            </div>
            <div className='User_Form'>
                <form onSubmit={HandleSubmit}>
                    <input type='text' name='Username'  placeholder='Enter Name' onChange={handleChange}/>
                    <input type='email' name='email'  placeholder='Enter email' onChange={handleChange} />
                    <input type='text' name='contact'  placeholder='Enter Contact Number' onChange={handleChange}/>
                    <input className='spanInputFile'  name='image' id='ImageFile' type='file' placeholder='choose your image' onChange={HandleFileChange}/>
                    <label htmlFor='ImageFile'><i style={{marginRight:20}} className="fa-solid fa-file-arrow-up"></i>Upload Image</label>
                    <span className='spanInput'><input  name="password" type={showPassword ? "password":"text"} placeholder='Enter Password' onChange={handleChange} /><i className={showPassword ? "fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={showPasswords}></i></span>
                    <span className='spanInput'><input  name="confirmPassword" type={hidenPassword ? "password":"text"} placeholder='Enter Password again'onChange={handleChange} /><i className={hidenPassword ? "fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={showConfirmPasswords}></i></span>
                    <input type='submit'  style={{backgroundColor:"#B71C1C", color:"#ffff",cursor:"pointer", fontSize:"25px"}}/>
                </form>
            </div>
        </div>
        }
        {userType=="karmika" && !closeKarmika &&
        <div className='Total_KarmikaForm'>
            <div className='Form_Title'>
                <i className="fa-solid fa-square-xmark" onClick={onClose}></i>
                <h1>Hello Karmika ,</h1>  
            </div>
            <div className='Karmika_Form'>
                <form>
                    <input type='text' placeholder='Enter Name'/>
                    <input type='number' placeholder='Enter Contact Number'/>
                    <input className='spanInputFile' id='ImageFile' type='file' placeholder='choose your image'/>
                    <label htmlFor='ImageFile'><i style={{marginRight:20}} class="fa-solid fa-file-arrow-up"></i>Upload Image</label>
                    <select className='select'>
                        <option>Select your type of Work</option>
                        <option>electretion</option>
                        <option>cleaner</option>
                        <option>constructor</option>
                        <option>cook</option>
                        <option>delivery</option>
                        <option>doctor</option>
                        <option>gardening</option>
                        <option>painter</option>
                        <option>plumber</option>
                        <option>servent</option>
                        <option>Carpentrer</option>
                        <option>Tech Service(mobile,laptop,T.V)</option>
                    </select>
                    <input type='text' placeholder='Enter your Address'/>
                    <input className='spanInputFile'  id='PANfile'  type='file' placeholder='Upload AADHAR/PAN'/>
                    <label htmlFor='PANfile'><i style={{marginRight:20}} class="fa-solid fa-file-arrow-up"></i>upload Aadhar/PAN</label>
                    <span className='spanInput'><input type={showPassword ? "password":"text"} placeholder='Enter Password' /><i className={showPassword ? "fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={showPasswords}></i></span>
                    <span className='spanInput'><input type={hidenPassword ? "password":"text"} placeholder='Enter Password again' /><i className={hidenPassword ? "fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={showConfirmPasswords}></i></span>
                    <input type='submit'  style={{backgroundColor:"#B71C1C", color:"#ffff",cursor:"pointer", fontSize:"25px"}}/>
                </form>
            </div>
        </div>
        }
    </div>
  )
}
export default SignUpform */