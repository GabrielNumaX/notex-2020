import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

import css from './UserProfile.module.css';
import { ApiRoutes as Api } from '../../Api/Api';
import { axiosHeader, getToken } from '../../Auth/tokenHandler'; 

class UserProfile extends Component {

    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            userData: [],
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
            showLoader: true,
        }
    }

    componentDidMount() {

        this._isMounted = true;

        this.props.isLogged(getToken()) 

        axiosHeader();

        axios.get(Api.USER_GET)
        .then(res => {

            if(this._isMounted){

                this.setState({
                    showLoader: false,
                    user: res.data.user,
                    email: res.data.email,
                })
            }
        })
        .catch(err => {

            this.setState({showLoader: false});

            alert('Something Happened! Try Again');
        })
    }

    componentWillUnmount() {

        this._isMounted = false;
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

        if(this.state.user === ''){

            alert('Please enter username');

            return;
        }

        axiosHeader();

        axios.put(Api.USER_PUT_DEL, {user: this.state.user})
        .then(res => {

            console.log(res.data);
            if(res.data.message){

                alert('Username Changed');

                this.setState({
                    user: res.data.user,
                    userAvailable: false,
                })
            }
            else{
                this.setState({
                    userAvailable: true,
                })
            }
        })
        .catch(err => {
            alert('Something Happened! Try Again')
        })
    }

    emailSubmit = (e) => {

        e.preventDefault();

        if(this.state.email === ''){

            alert('Please enter an Email');

            return;
        }

        const regex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        if(!regex.test(this.state.email)){

            alert('Enter a Valid Email');

            return;
        }

        axiosHeader();

        axios.put(Api.USER_PUT_DEL, {email: this.state.email})
        .then(res => {

            console.log(res.data);
            if(res.data.message){

                alert('Email Changed');

                this.setState({
                    email: res.data.email,
                    emailAvailable: false,
                })
            }
            else{
                this.setState({
                    emailAvailable: true
                })
            }
        })
        .catch(err => {
            alert('Something Happened! Try Again')
        })
    }

    passwordSubmit = (e) => {

        e.preventDefault();

        if(this.state.password === '' || !this.state.passRegex){

            alert('Please enter a valid Password');

            return;
        }

        axiosHeader();

        axios.put(Api.USER_CHANGE_PASS, {password: this.state.password})
        .then(res => {

            // console.log(res.data);
            if(res.data.message){

                alert('Password Changed');

                this.setState({
                    password: '',
                    password2: '',
                    passFocus: false,
                })
            }
            else{
                alert('Password NOT Changed')
            }
        })
        .catch(err => {
            alert('Something Happened! Try Again')
        })
    }

    userDelete = (e) => {
        e.preventDefault();

        if(window.confirm('Are you Sure!!!')){

            axiosHeader();

            axios.delete(Api.USER_PUT_DEL)
            .then(res => {

                if(res.data.message){

                    this.props.logOut();
                }
            })
            .catch(err => {
                alert('Something Happened! Try Again')
            })
        }
    }  


    render() {

        if(!this.props.reduxLoggedIn) {

            return <Redirect to='/'></Redirect>
        }

        let passCss = [css.PError];

        if(this.state.passMatch){

            passCss.push(css.PSuccess);
        }
        
        return(

            <Loader visible={this.state.showLoader}>

                <div>
                    
                    <Header></Header>

                    <div className={css.DivUserProf}>

                        <div className={css.DivH3}>
                            <h3>User Profile</h3>
                        </div>

                        <div className={css.DivForm}>
                            
                            <form className={css.Form}
                                    onSubmit={(e) => this.userSubmit(e)}>
                                    
                                    

                                <div className={css.DivInputs}>

                                    <label>Username</label>
                                    <input type="text" 
                                            name="user" 
                                            onChange={(e) => this.setState({user: e.target.value})}
                                            // onFocus={() => this.setState({userAvailable: false})}
                                            // onBlur={this.userCheck}
                                            value={this.state.user}>           
                                    </input>

                                    {this.state.userAvailable ?
                                    <p className={css.UserTaken}>This Username is taken</p>
                                        :
                                        null
                                    }
                                </div>

                                <div className={css.DivBtn}>
                                    <input type="submit" value="Change Username"></input>
                                </div>
                            </form>

                            <form className={css.Form}
                                    onSubmit={(e) => this.emailSubmit(e)}>
                                
                                <div className={css.DivInputs}>

                                    <label>Email</label>
                                    <input type="email" 
                                            name="email" 
                                            onChange={(e) => this.setState({email: e.target.value})}
                                            // onBlur={this.emailCheck}
                                            value={this.state.email}>           
                                    </input>

                                    {this.state.emailAvailable ?
                                        <p className={css.UserTaken}>Email is already registered</p>
                                        :
                                        null
                                    }

                                </div>    

                                <div className={css.DivBtn}>
                                    <input type="submit" value="Change Email"></input>
                                </div>

                            </form>

                            <form className={css.Form}
                                    onSubmit={(e) => this.passwordSubmit(e)}>
                                
                                <div className={css.DivInputs}>

                                    <label>New Password</label>
                                    <input type="password" 
                                            name="password"
                                            onChange={(e) => this.setState({password: e.target.value})}
                                            onKeyUp={this.passRegex}
                                            value={this.state.password}>
                                    </input>

                                    {!this.state.passRegex ? 
                                        <p className={css.UserTaken}>Please 5 to 18 characters</p>
                                        :
                                        null
                                    }

                                </div>

                                <div className={css.DivInputsPass2}>
                                    <label>Confirm Password</label>
                                    <input type="password" 
                                            name="password2"
                                            onChange={(e) => this.setState({password2: e.target.value})}
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
                                    <input type="submit" value="Change Password"></input>
                                </div>


                            </form>
                        
                        </div>

                        <div className={css.DivDelUser}>
                        
                            {/* <div className={css.DivBtn}> */}
                                <input type="button" value="Delete User" onClick={(e) => this.userDelete(e)}></input>
                            {/* </div> */}

                        </div>

                    </div>

                    <Footer></Footer>

                </div>

            </Loader>
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
        logOut: () => {
            dispatch({type: 'LOG_OUT'})
        },
    }
  }
  
export default connect(mapGlobalStateToProps, mapDispatchToProps)(UserProfile);