import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from "react-router-dom"
import Navbar from './Navbar';
import Showstory from './Usersstory'
import { Paper,Button} from '@material-ui/core';


export class FriendStory extends Component {
    constructor(props){
        super(props)
        this.state = {
            friendstory :[],
            user_id:'',
            tokenId: localStorage.getItem("token")
        }
    }
    componentDidMount = () => {
        Axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.user_id)
                Axios.post("http://127.0.0.1:5000/users/story/"+response.data.user_id)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            friendstory: res.data
                        })
                    })
            })

    }
    render() {
        let story = this.state.friendstory.map(e=>{
            return(
    <div>
        <Paper class="card mb-3 w-50 offset-2">
            <div class="card-body">
              <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt=""></img>
              <p > name : {e.first_name} {e.last_name} </p>
              <p > story : {e.story_content}</p>
              <img className="w-100" style={{ height: "250px" }} src={`http://127.0.0.1:5000/${e.postImageLink1}`} alt="post"></img>
              <p class="card-text"></p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              <Link to={`/Comment/${e.story_id}`}><Button  variant="contained" color="secondary" type = "submit" className= "ml-5">comment </Button></Link>
            </div>
          </Paper>
        </div>
            )
        })
        return (
            <div>
                <Navbar  />
            <div className = "mt-4">
               {story}
               <div>
               <Showstory />
               </div>
            </div>
            </div>
        )
    }
}

export default FriendStory
