import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Loader from '../Loader/Loader';

import css from './UserProfile.module.css';

class UserProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            userData: [],
            showLoader: true,
        }
    }


    render() {
        
        return(

            <div className={css.DivUserProf}>
                
                <Header></Header>






                <Footer></Footer>

            </div>
        )
    }
}