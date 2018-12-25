import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL + "/api"; //|| 'http://localhost:5000/api'

const instance = axios.create({
  baseURL: baseURL
});

// instance.defaults.headers.common['Authorization'] ='Bearer keyntfXx888yZ4url'
// instance.defaults.headers.common['Content-type'] ='application/json'

export default instance;
