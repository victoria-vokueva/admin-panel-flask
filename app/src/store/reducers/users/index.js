import { UsersAction } from "./action-creators";


const initialState = {
    users: [],
    isCurrentUser: null
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USERS":
            return {...state, users: action.payload}
        case "SET_CURRENT_USER":
            return {...state, isCurrentUser: action.payload}
        default:
            return state;
    }
}