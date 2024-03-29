import './style/main/index.css';  
import { Link } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import { SetInferredRole } from '../../States/HomeState/HomeSlice';
import { useSelector } from 'react-redux';
//import audio from './style/Fifa.mp3'

const Home  = () => {
  const dispatch = useDispatch();
  const setInferredRole =(payload)=> dispatch(SetInferredRole(payload));


   // pause sound on click
    const handleClick = () => {
      // play sound on click
      //let Fifa = new Audio(audio)
      //Fifa.play()
    }
    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   return ( 
      <div>
      <section className="hero">
        <div className="container">
          <div className="hero-header" onClick={()=>handleClick()}>
            <h1 className="hero-title">Welcome to inStadium!</h1>
            <p className="hero-subtitle">
              inStadium offers a platform for coaches, fans and guests to participate and engage in global match events.
            </p>
          </div>
          <div className="cards">

          {(userInfo.role===1||userInfo.role==='')?<Link to={(!isLoggedIn)?"/SignUp":"/profile"} style={{
            textDecoration: 'none',
          }}>
           <div className="card" onClick={()=>{setInferredRole('Coach')}}>
              <img className="img-card" src="./coach.jpeg" alt="" />
              <div className="card-body">
              <h3 className="card-title">I'm a Coach</h3>
              <p className="card-description">
                As a coach, you can create and manage match events of real-world matches. 
              </p>
              </div>
              <div className="card-button-container">
              <button className="card-button"> {(!isLoggedIn)?"Sign Up as a Coach": "Take me to Profile"}</button>
              </div>
            </div>
            </Link>:null}
            
            {(userInfo.role===2||userInfo.role==='')?<Link to={(!isLoggedIn)?"/SignUp":"/profile"} style={{
            textDecoration: 'none',
          }}>
           <div className="card" onClick={()=>{setInferredRole('Fan')}}>
              <img className="img-card" src="./fan.jpeg" alt="" />
              <div className="card-body">
              <h3 className="card-title">I'm a Fan</h3>
              <p className="card-description">
              As a fan, you can book your ticket to attend real-world match events around you. 
              </p>
              </div>
              <div className="card-button-container">
              <button className="card-button"> {(!isLoggedIn)?"Sign Up as a Fan": "Take me to Profile"}</button>
              </div>
            </div>
            </Link>
            :null}

            {!isLoggedIn && <Link to="/ViewAllMatches" style={{
            textDecoration: 'none',
          }}>
            
            <div className="card" onClick={()=>handleClick()}>
              <img className="img-card" src="./guest.jpeg" alt="" />
              <div className="card-body">
              <h3 className="card-title">I'm a Guest</h3>
              <p className="card-description">
                As a guest, you can view every match and know its latest updates.
              </p>
              </div>
              <div className="card-button-container">
              <button className="card-button"> View Matches</button>
              </div>
            </div>
            </Link>}
          </div>
          {!isLoggedIn && <Link to="/SignIn" style={{
            textDecoration: 'none',
          }}>
          <div className="button-container">
              <button className="normal-button"> I'm already Registered </button>
          </div>
          </Link>}

        </div>
      </section>
  
      <section className="footer">
        <p>&copy;Brought to you by FIFA Adminstration, CUFE Branch</p>
      </section>
    </div>
    );
}
 
export default Home;

