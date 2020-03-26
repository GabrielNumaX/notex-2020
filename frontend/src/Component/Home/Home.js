import React, {Component} from 'react';
// import axios from 'axios';

import css from './Home.module.css';
// import Axios from 'axios';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedIn: false,
            user: '',
            password: '',
        }
    }

    // onInputChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })

    //     // if(document.hasFocus(e.target.name) === 'password' && e.target.keyCode === 13){
    //     //     // this.logInSubmit(e);
    //     //     alert('yes');
    //     // }
    // }

    // logInSubmit = (e) => {
    //     e.preventDefault();

    //     Axios.post('http://localhost:3000/api/user', {
    //         user: this.state.user,
    //         password: this.state.password
    //     })
    //     .then(response => {
    //         this.setState({
    //             user: '',
    //             password: '',
    //             loggedIn: response.data.login    
    //         })

    //         //ACA RESPONSE CON _id, user y login NO SE SI SIRVE PARA LO SIGUIENTE
    //         console.log(response.data);

    //         const warning = document.getElementsByClassName(css.PWarning)[0];


    //         //ESTA LOGICA PARA Q MUESTRE EL WARNING HAY Q PROBARLA
    //         if(!response.data.login) {
    //             // const warning = document.getElementsByClassName(css.PWarning)[0];

    //             // console.log(warning);

    //             warning.style.display = 'block';
    //         }
    //         else {

    //             warning.style.display= 'none';
    //         }

    //     })
    //     .catch(err => console.log(err))
    // }

    render() {

        let warning = [];

        if(!this.state.loggedIn){

            warning.push(css.PWarning);
        }

        // console.log(this.props);
        return(
            <div>
                <header className={css.Header}>
                    <h1>NoteX</h1>
                </header>

                <div className={css.DivForm}>

                    <form className={css.Form}
                            // onSubmit={(e) => this.logInSubmit(e)}>
                            onSubmit={this.props.onLogInSubmit}>
                        <div className={css.DivH3}>
                            <h3>Welcome</h3>
                        </div>
                        
                        <div className={css.DivInputs}>

                            <p>User</p>
                            <input type="text" 
                                    name="user" 
                                    // onChange={(e) => this.onInputChange(e)}
                                    onChange={this.props.onInputChange}
                                    // value={this.state.user}>           
                                    value={this.props.userValue}>
                            </input>

                            <p>Password</p>
                            <input type="password" 
                                    name="password"
                                    onChange={this.props.onInputChange}
                                    value={this.props.passwordValue}>
                            </input>

                            <p className={warning.join(' ')}>Wrong User or Password</p>
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