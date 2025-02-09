import axios from "axios"

const BACKEND_HOST = "http://localhost:8080"

function validateStatus(status: number): boolean {
    return 200 <= status && status < 300 
}

export interface Response<T> {
    response_code: number
    response_message: string
    data: T
}

const client = axios.create({
    baseURL: BACKEND_HOST,
    validateStatus: validateStatus,
})


export const uploadImageUrl = `${BACKEND_HOST}/upload`
export default client