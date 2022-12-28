import Navbar from './NavBar/Navbar'
import Home from './Home/home'
import NotFound from './NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { CreateMatch } from './CreateMatch/CreateMatch'

const App = () => {                           


  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
      <div className="content">
          <Switch>
            <Route exact path="/create_match">
                <CreateMatch></CreateMatch>
            </Route>

            <Route exact path="/">
                <Home></Home>
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
