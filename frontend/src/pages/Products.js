import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./CardView.css";
import axios from "axios";
import {toast} from 'react-toastify';
import Navbar from '../components/Navbar';
import withAuth from '../components/withAuth';


const Products = () => {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/products", { headers: {"Authorization" : `Bearer ${token}`} });
        setData(response.data);
    };

    useEffect(() =>{
        loadData();
    }, []);

    const deleteProductionProcess = (id) =>{
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.patch("http://localhost:5000/api/v1/productionProcesses", {
                productionProcessId: id,
                endOfProduction: new Date()
            }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                toast.success("Sucessfully deleted production process!");
                setTimeout(() => {
                    loadData();
                }, 500);
            }).catch((err) =>{
                toast.error(err.response.data.error);
            })
            
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <Link to={'/addProduct'}>
                <button className='btn btn-add'>Add Product</button>
            </Link>
            <Link to={'/addProductionProcess'}>
                <button className='btn btn-add'>Add Production Process</button>
            </Link>
            <div className='cardWrapper'>
                {data.products?.map((item) =>{
                    return(
                        <div className='card' key={item._id} >
                            <Link to={`/editProduct/${item._id}`}>
                                <span className='cardContent'>
                                    <img src={`${item.imageUrl}`} alt='Product'/>
                                    <p><span>Name: </span>{item.name}</p>
                                    <p><span>Profit margin: </span>{item.profitMargin}</p>
                                    <p><span>Price: </span>{item.price}</p>
                                    <p><span>Process: </span>{item.productionProcessId}</p>
                                </span>
                            </Link>
                            <button className='btn btn-delete' onClick={() => deleteProductionProcess(item._id)}>Delete production process</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default withAuth(Products);
