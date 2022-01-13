import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.css';

const Header = (props) => {

    const [user, setUser] = useState(props.user);

    // const onLogout = async () => {
    //     await Firebase.logout();
    //     window.location.replace(window.location.origin);
    // }

    return <div className="header">
        <h1>Zelus</h1>
            {!user && (
            <ul className="user-actions">
                    <li className="user-action login"><Link to="/login">Login</Link></li>
                    <li className="user-action register"><Link to="/register">Register</Link></li>
            </ul>
            )}
            {user && (
                <ul className="user-actions">
                    <li className="user-action"><Link to="/profile">Profile</Link></li>
                    <li className="user-action">Logout</li>
                </ul>
            )}
    </div>
}

export default Header;