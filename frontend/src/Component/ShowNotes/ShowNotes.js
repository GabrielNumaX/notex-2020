import React, {Component} from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';

import Header from '../Header/Header';
import EditModal from '../EditModal/EditModal';
import Footer from '../Footer/Footer';
import css from './ShowNotes.module.css';
// import { Redirect } from 'react-router-dom';

import Loader from '../Loader/Loader';

import { ApiRoutes as Api } from '../../Api/Api';

import {axiosHeader} from '../../Auth/tokenHandler'



class ShowNotes extends Component {

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

    // aca pasar el ID de USER desde REDUX
    componentDidMount() {
        //this prints REACT PORT -> :3000
        // console.log(Api.GET_POST_NOTE+this.props.reduxUserId);

        console.log('show notes didmount')

        this.getNotes();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.showModal !== this.state.showModal){

            console.log('didUpdate');

            this.getNotes();
        }
    }

    getNotes = () => {

        axios.get(Api.GET_POST_NOTES)
            .then(resp => {
                // console.log(resp.data);
                this.setState({
                    notes: resp.data,
                    showLoader: false
                })

                // console.log(resp.data);
            })
            .catch(err => alert(err.message));
    }

    onDeleteNote = (id) => {

        // axios.delete(`http://localhost:3000/api/notes/${id}`)
        axios.delete(Api.NOTE_ID+id)
        .then(response => {
            alert('note deleted');

            this.getNotes();
        })
        .catch(err => {
            alert(err.message);
        })
    }

    onEditNote = (e) => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }))

        this.setState({
            noteId: e.target.dataset.id,
        })

        let pNote = document.getElementsByClassName(css.PNote);

        for(let i = 0; i < pNote.length; i++){
            if(pNote[i].dataset.id === e.target.dataset.id){

                this.setState({
                    noteHeight: pNote[i].clientHeight,
        
                })
            }
        };
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    render() {

        //this prints in reverse order
        const notes = this.state.notes.slice(0).reverse().map(item => {

            return(
                <div className={css.Note1} key={item._id}>

                    <div className={css.DivAuthor}>
                        <h4>{this.props.reduxUser}</h4>
                        <p>{format(item.date)}</p>
                    </div>
                        {/* este data esta para comparar y sacar el height */}
                    <p className={css.PNote} data-id={item._id}>{item.note}</p>

                    <div className={css.DivBtns}>
                        <button type="button"
                            data-id={item._id}
                            onClick={(e) => this.onEditNote(e)}>
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
        });

        return(

                <Loader visible={this.state.showLoader}>

                    <div className={css.ShowContainer}>

                        <Header>

                        </Header>           
                                    
                        {notes}

                        <EditModal showModal={this.state.showModal} 
                                    closeModal={this.closeModal}
                                    noteId={this.state.noteId}
                                    noteHeight={this.state.noteHeight}/>

                        <Footer/>

                    </div>
                
                </Loader>

            // {/* </div> */}
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
        logIn: (loggedInProp) => {
            dispatch({type: 'LOG_IN', loggedInAction: loggedInProp})
        },
        logOut: (loggedInProp) => {
          dispatch({type: 'LOG_OUT', loggedInAction: loggedInProp})
      },
    }
  }
  export default connect(mapGlobalStateToProps, mapDispatchToProps)(ShowNotes);
