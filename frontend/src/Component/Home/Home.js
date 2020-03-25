import React, {Component} from 'react';
import axios from 'axios';

import css from './Home.module.css';
import Axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedIn: false,
            user: '',
            password: '',
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        // if(document.hasFocus(e.target.name) === 'password' && e.target.keyCode === 13){
        //     // this.logInSubmit(e);
        //     alert('yes');
        // }
    }

    logInSubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3000/api/user', {
            user: this.state.user,
            password: this.state.password
        })
        .then(response => {
            this.setState({
                user: '',
                password: ''    
            })
            console.log(response.data);

            // if(!response.data) {
            //     const warning = document.getElementsByClassName(css.PWarning);

            //     warning.style.display = 'block';
            // }
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                <header className={css.Header}>
                    <h1>NoteX</h1>
                </header>

                <div className={css.DivForm}>

                    <form className={css.Form}
                            onSubmit={(e) => this.logInSubmit(e)}>
                        <div className={css.DivH3}>
                            <h3>Welcome</h3>
                        </div>
                        
                        <div className={css.DivInputs}>

                            <p>User</p>
                            <input type="text" 
                                    name="user" 
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.user}>           
                            </input>

                            <p>Password</p>
                            <input type="password" 
                                    name="password"
                                    onChange={(e) => this.onInputChange(e)}
                                    value={this.state.password}>
                            </input>

                            <p className={css.PWarning}>Wrong User or Password</p>
                        </div>

                        <div className={css.DivBtn}>
                            <input type="submit" value="Log In"></input>
                        </div>
                    </form>
                </div>

                <footer className={css.Footer}>

                    <h3>NumaX &copy;2020</h3>

                </footer>
            </div>
        )
    }
}

export default Home;