import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ViewUsers from './component/ViewProfile';
import Dashboard from './component/Dashboard';
import Updateuser from './component/Updateuser';
import Story from './component/Story';
import Home from './component/Home';
import UserAllDetails from './component/UserAlldetails'
import Comment from './component/Comment';
import ShowAllUsers from './component/Alluser';
import Friendreuest from './component/Friendreuest';
import Viewmore from './component/Viewmore';
import Friendlist from './component/Friendlist';
import FriendStory from './component/FriendStory';
import Backgroundphoto from './component/Backgoundimage';
import Pegination from './component/Pegination'



function App(props) {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact render={(props) => { return (<Home  {...props} />) }} ></Route>
        <Route path="/showAllUsers" render={(props) => { return (<ShowAllUsers  {...props} />) }} ></Route>
        <Route path="/userAllDetails" render={(props) => { return (<UserAllDetails  {...props} />) }} ></Route>
        <Route path="/dashboard" render={(props) => { return (<Dashboard  {...props} />) }} ></Route>
        <Route path="/Updateuser/:user_id" render={(props) => { return (<Updateuser  {...props} />) }} ></Route>
        <Route path="/story" render={(props) => { return (<Story {...props} />) }} ></Route>
        <Route path="/Comment/:story_id" render={(props) => { return (<Comment {...props} />) }} ></Route>
        <Route path="/ViewUsers/:user_id" render={(props) => { return (<ViewUsers  {...props} />) }} ></Route>
        <Route path="/friendreuest" render={(props) => { return (<Friendreuest {...props} />) }} ></Route>
        <Route path="/friendlist" render={(props) => { return (<Friendlist {...props} />) }} ></Route>
        <Route path="/Viewmore/:user_id" render={(props) => { return (<Viewmore  {...props} />) }} ></Route>
        <Route path="/FriendStory" render={(props) => { return (<FriendStory  {...props} />) }} ></Route>
        <Route path="/Backgroundphoto/:user_id" render={(props) => { return (<Backgroundphoto  {...props} />) }} ></Route>
        <Route path="/Pegination" render={(props) => { return (<Pegination  {...props} />) }} ></Route>

      </BrowserRouter>
    </>
  );
}

export default App;
