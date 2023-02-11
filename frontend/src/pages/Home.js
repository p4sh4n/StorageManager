import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import axios from "axios";
import {toast} from 'react-toastify';


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/v1/employees");
        setData(response.data);
    };

    useEffect(() =>{
        loadData();
    }, []);

    const deleteEmployee = (id) =>{
        if (window.confirm("Are you sure you want to end employment for this employee?")) {
            axios.patch("http://localhost:5000/api/v1/employees", {
                employeeId: id,
                endOfEmployment: new Date()
            }).then(() =>{
                toast.success("Sucessfull end of employment!");
                setTimeout(() => {
                    loadData();
                }, 500);
            }).catch((err) =>{
                toast.error(err.response.data.error);
            })
            
        }
    }

    return (
        <div style={{marginTop: "150px"}}>
            <Link to={'/addEmployee'}>
                <button className='btn btn-add'>Add employee</button>
            </Link>
            
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name</th>
                        <th style={{textAlign: "center"}}>Phone Number</th>
                        <th style={{textAlign: "center"}}>Adress</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Start of employment</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.employees?.map((item, index) =>{
                        return (
                            <tr key={item._id}>
                                <th scope='row'>{index+1}</th>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.homeAdress}</td>
                                <td>{item.email}</td>
                                <td>{item.startOfEmployment.substring(0, 10)}</td>
                                <td>
                                    <Link to={`/editEmployee/${item._id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => deleteEmployee(item._id)}>End Employment</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
