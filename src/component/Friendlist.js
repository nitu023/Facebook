import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './Navbar';
import {Paper,Button} from '@material-ui/core';


export class Friendlist extends Component {
    constructor(props) {
        super()
        this.state = {
            userDetails: [],
            userData: [],
            tokenId: localStorage.getItem("token")

        }
    }
    //    console.log()
    componentDidMount = () => {
        Axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.user_id)
                this.setState({
                    userDetails: response.data
                })
                Axios.get("http://127.0.0.1:5000/users/Accepte_list/" + response.data.user_id)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            userData: res.data
                        })
                    })
            })

    }
    onDelete = (id) => {
        var connectionDetails = {
            user_id: id,
            current_userid: this.state.userDetails.user_id
        }
        Axios.post("http://127.0.0.1:5000/user/deleteByReciever", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    onAccept = (user_id) => {
        var connectionDetails = {
            user_id: this.props.match.params.user_id,
            current_userid: this.state.userDetails.user_id
        }
        Axios.post("http://127.0.0.1:5000/accept_connection", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        let requestdata = this.state.userData.map(a => {
            return (
                <div className="container mt-4">
                    <Paper className="card w-50 offset-3">
                        <img src={`http://127.0.0.1:5000/${a.postImageLink}`} style={{ width: "50px", height: "50px" }} className=" offset-3 rounded-circle" alt=""></img>
                        <p className="offset-3 "> name:{a.first_name}</p>
                        <p className="offset-3 "> city:{a.profile.city}</p>
                        <p className="offset-3 "> marital_status:{a.profile.marital_status}</p>
                        <p className="offset-3 "> Education:{a.profile.Education}</p>
                        <p className="offset-3 "> Gender:{a.Gender}</p>
                        <p className="offset-3 "> DateOfBirth:{a.DateOfBirth}</p>
                        <div>
                        <Button  variant="contained" color="secondary"className="ml-5" onClick={() => this.onDelete(a._id.$oid)} >Remove from friend list</Button>

                        </div>
                    </Paper>
                </div>
            )
        })
        return (
            <div>
                <Navbar />
                <h4 className="text-center"> Freind  list</h4>
                {requestdata}
            </div>
        )
    }
}

export default Friendlist
