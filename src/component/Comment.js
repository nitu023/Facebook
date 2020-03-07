import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from './Navbar';
import Readcomment from './Readcomment';
import {Button} from '@material-ui/core';

export class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            comment:"",
            allData:[],
            tokenId:window.localStorage.getItem("token")
        }
        console.log(this.props.match.params.story_id)
    }
    
    componentDidMount() {
        Axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    allData : response.data
                })
            })
            .catch((err) => alert(err))
    }
   onComment = (user) =>{
       console.log(this.state.comment)
       this.setState({comment : user.target.value})
        
   }
   onSubmit = (e) =>{
       e.preventDefault(e)
       let Data = {
        comment:this.state.comment,
        first_name:this.state.allData.first_name,
        user_id:this.state.allData.user_id,
        last_name:this.state.allData.last_name,
        postImageLink:this.state.allData.postImageLink
       }
       Axios.post("http://127.0.0.1:5000/comment/"+this.props.match.params.story_id,Data)
       .then(res=>{
           console.log(res.data)
           window.location.reload(false)
       })
       .catch(error=>{
           alert(error)
       })

     }
    
    render() {
        console.log(this.state)
        return (
            <div>
                <div>
                <Navbar />
                <form onSubmit={this.onSubmit}>
                    <h2 className=" text-center mt-3 text-primary " >Comment</h2>
                    <h4 className="offset-3 mt-2">comment</h4>
                    <textarea className="offset-3 mt-2" rows="3" cols="80" name="comment" onChange={this.onComment}></textarea>
                    <Button type="submit" variant="contained" color="primary" type = "submit" style = {{marginTop:"-30px",marginLeft:"300px"}}>comment</Button>
                </form>
            </div>
            <Readcomment props = {this.props} />
            </div>
        )
    }
}

export default Comment
