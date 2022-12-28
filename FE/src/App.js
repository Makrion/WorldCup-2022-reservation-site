import Navbar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import SignUp from './Components/SignUp/SignUp'
import SignIn from './Components/SignIn/SignIn'
import AdminPanel from './Components/AdminPanel/AdminPanel'
import NotFound from './Components/NotFound/NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { CreateMatch } from './Components/CreateMatch/CreateMatch'

const App = () => {                           


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
            <Route path="/AdminPanel">
                <AdminPanel></AdminPanel>
            </Route>
            <Route exact path="/create_match">
                <CreateMatch></CreateMatch>
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
