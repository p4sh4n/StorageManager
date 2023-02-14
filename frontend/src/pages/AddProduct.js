import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link, useLocation} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';
import withAuth from "../components/withAuth";

const initialState = {
    name: "",
    imageUrl: "",
    profitMargin: "",
    productionProcessId: "",
}

const AddProduct = () =>{
        const [state, setState] = useState(initialState);

        const {name, imageUrl, profitMargin, productionProcessId} = state;

        const navigate = useNavigate();

        const {id} = useParams();

        const location = useLocation();

        const token = localStorage.getItem('token');
        
        useEffect(() => {
            if(id){
                axios
                    .get(`http://localhost:5000/api/v1/products/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                    .then((response) =>{
                        setState({...response.data.targetedProduct})
                    })
            }
        }, [id]);
        

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(!id){
                const ObjectID = require("bson-objectid");
                const prodId = ObjectID.createFromHexString(productionProcessId);
                axios.post("http://localhost:5000/api/v1/products", {
                    name,
                    imageUrl,
                    profitMargin,
                    productionProcessId: prodId
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        imageUrl: "",
                        profitMargin: "",
                        productionProcessId: ""
                    });
                    toast.success("Product added sucessfully");
                    setTimeout(() => {
                        navigate("/products");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
            } else {
                axios.patch("http://localhost:5000/api/v1/products", {
                    productId: id,
                    name,
                    imageUrl,
                    profitMargin,
                }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                    setState({
                        name: "",
                        imageUrl: "",
                        profitMargin: "",
                        productionProcessId: ""
                    });
                    toast.success("Product updated sucessfully");
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
                <label htmlFor="imageUrl">ImageUrl</label>
                <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="imageUrl..."
                value={imageUrl || ""}
                onChange={handleInputChange}/>
                <label htmlFor="profitMargin">ProfitMargin</label>
                <input
                type="text"
                id="profitMargin"
                name="profitMargin"
                placeholder="ProfitMargin..."
                value={profitMargin || ""}
                onChange={handleInputChange}/>
                {location.pathname === "/addProduct" &&(
                    <div>
                        <label htmlFor="productionProcessId">productionProcessId</label>
                        <input
                        type="text"
                        id="productionProcessId"
                        name="productionProcessId"
                        placeholder="productionProcessId..."
                        value={productionProcessId || ""}
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

export default withAuth(AddProduct);