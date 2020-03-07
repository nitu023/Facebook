import React, { Component } from 'react';
import Axios from 'axios';
import {Paper,Button} from '@material-ui/core';
import {Link} from 'react-router-dom'



export class Readcomment extends Component {
    constructor(props){
        super(props)
        this.state = {
            allcomment : [],
            allData:[],
            tokenId : window.localStorage.getItem("token")
        }
    }
    componentDidMount = () =>{
        Axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.user_id)
                this.setState({
                    allData : response.data
                })
            })
            .catch((err) => alert(err))
            Axios.post("http://127.0.0.1:5000/comment_read/"+this.props.props.match.params.story_id)
            .then(res=>{
                console.log(res.data)
                this.setState({
                    allcomment:res.data
                })

            })
            .catch(error=>{
                console.log(error)
            })
    }
    Deletecomment = (comment_id) => {
        Axios.delete('http://127.0.0.1:5000/delete-comment/'+comment_id, {
            headers:{user_id: this.state.allData.user_id}
            
        })
          .then((res) => {
            console.log(res.data)
            window.location.reload(false)
          })
          .catch((error) => alert(error))
      }

    render() {
        let comment = this.state.allcomment.map(el =>{
            return(
                <div className = " w-50 offset-3 mt-4">
                    <Paper>
                  <img src={`http://127.0.0.1:5000/${el.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt=""></img>
                          <p className = "offset-3" style = {{marginTop:"-60px"}}>{el.first_name} {el.last_name}</p> 
                          <p className = "offset-3"> {el.comment}</p>
                          <Link to={`/Updatestory/${el.comment_id}`}><Button type="submit" variant="contained" color="primary">Update story </Button></Link>
                          <Button  variant="contained" color="secondary" className= "ml-5" onClick ={() => this.Deletecomment(el.comment_id)}> Delete comment </Button>
             
                    </Paper>
                </div>
            )

        })
        return (
            <div className = "mt-2">
                {comment}
            </div>
        )
    }
}

export default Readcomment
