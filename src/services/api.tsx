import axios from 'axios';

const Api = axios.create({
    baseURL: "https://chronos.compraqui.app/api"
})
export default Api;