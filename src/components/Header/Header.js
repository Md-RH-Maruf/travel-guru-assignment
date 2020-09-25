import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../icon/Logo.png';
import './Header.css';
import { CommonData } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(CommonData);
    const logOutAction = ()=>{
        setLoggedInUser({
            firstName : '',
            lastName : '',
            displayName: '',
            email: '',
            password: ''
        })
    }
    return (
        <div className="header ">
            <nav className="d-flex align-items-center justify-content-center">
                <img src={logo} alt="logo"></img>
                    <input type="text" name="" id="" className="form-control" placeholder="Search your destination" ></input>
                    <Link to="/home">Home</Link>
                    <Link to="/destination">Destination</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contact</Link>
                    {loggedInUser.email?
                    <h6>{loggedInUser.displayName} <span><button onClick={logOutAction} className="commonButton">LogOut</button></span></h6>:
                    <Link to="/login"><button className="commonButton">Login</button></Link>}
            </nav>
            
        </div>
    );
};

export default Header;