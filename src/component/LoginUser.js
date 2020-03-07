import React, { Component } from 'react';
import {Button}from '@material-ui/core';
import Axios from 'axios';


export class LoginUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
        }
    }

    InputChange =(user) =>{
        this.setState({
            [user.target.name]:user.target.value
        })
    }
    LoginSubmit = (e) =>{
        e.preventDefault()
        var user_details = {
            email: this.state.email,
            password: this.state.password,
            
        }
        Axios.post('http://127.0.0.1:5000/users/login',user_details)
        .then(res  => {
            console.log(res.data.token)
            if (res.data.result === "no user found"){
                alert("wrong password")
            }
            else{
            window.localStorage.setItem("token", res.data.token)
            this.props.props.props.history.push('/FriendStory')
            
            }
            // <Redirect to="/Dashboard"/>
            
        })

        .catch(error=>{
            alert(error)
            
        })
       
    }

    render() {
        console.log(this.props.props)
        return (
            <div className ="offset-4">
        <form onSubmit = {this.LoginSubmit}>
           <div class="form-row">
                <div class="col-5">
                <input type="text" class="form-control w-100" placeholder="Email Id" name = "email" onChange={this.InputChange} />
                </div>
                <div class="col-5">
                <input type="text" class="form-control w-100" placeholder="Password" name ="password" onChange={this.InputChange} />
                </div>
                <Button color="inherit" className = "bg-info" type = "submit" > Login </Button>
            </div>
            </form>
          </div>
               
        )
    }
}

export default LoginUser
