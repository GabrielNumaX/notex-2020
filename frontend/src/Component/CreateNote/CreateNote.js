import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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

    onNoteChange = (e) => {
        this.setState({
            note: e.target.value
        })
    }

    onNoteSubmit = () => {

        // axios.post(`http://localhost:3000/api/user/${this.props.reduxUserId}/notes`, {
        axios.post(Api.GET_POST_NOTE+this.props.reduxUserId, {
            note: this.state.note,
        })
        .then(response => {
            this.setState({
                note: '',
            });

            alert('Note Created');

            this.props.history.push('/');
        })
        .catch(err => {
            alert(err.message);

            console.log(err);
        })
    }

    render() {

        return(
            <div className={css.CreateContainer}>
                <Header></Header>

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
        reduxUserId: globalState.userId,
        reduxLoggedIn: globalState.loggedIn
    }
  }

  export default connect(mapGlobalStateToProps, null)(CreateNote);