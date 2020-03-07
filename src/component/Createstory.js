import React, { Component } from 'react'
import axios from 'axios'

export default class Createstory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCategories: [],
            story_content: "",
            postimageLink1: '',
            allData:[],
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
                console.log(response.data.postImageLink)
                this.setState({
                    allData : response.data
                })
            })
            // .catch((err) => alert(err))

    }
    inputChange = (e) => {
        this.setState({
            postImageLink1: e.target.files[0]
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        console.log(this.state)
        formData.append('postImageLink1', this.state.postImageLink1)
        axios.post("http://127.0.0.1:5000/create_story", formData, {
            headers: {
                story_content: this.state.story_content,
                user_id: this.state.allData.user_id,
                postImageLink:this.state.allData.postImageLink,
                last_name:this.state.allData.last_name,
                first_name: this.state.allData.first_name

            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    image: response.data.path
                })
                // this.props.history.push('/story')
                window.location.reload(false);
                
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        // console.log(this.state.postImageLink)
        return (
            <div>
                {/* <Navbar /> */}
                <form onSubmit={this.onSubmit}>
                    <h2 className=" text-center mt-3 text-primary " >Create story</h2>
                    <h4 className="offset-3 mt-2">Content</h4>
                    <textarea className="offset-3 mt-2" rows="3" cols="80" name="story_content" onChange={this.onChange}></textarea>
                    <div className="form-group" style={{ "marginLeft": "700px" }}>
                        <label>Choose Picture</label>
                        <input type="file" className="form-control-file" name="postImageLink1" onChange={this.inputChange} />
                    </div>
                    <button className="btn btn-primary offset-3" style = {{marginTop:"-30px"}}>Crate story</button>
                </form>
            </div>
        )
    }
}
