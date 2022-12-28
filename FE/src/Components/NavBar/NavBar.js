import {Link} from 'react-router-dom'
import './style/main/index.css';               
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

//stateless functional component (write sfc)
const Navbar  = () => {
   const location = useLocation();
   const isLoggedIn = useSelector(state => state.user.isLoggedIn);
   console.log(location.pathname)

   return ( 
      <nav className="navbar">
         <div className="logo" style={
            {cursor: "pointer"}
         } onClick={()=>{
            window.location.href = "/";
         }}>
         <h1>inStadium</h1>
         </div>
         <div className="links">
            <Link to="/">Home</Link>
            <Link to="/ViewAllMatches" >View Matches</Link>
            {!isLoggedIn && <Link to="/Profile">Profile</Link>}

            {(isLoggedIn)?
            <Link to="/" >Logout</Link>
            :
               (location.pathname !=='/SignUp')?
                <Link to="/SignUp" >Sign Up</Link>:
                <Link to="/SignIn" >Sign In</Link>
         }
            



         </div>
      </nav>


    );
}
 
export default Navbar;
//We want to export this at the app component.