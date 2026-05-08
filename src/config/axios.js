import axios from "axios"

const  baseurl = "https://mp3quran.net/api/v3/"

export  const axiosInstance = axios.create({
    baseURL:baseurl,
        headers: {"Content-Type": "application/json",},

})