import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Form.css';
import axios from "axios";
import {toast} from 'react-toastify';

const initialState = {
    username: "",
    password: ""
}

const Login = () =>{
        const [state, setState] = useState(initialState);

        const {username, password} = state;

        const navigate = useNavigate();

        const handleSubmit = (e) =>{
            e.preventDefault();
                axios.post("http://localhost:5000/api/v1/auth/login", {
                    username,
                    password
                })
                .then((response) =>{
                    localStorage.clear();
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    setState({
                        username: "",
                        password: ""
                    });
                    setTimeout(() => {
                        navigate("/products");
                    }, 500);
                }).catch((err) =>{
                    toast.error(err.response.data.error.toString().replaceAll(',', '\n'));
                });
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
            onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                placeholder="Username..."
                value={username || ""}
                onChange={handleInputChange}/>
                <label htmlFor="password">Password</label>
                <input
                type="text"
                id="password"
                name="password"
                placeholder="Password..."
                value={password || ""}
                onChange={handleInputChange}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login;