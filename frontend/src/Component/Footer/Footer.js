import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import css from './Footer.module.css';

const Footer = () => {

    return(
        <footer className={css.Footer}>

            <div className={css.DivIcon}>
                <h3>NumaX &copy;2020 - &nbsp;</h3>

                <a href="mailto:g.numa10@hotmail.com">
                    <FontAwesomeIcon icon={faEnvelope} className={css.I}/>
                </a>
    
            </div>

            

        </footer>
    )
}

export default Footer;