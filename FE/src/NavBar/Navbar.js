import {Link} from 'react-router-dom'
import './style/main/index.css';               

//stateless functional component (write sfc)
const Navbar  = () => {
   //inline css: style={js object as ruleset content} 

   return ( 

      <nav className="navbar">
         <div className="logo">
         <img src="/ball.png" className="img-logo" alt=""></img>
         <h1>inStadium</h1>
         </div>
         <div className="links">
            <Link to="/">Home</Link>
            <Link to="/Create" >View Matches</Link>
         </div>
      </nav>


    );
}
 
export default Navbar;
//We want to export this at the app component.