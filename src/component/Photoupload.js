import React, { Component } from 'react'
import axios from 'axios'


export default class PhotUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCategories: [],
            postimageLink: '',
            image: '',
            user_id: '',
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
            // .catch((err) => alert(err))
    }

    inputChange = (e) => {
        this.setState({
            postImageLink: e.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const formData = new FormData();
        formData.append('postImageLink', this.state.postImageLink)
        axios.post("http://127.0.0.1:5000/Picture/update", formData, {
            headers: {
                user_id: this.state.user_id,

            }

        })

            .then(response => {
                console.log(response.data.path)
                this.setState({
                    image: response.data.path
                })
                // this.props.history.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h4 className="mt-3 text-primary" >update User</h4>
                    <div className="form-group">
                        <label>Choose Picture</label>
                        <input type="file" className="form-control-file" name="postImageLink" onChange={this.inputChange} />
                    </div>
                    <button className="btn btn-primary">upload</button>
                </form>
            </div>
        )
    }
}


