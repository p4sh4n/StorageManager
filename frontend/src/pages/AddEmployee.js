import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link, useLocation} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';
import withAuth from "../components/withAuth";

const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    homeAdress: "",
    email: "",
    username: "",
    passwordHash: ""
}

const AddEmployee = () =>{
        const [state, setState] = useState(initialState);

        const {firstName, lastName, phoneNumber, homeAdress, email, username, passwordHash} = state;

        const navigate = useNavigate();

        const location = useLocation();

        const token = localStorage.getItem('token');

        const {id} = useParams();
        
        useEffect(() => {
            if(id){
                axios
                    .get(`http://localhost:5000/api/v1/employees/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    .then((response) =>{
                        setState({...response.data.targetedEmployee})
                    })
            }
        }, [id]);
        

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(!id){
                axios.post("http://localhost:5000/api/v1/auth/register", {
                    firstName,
                    lastName,
                    phoneNumber,
                    homeAdress,
                    email,
                    user: {
                        username,
                        passwordHash
                    }
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        homeAdress: "",
                        email: "",
                        username: "",
                        passwordHash: ""
                    });
                    toast.success("Employee added sucessfully");
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            }else{
                axios.patch("http://localhost:5000/api/v1/employees", {
                    employeeId: id,
                    firstName,
                    lastName,
                    phoneNumber,
                    homeAdress,
                    email
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        homeAdress: "",
                        email: "",
                        username: "",
                        passwordHash: ""
                    });
                    toast.success("Employee updated sucessfully");
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            }
        }

        const handleInputChange = (e) =>{
            const {name, value} = e.target;
            setState({...state, [name]: value});
        }

    return (
        <div style={{paddingTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "20px",
                maxWidth: "500px"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="firstName">First name</label>
                <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name..."
                value={firstName || ""}
                onChange={handleInputChange}/>
                <label htmlFor="lastName">Last name</label>
                <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name..."
                value={lastName || ""}
                onChange={handleInputChange}/>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number..."
                value={phoneNumber || ""}
                onChange={handleInputChange}/>
                <label htmlFor="homeAdress">Adress</label>
                <input
                type="text"
                id="homeAdress"
                name="homeAdress"
                placeholder="Home adress..."
                value={homeAdress || ""}
                onChange={handleInputChange}/>
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="Email..."
                value={email || ""}
                onChange={handleInputChange}/>
                {location.pathname === "/addEmployee" && (
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username..."
                        value={username || ""}
                        onChange={handleInputChange}/>
                        <label htmlFor="passwordHash">Password</label>
                        <input
                        type="text"
                        id="passwordHash"
                        name="passwordHash"
                        placeholder="Password..."
                        value={passwordHash || ""}
                        onChange={handleInputChange}/>
                    </div>
                )}
                <input type="submit" value="Save"/>
                <Link to="/employees">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}

export default withAuth(AddEmployee);