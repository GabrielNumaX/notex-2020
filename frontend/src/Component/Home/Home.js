import React, {Component} from 'react';

import {connect} from 'react-redux';

import css from './Home.module.css';
import axios from 'axios';

import Footer from '../Footer/Footer';

import { ApiRoutes as Api } from '../../Api/Api';

import {setToken, axiosHeader} from '../../Auth/tokenHandler';
// import { getNodeText } from '@testing-library/react';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            warning: [css.PWarning],
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logInSubmit = (e) => {
        e.preventDefault();

        axios.post(Api.USER_LOGIN, {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {

            console.log(res);

            setToken(res.headers['x-notex-token']);

            axiosHeader();

            this.props.isLogged(true)

            this.setState({
                email: '',
                password: '',  
            });

        })
        .catch(err => console.log(err));
    }


    render() {
        
        return(
            <div>
                <header className={css.Header}>
                    <h1>NoteX</h1>
                </header>

                <div className={css.DivForm}>

                    <form className={css.Form}
                            onSubmit={(e) => this.logInSubmit(e)}>
                        <div className={css.DivH3}>
                            <h3>Welcome</h3>
                        </div>
                        
                        <div className={css.DivInputs}>

                            <p>Email</p>
                            <input type="email" 
                                    name="email" 
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.email}>           
                            </input>

                            <p>Password</p>
                            <input type="password" 
                                    name="password"
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.password}>
                            </input>

                            <p className={this.state.warning.join(' ')}>Wrong Email or Password</p>
                        </div>

                        <div className={css.DivBtn}>
                            <input type="submit" value="Log In"></input>
                        </div>
                    </form>
                </div>


                <Footer/>
                
            </div>
        )
    }
}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {
    return {
        reduxUser: globalState.user,
        reduxUserId: globalState.userId,
        reduxLoggedIn: globalState.login
    }
  }
  
  // this writes to STORE
  const mapDispatchToProps = (dispatch) => {
    return {
        userAndId: (userProp, userIdProp) => {
            dispatch({type: 'USER_AND_ID', userAction: userProp, userIdAction: userIdProp})        
        },
        // logIn: (loggedInProp) => {
        //     dispatch({type: 'LOG_IN', loggedInAction: loggedInProp})
        // },
        isLogged: (isLogged) => {
            dispatch({type: 'LOG_IN_OUT', loggedInAction: isLogged})
        },
    //     logOut: (loggedInProp) => {
    //       dispatch({type: 'LOG_OUT', loggedInAction: loggedInProp})
    //   },
        logOut: () => {
            dispatch({type: 'LOG_OUT', loggedInAction: localStorage.setItem('notexLog', false)})
        },
    }
  }
  export default connect(mapGlobalStateToProps, mapDispatchToProps)(Home);
