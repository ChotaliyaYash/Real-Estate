import axios from "axios"

export const addListCall = async (data: listModelType) => {
    return axios.post("/api/v1/listing/add", data)
}

export const getListCall = async () => {
    return axios.get("/api/v1/listing/getAll")
}

export const getUserListCall = async () => {
    return axios.get("/api/v1/listing/userList")
}

export const deleteUserListCall = async (id: string) => {
    return axios.delete(`/api/v1/listing/delete/${id}`)
}

export const updateUserListCall = async (id: string, data: listModelType) => {
    return axios.patch(`/api/v1/listing/update/${id}`, data)
}

export const getListByIdCall = async (id: string) => {
    return axios.get(`/api/v1/listing/getlist/${id}`)
}
