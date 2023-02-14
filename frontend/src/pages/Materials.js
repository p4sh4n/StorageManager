import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./TableView.css";
import axios from "axios";
import {toast} from 'react-toastify';
import Navbar from '../components/Navbar';
import withAuth from '../components/withAuth';


const Materials = () => {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/materials", { headers: {"Authorization" : `Bearer ${token}`} });
        setData(response.data);
    };

    useEffect(() =>{
        loadData();
    }, []);

    const deleteMaterial = (id) =>{
        if (window.confirm("Are you sure you want to delete this material?")) {
            axios.patch("http://localhost:5000/api/v1/materials", {
                materialId: id,
                isUsed: false
            }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                toast.success("Sucessfully deleted material!");
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
            <Link to={'/addMaterial'}>
                <button className='btn btn-add'>Add material</button>
            </Link>
            
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Amount</th>
                        <th style={{textAlign: "center"}}>MinimumAmount</th>
                        <th style={{textAlign: "center"}}>Price</th>
                        <th style={{textAlign: "center"}}>UnitOfMeasurement</th>
                        <th style={{textAlign: "center"}}>SupplierId</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.materials?.map((item, index) =>{
                        return (
                            <tr key={item._id}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.minimumAmount}</td>
                                <td>{item.price}</td>
                                <td>{item.unitOfMeasurement}</td>
                                <td>{item.supplierId}</td>
                                <td>
                                    <Link to={`/editMaterial/${item._id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteMaterial(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default withAuth(Materials);
