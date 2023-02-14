import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';
import withAuth from "../components/withAuth";

const initialState = {
    name: "",
    amount: "",
    minimumAmount: "",
    price: "",
    unitOfMeasurement: "",
    supplierId: "",
}

const AddMaterial = () =>{
        const [state, setState] = useState(initialState);

        const {name, amount, minimumAmount, price, unitOfMeasurement, supplierId} = state;

        const navigate = useNavigate();

        const {id} = useParams();

        const token = localStorage.getItem('token');
        
        useEffect(() => {
            if(id){
                axios
                    .get(`http://localhost:5000/api/v1/materials/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    .then((response) =>{
                        setState({...response.data.targetedMaterial})
                    })
            }
        }, [id]);
        

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(!id){
                const ObjectID = require("bson-objectid");
                const supId = ObjectID.createFromHexString(supplierId);
                axios.post("http://localhost:5000/api/v1/materials", {
                    name,
                    amount,
                    minimumAmount,
                    price,
                    unitOfMeasurement,
                    supplierId: supId
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        amount: "",
                        minimumAmount: "",
                        price: "",
                        unitOfMeasurement: "",
                        supplierId: ""
                    });
                    toast.success("Material added sucessfully");
                    setTimeout(() => {
                        navigate("/materials");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            } else{
                axios.patch("http://localhost:5000/api/v1/materials", {
                    materialId: id,
                    name,
                    amount,
                    minimumAmount,
                    price,
                    unitOfMeasurement,
                    supplierId
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        amount: "",
                        minimumAmount: "",
                        price: "",
                        unitOfMeasurement: "",
                        supplierId: ""
                    });
                    toast.success("Material updated sucessfully");
                    setTimeout(() => {
                        navigate("/materials");
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
                <label htmlFor="amount">Amount</label>
                <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Amount..."
                value={amount || ""}
                onChange={handleInputChange}/>
                <label htmlFor="minimumAmount">MinimumAmount</label>
                <input
                type="number"
                id="minimumAmount"
                name="minimumAmount"
                placeholder="MinimumAmount..."
                value={minimumAmount || ""}
                onChange={handleInputChange}/>
                <label htmlFor="price">Price</label>
                <input
                type="number"
                id="price"
                name="price"
                placeholder="price..."
                value={price || ""}
                onChange={handleInputChange}/>
                <label htmlFor="unitOfMeasurement">UnitOfMeasurement</label>
                <input
                type="text"
                id="unitOfMeasurement"
                name="unitOfMeasurement"
                placeholder="UnitOfMeasurement..."
                value={unitOfMeasurement || ""}
                onChange={handleInputChange}/>
                <label htmlFor="supplierId">SupplierId</label>
                <input
                type="text"
                id="supplierId"
                name="supplierId"
                placeholder="SupplierId..."
                value={supplierId || ""}
                onChange={handleInputChange}/>
                <input type="submit" value="Save"/>
                <Link to="/materials">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}

export default withAuth(AddMaterial);