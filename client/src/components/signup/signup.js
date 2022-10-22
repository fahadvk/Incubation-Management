import React, { useContext } from "react";
import { useState } from "react";
import '../login/login.css'
import axios from 'axios'
// import toast from 'react-hot-toast'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  // const style = {
  //   margin: "15px 0"
  // };
  const initialFormData = Object.freeze({
    Name: "",
    email: "",
    Password: "",
    Mobile: "",
    confirmPass: ""
  });



  const [formData, updateFormData] = React.useState(initialFormData);


  const [focused, setFocused] = useState(false)
  const focusField = (e) => {
    let value = e.target.value
    setFocused(!focused)
    if (e.target.value === "") {
      setFocused(false)
    }


  }
  let inputClass = "fluid-input";
  if (focused) {
    inputClass += " fluid-input--focus";
  }



  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onFinish = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {

      const response = await axios.post("/api/user/register", formData)
      if (response.data.success) {

        // toast.success(response.data.message)

      } else {

        let errors = []
        for (const [key, value] of Object.entries(response.error.response.data)) {
          console.log(`${key}: ${value}`);
          errors.push(value)
          console.log(errors)
        }
        errors.map((val) => {
          toast.error("!  " + val, {
            position: toast.POSITION.TOP_CENTER
          });
        })
        const clearWaitingQueue = () => {
          // Easy, right 😎
          toast.clearWaitingQueue();
        }
        setTimeout(clearWaitingQueue, 2500)
        // toast.error(response.data.error)
      }
    } catch (error) {

      let errors = []
      for (const [key, value] of Object.entries(error.response.data)) {
        console.log(`${key}: ${value}`);
        errors.push(value)
        console.log(errors)
      }
      errors.map((val) => {
        toast.error("!  " + val, {
          position: toast.POSITION.TOP_CENTER
        });
      })
      const clearWaitingQueue = () => {
        // Easy, right 😎
        toast.clearWaitingQueue();
      }
      setTimeout(clearWaitingQueue, 2500)

      console.log(error.response.data)
      // toast.error('This is an error!', error);
    }

  };


  return (
    <div className="login-container">
      <h3 className="mt-3 mb-3"> Signup</h3>
      <form class="mx-1 mx-md-4" name="form1" onSubmit={onFinish} id="form1" noValidate>
        <p className=""></p>
        <div class="d-flex flex-row align-items-center mb-4"   >
          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0" >
            <input type="text" size="100%" id="form3Example1c" onChange={handleChange} class="form-control" onFocus={focusField}
              name="Name" placeholder="Name" autoComplete="off" />
            {/* <label className="fluid-input-label" >Name</label> */}
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4 ">
          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input type="email" size="100%" id="form3Example3c" onChange={handleChange} class="form-control"
              name="email" placeholder="email" autoComplete="off" />
            {/* <label className="fluid-input-label" placeholder="email" >email</label> */}
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input type="tel" size="100%" id="form3Example4c" onChange={handleChange} class="form-control"
              name="Mobile" autoComplete="off" placeholder="Mobile" />
            {/* <label className="fluid-input-label" placeholder="Mobile">Mobile</label> */}
          </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input type="password" size="100%" id="Password" onChange={handleChange} class="form-control"
              name="Password" autoComplete="off" placeholder="Password" />
            {/* <label className="fluid-input-label" >Password</label> */}

          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input type="password" size="100%" onChange={handleChange} id="form3Example4cd" class="form-control"
              name="confirmPass" autoComplete="off" placeholder="Repeat Password" />

          </div>
        </div>



        <div class="d-flex  justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" class="btn btn-outline-primary btn-block">Submit</button>
        </div>

      </form>
      <ToastContainer hideProgressBar autoClose={2000} limit={3} />

    </div>
  );
}


//   ReactDOM.render(<LoginContainer />, document.getElementById("root"));
export default Signup