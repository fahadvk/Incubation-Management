import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from '../../redux/alertSlice';
import Adminlayout from "./adminLayout";
import $, { get } from "jquery"
import 'bootstrap'
import "./home.css"
import Nav from "./navbar"
import UserApplications from "./userApplications";

const Home = () => {
    const dispatch = useDispatch()
    const [existingApplication, setExistingApplications] = useState(null)
    const { loading } = useSelector(state => state.alerts)
    const [states, setStates] = useState([])
    const Navigate = useNavigate()
    const [user, setUser] = useState({})
    const [admin, setAdmin] = useState(false)
    const Application = Object.freeze({
        Name: "",
        Address: "",
        City: "",
        state: "",
        email: "",
        mobile: "",
        CompanyName: "",
        Logo: "",
        TeamAndManagement: "",
        ProductsAndCompanyProfile: "",
        Problem: "",
        uniqueSolution: "",
    })
    const [application, setApplication] = useState(Application)
    const getData = async () => {
        let response
        try {
            dispatch(showLoading())
            response = await axios.post("/api/user/", {}, {
                headers:
                {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            console.log(response)
            if (response.data.success) {

                if (response.data.data.isSuperUser) {
                    console.log("admin", response.data.isSuperUser)
                    setAdmin(true)
                }

                else {
                    setExistingApplications(response.data.Applications)
                    setUser(response.data.data)
                }
            }
        } catch (error) {
            localStorage.clear()
            Navigate("/login")
        }
    }


    const getStates = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/user/getStates/", {
                headers:
                {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            setStates(response.data.states)

            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
        }

    }
    let Stateslist = states?.map((state, i) => {
        return (<option key={i} value={state}>{state}</option>)
    })

    useEffect(() => {
        getData()
        console.log(existingApplication);
        if (existingApplication) {
            console.log('dss')
            $('#newApp').attr("hidden", true)
            $('#newApp').attr("hidden", "hidden")
        }
    }, [])

    const handleChange = (e) => {
        setApplication({
            ...application,
            [e.target.name]: e.target.value.trim()
        });
    };
    const handleChangeFile = (e) => {

        console.log(e.target.files[0])
        setApplication({
            ...application,
            [e.target.name]: e.target.files[0]
        });
    };
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(application)
        try {
            $('#modalSubscriptionForm').modal('hide');

            const response = await axios.post("/api/user/newApplication", { application },
                {
                    headers:
                    {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            $('#modalSubscriptionForm').modal('hide');
        } catch (error) {
            console.log(error)
        }

    }
    const logout = () => {
        localStorage.clear()
        Navigate("/login")
    }
    const userEmptyCheck = !(Object.keys(user).length === 0 && user.constructor === Object)



    return (

        <React.Fragment>
            {userEmptyCheck &&
                <React.Fragment>

                    <nav class="navbar bg-primary">
                        <div class="container-fluid navClass">
                            <a class="navbar-brand text-dark">Incubation Program</a>
                            {/* <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form> */}
                            <section className="ftco-section">
                                <div className="modal fade" id="modalSubscriptionForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header text-center">
                                                <h4 className="modal-title w-100 font-weight-bold">Subscribe</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <form onSubmit={submitHandler} onLoad={getStates} id="incubationApplication" >                                <div className="modal-body mx-3">
                                                <div className="md-form mb-5">

                                                    <i className="fas fa-user prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" name="Name" id="form3" placeholder='Name' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form3">Name</label>
                                                </div>

                                                <div className="md-form mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" name="Address" id="form2" placeholder='Address' className="form-control validate" />
                                                    Navigate                       <label data-error="wrong" data-success="right" for="form2">Address</label>
                                                </div>

                                                <div className="md-form mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" name="City" id="form2" placeholder='City' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">City</label>
                                                </div>

                                                <div onClick={getStates} class="form-group">
                                                    <select onChange={handleChange} name="state" class="form-control" id="exampleFormControlSelect1">
                                                        {Stateslist}
                                                    </select>
                                                    <label for="exampleFormControlSelect1">State</label>

                                                </div>


                                                <div className="md-form mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="email" id="form2" name="email" placeholder='Email' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Email</label>
                                                </div>



                                                <div className="md-form mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="tel" id="form2" placeholder='Phone NO' name='mobile' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Mobile</label>
                                                </div>

                                                <div className="md-form mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" id="form2" placeholder='Company Name' name='CompanyName' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Company Name</label>
                                                </div>


                                                <div class="form-group">
                                                    <label for="exampleFormControlFile1">Example file input</label>
                                                    <input onChange={handleChangeFile} name="Logo" type="file" class="form-control-file" id="exampleFormControlFile1" />
                                                </div>

                                                <div className="md-form mt-4 mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" id="form2" name="TeamAndManagement" placeholder='Tearm and Backgournd' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Describe Your Team and Backround</label>
                                                </div>

                                                <div className="md-form mt-4 mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" id="form2" name="ProductsAndCompanyProfile" placeholder='Company and products' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Describe Your Company and products</label>
                                                </div>

                                                <div className="md-form mt-4 mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" id="form2" name="Problem" placeholder='problem' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">Describe The problem your are trying to solve</label>
                                                </div>

                                                <div className="md-form mt-4 mb-4">
                                                    <i className="fas fa-envelope prefix grey-text"></i>
                                                    <input onChange={handleChange} type="text" id="form2" name="uniqueSolution" placeholder='What is unique about your solution' className="form-control validate" />
                                                    <label data-error="wrong" data-success="right" for="form2">What is unique about your solution</label>
                                                </div>

                                            </div>

                                                <div className="modal-footer d-flex justify-content-center">
                                                    <button className="btn btn-indigo">Submit <i className="fas fa-paper-plane-o ml-1"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                </div>
                                <div className="container">
                                    <div className="row ">

                                        <button id="newApp" className='d-flex align-items-center btn btn-info' data-toggle="modal" data-target="#modalSubscriptionForm">Apply</button>

                                        <button onClick={logout} className='logout-btn d-flex align-items-center btn btn-danger' data-toggle="" data-target="">logout</button>
                                    </div>
                                </div>
                            </section >
                        </div >
                    </nav >
                    {existingApplication && <UserApplications application={existingApplication} />}
                </React.Fragment>
            }

            {admin &&
                <Adminlayout />

            }

        </React.Fragment>
    )
}
export default Home