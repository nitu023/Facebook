import React, { Component } from 'react'
import Axios from 'axios'
import Navbar from './Navbar';
import { Link } from 'react-router-dom'


export class Friendreuest extends Component {
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
                Axios.get("http://127.0.0.1:5000/users/request_list/" + response.data.user_id)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            userData: res.data
                        })
                    })
            })

    }
    onAccept = () => {
        var connectionDetails = {
            user_id: this.props.match.params.user_id,
            current_userid: this.state.user_id,
        }
        Axios.post("http://127.0.0.1:5000/accept_connection", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        console.log("heloo")
        let requestdata = this.state.userData.map(a => {
            return (
                <div className="container mt-4">
                    <div className="card w-50 offset-3">
                        {/* <img src={`http://127.0.0.1:5000/${a.postImageLinkbackgound}`} style={{  height: "300px" }}  alt = "image"></img>                 */}
                        <img src={`http://127.0.0.1:5000/${a.postImageLink}`} style={{ width: "50px", height: "50px" }} className=" offset-3 rounded-circle" alt=""></img>
                        <p className="offset-3 "> name:{a.first_name}</p>
                        <Link to={`/Viewmore/${a._id.$oid}`}><button className="btn btn-primary">View Profile</button></Link>
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

export default Friendreuest
