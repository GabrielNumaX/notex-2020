import React from 'react';

import {Link} from 'react-router-dom';

import css from './Header.module.css';
// import { Component } from 'react';

const Header = (props) => {

    // console.log(props);  

    return(      
        <nav className={css.Nav}>

            <div className={css.DivH2}>
                <h2>Welcome {props.userToShow}</h2>
            </div>
            

            <div className={css.DivUl}>
                <ul>

                    <li><Link to="/" className={css.Link}>Home</Link></li>
                    <li className={css.dropdown}>
                        <Link to="/user" className={css.Link}>User</Link>
                        <div className={css.dropdownUser}>
                            <p onClick={props.logOut}>Log Out</p>
                        </div>
                    </li>

                    <li className={css.dropdown}>
                        <Link to="/notes" className={css.Link}>Notes</Link>
                        <div className={css.dropdownNote}>
                            <Link to="/create">Create Note</Link> 
                        </div>
                    </li>

                    {/* <Link to="/"><li>Home</li></Link>
                    <Link to="/user"><li>Users</li></Link>
                    <Link to="/notes" className={css.dropdown}>
                        <li>
                            Notes
                        </li>
                        <div className={css.dropdownContent}>
                            <Link to="/create">Create Note</Link> 
                        </div>
                    </Link>               */}
                </ul>
            </div>
            
        </nav>

    )
}

export default Header;