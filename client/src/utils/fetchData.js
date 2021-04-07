import axios from 'axios'

export const getDataAPI = async ( url, token ) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}

export const postDataAPI = async ( url, token ) => {
    const res = await axios.post(`/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}

export const putDataAPI = async ( url, put, token ) => {
    const res = await axios.put(`/api/${url}`, put, {
        headers: {Authorization: token}
    })
    return res
}

export const patchDataAPI = async ( url, patch, token ) => {
    const res = await axios.patch(`/api/${url}`, patch, {
        headers: {Authorization: token}
    })
    return res
}

export const deleteDataAPI = async ( url, token ) => {
    const res = await axios.patch(`/api/${url}`, {
        headers: {Authorization: token}
    })
    return res
}