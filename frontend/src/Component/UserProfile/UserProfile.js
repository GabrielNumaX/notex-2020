import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// import Loader from '../Loader/Loader';

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

            <div>
                
                <Header></Header>

                <div className={css.DivUserProf}>


                </div>

                <Footer></Footer>

            </div>
        )
    }
}

export default UserProfile;