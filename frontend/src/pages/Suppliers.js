import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./TableView.css";
import axios from "axios";
import {toast} from 'react-toastify';
import Navbar from '../components/Navbar';
import withAuth from '../components/withAuth';


const Suppliers = () => {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/suppliers", { headers: {"Authorization" : `Bearer ${token}`} });
        setData(response.data);
    };

    useEffect(() =>{
        loadData();
    }, []);

    const deleteSupplier = (id) =>{
        if (window.confirm("Are you sure you want to delete this supplier?")) {
            axios.patch("http://localhost:5000/api/v1/suppliers", {
                supplierId: id,
                endOfSupplyment: new Date()
            }, { headers: {"Authorization" : `Bearer ${token}`} }).then(() =>{
                toast.success("Sucessfull end of supplyment!");
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
            <Link to={'/addSupplier'}>
                <button className='btn btn-add'>Add supplier</button>
            </Link>
            
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>JIB</th>
                        <th style={{textAlign: "center"}}>PDV</th>
                        <th style={{textAlign: "center"}}>PhoneNumber</th>
                        <th style={{textAlign: "center"}}>ContactPersonName</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Start of supplyment</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.suppliers?.map((item, index) =>{
                        return (
                            <tr key={item._id}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.JIB}</td>
                                <td>{item.PDV}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.contactPersonName}</td>
                                <td>{item.email}</td>
                                <td>{item.startOfSupplyment.substring(0, 10)}</td>
                                <td>
                                    <Link to={`/editSupplier/${item._id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteSupplier(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default withAuth(Suppliers);
