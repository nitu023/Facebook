import React from 'react'
import {AppBar,Toolbar,Typography ,Button}from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import classes from './Home.css';
import LoginUser from './LoginUser'
import SignUpUser from './SignpUser';
import axios from 'axios';
import classes1 from './Navbar.css';
import {Link} from 'react-router-dom'


class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tokenId: localStorage.getItem("token"),
            user_id:'',
            userDetails:[]

        }
    }
    componentDidMount = (e) => {

      axios.get("http://127.0.0.1:5000/get-user-token", {
          headers: {
              Authorization: "Bearer " + this.state.tokenId,
              'Content-Type': 'application/json'
          }
      })
          .then(response => {
              console.log(response.data)
              this.setState({
                  userDetails: response.data
              })
          })
          // .catch((err) => alert(err))
  }
  onDelete=()=>{
      localStorage.removeItem('token')
      this.props.history.push('/')
   
  }
    render(){
      // console.log(this.state.userDetails)
        return(
            
            <div>
        {this.state.tokenId?
        <div className= "fixed-top">
        <div className={classes1.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes1.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography className={classes1.title} variant="h4" noWrap>
              Facebook
            </Typography>
            <Link class="ml-3 text-light" to="/Story"><Button color="inherit">Story</Button></Link>
            {/* <Link class="ml-3 text-dark" to="/Createstory"><Button color="inherit">Createstory</Button></Link> */}
            <Link class="ml-2 text-light" to="/showAllUsers"><Button color="inherit">ShowAllUsers</Button></Link>
            <Link class="ml-2 text-light" to="/UserAllDetails"><Button color="inherit">UserAllDetails</Button></Link>
            <Link class="ml-2 text-light" to="/FriendReuest"><Button color="inherit">FriendReuest</Button></Link>
            <Link class="ml-2 text-light" to="/Friendlist"><Button color="inherit">Friendlist</Button></Link>
            <Link class="ml-2 text-light" to="/FriendStory"><Button color="inherit">FriendStory</Button></Link>
            <Link class="ml-2 text-light" to="/"><Button color="inherit"  onClick = {this.onDelete}>Logout</Button></Link>
            <div className="ml-5 mt-1 h4">{this.state.userDetails.first_name}</div>
            <img src={`http://127.0.0.1:5000/${this.state.userDetails.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt = ""></img>

          </Toolbar>
        </AppBar>
      </div>
      </div>
    :
     <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h3"  style ={{marginLeft:"200px"}} className={classes.title}>
           facebook
          </Typography>
          <LoginUser props={this.props}/>
        </Toolbar>
      </AppBar>
      <div style ={{marginLeft:"800px"}}>
          <SignUpUser props = {this.props} />
      </div>
    </div>
 }
            </div>
        )
            
        
    }
}
export default Navbar