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
    loadEquippedItems:(id)=>{
        return axios.get(`${URL_PREFIX}/item/equipped/${id}`)
    },
    loadUnlockedItems:(id)=>{
        return axios.get(`${URL_PREFIX}/item/equipped/${id}`)
    },
    updateEquippedItems:(id,itemData)=>{
        return axios.put(`${URL_PREFIX}/item/equipped/${id}`,itemData)
    },
    addUnlockedItem:(id,itemData)=>{
        return axios.post(`${URL_PREFIX}/item/unlocked/${id}`,itemData)
    },
    // addItem:(id,itemData)=>{
    //     return axios.post(`${URL_PREFIX}/limb/post/${id}`,itemData)
    // },
    createRascal:(id,rascalData)=>{
        return  axios.post(`${URL_PREFIX}/rascal/new/${id}`,rascalData)
    },
    updateRascal:(id,rascalData)=>{
        return axios.put(`${URL_PREFIX}/rascal/update/${id}`,rascalData)
    }
}



export default API;