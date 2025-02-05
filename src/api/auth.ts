import client from "./client";
import type { Response } from "./client";

export interface LoginResponse {
    profile : ProfileRes
    token: string
    exp: number
}

export interface ProfileRes {
    id: string
    name: string
    email: string
    imageURL: string
    description: string
    calendar_id: string
}

export async function login(email: string, password: string) {
    const response = await client.post<LoginResponse>('/auth/login', { email: email, password: password })

    return response
}

export async function fetchProfile(token: string) {
    const response = await client.get<Response<ProfileRes>>('/auth/profile', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response.data
}