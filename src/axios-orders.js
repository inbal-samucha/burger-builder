import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bd365-default-rtdb.firebaseio.com/'
});

export default instance;