import React, {Component} from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header/Header';
import css from './ShowNotes.module.css';
import { Redirect } from 'react-router-dom';

class ShowNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:3000/api/user/'+this.props.userId+'/notes')
            .then(resp => {
                // console.log(resp.data);
                this.setState({
                    notes: resp.data
                })
            })
            .catch(err => alert(err.message));
    }


    render() {

        console.log(this.props);

        const notes = this.state.notes.map(item => {

            return(
                <div className={css.Note1} key={item._id}>

                    <div className={css.DivAuthor}>
                        <h4>{this.props.userToShow}</h4>
                        <p>{format(item.date)}</p>
                    </div>

                    <p className={css.PNote}>{item.note}</p>

                    <div className={css.DivBtns}>
                        <button type="button">
                            <FontAwesomeIcon icon={faUserEdit} className={css.I}></FontAwesomeIcon>
                                Edit
                        </button>

                        <button type="button">
                                <FontAwesomeIcon icon={faTrashAlt} className={css.I}></FontAwesomeIcon>
                                Delete
                        </button>
                    </div>

                </div>
            )
        });

        return(
            <div className={css.ShowContainer}>
                <Header logOut={this.props.logOut} userToShow={this.props.userToShow}>

                </Header>           

                {
                
                this.props.loggedIn === 'true' ?
                            
                notes

                :

                <Redirect to="/"/>

                }

            </div>
        )
    }
}

export default ShowNotes;