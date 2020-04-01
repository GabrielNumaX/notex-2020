import React, {Component} from 'react';

import {connect} from 'react-redux';

import css from './Home.module.css';
import axios from 'axios';

import Footer from '../Footer/Footer';

import { ApiRoutes as Api } from '../../Api/Api';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: '',
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

        // axios.post('http://localhost:3030/api/user', {
        axios.post(Api.USER, {
            user: this.state.user,
            password: this.state.password
        })
        .then(response => {
            this.setState({
                user: '',
                password: '',  
            });

            localStorage.setItem('notexLog', response.data.login);

            const userData = {
                user: response.data.user,
                userId: response.data._id,
            }

            localStorage.setItem('notexUserData', JSON.stringify(userData));

            // let loginValue = localStorage.getItem('notexLog');


            // loginValue = JSON.parse(loginValue);

            // console.log(loginValue);


            this.props.userAndId(response.data.user, response.data._id);

            this.props.logIn(JSON.parse(localStorage.getItem('notexLog')));

            //ACA RESPONSE CON _id, user y login NO SE SI SIRVE PARA LO SIGUIENTE
            // console.log(response.data);

            if(!this.props.reduxLoggedIn){

                this.state.warning.push(css.PWarningShow);
            }
        })
        .catch(err => alert(err.message));
    }


    render() {

        // console.log(Api.USER);
        
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

                            <p>User</p>
                            <input type="text" 
                                    name="user" 
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.user}>           
                            </input>

                            <p>Password</p>
                            <input type="password" 
                                    name="password"
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.password}>
                            </input>

                            <p className={this.state.warning.join(' ')}>Wrong User or Password</p>
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
        reduxLoggedIn: globalState.loggedIn
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
        logIn: (loggedInProp) => {
            dispatch({type: 'LOG_IN', loggedInAction: loggedInProp})
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
