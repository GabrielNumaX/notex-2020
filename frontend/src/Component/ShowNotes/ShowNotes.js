import React, {Component} from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


import css from './ShowNotes.module.css';

class ShowNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:3000/api/notes')
            .then(resp => {
                console.log(resp);
                this.setState({
                    notes: resp.data
                })
            })
            .catch(err => alert(err.message));
    }


    render() {

        const notes = this.state.notes.map(item => {

            return(
                <div className={css.Note1} key={item._id}>

                    <div className={css.DivAuthor}>
                        <h4>{item.author}</h4>
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

                {notes}

                {/* <div className={css.Note1}>

                    <div className={css.DivAuthor}>
                        <h4>Author</h4>
                        <p>time ago</p>
                    </div>

                    <p className={css.PNote}>

                    "But I must explain to you how all this mistaken idea of denouncing 
                    pleasure and praising pain was born and I will give you a complete 
                    account of the system, and expound the actual teachings of the great 
                    explorer of the truth, the master-builder of human happiness. No one 
                    rejects, dislikes, or avoids pleasure itself, because it is pleasure, 
                    but because those who do not know how to pursue pleasure rationally 
                    encounter consequences that are extremely painful. Nor again is there 
                    anyone who loves or pursues or desires to obtain pain of itself, 
                    because it is pain, but because occasionally circumstances occur 
                    in which toil and pain can procure him some great pleasure. To take a 
                    trivial example, which of us ever undertakes laborious physical exercise, 
                    except to obtain some advantage from it? But who has any right to find 
                    fault with a man who chooses to enjoy a pleasure that has no annoying 
                    consequences, or one who avoids a pain that produces no resultant pleasure?"
                    </p>

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

                </div> */}

                {/* <div className={css.Note2}>

                </div>

                <div className={css.Note3}>

                </div>

                <div className={css.Note4}>

                </div>

                <div className={css.Note5}>

                </div> */}
            

            </div>
        )
    }
}

export default ShowNotes;