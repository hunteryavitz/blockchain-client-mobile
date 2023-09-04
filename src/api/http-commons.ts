import axios from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-type": "application/json"
    },
    responseType: "json"
})

export default HTTP;