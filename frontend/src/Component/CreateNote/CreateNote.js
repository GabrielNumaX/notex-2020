import React, {Component} from 'react';
import {axiosHeader} from '../../Auth/tokenHandler';
import {Redirect} from 'react-router-dom';
import {getToken} from '../../Auth/tokenHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import axios from 'axios';

import css from './CreateNote.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { ApiRoutes as Api } from '../../Api/Api';

class CreateNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            note: '',
        }
    }

    componentDidMount() {

        this.props.isLogged(getToken())

    }

    onNoteChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    onNoteSubmit = () => {

        axiosHeader();

        axios.post(Api.GET_POST_NOTES, {
            note: this.state.note,
        })
        .then(response => {
            this.setState({
                note: '',
            });

            alert('Note Created');

            this.props.history.push('/notes');
        })
        .catch(err => {
            alert(err.message);

            console.log(err);
        })
    }

    render() {

        // console.log(this.props.reduxLoggedIn);

        if(!this.props.reduxLoggedIn) {

            return <Redirect to='/'></Redirect>
        }

        return(

            <div className={css.CreateContainer}>
                <Header></Header>

                <div className={css.Container}>

                <div className={css.DivCreate}>

                    <div className={css.DivAuthor}>
                        <h4>{this.props.reduxUser}</h4>
                    </div>

                    <div className={css.DivTextarea}>
                        <textarea placeholder="Your note here..."
                                onChange={this.onNoteChange}
                                value={this.state.note}></textarea>
                    </div>

                    <div className={css.DivBtn}>

                        <button onClick={this.onNoteSubmit}>
                            <FontAwesomeIcon icon={faPencilAlt} className={css.I}/>
                            Create
                        </button>

                        <button 
                            onClick={() => this.setState({note: ''})}>
                                <FontAwesomeIcon icon={faTimesCircle} className={css.I}/>
                                Cancel
                            </button>

                    </div>
  
                </div>
                
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

  export default connect(mapGlobalStateToProps, mapDispatchToProps)(CreateNote);