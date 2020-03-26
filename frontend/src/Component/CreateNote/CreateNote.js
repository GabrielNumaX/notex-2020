import React, {Component} from 'react';
import axios from 'axios';

import css from './CreateNote.module.css';
import Header from '../Header/Header';

class CreateNote extends Component {

    constructor(props) {
        super(props);


    }




    render() {

        // console.log(this.props)

        return(
            <div className={css.CreateContainer}>
                <Header></Header>

                <div>

                    
                </div>



            </div>
        )
    }
}

export default CreateNote;