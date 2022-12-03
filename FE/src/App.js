import Navbar from './NavBar/Navbar'
import Home from './Home/home'
import NotFound from './NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
