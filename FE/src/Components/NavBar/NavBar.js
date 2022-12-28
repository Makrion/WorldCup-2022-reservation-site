import {Link} from 'react-router-dom'
import './style/main/index.css';               
import { useLocation } from 'react-router-dom'

//stateless functional component (write sfc)
const Navbar  = () => {
   const location = useLocation();
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
            <Link to="/View" >View Matches</Link>
            {
            (location.pathname !=='/SignUp')?
             <Link to="/SignUp" >Sign Up</Link>:
             <Link to="/SignIn" >Sign In</Link>
            }


            <Link to="/AdminPanel" >Admin Panel</Link>

         </div>
      </nav>


    );
}
 
export default Navbar;
//We want to export this at the app component.