import Navbar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import SignUp from './Components/SignUp/SignUp'
import Profile from './Components/Profile/Profile'
import SignIn from './Components/SignIn/SignIn'
import AdminPanel from './Components/AdminPanel/AdminPanel'
import NotFound from './Components/NotFound/NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateMatch from './Components/CreateMatch/CreateMatch'
import EditMatch from './Components/EditMatch/EditMatch'
import ViewMatch from './Components/ViewMatch/ViewMatch'
import ViewAllMatches from './Components/ViewAllMatches/ViewAllMatches'
import AddStadium from './Components/AddStadium/AddStadium'

import axios from 'axios';
import { loadInitialState } from './States/UserState/UserSlice'
import { useDispatch } from 'react-redux'

axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {                           
  const dispatch = useDispatch();
  dispatch(loadInitialState());
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
      <div className="content">
          <Switch>
            <Route exact path="/">
                <Home></Home>
            </Route>
            <Route path="/SignUp">
                <SignUp></SignUp>
            </Route>
            <Route path="/SignIn">
                <SignIn></SignIn>
            </Route>
            <Route path="/Profile">
                <Profile></Profile>
            </Route>
            <Route path="/AdminPanel">
                <AdminPanel></AdminPanel>
            </Route>
            <Route exact path="/CreateMatch">
                <CreateMatch></CreateMatch>
            </Route>
            <Route path="/EditMatch/:matchId">
                <EditMatch>EditMatch</EditMatch>
            </Route>
            <Route exact path="/ViewAllMatches">
                <ViewAllMatches></ViewAllMatches>
            </Route>
            <Route path="/ViewMatch/:matchId">
                <ViewMatch></ViewMatch>
            </Route>
            <Route exact path="/AddStadium">
                <AddStadium></AddStadium>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>

          </Switch> 
      </div>
      </div>
    </Router>
  );
}

export default App;    
