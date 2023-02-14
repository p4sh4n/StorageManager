import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link, useLocation} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';
import withAuth from "../components/withAuth";

const initialState = {
    name: "",
    amount: "",
    materialId: "",
}

const AddProductionProcess = () =>{
        const [state, setState] = useState(initialState);

        const {name, amount, materialId} = state;

        const navigate = useNavigate();

        const {id} = useParams();

        const location = useLocation();
        
        const token = localStorage.getItem('token');

        useEffect(() => {
            if(id){
                axios
                    .get(`http://localhost:5000/api/v1/productionProcesses/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    .then((response) =>{
                        setState({...response.data.targetedProductionProcess})
                    })
            }
        }, [id]);
        

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(!id){
                const ObjectID = require("bson-objectid");
                const matId = ObjectID.createFromHexString(materialId);
                axios.post("http://localhost:5000/api/v1/productionProcesses", {
                    name,
                    "startOfProduction": new Date(),
                    productionProcessItem: {
                        amount,
                        materialId: matId
                    }
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        amount: "",
                        materialId: ""
                    });
                    toast.success("Process added sucessfully");
                    setTimeout(() => {
                        navigate("/products");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            } else {
                axios.patch("http://localhost:5000/api/v1/productionProcesses", {
                    productionProcessId: id,
                    name,
                    productionProcessItem: {
                        amount
                    }
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        amount: "",
                        materialId: ""
                    });
                    toast.success("Process updated sucessfully");
                    setTimeout(() => {
                        navigate("/products");
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
                {location.pathname === "/addProductionProcess" &&(
                    <div>
                        <label htmlFor="materialId">MaterialId</label>
                        <input
                        type="text"
                        id="materialId"
                        name="materialId"
                        placeholder="MaterialId..."
                        value={materialId || ""}
                        onChange={handleInputChange}/>
                    </div>
                )}
                <input type="submit" value="Save"/>
                <Link to="/products">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}

export default withAuth(AddProductionProcess);