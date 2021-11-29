import axios from "axios";


const URL_PREFIX = "https://pocket-rascal-server.herokuapp.com/api"
const API = {
    verify: (tkn)=>{
        return axios.get(`${URL_PREFIX}/user/verify`,{headers:{
        "Authorization": `Bearer ${tkn}`
      }})
    },
    login:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/user/login`,usrData)
    },
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/user/new`,usrData)
    },
    loadRascal:(id)=>{
        return axios.get(`${URL_PREFIX}/rascal/load/${id}`)
    },
    createRascal:(rascalData)=>{
        return  axios.post(`${URL_PREFIX}/rascal/new`,rascalData)
    },
    updateRascal:(rascalData)=>{
        return axios.put(`${URL_PREFIX}/rascal/update`,rascalData)
    }
}



export default API;