export interface Person {
    id : string
    imageURL: string
    name: string
    nickname: string
    color: string
    description: string
    position: string
    email: string
    telephone: string
}

export interface Description {
    id: string
    name: string
    description: string
    imageURL: string
    priority: number
}

export interface Task {
    id: string
    calendar_id: string
    schedule_id: string
    start: string
    end: string
    status: number
    person: Person
    description:Description
}