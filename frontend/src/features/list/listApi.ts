import axios from "axios"

export const addListCall = async (data: listModelType) => {
    return axios.post("http://localhost:3000/listing/add", data)
}

export const getListCall = async () => {
    return axios.get("http://localhost:3000/listing/get")
}