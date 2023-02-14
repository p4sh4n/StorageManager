import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';
import withAuth from "../components/withAuth";

const initialState = {
    name: "",
    JIB: "",
    PDV: "",
    phoneNumber: "",
    contactPersonName: "",
    email: "",
    startOfSupplyment: ""
}

const AddSupplier = () =>{
        const [state, setState] = useState(initialState);

        const {name, JIB, PDV, phoneNumber, contactPersonName, email} = state;

        const navigate = useNavigate();

        const {id} = useParams();
        
        const token = localStorage.getItem('token');

        useEffect(() => {
            if(id){
                axios
                    .get(`http://localhost:5000/api/v1/suppliers/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    .then((response) =>{
                        setState({...response.data.targetedSupplier})
                    })
            }
        }, [id]);
        

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(!id){
                axios.post("http://localhost:5000/api/v1/suppliers", {
                    name,
                    JIB,
                    PDV,
                    phoneNumber,
                    contactPersonName,
                    email,
                    startOfSupplyment: new Date()
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        JIB: "",
                        PDV: "",
                        phoneNumber: "",
                        contactPersonName: "",
                        email: ""
                    });
                    toast.success("Supplier added sucessfully");
                    setTimeout(() => {
                        navigate("/suppliers");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            } else {
                axios.patch("http://localhost:5000/api/v1/suppliers", {
                    supplierId: id,
                    name,
                    JIB,
                    PDV,
                    phoneNumber,
                    contactPersonName,
                    email
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        JIB: "",
                        PDV: "",
                        phoneNumber: "",
                        contactPersonName: "",
                        email: ""
                    });
                    toast.success("Supplier updated sucessfully");
                    setTimeout(() => {
                        navigate("/suppliers");
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
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Name..."
                value={name || ""}
                onChange={handleInputChange}/>
                <label htmlFor="JIB">JIB</label>
                <input
                type="number"
                id="JIB"
                name="JIB"
                placeholder="JIB..."
                value={JIB || ""}
                onChange={handleInputChange}/>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number..."
                value={phoneNumber || ""}
                onChange={handleInputChange}/>
                <label htmlFor="PDV">PDV</label>
                <input
                type="number"
                id="PDV"
                name="PDV"
                placeholder="PDV..."
                value={PDV || ""}
                onChange={handleInputChange}/>
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="Email..."
                value={email || ""}
                onChange={handleInputChange}/>
                <label htmlFor="contactPersonName">ContactPersonName</label>
                <input
                type="text"
                id="contactPersonName"
                name="contactPersonName"
                placeholder="contactPersonName..."
                value={contactPersonName || ""}
                onChange={handleInputChange}/>
                <input type="submit" value="Save"/>
                <Link to="/suppliers">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}

export default withAuth(AddSupplier);