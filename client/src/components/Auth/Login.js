import { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import {connect} from 'react-redux'
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Input from '../form/Input';

import './index.css'

const Login = ( { setLogin, setToken}) => {
    const [state, setState] = useState(
        {
            email:'', 
            password:'', 
            errors:''
        }
    )
    const handleForm = (e) => {
        e.preventDefault();
        const data = {email: state.email, password:state.password}
        axios.post("/auth/login", data)
            .then(res => {
                cookie.set('token', res.data.token)
                //dispatch to set login state
                setLogin(res.data.user)
                setToken(res.data.token)
            })
            .catch(e => {setState({...state, errors: e.response.data.message})})
    }

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setState({...state,[name]:value})
    }

    useEffect(() => {
        state.errors && toast.error(state.errors, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })  
    }, [state.errors])
    return (
        <div className="d-flex justify-content-center align-items-center auth-container">
        <MDBRow>
            <MDBCol md="12">
            <MDBCard className="card-body_auth">
                <MDBCardBody>
                <form onSubmit={handleForm}>
                    <p className="h4 text-center py-3">Log In</p>
                        <ToastContainer />
                        <Input label="Your Email" type="email" name="email" handleInput={handleInput} />
                        <Input label="Your Password" type="password" name="password" handleInput={handleInput} />
                    <div className="text-center py-4 mt-3">
                        <MDBBtn className="btn btn-outline-grey" type="submit">
                            Log In
                        </MDBBtn>
                    </div>
                    <p className="text-center">
                        <Link className="link-auth" to="/register">Create an account</Link>
                    </p>
                </form>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </div>
  );
};

const mapDispactToProps = dispatch => {
    return {
        setLogin : (user) => dispatch({
            type : "SET_LOGIN",
            payload:user
        }),
        setToken : (tkn) => dispatch({
            type : "SET_TOKEN",
            payload:tkn
        })
    }}

export default connect(null, mapDispactToProps)(Login);
