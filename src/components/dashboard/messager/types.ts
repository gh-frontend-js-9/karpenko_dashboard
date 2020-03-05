// Main class structure(messages.tsx)
export type MessagerState = {
    thread: Array<any>,
    thread_amount: number,

    current_user: UserSchema
}

// Messages
export type MessageProps = {
    users: Array<any>,
    thread: Array<any>,
    user: UserSchema
}

export type MessageStructure = {
    users: UserDataStructure,

}

// User reusable schema
export type UserSchema = {
    _id: string,
    name: string,
    email: string
}

// Users list
export type UsersStructure = {
    position: string,
    description: string,
    phone: string,
    address: string,
    organization: string,
    _id: string,
    name: string,
    email: string
}

// Messages
export type UserMessageStructure = {
    from: UserDataStructure, 
    to: UserDataStructure
}
// Sub object of
export type UserDataStructure = {
    __id: string,
    name: string
}


// Thread structure
type MessageThreadDataStructure <T> = {
    id: T,
    thread: T,
    body: T
}
export type ThreadStructure = {
    users: UserMessageStructure,
    _id: string,
    created_at: Date,
    message: MessageThreadDataStructure<string>
}


// Thread:id structure
export type AllThreadStructure = {
    users: UserDataStructure,
    _id: string,
    created_at: Date,
    updated_at: Date,
    thread: string,
    body: string
}
