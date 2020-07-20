import React, { Component }from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// import { useSelector } from 'react-redux';

import { ApiRoutes as Api } from '../../Api/Api';

import { axiosHeader } from '../../Auth/tokenHandler';

import css from './EditModal.module.css';

class EditModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            note: '',
            edit: true,
        }
    }

    componentDidMount() {

        // console.log('didMount');

        axiosHeader();

            axios.get(Api.GET_PUT_DEL_NOTE+this.props.noteId)
            .then(response => {
                // console.log(response.data);

                this.setState({
                    note: response.data.note,
                })

                this.setState(prevState => ({
                    edit: !prevState.edit
                }));
            })
            .catch(err => {
                alert(err.message);
            })
        
    }

    // componentDidUpdate(prevProps, prevState) {

    //     console.log('didUpdate')

    //     // if(prevProps.noteId !== this.props.noteId){
    //     if(prevState.edit !== this.state.edit) {

    //         axiosHeader();

    //         axios.get(Api.GET_PUT_DEL_NOTE+this.props.noteId)
    //         .then(response => {
    //             // console.log(response.data);

    //             this.setState({
    //                 note: response.data.note,
    //             })

    //             this.setState(prevState => ({
    //                 edit: !prevState.edit
    //             }));
    //         })
    //         .catch(err => {
    //             alert(err.message);
    //         })
    //     }
    // }

    onNoteChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    onNoteSubmit = () => {

        axiosHeader();

        axios.put(Api.GET_PUT_DEL_NOTE+this.props.noteId, {
            note: this.state.note,
        })
        .then(response => {

            this.setState({
                note: '',
            });

            alert('Note Updated');

            this.props.closeModal();
            
        })
        .catch(err => {
            alert(err.message);

            console.log(err);
        })
    }


    render() {

        return(
            // <!-- The Modal -->
            <div className={css.modal}>

                {/* <!-- Modal content --> */}
                <div className={css.modalContent}>
                   
                    <div className={css.DivCreate}>

                        <div className={css.DivAuthor}>
                            <h4>{this.props.reduxUser}</h4>

                            <span className={css.close} onClick={this.props.closeModal}>&times;</span>

                        </div>  

                        <div className={css.DivTextarea} style={{height: `${this.props.noteHeight}px`}}>
                            <textarea placeholder="Edit your note here..."
                                    onChange={this.onNoteChange}
                                    value={this.state.note}
                                    ></textarea>
                        </div>

                        <div className={css.DivBtn}>

                            <button 
                            onClick={this.onNoteSubmit}>
                                <FontAwesomeIcon icon={faPencilAlt} className={css.I}/>
                                Edit
                            </button>

                            <button 
                            onClick={this.props.closeModal}>
                                <FontAwesomeIcon icon={faTimesCircle} className={css.I}/>
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

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

  export default connect(mapGlobalStateToProps, null)(EditModal);