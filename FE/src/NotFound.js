import { Link } from "react-router-dom"

//If the route doesn't exist go here.

const NotFound = () => {
   return (
      <div className="not-found">
         <h2>Sorry</h2>
         <p>We couldn't retrieve the page you requested.</p>
         <Link to="/">Go back.</Link>
      </div>
   )
}

export default NotFound;
