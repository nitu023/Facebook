import React from 'react';
import Axios from 'axios';

// localStorage.removeItem('token')
 class  SignUpUser extends React.Component {
     constructor(props){
         super(props)
         this.state={
            first_name :"",
            last_name:"",
             email:"",
             mobile:"",
             password:"",
             Gender:"",
             DateOfBirth:""

         }
     }
     radioChange = (e)=>{
         this.setState({Gender:e.target.value})
     }
     InputChange = (e) =>{
        //  alert("hii")
         this.setState({
             [e.target.name]:e.target.value
         })
     }
    
     SignupSubmit = (user) =>{
         user.preventDefault()
         console.log(this.state)
         let UserData = {
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
            Gender:this.state.Gender,
            DateOfBirth:this.state.DateOfBirth
         }
         Axios.post('http://127.0.0.1:5000/signup_user',UserData)
         .then((res) =>{
             console.log(res)
             this.props.props.props.history.push('/story')
         })
         
         .catch((error) =>{
             alert(error)
         })
        
     }
     render(){
         console.log(this.props.props)
        //  console.log(this.state)
         return(
             <div className = "mt-5">
                 <h3 className = "h2 ml-5"> Create an account</h3>
        <form onSubmit = {this.SignupSubmit}>
            <div class="form-row">
                <div class="col-4">
                <input type="text" class="form-control w-100" name = "first_name" placeholder="first name" onChange = {this.InputChange} />
                </div>
                <div class="col-4">
                <input type="text" class="form-control w-100" name = "last_name" placeholder="last name" onChange = {this.InputChange}/>
                </div>
                <div class="col-8 mt-4">
                <input type="text" class="form-control w-100"  name = "mobile" placeholder="Mobile Number" onChange = {this.InputChange}/>
                </div>
                <div class="col-8 mt-4">
                <input type="text" class="form-control w-100" name = "email" placeholder="Email Address" onChange = {this.InputChange}/>
                </div>
                <div class="col-8 mt-4">
                <input type="password" class="form-control w-100" name = "password" placeholder="Password" onChange = {this.InputChange}/>
                </div>
                <div class="col-8 mt-4">
                <label> Birthday</label>
                <input type="date" class="form-control w-100" name = "DateOfBirth" placeholder="Date Of Birth" onChange = {this.InputChange}/>
                </div>
                <div class="col-8 mt-4">
                <div>
                        <input type="radio"
                            value="Female"
                            checked={this.state.Gender === "Female"}
                            onChange={this.radioChange}  className ="ml-3" />Female

                        <input type="radio"
                            value="Male"
                            checked={this.state.Gender === "Male"}
                            onChange={this.radioChange}  className ="ml-3" />Male
                        
                        <input type="radio"
                            value="Custom"
                            checked={this.state.Gender === "Custom"}
                            onChange={this.radioChange}  className ="ml-3" />Custom
                    </div> 
                    </div>
                <div class=" col-12 mt-4">
                <button type="submit" class="btn btn-info">SignUp</button>
                
                </div>
            </div>
            
       </form>
             </div>
         )
     }

 }
 export default SignUpUser