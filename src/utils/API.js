import axios from "axios";


const URL_PREFIX = "https://pocket-rascal-server.herokuapp.com/api"
//  "https://pocket-rascal-server.herokuapp.com/api"  "http://localhost:3005/api"
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
    loadLimbs:(id)=>{
        return axios.get(`${URL_PREFIX}/limb/rascal/${id}`)
    },
    updateLimbs:(id,limbData)=>{
        return axios.put(`${URL_PREFIX}/limb/put/${id}`,limbData)
    },
    addLimb:(id,limbData)=>{
        return axios.post(`${URL_PREFIX}/limb/post/${id}`,limbData)
    },
    createRascal:(rascalData)=>{
        return  axios.post(`${URL_PREFIX}/rascal/new`,rascalData)
    },
    updateRascal:(rascalData,tkn)=>{
        return axios.put(`${URL_PREFIX}/rascal/update`,rascalData)
    }
}



export default API;