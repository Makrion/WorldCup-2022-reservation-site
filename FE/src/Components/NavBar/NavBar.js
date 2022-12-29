import { Link } from 'react-router-dom'
import './style/main/index.css';
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAPI } from '../../States/UserState/UserSlice';
import { useEffect } from 'react';

//stateless functional component (write sfc)
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const accessToken = useSelector(state => state.user.userInfo.accessToken);
  const logoutSuccess = useSelector(state => state.user.logoutSuccess);
  const logoutError = useSelector(state => state.user.logoutError);
  const role = useSelector(state => state.user.userInfo.role);

  useEffect(() => {
    if (logoutSuccess) {
      history.push("/");
    }
  }, [logoutSuccess, isLoggedIn, history]);

  useEffect(() => {
    if (logoutError) {
      alert(logoutError);
    }
  }, [logoutError]);


  return (
    <nav className="navbar">
      <div className="logo" style={
        { cursor: "pointer" }
      } onClick={() => {
        history.push("/");
      }}>
        <h1>inStadium</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/ViewAllMatches" >View Matches</Link>
        
        {role < 2 && <Link to="/CreateMatch">Create a match</Link>}
        {role < 2 && <Link to="/AddStadium">Add a stadium</Link>}

        {isLoggedIn && <Link to="/Profile">Profile</Link>}

        {(isLoggedIn) ?
          <Link to='#' onClick={() => {
            dispatch(logoutAPI(accessToken));
          }}>Logout</Link>
          :
          (location.pathname !== '/SignUp') ?
            <Link to="/SignUp" >Sign Up</Link> :
            <Link to="/SignIn" >Sign In</Link>
        }
      </div>
    </nav>


  );
}

export default Navbar;
//We want to export this at the app component.