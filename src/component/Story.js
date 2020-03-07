import React from "react"
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import queryString from "query-string";
import Createstory from './Createstory';
import {Paper,Button} from '@material-ui/core';


class Story extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allstory1: [],
      allDAta: [],
      per_page: 0,
      change_page:
      {
        page: 1
      },
      total_pages: 0,
      tokenId: window.localStorage.getItem("token"),
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount = (page = 1) => {
    axios.get(`http://127.0.0.1:5000/read_userStoryall?page=${page}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          allstory1: res.data.data,
          total_pages: res.data.total_pages
        })
      })
      .catch((err) => alert(err))

    axios.get("http://127.0.0.1:5000/get-user-token", {
      headers: {
        Authorization: "Bearer " + this.state.tokenId,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data)
        this.setState({
          allDAta: response.data
        })
      })
    // .catch((err) => alert(err))
  }

  Deleteblog = (story_id) => {
    axios.delete('http://127.0.0.1:5000/delete-story/' + story_id, {
      headers: {
        user_id: this.state.allDAta.user_id
      }
    })
      .then((res) => {
        console.log(res.data)
        this.props.history.push(`/Story/${this.state.user_id}`)
        window.location.reload(false)
      })
      .catch((error) => alert(error))
  }
  pagination = (pageNo) => {
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
    this.componentDidMount(this.page = pageNo);
  };

  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };
  rowChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.state.allstory1)
    const pageNumbers = [];
    for (let i = 1; i <= this.state.total_pages; i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button  variant="contained" color="primary" className = "ml-1" onClick={() => this.pagination(number)}>{number}</Button>
      );
    });
    let all_story = this.state.allstory1.reverse().map((e) => {
      if (this.state.allDAta.user_id === e.user_id) {
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
              <Link to={`/Comment/${e.story_id}`}><button type="submit" className="btn btn-primary offset-3"> Comment </button></Link>
              <Link to={`/Updatestory/${e.story_id}`}><button type="submit" className="btn btn-primary ml-3">Update story </button></Link>
              <Button  variant="contained" color="secondary" type="submit" className="ml-1" onClick={() => this.Deleteblog(e.story_id)}> Delete story </Button>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div class="card mb-3 w-50 offset-3">
            <Paper class="card-body">
              <img src={`http://127.0.0.1:5000/${e.postImageLink}`} style={{ width: "50px", height: "50px" }} className="ml-5 rounded-circle" alt="fecebook"></img>
              <p > name: {e.first_name}  {e.last_name} </p>
              <p > story : {e.story_content}</p>
              <p> {e.created}</p>
              <img className="w-100" style={{ height: "250px" }} src={`http://127.0.0.1:5000/${e.postImageLink1}`} alt="fecebook"></img>
              <p class="card-text"></p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              <Link to={`/Comment/${e.story_id}`}><Button  variant="contained" color="secondary" type="submit" className="ml-5"> Comment </Button></Link>
            </Paper>
          </div>
        )
      }
    })
    return (
      <div>
        <Navbar />
        <div className="mb-3">
          <Createstory />
        </div>
        {all_story}
        <div className="offset-5 mt-3 mb-5">
          {this.page > 1 ? <li className={`btn btn-info`} onClick={() => this.pagination(this.page - 1)}><a href="#">Prev</a></li> : ''}
          {renderPageNumbers}
          {this.page < this.state.total_pages ? <li className={`btn btn-info`} onClick={() => this.pagination(this.page + 1)}><a href="#">Next</a></li> : ''}
          {this.page < this.state.total_pages + this.page ? <li className={`btn btn-dark`} onClick={() => this.pagination(this.state.total_pages)}><a href="#">last</a></li> : ''}
        </div>
        {/* <FriendStory /> */}
      </div>
    )
  }
}

export default Story
