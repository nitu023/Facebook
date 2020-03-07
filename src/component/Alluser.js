import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar';
import {Button,Paper} from '@material-ui/core';

export default class ShowAllUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: "",
            allUser: [],
            tokenId: localStorage.getItem("token"),
            searchData: [],
            first_name: ''

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
                axios.get("http://127.0.0.1:5000/ShowAll_user1", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            allUser: response.data
                        })
                    })
                    .catch((err) => alert(err))
            })


    }
    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            first_name: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/search1", {
            first_name: this.state.first_name
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    searchData: res.data

                })

            })
    }

    render() {
        console.log(this.state.first_name)

        let allUser = this.state.allUser.map(e => {
            if (this.state.searchData == 0) {
                return (
                    <Paper className="card w-50 mt-5" style = {{height:"200px"}}>
                        <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "150px", height: "150px" }} className="  rounded-circle" alt=""></img>
                        <div className="h4 offset-5" style={{ marginTop: "-140px" }}>{e.first_name} {e.last_name} </div>
                        <div className="h4 offset-5" >{e.profile.city}</div>
                        <Link to={`/ViewUsers/${e._id.$oid}`}><Button  variant="contained" color="primary" style ={{marginLeft:"200px",marginTop:"50px"}}>View Profile</Button></Link>
                    </Paper>
                )
            }
        })
        let allserachDta = this.state.searchData.map(e => {
            return (
                <Paper className="card w-50 mt-3 offset-4">
                    <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "150px", height: "150px" }} className="  rounded-circle" alt=""></img>
                    <div className="h4 offset-5" style={{ marginTop: "-140px" }}>{e.first_name} {e.last_name} </div>
                    <div className="h4 offset-5" >{e.profile.city}</div>
                    <Link to={`/ViewUsers/${e._id.$oid}`}><Button  variant="contained" color="primary" style ={{marginLeft:"200px",marginTop:"50px"}}>View Profile</Button></Link>
                </Paper>
            )
        })

        return (
            <div>
                <Navbar />
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label >search </label>
                            <input type="text" class="form-control w-25" value={this.state.first_name} onChange={this.onChange} />
                        </div>
                        <Button  variant="contained" color="primary" type = "submit" >Submit</Button>
                    </form>
                </div>
                <div className="offset-3">
                    {allUser}
                </div>
                <div>
                    {allserachDta}
                </div>
            </div>
        )
    }
}