import axios from "axios"

export const addListCall = async (data: listModelType) => {
    return axios.post("/api/v1/listing/add", data)
}

export const getListCall = async () => {
    return axios.get("/api/v1/listing/get")
}