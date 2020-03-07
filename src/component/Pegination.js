import React, { Component } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import queryString from "query-string";
import Navbar from './Navbar'






export class Pegination extends Component {
    constructor(props){
        super(props)
        this.state = {
            story : [],
            per_page :"",
            total_page: 0,
            change_page:
            {
              page: 1
            },
            }
    }
    handleInput =(e)=>{
        e.preventDefault()
        this.setState({
         [e.target.name]:e.target.value
        })
       
      }
   onSubmit = (e, page = 1) =>{
       e.preventDefault()
       console.log("hello")
    axios.post(`http://127.0.0.1:5000/read/story?page=${page}`,{
        per_page : this.state.per_page
    })
    .then(res=>{
        console.log(res.data)
        this.setState({
            story:res.data.result,
            total_pages: res.data.total_pages
        })
    })
   }
   pagination_new = (pageNo) => {
    let updatePage = this.state.change_page
    updatePage.page = pageNo
    this.setState(
      {
        change_page: updatePage
      },
      () => {
        this.props.history.push(`?${queryString.stringify(updatePage)}`);
      }
    );
    this.onSubmit(this.page = pageNo);
  };
  
    render() {
        console.log(this.state.story)
    const pageNumbers = [];
    for (let i = 1; i <= this.state.total_page; i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button  variant="contained" color="primary" className = "ml-1" onClick={() => this.pagination_new(number)}>{number}</Button>
      );
    });
    let all_story = this.state.story.map((e) => {
          return (
            <div class="card mb-3 w-50 offset-3">
              <div class="card-body">
                <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt=""></img>
                <p > name : {e.first_name} {e.last_name} </p>
                <p > story : {e.story_content}</p>
                <img className="w-100" style={{ height: "250px" }} src={`http://127.0.0.1:5000/${e.postImageLink1}`} alt=""></img>
                <p class="card-text"></p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <div>
            </div>
              </div>
            </div>
          )
        
    })
        // console.log(this.state.per_page)
        return (
            <div>
                 <Navbar />
                <form onSubmit = {this.onSubmit}>
              <select class="custom-select w-25" id="inputGroupSelect01" name="per_page" onChange ={this.handleInput}>
                <option selected>Choose...</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
        <Button  variant="contained" color="secondary" type="submit" className="ml-1" > Submit </Button>

              </form>
              <div>
                 
                  {all_story}
                  
              </div>
              <div className = "mt-5">
                  {renderPageNumbers}
                  </div>
            </div>
        )
    }
}

export default Pegination
