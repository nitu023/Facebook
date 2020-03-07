import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar';
import Showstory from './Usersstory';
import {Paper,Button} from '@material-ui/core';

export default class UserAllDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: "",
            allUser: [],
            AllProfile: [],
            tokenId: localStorage.getItem("token")

        }
    }
    componentDidMount = () => {
        axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.user_id)
                this.setState({
                    user_id: response.data.user_id,
                    userDetails: response.data
                })

                //Show All Users
                axios.get("http://127.0.0.1:5000/read_user/" + this.state.user_id)

                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            allUser: response.data,

                        })
                    })
                    .catch((err) => alert(err))
            })
    }
    render() {
        console.log(this.state.allUser)
        let allUser = this.state.allUser.map(e => {
            return (
                <Paper className="card w-75 offset-1 mt-4 " style = {{borderBlockColor:"white",border:"2px solid dark",marginBottom:"100px"}} >
                    <img src={`http://127.0.0.1:5000/${e.postImageLinkbackgound}`} style={{ height: "300px" }} alt=""></img>
                    <Link to={`/Backgroundphoto/${this.state.user_id}`}><Button variant="contained" disabled style={{ marginLeft: "900px", marginTop: "-30px" }}> Edit Photo</Button></Link>
                    <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "150px", height: "150px", marginTop: "-70px" }} className="  rounded-circle mb-2" alt=""></img>
                    <div className="h4 offset-2" style={{ marginTop: "-90px" }}> name : {e.first_name} {e.last_name}</div>
                    <div className="h6 offset-2"> Date Of Birth :{e.DateOfBirth}</div>
                    <div className="h6 offset-2">  Gender : {e.Gender}</div>
                    <div className="h6 offset-2"> City : {e.profile.city}</div>
                    <div className="h6 offset-2"> email : {e.email}</div>
                    <div className="h6 offset-2"> Qualification : {e.profile.Education}</div>
                    <div className="h6 offset-2"> marital status :  {e.profile.marital_status}</div>
                    <Link to={`/Dashboard/${this.state.user_id}`}><Button  variant="contained" color="primary" style={{ marginTop: "-200px" }}>Edit Profile</Button></Link>
                    {/* <Link to={`/Userstory/${this.state.user_id}`}><button className="btn btn-primary offset-4 w-25 mt-2 btn-lg"> all Story</button></Link> */}
                </Paper>
            )
        })
        return (
            <div >
                <Navbar  />
                <div>
                    {allUser}
                </div>
                <div style = {{marginLeft:"300px"}}> 
                <Showstory />
                </div>
            </div>
        )
    }
}