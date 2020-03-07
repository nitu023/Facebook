import React, { Component } from 'react'
import axios from 'axios'
// import Navbar from './Navbar'

export default class Updateuser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCategories: [],
            city: '',
            DateOfbirth: "",
            DateOfJoing: "",
            Gender: "",
            postimageLink: '',
            image: '',
            user_id: '',
            name: "",
            tokenId: localStorage.getItem('token')

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
                console.log(response.data.name)
                this.setState({
                    user_id: response.data.user_id,
                    name: response.data.user_id
                })
            })
            .catch((err) => alert(err))
    }

    inputChange = (e) => {
        this.setState({
            postImageLink: e.target.files[0]
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const formData = new FormData();
        formData.append('postImageLink', this.state.postImageLink)
        axios.post("http://127.0.0.1:5000/profile/update", formData, {
            headers: {
                user_id: this.state.user_id,
                name: this.state.name,
                DateOfbirth: this.state.DateOfbirth,
                Gender: this.state.Gender,
                DateOfJoing: this.state.DateOfJoing,
                city: this.state.city,
            }

        })

            .then(response => {
                console.log(response.data.path)
                this.setState({
                    image: response.data.path
                })
                this.props.history.push('/Dashboard')
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {
        // console.log(this.state)
        return (
            <div>
                {/* <Navbar /> */}
                <form onSubmit={this.onSubmit}>
                    <h1 className="offset-3 mt-3 text-primary" >update User</h1>
                    <h4 className="offset-3 mt-2">city</h4>
                    <input type="text" className="offset-3 w-25 mt-2" name="city" onChange={this.onChange}></input>
                    <br></br>
                    <select class="custom-select custom-select-lg mb-3 offset-3  w-25 mt-2" name="Gender" onChange={this.onChange}>
                        <option selected> select menu</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <h4 className="offset-3 mt-2">Date Of joining</h4>
                    <input className="offset-3 w-25 mt-2" type="date" name="DateOfJoing" onChange={this.onChange}></input>
                    <h4 className="offset-3 mt-2">DateOfbirth</h4>
                    <input className="offset-3 w-25 mt-2" type="date" name="DateOfbirth" onChange={this.onChange}></input>
                    <br></br>
                    <div className="form-group" style={{ "marginLeft": "500px" }}>
                        <label>Choose Picture</label>
                        <input type="file" className="form-control-file" name="postImageLink" onChange={this.inputChange} />
                    </div>
                    <button className="btn btn-primary offset-3 w-25 mt-2 btn-lg">POST</button>
                </form>
            </div>
        )
    }
}


