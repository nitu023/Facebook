import React from "react"
import axios from "axios";
import { Link } from 'react-router-dom';
import {Button,Paper} from '@material-ui/core';


class Userstory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allStory: [],
            allDAta: [],
            user_id: '',
            tokenId: window.localStorage.getItem("token")
        }
    }

    componentDidMount = () => {
        axios.get("http://127.0.0.1:5000/get-user-token", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({
                    allDAta: response.data
                })
                console.log(response.data.user_id)
                axios.get("http://127.0.0.1:5000/read_userStory/" + response.data.user_id)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            allStory: res.data
                        })
                    })
            })
    }
    Deletestory = (story_id) => {
        axios.delete('http://127.0.0.1:5000/delete-story/' + story_id, {
            headers: {
                user_id: this.state.allDAta.user_id
            }
        })
            .then((res) => {
                console.log(res.data)
                // this.props.history.push(`/Story/${this.state.user_id}`)
                window.location.reload(false)
            })
            .catch((error) => alert(error))
    }
    render() {
        let all_story = this.state.allStory.reverse().map((e) => {

            return (
                <div>
                    <Paper className="card w-50  mb-4 offset-2 text-center" style = {{border:"2px white border"}} >
                        <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt=""></img>
                        <p style={{ marginTop: "-30px", marginLeft: "-100px" }}>{e.first_name} {e.last_name}</p>
                        <p>  story content : {e.story_content}</p>
                        <img class="w-100" style={{ height: "300px" }} src={`http://127.0.0.1:5000/${e.postImageLink1}`} alt=""></img>
                        <Paper>
                            <Link to={`/Comment/${e.story_id}`}><Button type="submit" variant="contained" color="Primary" className ="ml-5" type = "submit"> Comment </Button></Link>
                            <Button type="submit" variant="contained" color="Secondary" className ="ml-3" type = "submit" onClick={() => this.Deletestory(e.story_id)}> Delete story </Button>
                            <Button type="submit" variant="contained" color="Primary" className ="ml-3" type = "submit"> <Link to={`/Edit/${e.story_id}`}></Link>Edit story </Button>

                        </Paper>
                    </Paper>
                </div>
            )
        })
        return (
            <div className="mt-4">
                {/* <Navbar /> */}
                {all_story}
                {/* <Readcomment props ={this.props} /> */}
            </div>
        )
    }

}

export default Userstory
