import React from 'react'
import Login from './user/Login';
import SignUp from './user/SignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    let [userLogin, setUserLogin] = useState(null)
    let { bgColor } = props;
    let onSuccess = (response) => {
        let token = response.credential;
        localStorage.setItem("auth_token", token);
        Swal.fire({
            title:'Logged in successfully',
            icon:'success'
        }
          ).then(()=>{
            window.location.reload();
          })
        
    }
    let onError = () => {
        alert("Something went wrong try again...")
    }
    let logout=() =>{
        Swal.fire({
            title: 'Are you sure to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('auth_token');
                window.location.reload();
            }
          })
           
        
    }
    let navigate = useNavigate();
    let goToHome = () => {
        navigate("/");
    }
    useEffect(() => {
        let token = localStorage.getItem("auth_token");
        if (token) {

            var decoded = jwt_decode(token);
            setUserLogin(decoded);
        }
        else {
            setUserLogin(null);
        }
    })
    return (
        <>
            <GoogleOAuthProvider clientId="340222297158-9qrhavu38qvfjal186n9elqubmmpk29f.apps.googleusercontent.com">
                <Login success={onSuccess} error={onError} />
                <SignUp />
                <div className={"" + bgColor}>
                    <div className={"m-0 d-flex justify-content-between px-5 py-2 login-signup-row" + bgColor}>

                        <p className="m-0 brand" onClick={() => goToHome()}>e!</p>


                        {
                            userLogin === null ?
                                (<div><button className="btn text-white me-2" data-bs-toggle="modal" data-bs-target="#login">Login</button>


                                    <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#sign-up">Create an account
                                    </button>
                                </div>)
                                : (
                                    <div>
                                        <span className=" text-white me-3" >
                                            Welcome, {userLogin.name}</span>


                                        <button className="btn btn-warning" onClick={logout} >
                                            Logout
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>

            </GoogleOAuthProvider>
        </>
    )
}

