import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './Navbar'


export class Viewmore extends Component {
    constructor(props) {
        super()
        this.state = {
            userDetails: [],
            userData: [],
            tokenId: localStorage.getItem("token"),
            flag: false
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
                Axios.get("http://127.0.0.1:5000/users/request_list/" + response.data.user_id)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            userData: res.data
                        })
                    })
            })
    }
    onDelete = () => {
        var connectionDetails = {
            user_id: this.state.userDetails.user_id,
            current_userid: this.props.match.params.user_id,
        }
        Axios.post("http://127.0.0.1:5000/user/deleteBysender", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    onAccept = () => {
        var connectionDetails = {
            user_id: this.props.match.params.user_id,
            current_userid: this.state.userDetails.user_id
        }
        Axios.post("http://127.0.0.1:5000/accept_connection", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
                this.setState({
                    flag: true
                })
            })
            .catch((err) => alert(err))
    }

    render() {
        let requestdata = this.state.userData.map(e => {
            return (
                <div className="card w-75 offset-1 mt-2">
                    <img src={`http://127.0.0.1:5000/${e.postImageLinkbackgound}`} style={{ height: "300px" }} alt=""></img>
                    <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "150px", height: "150px", marginTop: "-70px" }} className="  rounded-circle mb-2" alt=""></img>
                    <div className="h4 offset-2" style={{ marginTop: "-90px" }}> name : {e.first_name} {e.last_name}</div>
                    <div className="h6 offset-2"> Date Of Birth :{e.DateOfBirth}</div>
                    <div className="h6 offset-2">  Gender : {e.Gender}</div>
                    <div className="h6 offset-2"> City : {e.profile.city}</div>
                    <div className="h6 offset-2"> Qualification : {e.profile.Education}</div>
                    <div className="h6 offset-2"> marital status :  {e.profile.marital_status}</div>
                    <div>
                        <button className="btn btn-success offset-2" onClick={this.onAccept} >accept request</button>
                        <button className="btn btn-danger offset-2" onClick={this.onDelete} >delete</button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Navbar />
                <h4 className="text-center"> Freind Request list</h4>
                {requestdata}
            </div>
        )
    }
}

export default Viewmore
