import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faClipboard} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import css from './Header.module.css';
// import { Component } from 'react';

const Header = (props) => {

    //this is to use REDUX with HOOKS
    const dispatch = useDispatch();

    const user = useSelector(redux => redux.user);

    return(      
        <nav className={css.Nav}>

            <div className={css.DivH2}>
                <h2>Welcome {user}</h2>
            </div>
            

            <div className={css.DivUl}>
                <ul>

                    <li><Link to="/" className={css.Link}>
                        <FontAwesomeIcon icon={faHome} className={css.I}/>
                        Home
                        </Link>
                    </li>

                    <li className={css.dropdown}>
                        {/* ACA IRIA EL LINK AL USER */}
                        <Link to="/user" className={css.Link}>
                            <FontAwesomeIcon icon={faUser} className={css.I}/>
                            User
                        </Link>
                        
                        <div className={css.dropdownUser}>
                            
                            <p>Profile</p>

                            <p onClick={() => dispatch({type: 'LOG_OUT'})}>Log Out</p>

                        </div>
                    </li>

                    <li className={css.dropdown}>
                        <Link to="/" className={css.Link}>
                            <FontAwesomeIcon icon={faClipboard} className={css.I}/>
                            Notes
                        </Link>
                        <div className={css.dropdownNote}>
                            <Link to="/notes">Create Note</Link> 
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