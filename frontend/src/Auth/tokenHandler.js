import axios from 'axios';

export function setUser(user) {

    return localStorage.setItem('notex-user', JSON.stringify(user))
}

export function setToken(token) {

    return localStorage.setItem('notex-token', JSON.stringify(token));
}

export function getUser() {

    const user = JSON.parse(localStorage.getItem('notex-user'));

    if(!user){

        return null;
    }
    else {
        
        return user;
    }
}

export function getToken() {

    const token = JSON.parse(localStorage.getItem('notex-token'));

    // const token = localStorage.getItem('notex-token');

    if(!token) {

        return false;
    }
    else{   
        
        return true;
    }    

}

export function delToken() {

    return localStorage.removeItem('notex-token');
}

export function axiosHeader() {

    axios.interceptors.request.use(function (config) {

        const token = JSON.parse(localStorage.getItem('notex-token'))
        // config.headers.authorization = 'Bearer ' + token;
        config.headers.authorization = token;
        // config.headers.post['Access-Control-Allow-Origin'] = '*';
        // config.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        // config.headers.common = {'Authorization': `Bearer ${token}`}
        return config;
    })
}