import axios from "axios";

let baseURL = process.env.VUE_APP_BACKEND_URL;
baseURL = baseURL + "/api";

const instance = axios.create({
  baseURL: baseURL
});

// instance.defaults.headers.common['Authorization'] ='Bearer keyntfXx888yZ4url'
// instance.defaults.headers.common['Content-type'] ='application/json'

export default instance;
