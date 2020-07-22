import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Redirect, Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import css from './Home.module.css';
import axios from 'axios';

import Footer from '../Footer/Footer';

import { ApiRoutes as Api } from '../../Api/Api';
import {setToken, setUser, getToken} from '../../Auth/tokenHandler';

class Home extends Component {

    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            warning: [css.PWarning],
        }
    }

    componentDidMount() {

        this._isMounted = true;

       this.props.isLogged(getToken()) 
    
        // console.log('didmount');
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar los props):
        if (this.props.reduxLoggedIn !== prevProps.reduxLoggedIn) {

            // console.log('didUP');
            this.props.isLogged(getToken())
        }
      }

    componentWillUnmount() {
       this._isMounted = false;
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logInSubmit = (e) => {
        e.preventDefault();

        if(this._isMounted){

            axios.post(Api.USER_LOGIN, {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {

                if(res.data.login){

                // console.log(res.data);

                setToken(res.headers['x-notex-token']);
                setUser(res.data.user);

                this.props.isLogged(res.data.login);
                // console.log(getToken());

                this.props.userName(res.data.user);

                // this.setState({
                //     email: '',
                //     password: '',  
                // });


                }
                else {

                    this.setState({
                        email: '',
                        password: '',  
                    });

                    alert(res.data.message);
                }
                

            })
            .catch(err => {
                
                this.setState({password: ''})
                alert('Something Happened! Try Again.')
            });
        }
    }


    render() {

        // console.log(this.props.reduxLoggedIn);

        if(this.props.reduxLoggedIn) {

            return <Redirect to='/create'></Redirect>
        }
        
        return(
            <div>
                <header className={css.Header}>

                    <h1>NoteX</h1>

                    <div className={css.DivUser}>

                        <p><Link to="/signup" className={css.Link}>
                            <FontAwesomeIcon icon={faUserPlus} className={css.I}/>
                            Sign Up
                            </Link>
                        </p>

                    </div>

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
        reduxLoggedIn: globalState.login
    }
  }
  
  // this writes to STORE
  const mapDispatchToProps = (dispatch) => {
    return {
        userName: (userProp) => {
            dispatch({type: 'USER_AND_ID', userAction: userProp})        
        },
        isLogged: (loggedProp) => {
            dispatch({type: 'LOG_IN', loggedInAction: loggedProp})
        },
        // esta no se si la voy a usar
        logOut: () => {
            dispatch({type: 'LOG_OUT', loggedInAction: localStorage.setItem('notexLog', false)})
        },
    }
  }
  export default connect(mapGlobalStateToProps, mapDispatchToProps)(Home);
