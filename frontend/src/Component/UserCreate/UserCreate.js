import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

import Footer from '../Footer/Footer';

import css from './UserCreate.module.css';

import { ApiRoutes as Api } from '../../Api/Api';

import {getToken} from '../../Auth/tokenHandler';

class UserCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: '',
            email: '',
            password: '',
            password2: '',
            passFocus: false,
            passMatch: false,
            userAvailable: false,
            emailAvailable: false,
            passRegex: false,
            emailRegex: false,
        }
    }


    componentDidMount() {

        this.props.isLogged(getToken()) 
        
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    emailCheck = () => {

        const regex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        if(regex.test(this.state.email)){

            this.setState({
                emailRegex: true
            })

            axios.post(Api.USER_CHECK, {email: this.state.email})
            .then(response => {
            
                if(!response.data.message) {

                    this.setState({
                        emailAvailable: true,
                    })
                }
                else {
                    this.setState({
                        emailAvailable: false,
                    })
                }

            })
            .catch(err => alert(err.message));
        }
        else{

            this.setState({
                emailRegex: false
            })
        }

    }

    passCompare = () => {

        this.setState({passFocus: true});

        if(this.state.password === this.state.password2 && 
            (this.state.password && this.state.password2) !== ''){

            this.setState({
                passMatch: true,
            })
        }
        else{
            this.setState({
                passMatch: false,
            })
        }

        if((this.state.password && this.state.password2) === ''){

            this.setState({passFocus: false});
        }
    }

    passRegex = () => {

        const regex = /\S{5,18}/;

        if(regex.test(this.state.password)){
            
            this.setState({
                passRegex: true,
            })
        }
        else{
            
            this.setState({
                passRegex: false,
            })
        }
    }

    userCheck = () => {

        axios.post(Api.USER_CHECK, {user: this.state.user})
        .then(response => {
           
            if(!response.data.message) {

                this.setState({
                    userAvailable: true,
                })
            }

        })
        .catch(err => alert(err.message));
    }

    submitCheck = () => {

        if(this.state.passMatch && this.state.user !== '' && 
            this.state.passRegex && this.state.emailRegex){

               return true;
        }
        else{
            return false;
        }
    }

    userSubmit = (e) => {
        e.preventDefault();

        const check = this.submitCheck();

        if(check){

            axios.post(Api.USER_CREATE, {
                user: this.state.user,
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                // console.log(response);

                this.setState({
                    user: '',
                    email: '',
                    password: '',
                    password2: '',
                    passFocus: false,
                })

                alert('User Created');
            })
            .catch(err => {
                alert(err.message);
            })
        }
        else {

            alert('Complete all fields');
        }
    }

    render() {

        console.log(this.props.reduxLoggedIn);

        if(this.props.reduxLoggedIn) {

            return <Redirect to='/notes'></Redirect>
        }

        let passCss = [css.PError];

        if(this.state.passMatch){

            passCss.push(css.PSuccess);
        }

        return(
            <div className={css.DivUserCreate}>

                <header className={css.Header}>

                    <h1>NoteX</h1>

                    <div className={css.DivUser}>

                        <p><Link to="/" className={css.Link}>
                            <FontAwesomeIcon icon={faHome} className={css.I}/>
                            Home
                            </Link>
                        </p>

                    </div>

                </header>


                <div className={css.DivForm}>

                <form className={css.Form}
                            onSubmit={(e) => this.userSubmit(e)}>
                        <div className={css.DivH3}>
                            <h3>Create User</h3>
                        </div>
                        
                        <div className={css.DivInputs}>

                            <p>User Name</p>
                            <input type="text" 
                                    name="user" 
                                    onChange={(e) => this.onInputChange(e)}
                                    onFocus={() => this.setState({userAvailable: false})}
                                    onBlur={this.userCheck}
                                    value={this.state.user}>           
                            </input>

                            {this.state.userAvailable ?
                               <p className={css.UserTaken}>this user is taken</p>
                                :
                                null
                            }
                            <p>Email</p>
                            <input type="email" 
                                    name="email" 
                                    onChange={(e) => this.onInputChange(e)}
                                    onBlur={this.emailCheck}
                                    value={this.state.email}>           
                            </input>

                            {this.state.emailAvailable ?
                                <p className={css.UserTaken}>Email is already registered</p>
                                :
                                null
                            }    

                            <p>Password</p>
                            <input type="password" 
                                    name="password"
                                    onChange={(e) => this.onInputChange(e)}
                                    onKeyUp={this.passRegex}
                                    value={this.state.password}>
                            </input>

                            {!this.state.passRegex ? 
                                <p className={css.UserTaken}>Please 5 to 18 characters</p>
                                :
                                null
                            }

                            <p>Confirm Password</p>
                            <input type="password" 
                                    name="password2"
                                    onChange={(e) => this.onInputChange(e)}
                                    onKeyUp={this.passCompare}
                                    value={this.state.password2}>
                            </input>

                            {this.state.passFocus ?
                                <p className={passCss.join(' ')}>
                                    {this.state.passMatch ? 'Passwords Match' : 'Passwords Must be Equal'}
                                </p>
                                :
                                null
                            }

                        </div>

                        <div className={css.DivBtn}>
                            <input type="submit" value="Create"></input>
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
        // userName: (userProp) => {
        //     dispatch({type: 'USER_AND_ID', userAction: userProp})        
        // },
        isLogged: (loggedProp) => {
            dispatch({type: 'LOG_IN', loggedInAction: loggedProp})
        },
    }
  }
  
export default connect(mapGlobalStateToProps, mapDispatchToProps)(UserCreate);