import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {getToken} from '../../Auth/tokenHandler';
import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

import Header from '../Header/Header';
import EditModal from '../EditModal/EditModal';
import Footer from '../Footer/Footer';
import css from './ShowNotes.module.css';
// import { Redirect } from 'react-router-dom';

import Loader from '../Loader/Loader';

import { ApiRoutes as Api } from '../../Api/Api';

import {axiosHeader} from '../../Auth/tokenHandler'

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();


class ShowNotes extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            showModal: false,
            noteHeight: null,
            noteId: '',
            showLoader: true
        }
    }

    componentDidMount() {

        this._isMounted = true;

        this.props.isLogged(getToken()) 
    
        // console.log('didmount');

        this.getNotes();
        
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.showModal !== this.state.showModal){

            // console.log('didUpdate');

            this.getNotes();
        }
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    getNotes = () => {

        axiosHeader();
       

        axios.get(Api.GET_POST_NOTES)
            .then(resp => {

                if(this._isMounted){

                // console.log(resp.data);

                    this.setState({
                        notes: [...resp.data.notes],
                        showLoader: false
                    })
                }

            })
            .catch(err => {
                alert('Something Happend please reload');   
              });
    }

    onDeleteNote = (id) => {

        // axios.delete(`http://localhost:3000/api/notes/${id}`)
        axios.delete(Api.GET_PUT_DEL_NOTE+id)
        .then(response => {
            alert('note deleted');

            this.getNotes();
        })
        .catch(err => {
            alert(err.message);
        })
    }

    onEditNote = (id) => {

        // console.log(id);
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
            noteId: id,
            noteHeight: this[`ref${id}`].clientHeight
        }))
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    Notes = () => {

       return this.state.notes.slice(0).reverse().map(item => {

            return(
                <div className={css.Note1} key={item._id}>

                    <div className={css.DivAuthor}>
                        <h4>{this.props.reduxUser}</h4>
                        <p>{format(item.date)}</p>
                    </div>

                    <p className={css.PNote} 
                        ref={input => {this[`ref${item._id}`] = input;}}
                        >{item.note}</p>
                    
                    
                    <div className={css.DivBtns}>
                        <button type="button"
                            onClick={() => this.onEditNote(item._id)}>
                            <FontAwesomeIcon icon={faUserEdit} className={css.I}></FontAwesomeIcon>
                                Edit
                        </button>

                        <button type="button"
                                onClick={() => this.onDeleteNote(item._id)}>
                                <FontAwesomeIcon icon={faTrashAlt} className={css.I}></FontAwesomeIcon>
                                Delete
                        </button>
                    </div>

                </div>
            )
       })
    }

    NoNote = () => {

        return  <div className={css.DivNoNote}>
                    <h1 className={css.H1Create}>Create your First Note</h1>

                    <div className={css.DivBtnNoNote}>
                        <button type="button"
                            onClick={() => this.props.history.push('/create')}>
                            <FontAwesomeIcon icon={faPlusCircle} className={css.I}></FontAwesomeIcon>
                                Create Note
                        </button>
                    </div>
                </div>
    }

    render() {

        if(!this.props.reduxLoggedIn) {

            return <Redirect to='/'></Redirect>
        }


        let notes = null;

        if(Array.isArray(this.state.notes) && this.state.notes.length){

            notes = this.Notes();
        }
        else {
            notes = this.NoNote();
        }

        return(

                <Loader visible={this.state.showLoader}>

                    <div>

                        <div className={css.ShowContainer}>

                            <Header>

                            </Header>           
                                        
                            {notes}

                            {
                            this.state.showModal ?

                                <EditModal showModal={this.state.showModal} 
                                            closeModal={this.closeModal}
                                            noteId={this.state.noteId}
                                            noteHeight={this.state.noteHeight}/>
                            :
                            null
                            }

                        </div>

                        <Footer/>

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
  export default connect(mapGlobalStateToProps, mapDispatchToProps)(ShowNotes);
