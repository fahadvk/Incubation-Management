import React, { useState } from "react";
import axios from 'axios'
import './login.css'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const LoginContainer = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alerts)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [focused, setFocused] = useState(false)
  let inputClass = "fluid-input";
  if (focused) {
    inputClass += " fluid-input--focus";
  }
  // else if (value != "") {
  //   inputClass += " fluid-input--open";
  // }
  const handleChangeEmail = (e) => {
    const { target } = e;
    const { value } = target;
    setEmail(value)
  }
  const handleChangePassword = (e) => {
    const { target } = e;
    const { value } = target;
    setPassword(value)
    console.log(value)
  }

  const style = {
    margin: "15px 0"
  };

  const ClickHandler = async () => {
    if (email == " " || Password == "") {
      toast.error("please enter valid details", {
        position: toast.POSITION.TOP_CENTER
      })
    }
    else {
      const data = {
        email,
        Password
      }
      try {
        dispatch(showLoading())
        const response = await axios.post("/api/user/login", data)
        dispatch(hideLoading())
        if (response.data.isAdmin) {
          localStorage.setItem("token", response.data.token)
          navigate("/")
        }

        else if (response.data.success) {
          console.log("success")

          localStorage.setItem("token", response.data.token)
          navigate("/")
        }
        else {
          toast.error("!  " + response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });

        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error.response.data.message)
        toast.error("! " + error.response.data.message,
          {
            position: toast.POSITION.TOP_CENTER
          }
        )
      }
    }

  }
  const focusField = (e) => {

    setFocused(true)
    let value = e.target.value

    if (focused) {
      inputClass += " fluid-input--focus";
    }
    else if (value != "") {
      inputClass += " fluid-input--open";
    }
  }


  return (
    <div className="login-container">
      <div className="title">
        Login
      </div>

      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">

          <input
            className="fluid-input-input"
            // type={type}
            // id={id}
            onFocus={focusField}
            onBlur={focusField}
            onChange={handleChangeEmail}
            // onChange={this.handleChange.bind(this)}
            autocomplete="off"
          />
          <label className="fluid-input-label" forHtml>Email</label>

        </div>
      </div>

      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">

          <input
            className="fluid-input-input"
            // type={type}
            // id={id}
            onFocus={focusField}
            onBlur={focusField}
            onChange={handleChangePassword}
            autocomplete="off"
          />
          <label className="fluid-input-label" forHtml>Password</label>

        </div>
      </div>

      <div className="button login-button" onClick={ClickHandler}>
        log in
      </div>
      <ToastContainer hideProgressBar autoClose={2000} limit={3} />
      {/* <Button buttonText="log in" buttonClass="login-button" /> */}
    </div>
  );
}



export default LoginContainer