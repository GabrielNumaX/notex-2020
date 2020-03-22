import React from 'react';

import css from './Header.module.css';

const Header = (props) => {

    return(
        
        <nav className={css.Nav}>

            <div className={css.DivH2}>
                <h2>Welcome User</h2>
            </div>
            

            <div className={css.DivUl}>
                <ul>
                    <li>Home</li>
                    <li>Users</li>
                    <li>Notes</li>               
                </ul>
            </div>
            
        </nav>

    )
}

export default Header;