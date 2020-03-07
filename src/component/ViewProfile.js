import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar'

export default class ViewUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: "",
            allUser: [],
            arrRespose: [],
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
                // console.log(response.data.user_id)
                this.setState({
                    user_id: response.data.user_id,
                    userDetails: response.data
                })

                //Show All Users
                axios.get("http://127.0.0.1:5000/read_user", {
                    headers: {
                        user_id: this.props.match.params.user_id
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

    onConnect = () => {
        var connectionDetails = {
            user_id: this.props.match.params.user_id,
            current_userid: this.state.user_id,
        }
        axios.post("http://127.0.0.1:5000/user/request", connectionDetails)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    arrRespose: response.data
                })
                if (response.data === "already send") {
                    alert("already sended")
                }
                else {
                    alert("send")
                }
                // window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    onDelete = () => {
        var connectionDetails = {
            user_id: this.props.match.params.user_id,
            current_userid: this.state.user_id,
        }
        axios.post("http://127.0.0.1:5000/user/deleteBysender", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        console.log(this.state.arrRespose)
        let userDetails = this.state.allUser.map((a) => {
            if (this.state.arrRespose === "already send") {
                return (

                    <div className="container">
                        <div className="card w-50 mt-4">
                            <img src={`http://127.0.0.1:5000/${a.postImageLinkbackgound}`} style={{ height: "350px" }} alt="background" />
                            <img src={`http://127.0.0.1:5000/${a.postImageLink}`} style={{ width: "100px", height: "100px" }} className="  rounded-circle" alt="" />
                            <p className="offset-3 "> name:{a.first_name}</p>
                            <p className="offset-3 "> city:{a.profile.city}</p>
                            <p className="offset-3 "> marital_status:{a.profile.marital_status}</p>
                            <p className="offset-3 "> Education:{a.profile.Education}</p>
                            <p className="offset-3 "> Gender:{a.Gender}</p>
                            <p className="offset-3 "> DateOfBirth:{a.DateOfBirth}</p>
                            <div>
                                {/* <button className="btn btn-success offset-2" onClick={this.onConnect} >addfriend</button> */}
                                <button className="btn btn-danger offset-1" onClick={this.onDelete} >cancle request</button>
                            </div>
                        </div>
                    </div>

                )
            }
            else {
                return (
                    <div className="container">
                        <div className="card w-100 mt-4">
                            <img src={`http://127.0.0.1:5000/${a.postImageLinkbackgound}`} style={{ height: "350px" }} alt="png" />
                            <img src={`http://127.0.0.1:5000/${a.postImageLink}`} style={{ width: "150px", height: "150px", marginTop: "-50px" }} className="  rounded-circle" alt="png1" />
                            <p className="offset-4" style={{ marginTop: "-100px" }}><h3>  name : {a.first_name}  {a.last_name} </h3> </p>
                            <p className="offset-4 h5"> city : {a.profile.city}</p>
                            <p className="offset-4 h5 "> marital_status : {a.profile.marital_status}</p>
                            <p className="offset-4 h5 "> Education : {a.profile.Education}</p>
                            <p className="offset-4  h5"> Gender : {a.Gender}</p>
                            <p className="offset-4  h5"> DateOfBirth : {a.DateOfBirth}</p>
                            <div>
                                <button className="btn btn-success offset-4" onClick={this.onConnect} >addfriend</button>
                                {/* <button className="btn btn-danger offset-1" onClick={this.onDelete} >cancle request</button> */}
                            </div>
                        </div>
                    </div>

                )
            }
        })
        return (
            <div>
                <Navbar />
                {userDetails}
            </div>
        )
    }

}