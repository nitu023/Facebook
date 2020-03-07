import React from "react"
import axios from "axios";
// import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import PhotUpload from './Photoupload'


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allCategories: [],
            city: '',
            Education: "",
            marital_status: "",
            user_id: '',
            tokenId: localStorage.getItem("token")


        }

    }
    componentDidMount() {
        axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    user_id: response.data.user_id
                })
            })
        // .catch((err) => alert(err))
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        var editData = {
            city: this.state.city,
            Education: this.state.Education,
            marital_status: this.state.marital_status,
            user_id: this.state.user_id
        }
        axios.post("http://127.0.0.1:5000/profile/update", editData)
            .then(response => {
                // this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return (
            <div>
                <Navbar props={this.props} />
                <div className="offset-4">
                    <PhotUpload />
                </div>
                <form onSubmit={this.onSubmit} className="offset-4">
                    <h4 className=" mt-2">city</h4>
                    <input className=" mt-2" rows="2" cols="80" name="city" onChange={this.onChange}></input>
                    <h4 className=" mt-2">Education</h4>
                    <input className=" mt-2" rows="8" cols="80" name="Education" onChange={this.onChange}></input>
                    <br></br>
                    <h4 className=" mt-2"> marital_status</h4>
                    <input className="mt-2" rows="2" cols="80" name="marital_status" onChange={this.onChange}></input>
                    <br></br>
                    <button className="btn btn-primary  mt-2"> Update details</button>
                </form>
            </div>
        )
    }
}

export default Dashboard

